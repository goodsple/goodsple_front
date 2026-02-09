import * as rs from './MyReviewStyle'
import starFull from "../../../assets/images/star_full.png";
import starEmpty from "../../../assets/images/star_empty.png";
import placeholderImg from "../../../assets/images/placeholder.png";

import type { ReviewType } from "../types/review";
import { useReport } from '../../report/ReportContext';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';


const ReceivedReviewCard:React.FC<{ review: ReviewType }> = ({ review }) => {
  const { openReport } = useReport();
  const [reported, setReported] = useState(false);

  useEffect(() => {
    const fetchReported = async () => {
      try {
        const res = await axiosInstance.get(`/reports/check?targetType=review&targetId=${review.id}`);
        setReported(Boolean(res.data?.reported));
      } catch (e) {
        // 로그인 전/에러 시에는 기본 false 유지
      }
    };
    fetchReported();
  }, [review.id]);

  const handleReportClick = () => {
    openReport({
      targetType: 'REVIEW',
      targetId: review.id,
      reportTargetUserId: review.writerId ?? null,
      onSuccess: () => setReported(true),
    });
  };

    return (
        <rs.ReviewCard>
          <rs.ThumbnailWrap>
            <img src={review.thumbnail || placeholderImg} alt="썸네일" />
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
            <rs.DeleteButton
              onClick={handleReportClick}
              disabled={reported}
              style={reported ? { background: '#eee', color: '#777', cursor: 'default' } : undefined}
            >
              {reported ? '신고됨' : '신고'}
            </rs.DeleteButton>
          </rs.ButtonWrap>
        </rs.ReviewCard>
    );
};
export default ReceivedReviewCard;
