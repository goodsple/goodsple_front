import React, { useState } from 'react';
import * as S from './MyExchangeHistory.styles';
import sampleImage from '../../../assets/images/sample1.png';

const MyExchangeHistory = () => {
    const [data] = useState([
        {
            id: 1,
            imageUrl: sampleImage,
            title: '포켓몬 스티커',
            nickname: '포켓몬러버',
            tradeMethod: '직거래',
            tradedAt: '2025.08.01',
            isReviewWritten: true,
        },
        {
            id: 2,
            imageUrl: sampleImage,
            title: '아이유 포카',
            nickname: '굿즈수집가',
            tradeMethod: '택배',
            tradedAt: '2025.07.25',
            isReviewWritten: false,
        },
    ]);

    return (
        <S.Container>
            <S.Table>
                <thead>
                    <tr>
                        <th>사진</th>
                        <th>상품명</th>
                        <th>거래상대</th>
                        <th>거래방식</th>
                        <th>거래일자</th>
                        <th>후기</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td><S.Thumbnail src={item.imageUrl} alt="상품 이미지" /></td>
                            <td>{item.title}</td>
                            <td>{item.nickname}</td>
                            <td>{item.tradeMethod}</td>
                            <td>{item.tradedAt}</td>
                            <td>
                                <S.ManageButton $written={item.isReviewWritten}>
                                    {item.isReviewWritten ? '내 후기 보러가기' : '후기 작성하기'}
                                </S.ManageButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </S.Table>
        </S.Container>
    );
};

export default MyExchangeHistory;
