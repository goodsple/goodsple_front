import * as rs from "./MyReviewStyle";

import starFull from "../../../assets/images/star_full.png";
import starEmpty from "../../../assets/images/star_empty.png";
import deleteImg from "../../../assets/images/Delete.png";

import { useState } from "react";
import type { ReviewType } from "../types/review";
import ConfirmModal from "../../../components/common/modal/ConfirmModal";

const MyReviewCard: React.FC<{ review: ReviewType }> = ({ review }) => {

    const [isEdit, setIsEdit] = useState(false); // 수정여부
    const [rating, setRating] = useState(review.rating); // 리뷰 별점
    const [content,setContent] = useState(review.content); // 리뷰 내용
    const [images, setImages] = useState<string[]>(review.images); // 리뷰 사진

    const [isConfirmOpen, setIsConfirmOpen] = useState(false); // 모달 오픈 여부
    const [confirmType, setConfirmType] = useState<"edit"|"delete"|null>(null);

    // 이미지 삭제
    const handleImageRemove = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
      };
    
    // 이미지 추가
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const newFiles = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
        );
        setImages([...images, ...newFiles].slice(0, 5));
    }
    };

    // 저장 시 모달 
    const handleSaveClick = () => {
      setConfirmType("edit");
      setIsConfirmOpen(true)
    }

    // 삭제 시 모달
    const handleDeleteClick = () => {
      setConfirmType("delete");
      setIsConfirmOpen(true);
    };

    // 모달에서 확인 클릭 시
    const handleConfirm = () => {
      if (confirmType === "edit") {
        setIsEdit(false);
        // 저장 로직
      }
      if (confirmType === "delete") {
        // 삭제 로직
      }
      setIsConfirmOpen(false);
      setConfirmType(null);
    };
    
    // 모달 취소 시
    const handleCancel = () => {
      setIsConfirmOpen(false);
      setConfirmType(null);
    };

    return(
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
            {isEdit ? 
                Array.from({ length: 5 }).map((_, i) =>(
                // 수정 클릭 시 별 5개 보여준 뒤 별점 변경
                <img
                key={i}
                src={i < rating ? starFull : starEmpty}
                alt={i < rating ? "채워진 별" : "빈 별"}
                onClick={() => setRating(i + 1)}
                />
            )) : Array.from({ length: rating }).map((_, i) => (
                // 등록했던 별점 보여주기
                <img
                  key={i}
                  src={starFull}
                  alt="채워진 별"
                />
              ))}
          </rs.StarRating>
  
          {isEdit ? (
            <rs.ReviewTextarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={300}
            />
          ) : (
            <rs.ReviewText>{review.content}</rs.ReviewText>
          )}
  
          <rs.ReviewImages>
            {images.map((img, index) => (
              <rs.ImagePreview key={index}>
                <img
                  src={typeof img === "string" ? img : URL.createObjectURL(img)}
                  alt="후기 이미지"
                />
                {isEdit && (
                  <>
                    <div className="overlay">
                      <button onClick={() => handleImageRemove(index)}>
                       <img src={deleteImg} alt="삭제" />
                      </button>
                    </div>
                  </>
                )}
              </rs.ImagePreview>
            ))}
            {isEdit && images.length < 5 && (
              <rs.UploadLabel>
                +
                <span>{images.length}/5</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </rs.UploadLabel>
            )}
          </rs.ReviewImages>
        </rs.ReviewContentWrap>
  
        <rs.ButtonWrap>
          {isEdit ? (
            <>
              <rs.EditButton onClick={handleSaveClick}>저장</rs.EditButton>
              <rs.DeleteButton onClick={() => setIsEdit(false)}>취소</rs.DeleteButton>
            </>
          ) : (
            <>
              <rs.EditButton onClick={() => setIsEdit(true)}>수정</rs.EditButton>
              <rs.DeleteButton onClick={handleDeleteClick}>삭제</rs.DeleteButton>
            </>
          )}
         {isConfirmOpen && (
          <ConfirmModal
            isOpen={isConfirmOpen}
            content={confirmType === "edit" ? "후기를 수정하시겠습니까?" : "후기를 삭제하시겠습니까?"}
            showCancel={true}
            confirmText={confirmType === "edit" ? "확인" : "삭제"}
            cancelText="취소"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
        </rs.ButtonWrap>
      </rs.ReviewCard>
    );
};
export default MyReviewCard;