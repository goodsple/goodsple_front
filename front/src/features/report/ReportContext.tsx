import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { OpenReportParams, ReportPayload, ReportReason } from "./types/report";
import { toDbTargetType } from "./types/report"; 
import axios from "../../api/axiosInstance";
import ReportModal from "../../components/common/modal/ReportModal";

// 컨텍스트에서 외부로 노출할 API 형태(모달 열기/닫기)
type ReportContextValue = {
    openReport : (params: OpenReportParams) => void
    closeReport: () => void
}

// 실제 컨텍스트 객체
const ReportContext = createContext<ReportContextValue | null>(null)

// 전역 Provider: 앱을 감싸서 어디서든 신고 모달을 열 수 있게 함
export function ReportProvider({ children }: { children: React.ReactNode }){
    // 모달 열림 여부
    const [isOpen, setIsOpen] = useState(false)
    // 신고 사유 목록
    const [reasons, setReasons] = useState<ReportReason[]>([])
    // 사유 목록 로딩 상태
    const [loading, setLoading] = useState(false)
    // 신고 전송 중 상태(중복 클릭 방지)
    const [submitting, setSubmitting] = useState(false)
    // 모달이 띄워졌을 때의 타겟(대상 엔티티 정보)
    const [target, setTarget] = useState<OpenReportParams | null>(null)
    const [successCallback, setSuccessCallback] = useState<(() => void) | null>(null)

    // ─────────────────────────────────────────────────────────────
    // 1) 신고 사유 목록을 앱 최초 1회 로드
    // ─────────────────────────────────────────────────────────────
    const fetchReasons = useCallback(async () => {
        let mounted = true;
        try {
            setLoading(true);
            const res = await axios.get<ReportReason[]>('/reports/reasons');
            if (mounted) setReasons(res.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        fetchReasons();
    }, [fetchReasons]);

    // ─────────────────────────────────────────────────────────────
    // 2) 모달 열기: 타겟 정보 저장 후 열림
    // ─────────────────────────────────────────────────────────────
    const openReport = useCallback((params: OpenReportParams) => {
        setTarget(params);
        setSuccessCallback(() => params.onSuccess ?? null);
        if (!reasons.length && !loading) {
            fetchReasons();
        }
        setIsOpen(true);
    }, [reasons.length, loading, fetchReasons])

     // 3) 모달 닫기: 전송 중엔 닫기 방지
     const closeReport = useCallback(()=>{
        if (!submitting) setIsOpen(false)
    }, [submitting])

    // ─────────────────────────────────────────────────────────────
    // 4) 신고 제출: 선택된 사유/상세내용 + 타겟으로 API 호출
    // ─────────────────────────────────────────────────────────────
    const submitReport = useCallback(
        async (selectedIds: number[], detailText: string): Promise<boolean> => {
          if (!target) return false;
          if (selectedIds.length === 0) return false;
      
          try {
            setSubmitting(true);
      
            const payload: ReportPayload = {
              reportTargetUserId:
                target.reportTargetUserId != null ? Number(target.reportTargetUserId) : null,
                targetType: toDbTargetType(target.targetType),  
              targetId: Number(target.targetId),
              reportDescription: (detailText ?? '').trim(),
            };
      
            console.log('[REPORT] payload', payload, 'reasonIds', selectedIds);
      
            // reasonIds=1&reasonIds=3 형태로 직접 붙이기 (paramsSerializer 영향 회피)
            const qs = selectedIds
              .map((id) => `reasonIds=${encodeURIComponent(String(id))}`)
              .join('&');
      
            await axios.post(`/reports?${qs}`, payload);
            if (successCallback) {
                successCallback();
                setSuccessCallback(null);
            }
            return true;
          } catch (err: any) {
            console.error('[REPORT] error', err?.response?.status, err?.response?.data);
            const status = err?.response?.status;
            if (status === 409) alert('이미 접수된 신고입니다.');
            else if (status === 401) alert('로그인이 필요합니다.');
            else if (status === 400) alert(err?.response?.data?.message || '잘못된 요청입니다.');
            else alert('신고 중 오류가 발생했습니다.');
            return false;
          } finally {
            setSubmitting(false);
          }
        },
        [target]
      );
      
        
    // 컨텍스트 값 메모이제이션(불필요 리렌더 방지)
    const value = useMemo(() => ({ openReport, closeReport }), [openReport, closeReport])

    return (
        <ReportContext.Provider value={value}>
            {children}
            {/* 전역 단 한 번만 모달을 렌더링. 열림 상태에만 표시 */}
            {isOpen && (
            <ReportModal
                loading={loading}
                submitting={submitting}
                reasons={reasons}
                onConfirm={submitReport}
                onCancel={closeReport}
            />
            )}
        </ReportContext.Provider>
    )
}

// 어디서든 신고 모달 열기/닫기 API를 쓰기 위한 훅
export function useReport() {
    const ctx = useContext(ReportContext)
    if (!ctx) throw new Error('useReport must be used within ReportProvider')
    return ctx
  }
