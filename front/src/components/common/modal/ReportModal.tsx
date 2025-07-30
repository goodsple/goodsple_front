import { useEffect, useState } from 'react'
import * as rm from './ReportStyle'
import ConfirmModal from './ConfirmModal';
import axiosInstance from '../../../api/axiosInstance';


interface Reason {
    reportReasonId: number;
    reportReasonText: string;
}

interface Props {
    onConfirm: (selectedIds: number[], detailText: string) => void
    onCancel: () => void
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

    // 신고사유 리스트 가져오기 
    useEffect(() => {
        axiosInstance
          .get<Reason[]>('/reports/reasons')
          .then(res => setReasonOptions(res.data))
          .catch(console.error)
    }, [])

     // 이유 토글: 선택된 ID 리스트에 개별 ID 추가/제거
    const toggleReason = (id: number) => {
        setSelectedIds(prev =>
        prev.includes(id)
            ? prev.filter(x => x !== id)
            : [...prev, id]
        )
    }

    // 신고하기 버튼 클릭 시
    const submitReport = () => {
        if (!isSubmitEnabled) return;    // disabled 상태에서의 클릭 무시
        // onConfirm(selectedIds, detailText); 
        setIsConfirmOpen(true);
    };

    // 확인 모달 
   // 실제 신고 API 호출
   const handleConfirm = () => {
    axiosInstance
        .post(
            `/reports?${selectedIds.map(id => `reasonIds=${id}`).join('&')}`,
            { reportDescription: detailText }
        )
        .then(() => {
            setIsConfirmOpen(false);
            setIsResultOpen(true);
        })
        .catch(err => {
            console.error(err);
            alert('신고 중 오류가 발생했습니다.');
        });
    };
    
    // 결과 모달
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
                <rm.ReportTextArea 
                    value={detailText}
                    onChange={e => setDetailText(e.target.value)}
                    placeholder='신고 사유에 대한 상세 설명을 적어주세요.'
                />
                <rm.ButtonRow>
                    <rm.CancelButton onClick={onCancel}>취소</rm.CancelButton>
                    <rm.ReportButton 
                        disabled={!isSubmitEnabled}
                        onClick={submitReport} 
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
                        content="신고되었습니다."
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