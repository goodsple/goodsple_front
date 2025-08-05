// AddProhibitedWordsModalStyle.ts
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
        width: 400px;
        background: white;
        border-radius: 15px;
        padding: 30px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        text-align: center;
`;

export const Title = styled.h2`
        margin-bottom: 20px;
        font-size: 24px;
`;

export const InputLabel = styled.label`
        display: block;
        text-align: left;
        margin-bottom: 8px;
        font-size: 16px;
`;

export const InputField = styled.input`
        width: 95%;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 8px;
        margin-bottom: 20px;
`;

export const ButtonGroup = styled.div`
        display: flex;
        justify-content: flex-end; 
        gap: 10px;
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
