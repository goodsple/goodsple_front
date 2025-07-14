import * as wr from './WriteReviewStyle';
import starEmpty from '../../../assets/images/star_empty.png';
import starFull from '../../../assets/images/star_full.png';
import deleteImg from '../../../assets/images/Delete.png';

import { useState } from 'react';
import ConfirmModal from '../../../components/common/modal/ConfirmModal';


type PostInfo = {
    thumbnailUrl: string;
    title: string;
    writerNickname: string;
}

const dummyPost: PostInfo = {
    thumbnailUrl: starFull,
    title: "엑소 백현 포카 교환",
    writerNickname: "백현와이프"
};

const WriteReview:React.FC<{ post: PostInfo }> = ({post = dummyPost}) => {

    const [rating, setRating] = useState(0);  // 별점
    const [content,setContent] = useState(""); // 후기내용
    const maxLength = 300; // 후기내용 글자 제한
    const [images, setImages] = useState<File[]>([]);  // 사진

    const [isConfirmOpen, setIsConfirmOpen] = useState(false); // 모달 오픈 여부

    const isSubmitEnabled = rating > 0 && content.trim() !== "" && images.length > 0;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            const newFiles = Array.from(e.target.files);
            if(images.length + newFiles.length <= 5){
                setImages([...images, ...newFiles]);
            }
        }
    }
    const handleImageRemove = (index:number) => {
        setImages(images.filter((_,i)=>i !== index));
    }

    // 등록 시 모달 열기
    const handleSubmit = () => {
        if(isSubmitEnabled) {
            setIsConfirmOpen(true);
        }
    }

    // 모달 확인 클릭 시
    const handleConfirm = () => {
        setIsConfirmOpen(false);
        
    };
    
    // 모달 취소 클릭 시
    const handleCancel = () => {
    setIsConfirmOpen(false);
    };
     
    return(
        <wr.ReviewContainer>
            <wr.ReviewTitle>후기 작성</wr.ReviewTitle>
            <wr.InfoWrap>
                <img src={post.thumbnailUrl} alt="게시글 썸네일" />
                <wr.InfoText>
                    <p>{post.title}</p>
                    <span>{post.writerNickname}님과 행복한 거래를 나눴어요 :)</span>
                </wr.InfoText>
            </wr.InfoWrap>
            <wr.RatingWrap>
                <wr.RatingTitle>신뢰도 점수 평가 ({post.writerNickname}님에 대해 점수를 매겨주세요 :) )</wr.RatingTitle>
                <wr.StarRating>
                    {Array.from({length:5}).map((_,i)=>(
                        <img 
                        key={i}
                        src={i < rating? starFull : starEmpty} 
                        alt={i < rating? "채워진 별" : "빈 별"}
                        onClick={()=>setRating(i+1)} />
                    ))}
                </wr.StarRating>
            </wr.RatingWrap>
            <wr.ReviewTextarea 
                placeholder="거래 후기를 작성해주세요."
                maxLength={maxLength}
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
              <wr.TextCount>{content.length}/{maxLength}</wr.TextCount>

            <wr.ReviewPicUpload>
                <wr.UploadTitle>사진 첨부</wr.UploadTitle>
                <wr.ImageUploadBox>
                    {images.map((file,index)=>(
                        <wr.ImagePreview key={index}>
                            <img src={URL.createObjectURL(file)} alt="preview" />
                            <div className="overlay">
                                <button onClick={() => handleImageRemove(index)}>
                                    <img src={deleteImg} alt="삭제" />
                                </button>
                            </div>
                        </wr.ImagePreview>
                    ))}
                    {images.length < 5 && (
                    <>
                        <wr.UploadLabel htmlFor="reviewImgUpload">
                            +
                            <span>{images.length}/5</span>
                        </wr.UploadLabel>
                         <input
                         id="reviewImgUpload"
                         type="file"
                         accept="image/*"
                         multiple
                         onChange={handleImageChange}
                         style={{ display: "none" }}
                        />
                     </>
                    )}
                </wr.ImageUploadBox>
            </wr.ReviewPicUpload>
            <wr.SubmitButton 
                disabled={!isSubmitEnabled} 
                onClick={handleSubmit}>등록</wr.SubmitButton>
            {isConfirmOpen && (
                <ConfirmModal
                isOpen={isConfirmOpen}
                content="후기를 등록하시겠습니까?"
                showCancel={true}
                confirmText="등록"
                cancelText="취소"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
            )}
        </wr.ReviewContainer>
    )
}
export default WriteReview;