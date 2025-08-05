import React from 'react';
import * as S from './NoticeDetail.styles';
import { useNavigate } from 'react-router-dom';

const NoticeDetail = () => {
    const navigate = useNavigate();

    // 추후 실제 데이터 받아올 예정
    const title = "[공지] 굿즈플 여름 서비스 점검 안내";
    const date = "2025.07.30";
    const content = `안녕하세요, 굿즈플입니다.

보다 안정적인 서비스를 위해 다음 일정에 서버 점검이 예정되어 있습니다.

- 점검 일시: 2025년 8월 2일(토) 02:00 ~ 05:00
- 점검 내용: 서버 개선 및 보안 업데이트

이용에 불편을 드려 죄송합니다. 더 나은 서비스로 보답하겠습니다.`;

    return (
        <S.Container>
            <S.TitleSection>
                <S.MenuLabel>공지사항</S.MenuLabel>
                <S.Divider />
                <S.NoticeTitle>{title}</S.NoticeTitle>
                <S.NoticeDate>{date}</S.NoticeDate>
                <S.Divider />
            </S.TitleSection>

            <S.Content>{content}</S.Content>

            <S.ButtonWrapper>
                <S.BackButton onClick={() => navigate('/notice')}>목록</S.BackButton>
            </S.ButtonWrapper>
        </S.Container>
    );
};

export default NoticeDetail;
