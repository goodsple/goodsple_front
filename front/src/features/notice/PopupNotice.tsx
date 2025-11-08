import React, { useEffect, useState } from 'react';
import * as S from './PopupNotice.styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Popup {
    noticeId: number;
    noticeTitle: string;
    popupInfo: {
        popupSummary: string;
    };
}


const PopupNotice: React.FC = () => {

    const [popups, setPopups] = useState<Popup[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPopups = async () => {
            try {
                const res = await axios.get('/api/notices/popup');
                if (res.data.length > 0) {
                    // 최대 3개만 저장
                    setPopups(res.data.slice(0, 3));
                }
            } catch (err) {
                console.error('팝업 공지 불러오기 실패', err);
            }
        };
        fetchPopups();
    }, []);

    // 오늘 하루 숨기기 기록 확인
    const isHidden = (noticeId: number) => {
        return localStorage.getItem(`popupHidden_${noticeId}`) === 'true';
    };

    const hidePopup = (noticeId: number) => {
        localStorage.setItem(`popupHidden_${noticeId}`, 'true');
        setPopups(prev => prev.filter(p => p.noticeId !== noticeId));
    };

    if (popups.length === 0) return null;

    return (
        <>
            {popups.map((popup, index) => (
                !isHidden(popup.noticeId) && (
                    <S.PopupWrapper key={popup.noticeId} index={index}>
                        <S.PopupHeader>{popup.noticeTitle}</S.PopupHeader>
                        <S.PopupContent>
                            {popup.popupInfo?.popupSummary
                                ? (
                                    <>
                                        {popup.popupInfo.popupSummary
                                            .split('\n')
                                            .map((line, idx) => (
                                                <p key={idx}>{line}</p>
                                            ))
                                        }
                                        <S.LinkText onClick={() => navigate(`/notice/detail/${popup.noticeId}`)}>
                                            👉 공지사항 자세히보기
                                        </S.LinkText>
                                    </>
                                )
                                : <p>(공지 내용이 없습니다)</p>
                            }
                        </S.PopupContent>
                        {/* <S.PopupContent>
                            {popup.popupInfo.popupSummary}
                            </S.PopupContent> */}
                        <S.PopupFooter>
                            <S.Button onClick={() => hidePopup(popup.noticeId)}>
                                오늘 하루 보지 않기
                            </S.Button>
                            <S.Button onClick={() => setPopups(prev => prev.filter(p => p.noticeId !== popup.noticeId))}>
                                닫기
                            </S.Button>
                        </S.PopupFooter>
                    </S.PopupWrapper>
                )
            ))}
        </>
    );
};


export default PopupNotice;
