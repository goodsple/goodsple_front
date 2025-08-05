import React, { useState } from 'react';
import * as S from './AdminKeywordMonitoring.styles';

const mockData = Array.from({ length: 20 }, (_, i) => ({
    rank: i + 1,
    keyword: `검색어${i + 1}`,
    count: Math.floor(Math.random() * 1000) + 1,
    status: i % 4 === 0 ? '차단됨' : '노출',
    enteredAt: '2025-08-06 14:00',
    lastCollected: '2025-08-06 14:30',
}));


const AdminKeywordMonitoring = () => {
    const [data, setData] = useState(mockData);

    const handleBlock = (keyword: string) => {
        alert(`${keyword} 차단 처리`);
        // TODO: 차단 처리 API 연결
    };

    const handleBan = (keyword: string) => {
        alert(`${keyword} 금지어 등록`);
        // TODO: 금지어 등록 API 연결
    };

    return (
        <S.Container>
            <S.Title>실시간 검색어 관리</S.Title>
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
                    {data.map(item => (
                        <tr key={item.rank}>
                            <td>{item.rank}</td>
                            <td>{item.keyword}</td>
                            <td>{item.count}</td>
                            <td>{item.status}</td>
                            <td>{item.enteredAt}</td>
                            <td>{item.lastCollected}</td>
                            <td>
                                <S.ActionButton onClick={() => handleBlock(item.keyword)}>
                                    차단
                                </S.ActionButton>
                                <S.ActionButton onClick={() => handleBan(item.keyword)}>
                                    금지어 등록
                                </S.ActionButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </S.KeywordTable>
        </S.Container>
    );
};

export default AdminKeywordMonitoring;
