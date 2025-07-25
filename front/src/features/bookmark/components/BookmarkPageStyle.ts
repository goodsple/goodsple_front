import styled from "styled-components";

export const BookmarkPageContainer = styled.div`
        width: 100vw;
        min-height: 100vh;
        padding-top : 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #444444;
`;

export const BookmarkPageSection = styled.div`
        width: 67vw;
        // background: #f5cacaff;
`;

export const FolderCreationBox = styled.button`
        width: 190px;
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