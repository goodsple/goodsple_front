import React, { useEffect, useState } from 'react';
import * as S from './AdminKeywordMonitoring.styles';
import axiosInstance from '../../../api/axiosInstance';

interface PopularKeyword {
    keywordId: number;
    keyword: string;
    searchCount: number;
    keywordStatus: 'VISIBLE' | 'BLOCKED';
    lastRankInTime: string;
    lastAggregatedTime: string;
    isProhibited: boolean;
}

const AdminKeywordMonitoring = () => {
    const [data, setData] = useState<PopularKeyword[]>([]);
    const [loading, setLoading] = useState(false);

    // 전체 조회
    const fetchKeywords = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get('/admin/popular-keywords');
            setData(res.data);
        } catch (err) {
            console.error('인기검색어 조회 실패', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchKeywords();
    }, []);

    // 차단
    const handleBlock = async (keywordId: number) => {
        try {
            await axiosInstance.put(`/admin/popular-keywords/${keywordId}/block`);
            fetchKeywords(); // 새로고침
        } catch (err) {
            console.error('차단 실패', err);
            alert('차단 처리 실패');
        }
    };

    // 차단 해제
    const handleUnblock = async (keywordId: number) => {
        try {
            await axiosInstance.put(`/admin/popular-keywords/${keywordId}/visible`);
            fetchKeywords();
        } catch (err) {
            console.error('차단 해제 실패', err);
            alert('차단 해제 실패');
        }
    };

    // 금지어 등록 (기존 API 재사용)
    const handleBan = async (keyword: string) => {
        try {
            await axiosInstance.post('/admin/prohibited-words', { word: keyword });
            alert('금칙어 등록 완료');
            fetchKeywords();
        } catch (err: any) {
            if (err.response?.status === 400 || err.response?.data?.message?.includes('이미 등록')) {
                alert('이미 등록된 금칙어입니다.');
            } else {
                alert('금칙어 등록 실패');
            }
            console.error('금칙어 등록 실패', err);
        }
    };

    return (
        <S.Container>
            <S.Title>실시간 검색어 관리</S.Title>

            {loading ? (
                <div>로딩 중...</div>
            ) : (
                <S.KeywordTable>
                    <thead>
                        <tr>
                            <th>순위</th>
                            <th>검색어</th>
                            <th>검색횟수</th>
                            <th>상태</th>
                            <th>최근 순위권 진입시각</th>
                            <th>마지막 집계 시각</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.keywordId}>
                                <td>{index + 1}</td>
                                <td>{item.keyword}</td>
                                <td>{item.searchCount}</td>
                                <td>
                                    <S.StatusText status={item.keywordStatus}>
                                        {item.keywordStatus === 'VISIBLE'
                                            ? '노출'
                                            : '차단됨'}
                                    </S.StatusText>
                                </td>
                                <td>
                                    {new Date(item.lastRankInTime).toLocaleString()}
                                </td>
                                <td>
                                    {new Date(item.lastAggregatedTime).toLocaleString()}
                                </td>
                                <td>
                                    {item.keywordStatus === 'VISIBLE' ? (
                                        <S.ActionButton
                                            variant="block"
                                            onClick={() => handleBlock(item.keywordId)}
                                        >
                                            차단
                                        </S.ActionButton>
                                    ) : (
                                        <S.ActionButton
                                            variant="unblock"
                                            onClick={() => handleUnblock(item.keywordId)}
                                        >
                                            차단 해제
                                        </S.ActionButton>
                                    )}

                                    <S.ActionButton
                                        variant="default"
                                        disabled={item.isProhibited}
                                        onClick={
                                            item.isProhibited ? undefined : () => handleBan(item.keyword)
                                        }
                                    >
                                        {item.isProhibited ? '등록됨' : '금칙어 등록'}
                                    </S.ActionButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </S.KeywordTable>
            )}
        </S.Container>
    );
};

export default AdminKeywordMonitoring;











// import React, { useState } from 'react';
// import * as S from './AdminKeywordMonitoring.styles';

// const mockData = Array.from({ length: 20 }, (_, i) => ({
//     rank: i + 1,
//     keyword: `검색어${i + 1}`,
//     count: Math.floor(Math.random() * 1000) + 1,
//     status: i % 4 === 0 ? '차단됨' : '노출',
//     enteredAt: '2025-08-06 14:00',
//     lastCollected: '2025-08-06 14:30',
// }));


// const AdminKeywordMonitoring = () => {
//     const [data, setData] = useState(mockData);

//     const handleBlock = (keyword: string) => {
//         alert(`${keyword} 차단 처리`);
//         // TODO: 차단 처리 API 연결
//     };

//     const handleBan = (keyword: string) => {
//         alert(`${keyword} 금지어 등록`);
//         // TODO: 금지어 등록 API 연결
//     };

//     return (
//         <S.Container>
//             <S.Title>실시간 검색어 관리</S.Title>
//             <S.KeywordTable>
//                 <thead>
//                     <tr>
//                         <th>순위</th>
//                         <th>검색어</th>
//                         <th>검색횟수</th>
//                         <th>상태</th>
//                         <th>최근 순위권 진입시각</th>
//                         <th>마지막 집계 시각</th>
//                         <th>관리</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map(item => (
//                         <tr key={item.rank}>
//                             <td>{item.rank}</td>
//                             <td>{item.keyword}</td>
//                             <td>{item.count}</td>
//                             <td>{item.status}</td>
//                             <td>{item.enteredAt}</td>
//                             <td>{item.lastCollected}</td>
//                             <td>
//                                 <S.ActionButton onClick={() => handleBlock(item.keyword)}>
//                                     차단
//                                 </S.ActionButton>
//                                 <S.ActionButton onClick={() => handleBan(item.keyword)}>
//                                     금지어 등록
//                                 </S.ActionButton>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </S.KeywordTable>
//         </S.Container>
//     );
// };

// export default AdminKeywordMonitoring;




