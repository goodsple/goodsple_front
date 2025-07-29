// 북마크를 어느 폴더에 추가/이동할것인지? 모달창 => 스타일

import styled from "styled-components";

export const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

export const ModalBox = styled.div`
    width: 300px;
    padding: 10px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.h2`
    font-size: 20px;
    margin: 15px 12px;
`;

export const FolderList = styled.ul`
    list-style: none;
    padding: 5px;
    margin: 0;
    max-height: 200px;
    overflow-y: auto;
`;

export const FolderItem = styled.li`
    width: 255px;
    padding: 15px 8px;
    cursor: pointer;
    color: #444444;
    border-bottom: 1px solid #A3A3A3;
    border-radius: 5px 5px 0 0;
    font-size: 16px;


    &:hover {
        background-color: #adadadff;
    }
`;

export const CloseButton = styled.button`
    margin-top: 15px;
    width: 100%;
    padding: 10px;
    color: #444444;
    background-color: #ccc;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;

    &:hover {
        background-color: #adadadff;
    }
`;
