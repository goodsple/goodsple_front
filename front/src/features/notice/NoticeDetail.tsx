import React, { useEffect, useState } from 'react';
import * as S from './NoticeDetail.styles';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// const NoticeDetail = () => {
//     const navigate = useNavigate();

//     // 추후 실제 데이터 받아올 예정
//     const title = "[공지] 굿즈플 여름 서비스 점검 안내";
//     const date = "2025.07.30";
//     const content = `안녕하세요, 굿즈플입니다.

// 보다 안정적인 서비스를 위해 다음 일정에 서버 점검이 예정되어 있습니다.

// - 점검 일시: 2025년 8월 2일(토) 02:00 ~ 05:00
// - 점검 내용: 서버 개선 및 보안 업데이트

// 이용에 불편을 드려 죄송합니다. 더 나은 서비스로 보답하겠습니다.`;

interface NoticeDetailData {
    noticeId: number;
    noticeTitle: string;
    noticeContent: string;
    noticeCreatedAt: string;
    noticeUpdatedAt: string;
}

const NoticeDetail = () => {
    const navigate = useNavigate();
    const { noticeId } = useParams<{ noticeId: string }>();
    const [notice, setNotice] = useState<NoticeDetailData | null>(null);

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const res = await axios.get<NoticeDetailData>(`/api/user/notices/${noticeId}`);
                setNotice(res.data);
            } catch (error) {
                console.error('공지사항 불러오기 실패:', error);
            }
        };

        if (noticeId) {
            fetchNotice();
        }
    }, [noticeId]);

    if (!notice) {
        return <S.Container>공지사항을 불러오는 중입니다...</S.Container>;
    }

    const formatDate = (iso: string) => {
        const d = new Date(iso);
        return `${d.getFullYear()}.${(d.getMonth() + 1)
            .toString()
            .padStart(2, "0")}.${d.getDate().toString().padStart(2, "0")}`;
    };


    return (
        <S.Container>
            <S.TitleSection>
                <S.MenuLabel>공지사항</S.MenuLabel>
                <S.Divider />
                <S.NoticeTitle>{notice.noticeTitle}</S.NoticeTitle>
                <S.NoticeDate>{formatDate(notice.noticeCreatedAt)}</S.NoticeDate>
                <S.Divider />
            </S.TitleSection>

            <S.Content>{notice.noticeContent}</S.Content>

            <S.ButtonWrapper>
                <S.BackButton onClick={() => navigate('/notice')}>목록</S.BackButton>
            </S.ButtonWrapper>
        </S.Container>
    );
};

export default NoticeDetail;
