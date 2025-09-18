import React, { useEffect, useState } from 'react';
import * as S from './NoticeDetail.styles';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

interface NoticeDetailData {
    noticeId: number;
    noticeTitle: string;
    noticeContent: string;
    noticeCreatedAt: string;
    noticeUpdatedAt: string;
}

interface TokenPayload {
    role: string; // 예: "ADMIN" 또는 "USER"
}

const NoticeDetail = () => {
    const navigate = useNavigate();
    const { noticeId } = useParams<{ noticeId: string }>();
    const [notice, setNotice] = useState<NoticeDetailData | null>(null);

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken'); // 저장 위치에 맞게 조정
        if (token) {
            const payload: TokenPayload = jwtDecode(token);
            setIsAdmin(payload.role === 'ADMIN');
        }


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
                <S.NoticeDate>작성일: {formatDate(notice.noticeCreatedAt)}</S.NoticeDate>
                {isAdmin && ( <S.NoticeDate>수정일: {formatDate(notice.noticeUpdatedAt)}</S.NoticeDate>
                )}
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
