import styled from "styled-components";

export const ReviewContainer = styled.div`
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 20px 60px;
    box-sizing: border-box;
`;
export const ReviewTitle = styled.h2`
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
    text-align: center;
`;
export const InfoWrap = styled.div`
    display: flex;
    gap: 22px;
    margin-bottom: 40px;
    margin-top: 40px;

    img {
        width: 160px;
        height: 160px;
        object-fit: cover;
        border-radius: 15px;
        border: 1px solid #d9d9d9;
    }
`; 
export const InfoText = styled.div`
    font-size: 16px;
    font-weight:bold;
    color: #444;

    span {
        font-size: 16px;
        font-weight:normal;
    }
`;
export const RatingWrap = styled.div`
    margin-bottom: 30px;
`;
export const RatingTitle = styled.p`
    font-size: 16px;
    margin-bottom: 10px;
`;
export const StarRating = styled.div`
    display: flex;
    gap: 8px;

    img {
        width: 32px;
        height: 32px;
        cursor: pointer;
    }
`;
export const ReviewTextarea = styled.textarea`
    width: 100%;
    height: 120px;
    border: 1px solid #997beb;
    padding: 12px;
    border-radius: 8px;
    resize: none;
    margin-bottom: 16px;
    font-size: 14px;
    box-sizing: border-box;
`;
export const TextCount = styled.p`
    font-size: 12px;
    color: #999;
    text-align: right;
    margin-top: -8px;
    margin-bottom: 16px;
`;

export const ReviewPicUpload = styled.div`
    margin-bottom: 20px;
`;
export const UploadTitle = styled.p`
    font-size: 14px;
    margin-bottom: 8px;
`;
export const ImageUploadBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
`;
export const ImagePreview = styled.div`
    position: relative;
    width: 160px;
    height: 160px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #d9d9d9;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
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
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.2s ease;
    }
    
    &:hover .overlay {
    opacity: 1;
    }
    
`;
export const UploadLabel = styled.label`
    width: 160px;
    height: 160px;
    border: 1px dashed #997beb;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 8px;
    font-size: 24px;
    color: #997beb;
    flex-direction: column;

    span {
        margin-top: 4px;
        font-size: 12px;
        color: #997beb;
    }

`;
export const SubmitButton = styled.button<{ disabled?: boolean }>`
    width: 100%;
    padding: 16px;
    background: ${({ disabled }) => (disabled ? "#D9D9D9" : "#997beb")};
    color: white;
    border: none;
    border-radius: 8px;
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
    font-size: 16px;
    margin-top: 30px;
    margin-bottom : 40px;
`;