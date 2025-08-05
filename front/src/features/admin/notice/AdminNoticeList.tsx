import React, { useState } from 'react';
import * as S from './AdminNoticeList.styles';

const mockData = [
    {
        id: 1,
        title: '서비스 점검 안내',
        date: '2025-08-06 (08.07)',
        attachments: 2,
        author: 'admin1',
        isPopup: true,
        popupPeriod: '2025.08.06 ~ 2025.08.10',
    },
    {
        id: 2,
        title: '신규 기능 추가',
        date: '2025-07-30 (08.01)',
        attachments: 0,
        author: 'admin2',
        isPopup: false,
        popupPeriod: '-',
    },
];

const AdminNoticeList = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        // TODO: 검색 기능 구현
        console.log('검색어:', searchTerm);
    };

    return (
        <S.Container>
            <S.TopBar>
                <S.RegisterButton>공지 등록</S.RegisterButton>
                <S.SearchWrapper>
                    <S.SearchInput
                        type="text"
                        placeholder="공지 제목 검색"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <S.SearchButton onClick={handleSearch}>검색</S.SearchButton>
                </S.SearchWrapper>
            </S.TopBar>

            <S.Table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>등록일(수정일)</th>
                        <th>첨부파일 수</th>
                        <th>등록자</th>
                        <th>팝업여부</th>
                        <th>팝업기간</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {mockData.map((item, idx) => (
                        <tr key={item.id}>
                            <td>{idx + 1}</td>
                            <td>{item.title}</td>
                            <td>{item.date}</td>
                            <td>{item.attachments}</td>
                            <td>{item.author}</td>
                            <td>{item.isPopup ? 'Y' : 'N'}</td>
                            <td>{item.popupPeriod}</td>
                            <td>
                                <S.ActionButton>수정</S.ActionButton>
                                <S.ActionButton>삭제</S.ActionButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </S.Table>
        </S.Container>
    );
};

export default AdminNoticeList;
