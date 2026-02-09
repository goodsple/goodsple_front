import * as rs from "./MyReviewStyle";

import starFull from "../../../assets/images/star_full.png";
import starEmpty from "../../../assets/images/star_empty.png";
import deleteImg from "../../../assets/images/Delete.png";
import placeholderImg from "../../../assets/images/placeholder.png";

import { useState } from "react";
import type { ReviewType } from "../types/review";
import ConfirmModal from "../../../components/common/modal/ConfirmModal";
import { deleteReview, updateReview, uploadReviewImages } from "../api/reviewApi";

type ImageItem = string | File;

const MyReviewCard: React.FC<{ review: ReviewType; onChanged?: () => void }> = ({ review, onChanged }) => {

    const [isEdit, setIsEdit] = useState(false); // 수정여부
    const [rating, setRating] = useState(review.rating); // 리뷰 별점
    const [content,setContent] = useState(review.content); // 리뷰 내용
    const [images, setImages] = useState<ImageItem[]>(review.images); // 리뷰 사진

    const [isConfirmOpen, setIsConfirmOpen] = useState(false); // 모달 오픈 여부
    const [confirmType, setConfirmType] = useState<"edit"|"delete"|null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 이미지 삭제
    const handleImageRemove = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
      };
    
    // 이미지 추가
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const newFiles = Array.from(e.target.files);
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
    const handleConfirm = async () => {
      if (!confirmType || isSubmitting) return;
      setIsSubmitting(true);

      try {
        if (confirmType === "edit") {
          const existingUrls = images.filter((img): img is string => typeof img === "string");
          const newFiles = images.filter((img): img is File => img instanceof File);
          const uploadedUrls = await uploadReviewImages(newFiles);
          const imageUrls = [...existingUrls, ...uploadedUrls].slice(0, 5);

          await updateReview(review.id, {
            rating,
            content,
            imageUrls,
          });

          setImages(imageUrls);
          setIsEdit(false);
          onChanged?.();
        }
        if (confirmType === "delete") {
          await deleteReview(review.id);
          onChanged?.();
        }
      } catch (e) {
        console.error("리뷰 처리 실패", e);
        alert("처리에 실패했습니다. 다시 시도해주세요.");
      } finally {
        setIsConfirmOpen(false);
        setConfirmType(null);
        setIsSubmitting(false);
      }
    };
    
    // 모달 취소 시
    const handleCancel = () => {
      setIsConfirmOpen(false);
      setConfirmType(null);
    };

    return(
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
