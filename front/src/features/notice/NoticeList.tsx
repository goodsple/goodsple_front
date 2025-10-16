import React, { useEffect, useState } from 'react';
import * as S from './NoticeList.styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


interface NoticeItem {
    noticeId: number;
    noticeTitle: string;
    noticeContent: string;
    noticeCreatedAt: string; // ISO 문자열로 받아서 변환 가능
    noticeUpdatedAt: string;
}

const PAGE_SIZE = 10;

const NoticeList = () => {
    const [notices, setNotices] = useState<NoticeItem[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        fetchNotices(page);
    }, [page]);

    const fetchNotices = async (pageNum: number) => {
        try {
            const response = await axios.get(`/api/user/notices`, {
                params: { page: pageNum, size: PAGE_SIZE },
            });
            const fetchedNotices: NoticeItem[] = response.data;

            setNotices(prev => {
                const combined = pageNum === 1 ? fetchedNotices : [...prev, ...fetchedNotices];
                // 중복 제거 (noticeId 기준)
                const unique = Array.from(new Map(combined.map(n => [n.noticeId, n])).values());
                return unique;
            });

            setHasMore(fetchedNotices.length === PAGE_SIZE); // 한 페이지가 꽉 차면 더 불러올 가능성 있음
        } catch (error) {
            console.error('공지사항 조회 실패:', error);
            alert('공지사항을 불러오지 못했습니다.');
        }
    };

    const handleLoadMore = () => {
        if (hasMore) setPage(prev => prev + 1);
    };

    const formatDate = (iso: string) => {
        const d = new Date(iso);
        return `${d.getFullYear()}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getDate().toString().padStart(2, '0')}`;
    };

    return (
        <S.Container>
            <S.TitleHeader>공지사항</S.TitleHeader>
            {notices.map((notice, index) => (
                <React.Fragment key={notice.noticeId}>
                    <S.Row onClick={() => navigate(`/notice/detail/${notice.noticeId}`)}>
                        <S.Title>{notice.noticeTitle}</S.Title>
                        {/* <S.Date>{new Date(notice.noticeCreatedAt).toLocaleDateString()}</S.Date> */}
                        <S.Date>{formatDate(notice.noticeCreatedAt)}</S.Date>
                    </S.Row>
                    {index !== notices.length - 1 && <S.Divider />}
                </React.Fragment>
            ))}
            {hasMore && (
                <S.LoadMoreButton onClick={handleLoadMore}>더보기 ▼</S.LoadMoreButton>
            )}
        </S.Container>
    );
};

export default NoticeList;
