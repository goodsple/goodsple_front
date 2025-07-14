import Pagination from '../../../components/common/pagination/Pagination';
import * as rs from './MyReviewStyle'

import { useState } from 'react';
import MyReviewCard from './MyReviewCard';
import ReceivedReviewCard from './ReceivedReviewCard';

const MyReview:React.FC=()=>{

    const [activeTab, setActiveTab] = useState<'written' | 'received'>('written');

    const dummyReviews = [
        {
          id: 1,
          postTitle: '엑소 백현 포카 교환',
          date: '2025.07.14',
          rating: 4,
          content: '친절하고 빠른 거래 감사합니다!',
          images: ['이미지링크1', '이미지링크2','이미지링크2','이미지링크2','이미지링크2'],
          thumbnail: '썸네일링크'
        },
        // 다른 더미 데이터
    ];

    return(
        <rs.MyReviewContainer>
            <rs.MyReviewTitle>후기</rs.MyReviewTitle>
            <rs.ReviewTabMenu>
                <rs.WrittenButton 
                    $active={activeTab === 'written'} 
                    onClick={() => setActiveTab('written')}>
                    작성한 후기
                </rs.WrittenButton>
                <rs.ReceivedButton
                    $active={activeTab === 'received'} 
                    onClick={() => setActiveTab('received')}>
                    받은 후기
                </rs.ReceivedButton>
            </rs.ReviewTabMenu>
                <rs.ReviewList>
                    {dummyReviews.map((review) => (
                        activeTab === 'written' ? (
                       <MyReviewCard key={review.id} review={review} />
                        ):(
                            <ReceivedReviewCard key={review.id} review={review}/>
                        )
                ))}
                <Pagination currentPage={1} totalPages={2} onPageChange={function (page: number): void {;
                } }/>
                </rs.ReviewList>
        </rs.MyReviewContainer>
    )
}
export default MyReview;