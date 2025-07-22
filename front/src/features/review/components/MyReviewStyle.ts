import styled from "styled-components";
import * as wr from './WriteReviewStyle'

export const MyReviewContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px 60px;
    box-sizing: border-box;
`;
export const MyReviewTitle = styled.h2`
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 30px;
    text-align: center;
`;
export const ReviewTabMenu = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #997BEB;
`;
export const WrittenButton = styled.button<{ $active?: boolean }>`
  flex: 1;
  max-width: 200px;
  padding: 14px;
  border: 1px solid #997beb;
  border-bottom:none;
  background: ${({ $active }) => ($active ? "#997beb" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#444")};
  border-radius: 5px 5px 0 0;
  cursor: pointer;
`;

export const ReceivedButton = styled(WrittenButton)`
`;
export const ReviewList =  styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;
export const ReviewCard = styled.div`
    display: flex;
    padding: 24px;
    border-bottom: 1px solid #997beb;
    gap: 24px;
    align-items: flex-start;

`;
export const ThumbnailWrap = styled.div`
    width: 160px;
    height: 160px;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    background-color: #D9D9D9;

    img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    }
`;
export const ReviewContentWrap = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;
export const PostInfo = styled.div`
    display: flex;
    align-items: center;
    p {
    font-weight: bold;
    margin: 0;
    }
    span {
    font-size: 12px;
    color: #9A9A9A;
    margin-left: 15px;
    }
`;
export const StarRating = styled(wr.StarRating)`
    display: flex;
    gap: 4px;

    img {
        width: 20px;
        height: 20px;
        object-fit: contain;
    }
`;
export const ReviewTextarea = styled.textarea`
    width: 100%;
    min-height: 80px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #9a9a9a;
    border-radius: 5px;
    resize: vertical;
    box-sizing: border-box;
`;

export const ReviewText = styled.p`
    font-size: 16px;
    color: #444;
    line-height: 1.4;
`;
export const ReviewImages = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    
    img {
        width: 145px;
        height: 145px;
        border-radius: 10px;
        object-fit: cover;
        border: 1px solid #d9d9d9;
        background-color: #D9D9D9;
    }
    button {
        position: absolute;
        top: 8px;
        right: 8px;
        border: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        font-size: 12px;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
}
`;
export const ImagePreview = styled(wr.ImagePreview)`
    width: 145px;
    height: 145px;
    background-color: #D9D9D9;

    img {
    width: 100%;
    height: 100%;
    }

`;
export const UploadLabel = styled(wr.UploadLabel)`
    width: 145px;
    height: 145px;

    img {
    width: 100%;
    height: 100%;
    }
`;
export const ButtonWrap = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    flex-shrink: 0;
`;

export const EditButton = styled.button`
    padding: 8px 14px;
    background: #fff;
    color: #444;
    border: 1px solid #9A9A9A;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background: #997BEB;
        color: #fff;
      }
`;

export const DeleteButton = styled.button`
    padding: 8px 14px;
    background: #fff;
    color: #444;
    border: 1px solid #9A9A9A;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background: #444;
        color:#fff;
      }
`;

export const EmptyMessage = styled.p`
    font-size:16px;
    color:#444;
    text-align:center;
`;