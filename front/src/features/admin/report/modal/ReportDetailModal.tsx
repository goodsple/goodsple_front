// ReportDetailModal.tsx
import React, { useState, useEffect } from 'react';
import * as S from './ReportDetailModalStyle';
import { ReportActionLabels, type AdminReport, type ReportAction } from '../types/adminReport';
import cancelImg from '../../../../assets/images/cancel.png';
import ConfirmModal from '../../../../components/common/modal/ConfirmModal';

type Props = {
  isOpen: boolean;
  report: AdminReport | null;
  onClose: () => void;
  onSave: (updated: {
    reportId: string;
    status: AdminReport['status'];      // 'pending' | 'processed'
    action: AdminReport['action'];      // ReportAction | undefined
  }) => Promise<void>;
};

const ReportDetailModal: React.FC<Props> = ({ isOpen, report, onClose, onSave }) => {
  // ISO → yyyy-MM-dd HH:mm:ss
  function formatLocalDateTime(iso?: string) {
    if (!iso) return '-';
    const d = new Date(iso);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
  }

  const [status, setStatus] = useState<AdminReport['status']>('pending');
  const [action, setAction] = useState<AdminReport['action']>(undefined);

  const [showConfirm, setShowConfirm] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  useEffect(() => {
    if (report) {
      setStatus(report.status ?? 'pending');
      setAction(report.action);
      setShowConfirm(false);
      setShowResult(false);
      setResultMessage('');
    }
  }, [report]);

  if (!isOpen || !report) return null;

  const descriptionText = report.description ?? report.reason ?? '-';

  const handleClickSave = () => setShowConfirm(true);

  // 저장 실행(처리 상태라도 조치 없이 저장 가능)
  const handleConfirmSave = async () => {
    setShowConfirm(false);

    // 액션만 선택했고 상태가 pending이면 processed로 자동 승격
    const nextStatus: AdminReport['status'] =
      status === 'pending' && action ? 'processed' : status;

    await onSave({
      reportId: report.reportId,
      status: nextStatus,
      action, // undefined면 서버에 미지정으로 전송
    });

    setResultMessage('변경 사항이 저장되었습니다.');
    setShowResult(true);
  };

  const handleResultClose = () => {
    setShowResult(false);
    onClose();
  };

  return (
    <S.Overlay>
      <S.Dialog>
        <S.Header>
          <h3>신고 상세보기</h3>
          <S.CloseButton src={cancelImg} alt="닫기" onClick={onClose} />
        </S.Header>

        <S.Body>
          <S.Field>
            <S.Label>신고 ID</S.Label>
            <S.Value>{report.reportId}</S.Value>
          </S.Field>

          <S.Field>
            <S.Label>신고 유형</S.Label>
            <S.Value>{report.targetTypeLabel}</S.Value>
          </S.Field>

          <S.Field>
            <S.Label>신고자</S.Label>
            <S.Value>{report.reporter}</S.Value>
          </S.Field>

          <S.Field>
            <S.Label>상태</S.Label>
            <S.Select
              value={status}
              onChange={(e) => setStatus(e.target.value as AdminReport['status'])}
            >
              <option value="pending">미처리</option>
              <option value="processed">처리</option>
            </S.Select>
          </S.Field>

          <S.Field>
            <S.Label>대상자</S.Label>
            <S.Value>{report.targetName}</S.Value>
          </S.Field>

          <S.Field>
            <S.Label>신고일</S.Label>
            <S.Value>{formatLocalDateTime(report.reportedAt)}</S.Value>
          </S.Field>

          <S.Field>
            <S.Label>처리일</S.Label>
            <S.Value>{formatLocalDateTime(report.handledAt)}</S.Value>
          </S.Field>

          <S.Field>
            <S.Label>조치</S.Label>
            <S.Select
              value={action ?? ''} // 미지정 → '' (선택 안 함)
              onChange={(e) => {
                const v = e.target.value;
                setAction(v ? (v as ReportAction) : undefined);
              }}
            >
              {/* ✅ "선택 안 함" 표시, 별도 '미지정' 문구는 사용하지 않음 */}
              <option value="">선택 안 함</option>
              {Object.entries(ReportActionLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </S.Select>
          </S.Field>

          <S.FieldFull className="reasonText">
            <S.Label>신고 내용</S.Label>
            <S.ReasonBox>{descriptionText}</S.ReasonBox>
          </S.FieldFull>
        </S.Body>

        <S.Footer>
          <S.SaveButton
            // 변경 없음이면 비활성화
            disabled={status === report.status && action === report.action}
            onClick={handleClickSave}
          >
            저장
          </S.SaveButton>

          <ConfirmModal
            isOpen={showConfirm}
            title="저장 확인"
            content={<p>변경된 내용을 저장하시겠습니까?</p>}
            showCancel
            confirmText="확인"
            cancelText="취소"
            onConfirm={handleConfirmSave}
            onCancel={() => setShowConfirm(false)}
          />

          <ConfirmModal
            isOpen={showResult}
            content={resultMessage}
            showCancel={false}
            confirmText="확인"
            onConfirm={handleResultClose}
          />
        </S.Footer>
      </S.Dialog>
    </S.Overlay>
  );
};

export default ReportDetailModal;
