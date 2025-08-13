import React, { useEffect, useState } from 'react';
import * as S from './PopupNotice.styles';
import axios from 'axios';

interface PopupNoticeDto {
    noticeId: number;
    noticeTitle: string;
    noticeContent: string;
    popupStart: string; // ISO 날짜 문자열
    popupEnd: string;   // ISO 날짜 문자열
    popupImageUrl?: string;
    popupSummary?: string;
}

const PopupNotice: React.FC = () => {
    const [visible, setVisible] = useState(true);
    const [popupData, setPopupData] = useState<PopupNoticeDto | null>(null);

    useEffect(() => {
        const fetchPopup = async () => {
            try {
                const today = new Date().toISOString().split('T')[0];
                const res = await axios.get<PopupNoticeDto[]>('/api/notices/popups', {
                    params: { today }
                });

                if (res.data.length > 0) {
                    setPopupData(res.data[0]); // 오늘 날짜 기준 첫 번째 팝업
                } else {
                    setVisible(false); // 오늘 팝업 없으면 안 띄움
                }
            } catch (err) {
                console.error(err);
                setVisible(false);
            }
        };

        // "오늘 하루 보지 않기" 체크 여부 확인
        const hidden = localStorage.getItem('popupHidden');
        if (!hidden) fetchPopup();
        else setVisible(false);

    }, []);

    if (!visible) return null;

    return (
        <S.PopupWrapper>
            <S.PopupHeader>{popupData?.noticeTitle}</S.PopupHeader>
            <S.PopupContent>
                {popupData?.popupSummary || popupData?.noticeContent}
            </S.PopupContent>
            <S.PopupFooter>
                <S.Button onClick={() => {
                    localStorage.setItem("popupHidden", "true");
                    setVisible(false);
                }}>오늘 하루 보지 않기</S.Button>
                <S.Button onClick={() => setVisible(false)}>닫기</S.Button>
            </S.PopupFooter>
        </S.PopupWrapper>
    );
};

export default PopupNotice;
