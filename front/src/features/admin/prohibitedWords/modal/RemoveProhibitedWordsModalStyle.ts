// RemoveProhibitedWordsModalStyle.ts
import styled from 'styled-components';

export const ModalOverlay = styled.div`
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
`;

export const ModalBox = styled.div`
        width: 350px;
        background: white;
        border-radius: 15px;
        padding: 30px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        text-align: center;
`;

export const Title = styled.h2`
        margin-bottom: 25px;
        font-size: 24px;
`;

export const Message = styled.p`
        font-size: 16px;
        margin-bottom: 25px;
`;

export const ButtonGroup = styled.div`
        display: flex;
        gap: 15px;
        justify-content: center;
`;

export const CancelButton = styled.button`
        width: 80px;
        padding: 10px;
        font-size: 16px;
        background-color: #8D8D8D;
        color: white;
        border: none;
        border-radius: 10px;
        cursor: pointer;
`;

export const ConfirmButton = styled.button`
        width: 80px;
        padding: 10px;
        font-size: 16px;
        background-color: #997BEB;
        color: white;
        border: none;
        border-radius: 10px;
        cursor: pointer;
`;
