import * as rs from './MyReviewStyle'
import starFull from "../../../assets/images/star_full.png";
import starEmpty from "../../../assets/images/star_empty.png";

import type { ReviewType } from "../types/review";
import { useState } from 'react';
import ReportModal from '../../../components/common/modal/ReportModal';
import ConfirmModal from '../../../components/common/modal/ConfirmModal';


const ReceivedReviewCard:React.FC<{ review: ReviewType }> = ({ review }) => {
    
const [isReportModalOpen, setIsReportModalOpen] = useState(false); // 신고 모달 상태
const [isReportCompleteModalOpen, setIsReportCompleteModalOpen] = useState(false); // 신고하기 버튼 클릭시 확인 모달 오픈 여부

  // 신고 버튼 클릭 시
  const handleReportClick = () => {
    setIsReportModalOpen(true)
  }

  // 신고모달 신고하기 클릭 
  const handleReportConfirm = (selectedReasons: string[], detailText: string) => {
    console.log(selectedReasons,detailText);
    setIsReportModalOpen(false)
    setIsReportCompleteModalOpen(true);
  }

  // 신고모달 취소 클릭
  const handleReportCancel = () => {
    setIsReportModalOpen(false)
  }

  // 신고하기 버튼 클릭시 공통 확인 모달 
  const handleReportCompleteConfirm = () => {
    setIsReportCompleteModalOpen(false);
  };

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
            {/* 신고모달 오픈 */}
            {isReportModalOpen && (
              <ReportModal 
               onConfirm={handleReportConfirm}
               onCancel={handleReportCancel}/>
            )}

            {/* 신고하기 활성화 버튼 클릭 시 확인 모달 오픈 */}
            {isReportCompleteModalOpen && (
              <ConfirmModal
                isOpen={isReportCompleteModalOpen}
                content="신고가 접수되었습니다."
                showCancel={false}
                confirmText="확인"
                onConfirm={handleReportCompleteConfirm}
              />
            )}
          </rs.ButtonWrap>
        </rs.ReviewCard>
    );
};
export default ReceivedReviewCard;