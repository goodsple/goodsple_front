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
        // height: 100vh;
        padding-top : 80px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-items: center;
        // align-items: start; 
        // gap: 50px;                              
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
        max-width: 185px;
        margin-top: 40px;
        margin-left: 50px;
        text-align: center;
       
        img {
                width: 185px;
                height: 185px;
                object-fit: contain;
        }

        p {
                font-size: 16px;
                font-weight: 600;
                margin: 0 auto;
        }
`;


export const FolderCardHeader = styled.div`
        margin-top: -5px;
        display: flex;
        align-items: center;
        position: relative;
`;

export const DropdownToggle = styled.button`
        background: transparent;
        border: none;
        cursor: pointer;
        font-size: 18px;
        font-weight: 500;
        color: #444444;
`;

export const DropdownMenu = styled.div`
        position: absolute;
        top: 25px;
        right: 0;
        width: 120px;
        background: white;
        border: 1px solid #ccc;
        border-radius: 10px 0 10px 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 100;
`;

export const MenuItem = styled.div`
        padding: 10px 12px;
        font-size: 14px;
        font-weight: 500;
        color: #444444;
        cursor: pointer;


        &:hover {
                background-color: #d2d2d2ff;
                border-radius: 10px 0 0 0;
        }
`;

export const DeleteItem = styled(MenuItem)`
        color: red;

        &:hover {
                background-color: #d2d2d2ff;
                border-radius: 0 0 10px 10px;
        }
`;

export const StyledHr = styled.hr`
        border: 1px solid #bdbdbdff;
        margin: 0;
`;




// 북마크 추가 ? 폴더 이동할 때 사용할 모달창
export const AddBookmark = styled.button`s
        width: 100px;
        height: 100px;
`;
