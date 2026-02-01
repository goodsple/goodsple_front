import Pagination from '../../../components/common/pagination/Pagination';
import * as rs from './MyReviewStyle'

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MyReviewCard from './MyReviewCard';
import ReceivedReviewCard from './ReceivedReviewCard';
import { getReceivedReviews, getWrittenReviews } from '../api/reviewApi';
import type { ReviewType } from '../types/review';

const MyReview:React.FC=()=>{

    const location = useLocation();
    const [activeTab, setActiveTab] = useState<'written' | 'received'>('written');
    const [writtenReviews, setWrittenReviews] = useState<ReviewType[]>([]);
    const [receivedReviews, setReceivedReviews] = useState<ReviewType[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const [written, received] = await Promise.all([
                getWrittenReviews(),
                getReceivedReviews(),
            ]);
            setWrittenReviews(written);
            setReceivedReviews(received);
        } catch (e) {
            console.error('후기 조회 실패', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    useEffect(() => {
        const tab = (location.state as { tab?: 'written' | 'received' } | null)?.tab;
        if (tab === 'written' || tab === 'received') {
            setActiveTab(tab);
        }
    }, [location.state]);

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
                    writtenReviews.length > 0 ? (
                        <>
                        {writtenReviews.map((review) => (
                            <MyReviewCard key={review.id} review={review} onChanged={fetchReviews} />
                        ))}
                        {!loading && (
                            <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
                        )}
                        </>
                    ) : (
                        <rs.EmptyMessage>
                            아직 작성한 후기가 없어요!<br/>
                            굿즈 거래 후 소중한 후기를 남겨보세요.
                        </rs.EmptyMessage>
                    )
                ) : (
                    receivedReviews.length > 0 ? (
                        <>
                        {receivedReviews.map((review) => (
                            <ReceivedReviewCard key={review.id} review={review} />
                        ))}
                        {!loading && (
                            <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
                        )}
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
