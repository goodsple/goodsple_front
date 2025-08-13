import React, {  useState } from 'react';
import * as S from './PopupNotice.styles';


const PopupNotice: React.FC = () => {
    const [visible, setVisible] = useState(true);

    // 목데이터
    const popupData = {
        title: "📢 시스템 점검 안내",
        content: "8월 15일 오전 2시부터 5시까지 서버 점검이 진행됩니다. 이용에 참고 부탁드립니다."
    };

    if (!visible) return null;

    return (
        <S.PopupWrapper>
            <S.PopupHeader>{popupData.title}</S.PopupHeader>
            <S.PopupContent>{popupData.content}</S.PopupContent>
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
