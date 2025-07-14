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
                {activeTab === 'written' ? (
                    dummyReviews.length > 0 ? (
                        <>
                        {dummyReviews.map((review) => (
                            <MyReviewCard key={review.id} review={review} />
                        ))}
                        <Pagination currentPage={1} totalPages={2} onPageChange={() => {}} />
                        </>
                    ) : (
                        <rs.EmptyMessage>
                            아직 작성한 후기가 없어요!<br/>
                            굿즈 거래 후 소중한 후기를 남겨보세요.
                        </rs.EmptyMessage>
                    )
                ) : (
                    dummyReviews.length > 0 ? (
                        <>
                        {dummyReviews.map((review) => (
                            <ReceivedReviewCard key={review.id} review={review} />
                        ))}
                        <Pagination currentPage={1} totalPages={2} onPageChange={() => {}} />
                        </>    
                    ) : (
                    <rs.EmptyMessage>
                        아직 받은 후기가 없어요!<br/>
                        굿즈 거래를 하면 상대방이 후기를 남길 수 있어요.
                    </rs.EmptyMessage>
                    )
                )}
                </rs.ReviewList>
        </rs.MyReviewContainer>
    )
}
export default MyReview;