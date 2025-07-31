import React, { useState } from 'react';
import * as S from './NoticeList.styles';

interface NoticeItem {
    id: number;
    title: string;
    createdAt: string; // ex) '2025.07.30'
}

const dummyNotices: NoticeItem[] = [
    { id: 1, title: '[공지] 굿즈플 점검 안내', createdAt: '2025.07.30' },
    { id: 2, title: '[공지] 거래 사기 예방 팁', createdAt: '2025.07.28' },
    { id: 3, title: '[공지] 여름 휴가 일정 안내', createdAt: '2025.07.26' },
    { id: 4, title: '[공지] 서비스 이용약관 변경 안내', createdAt: '2025.07.24' },
    { id: 5, title: '[공지] 고객센터 운영시간 변경', createdAt: '2025.07.20' },
    { id: 6, title: '[공지] 굿즈플 홈페이지 업데이트 안내', createdAt: '2025.07.18' },
    { id: 7, title: '[공지] 신규 카테고리 추가 안내', createdAt: '2025.07.15' },
    { id: 8, title: '[공지] 인기 검색어 기능 추가', createdAt: '2025.07.12' },
    { id: 9, title: '[공지] 서버 이전 작업 안내', createdAt: '2025.07.10' },
    { id: 10, title: '[공지] 거래 관련 보안 강화', createdAt: '2025.07.08' },
    { id: 11, title: '[공지] 이벤트 당첨자 발표', createdAt: '2025.07.06' },
    { id: 12, title: '[공지] 시스템 오류 수정', createdAt: '2025.07.04' },
];

const NoticeList = () => {

    const [visibleCount, setVisibleCount] = useState(10);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 10);
    };

    const visibleNotices = dummyNotices.slice(0, visibleCount);
    const hasMore = visibleCount < dummyNotices.length;

    return (
        <S.Container>
            <S.TitleHeader>공지사항</S.TitleHeader>
            {visibleNotices.map((notice, index) => (
                <React.Fragment key={notice.id}>
                    <S.Row>
                        <S.Title>{notice.title}</S.Title>
                        <S.Date>{notice.createdAt}</S.Date>
                    </S.Row>
                    {index !== visibleNotices.length - 1 && <S.Divider />}
                </React.Fragment>
            ))}
            {hasMore && (
                <S.LoadMoreButton onClick={handleLoadMore}>더보기 ▼</S.LoadMoreButton>
            )}
        </S.Container>
    );
};

export default NoticeList;
