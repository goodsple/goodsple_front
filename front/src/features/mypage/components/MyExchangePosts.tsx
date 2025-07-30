import React, { useState } from 'react';
import * as S from './MyExchangePosts.styles';

const MyExchangePosts = () => {
    const [activeTab, setActiveTab] = useState<'myPosts' | 'history'>('myPosts');

    const dummyData = [
        {
            id: 1,
            imageUrl: '/sample.png',
            title: '포토카드 A',
            status: '거래중',
            method: '직거래',
            likedCount: 12,
            updatedAt: '2025.07.30',
        },
        // ... 더미 데이터
    ];

    return (
        <S.Container>
            <S.TabWrapper>
                <S.Tab $active={activeTab === 'myPosts'} onClick={() => setActiveTab('myPosts')}>
                    내 거래글
                </S.Tab>
                <S.Tab $active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
                    거래내역
                </S.Tab>
            </S.TabWrapper>

            <S.Table>
                <thead>
                    <tr>
                        <th>사진</th>
                        <th>상품명</th>
                        <th>거래상태</th>
                        <th>거래방식</th>
                        <th>즐겨찾기</th>
                        <th>최근 수정일</th>
                        {activeTab === 'myPosts' && <th>관리</th>}
                    </tr>
                </thead>
                <tbody>
                    {dummyData.map(item => (
                        <tr key={item.id}>
                            <td><S.Thumbnail src={item.imageUrl} alt="상품 이미지" /></td>
                            <td>{item.title}</td>
                            <td>{item.status}</td>
                            <td>{item.method}</td>
                            <td>{item.likedCount}</td>
                            <td>{item.updatedAt}</td>
                            {activeTab === 'myPosts' && (
                                <td>
                                    <S.ManageButton>수정</S.ManageButton>
                                    <S.ManageButton>삭제</S.ManageButton>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </S.Table>
        </S.Container>
    );
};

export default MyExchangePosts;
