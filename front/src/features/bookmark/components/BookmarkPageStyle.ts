import styled from "styled-components";

export const BookmarkPageContainer = styled.div`
        width: 100vw;
        min-height: 100vh;
        color: #444444;
        align-items: center;
        display: flex;
        flex-direction: column;
`;

export const BookmarkPageSection = styled.div`
        width: 76vw;
        hegight: 100vh;
        padding-top : 80px;
        display: grid;
        align-items: center;
        justify-items: center; 
        gap: 50px;                              
        grid-auto-rows: 250px;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));  
        
        // 위치 확인 위한 배경색
        background: #f5cacaff;
`;

export const FolderCreationBox = styled.button`
        width: 200px;
        height: 240px;
        font-size: 90px;
        font-family: sans-serif;
        font-weight: 300;
        border: 2.5px dashed #616161ff;
        border-radius: 10px;
        background: #ffffff;
        color: #444444;

        &:hover {
            background: #e5e5e5ff;
        }
`;

export const FolderCard = styled.div`
        width: 100%;
        max-width: 180px;
        margin-top: 40px;
        text-align: center;
       
        img {
                width: 180px;
                height: 180px;
                object-fit: contain;
        }

        p {
                margin-top: -3px;
                font-size: 16px;
                font-weight: 500;
        }
`;



// 북마크 추가 ? 폴더 이동할 때 사용할 모달창
export const AddBookmark = styled.button`
        width: 100px;
        height: 100px;
`;


