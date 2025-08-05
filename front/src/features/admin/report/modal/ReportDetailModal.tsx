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
    status: AdminReport['status'];
    action: AdminReport['action'];
  }) => Promise<void>;
};

const ReportDetailModal: React.FC<Props> = ({ isOpen, report, onClose, onSave }) => {
  const [status, setStatus] = useState<AdminReport['status']>('PENDING');
  const [action, setAction] = useState<AdminReport['action']>('WARNING');

  const [showConfirm, setShowConfirm] = useState(false);
  const [showResult, setShowResult]     = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  // report 변경 시 초기화
  useEffect(() => {
    if (report) {
      setStatus(report.status);
      setAction(report.action);
      setShowConfirm(false);
      setShowResult(false);
      setResultMessage('');
    }
  }, [report]);

  if (!isOpen || !report) return null;

  const handleClickSave = () => {
    setShowConfirm(true);
  };

  const handleConfirmSave = async() => {
    setShowConfirm(false);
    await onSave({ reportId: report.reportId, status, action });

    // 1) action만 변경됐고 status가 아직 PENDING이면 자동으로 처리됨으로 전환
    if (action !== report!.action && status === 'PENDING') {
      setStatus('PROCESSED');
    }
    // 2) 실제 저장 호출
    await onSave({
      reportId: report!.reportId,
      status:   action !== report!.action && status === 'PENDING' 
                  ? 'PROCESSED' 
                  : status,
      action,
    });

    // 3) 결과 모달 띄우기
    setResultMessage('변경 사항이 저장되었습니다.');
    setShowResult(true);
  };

  const handleCancelSave = () => {
    setShowConfirm(false);
  };

  const handleResultClose = () => {
    setShowResult(false);
    onClose();  // 상세 모달도 닫고 싶으면 호출
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
              onChange={e => setStatus(e.target.value as AdminReport['status'])}
            >
              <option value="PENDING">미처리</option>
              <option value="PROCESSED">처리됨</option>
            </S.Select>
          </S.Field>
          <S.Field>
            <S.Label>대상자</S.Label>
            <S.Value>{report.targetName}</S.Value>
          </S.Field>
          <S.Field>
            <S.Label>신고일</S.Label>
            <S.Value>{report.reportedAt}</S.Value>
          </S.Field>
          <S.Field>
            <S.Label>신고 내용</S.Label>
            <S.Value>{report.reportTypeLabel}</S.Value>
          </S.Field>
          <S.Field>
            <S.Label>조치</S.Label>
            <S.Select
              value={action}
              onChange={e => setAction(e.target.value as any)}
            >
            {Object.entries(ReportActionLabels).map(([key, label]) => (
                   <option key={key} value={key}>
                     {label}
                   </option>
              ))}
            </S.Select>
          </S.Field>
          <S.FieldFull className='reasonText'>
            <S.Label>신고 사유</S.Label>
            <S.ReasonBox>{report.reason}</S.ReasonBox>
          </S.FieldFull>
        </S.Body>

        <S.Footer>
            <S.SaveButton 
              disabled={status === report.status && action === report.action}
              onClick={handleClickSave}
            >
            저장
          </S.SaveButton>
          {/* 저장 확인 모달 */}
        <ConfirmModal
          isOpen={showConfirm}
          title="저장 확인"
          content={
            <>
              <p>변경된 내용을 저장하시겠습니까?</p>
            </>
          }
          showCancel
          confirmText="확인"
          cancelText="취소"
          onConfirm={handleConfirmSave}
          onCancel={() => setShowConfirm(false)}
        />

        {/* 결과 모달 */}
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
