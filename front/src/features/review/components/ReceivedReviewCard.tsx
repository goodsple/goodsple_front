import * as rs from './MyReviewStyle'
import starFull from "../../../assets/images/star_full.png";
import starEmpty from "../../../assets/images/star_empty.png";

import type { ReviewType } from "../types/review";
import { useState } from 'react';
import ReportModal from '../../../components/common/modal/ReportModal';


const ReceivedReviewCard:React.FC<{ review: ReviewType }> = ({ review }) => {
    
  const [isReportModalOpen, setIsReportModalOpen] = useState(false); // 신고 모달 상태

  // 신고 클릭 시
  const handleReportClick = () => {
    setIsReportModalOpen(true)
  }

    return (
        <rs.ReviewCard>
          <rs.ThumbnailWrap>
            <img src={review.thumbnail} alt="썸네일" />
          </rs.ThumbnailWrap>
          <rs.ReviewContentWrap>
            <rs.PostInfo>
              <p>{review.postTitle}</p>
              <span>{review.date}</span>
            </rs.PostInfo>
    
            <rs.StarRating>
              {Array.from({ length: review.rating }).map((_, i) => (
                <img
                  key={i}
                  src={i < review.rating ? starFull : starEmpty}
                  alt="별"
                />
              ))}
            </rs.StarRating>
    
            <rs.ReviewText>{review.content}</rs.ReviewText>
    
            <rs.ReviewImages>
              {review.images.map((img, index) => (
                <img key={index} src={img} alt="후기 이미지" />
              ))}
            </rs.ReviewImages>
          </rs.ReviewContentWrap>
    
          <rs.ButtonWrap>
            <rs.DeleteButton onClick={handleReportClick}>신고</rs.DeleteButton>
            {isReportModalOpen && (
              <ReportModal/>
            )}
          </rs.ButtonWrap>
        </rs.ReviewCard>
    );
};
export default ReceivedReviewCard;