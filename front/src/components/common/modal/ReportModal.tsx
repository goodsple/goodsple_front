import { useEffect, useState } from 'react'
import * as rm from './ReportStyle'
import ConfirmModal from './ConfirmModal';
import axiosInstance from '../../../api/axiosInstance';
import type { ReportErrorType } from '../../../features/report/types/report';


interface Reason {
    reportReasonId: number;
    reportReasonText: string;
}

interface Props {
    onConfirm: (selectedIds: number[], detailText: string) => void
    onCancel: () => void;
}

const ReportModal: React.FC<Props> = ({ onConfirm, onCancel }) => {

    // 백엔드에서 불러올 옵션
    const [reasonOptions, setReasonOptions] = useState<Reason[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [detailText, setDetailText] = useState("");

    // 최소 1개 사유 선택 + 상세 텍스트가 공백이 아닐 때만 true
    const isSubmitEnabled = selectedIds.length > 0 && detailText.trim() !== "";

    // 모달
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [isResultOpen, setIsResultOpen] = useState(false)

    const [errors, setErrors] = useState<ReportErrorType>({
        reason: '',
        detail: '',
    });

    // 신고사유 리스트 가져오기 
    useEffect(() => {
        axiosInstance
          .get<Reason[]>('/reports/reasons')
          .then(res => setReasonOptions(res.data))
          .catch(console.error)
    }, [])

     // 이유 토글: 선택된 ID 리스트에 개별 ID 추가/제거
    const toggleReason = (id: number) => {
        setSelectedIds(prev => {
            const updated = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
            setErrors(prevErr => ({ ...prevErr, reason: updated.length === 0 ? '❗신고 사유를 한 가지 이상 선택해주세요.' : '' }))
            return updated
        })
    }

    // 신고사유 텍스트 변경 시
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setDetailText(value)
        setErrors(prevErr => ({ ...prevErr, detail: value.trim() === '' ? '❗신고 내용을 작성해주셔야 신고가 완료돼요.' : '' }))
    }

    // 신고하기 클릭 → 확인 모달 오픈
    const handleSubmit = () => {
        const newErrors: ReportErrorType = { reason: '', detail: '' }
        let valid = true
        if (selectedIds.length === 0) {
          newErrors.reason = '❗신고 사유를 한 가지 이상 선택해주세요.'
          valid = false
        }
        if (detailText.trim() === '') {
          newErrors.detail = '❗신고 내용을 작성해주셔야 신고가 완료돼요.'
          valid = false
        }
        setErrors(newErrors)
        if (!valid) return
        setIsConfirmOpen(true)
    }

    // 확인 모달에서 확인 클릭 → 상위로 선택된 사유·설명 전달
    const handleConfirm = () => {
        setIsConfirmOpen(false)
        axiosInstance.post(
            `/reports?${selectedIds.map(id => `reasonIds=${id}`).join('&')}`,
            { reportDescription: detailText }
        )
        .then(() => {
            setIsResultOpen(true);
            onConfirm(selectedIds, detailText)
        })
        .catch(err => {
            console.error(err);
            alert('신고 중 오류가 발생했습니다.');
        });
    };
    
    // 결과 모달 확인 → 모달 닫고 부모 onCancel 호출
    const handleResultConfirm = () => {
         // 1) 결과 모달 닫기
        setIsResultOpen(false);
        // 2) 신고 모달(부모 컴포넌트)도 닫기
        onCancel();
    }

    return(
        <rm.ReportContainer>
            <rm.ReportWrap>
                <rm.ReportTitle>신고 사유를 선택해 주세요.</rm.ReportTitle>
                <rm.ReportList>
                    {reasonOptions.map((reason, idx) => {
                    const id = reason.reportReasonId ?? idx
                    const isSelected = selectedIds.includes(id)
                    return (
                        <rm.ReasonButton
                        key={id}
                        onClick={() => toggleReason(id)}
                        $selected={isSelected}
                        >
                        {reason.reportReasonText}
                        </rm.ReasonButton>
                    )
                    })}
                </rm.ReportList>
                {errors.reason && <rm.ErrorMessage>{errors.reason}</rm.ErrorMessage>}
                <rm.ReportTextArea 
                    value={detailText}
                    onChange={handleTextChange}
                    placeholder='신고 사유에 대한 상세 설명을 적어주세요.'
                    rows={4}
                />
               
                {errors.detail && <rm.ErrorMessage>{errors.detail}</rm.ErrorMessage>} 
                <rm.ButtonRow>
                <rm.CancelButton onClick={onCancel}>취소</rm.CancelButton>
                <rm.ReportButton 
                    disabled={!isSubmitEnabled}
                    onClick={handleSubmit} 
                    >
                    신고하기
                </rm.ReportButton>
                    {/* 확인 모달 */}
                    {isConfirmOpen && (
                        <ConfirmModal
                        isOpen={isConfirmOpen}
                        content="신고하시겠습니까?"
                        showCancel={true}
                        confirmText="확인"
                        cancelText="취소"
                        onConfirm={handleConfirm}
                        onCancel={() => setIsConfirmOpen(false)}
                        />
                    )}

                    {/* 결과 모달 */}
                    {isResultOpen && (
                        <ConfirmModal
                        isOpen={isResultOpen}
                        content="신고가 접수되었습니다."
                        showCancel={false}
                        confirmText="확인"
                        onConfirm={handleResultConfirm}
                        />
                    )}
                </rm.ButtonRow>
            </rm.ReportWrap>
        </rm.ReportContainer>
    )
}
export default ReportModal;