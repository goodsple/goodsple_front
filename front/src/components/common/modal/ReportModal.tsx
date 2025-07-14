import { useState } from 'react'
import * as rm from './ReportStyle'

const reasonOptions = [
    "불쾌한 행동 및 언행",
    "사기 의심 거래",
    "부적절한 게시글 또는 사진",
    "기타"
]

const ReportModal:React.FC<{
    onConfirm: (selectedReasons: string[], detailText: string) => void;
    onCancel: () => void;
}>=({onConfirm,onCancel})=>{

    const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
    const [detailText, setDetailText] = useState("");
    const isSubmitEnabled = selectedReasons.length > 0 && detailText.trim() !== "";

    const toggleReason = (reason:string) => {
        if(selectedReasons.includes(reason)) {
             // 이미 선택된 이유면 제거
            setSelectedReasons(selectedReasons.filter((r)=>r !== reason));
        }else {
            // 선택되지 않은 이유면 추가
            setSelectedReasons([...selectedReasons, reason]);
        }
    }

    return(
        <rm.ReportContainer>
            <rm.ReportWrap>
                <rm.ReportTitle>신고 사유를 선택해 주세요.</rm.ReportTitle>
                <rm.ReportList>
                    {reasonOptions.map((reason)=>(
                        <rm.ReasonButton
                            key={reason}
                            onClick={()=>toggleReason(reason)}
                            $selected={selectedReasons.includes(reason)}
                        >{reason}</rm.ReasonButton> 
                    ))}
                </rm.ReportList>
                <rm.ReportTextArea 
                    value={detailText}
                    onChange={(e)=>setDetailText(e.target.value)}
                    placeholder='신고 사유에 대한 상세 설명을 적어주세요.'
                />
                <rm.ButtonRow>
                    <rm.CancelButton onClick={onCancel}>취소</rm.CancelButton>
                    <rm.ReportButton 
                        disabled={!isSubmitEnabled}
                        onClick={()=>onConfirm(selectedReasons,detailText)}
                        >
                        신고하기
                    </rm.ReportButton>
                </rm.ButtonRow>
            </rm.ReportWrap>
        </rm.ReportContainer>
    )
}
export default ReportModal;