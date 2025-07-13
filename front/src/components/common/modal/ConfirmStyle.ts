import styled from "styled-components";

export const ModalBg = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;
export const ModalWrap = styled.div`
    background: #fff;
    padding: 32px 24px;
    border-radius: 15px;
    width: 360px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;
export const ModalTitle = styled.h3`
    font-size: 24px;
    font-weight: 500;
    color: #444;
`;
export const ModalContent = styled.p`
    font-size: 16px;
    margin-bottom: 35px;
    color: #444;
`;
export const ButtonRow = styled.div`
    display: flex;
    gap: 42px;
    justify-content: center;
`;
export const ConfirmButton = styled.button`
    width: 122px;
    padding: 12px 0;
    border-radius: 15px;
    background: #444;
    color: #fff;
    font-weight: 400;
    font-size: 16px;
    cursor: pointer;
`;
export const CancelButton = styled.button`
    width: 122px;
    padding: 12px 0;
    border-radius: 15px;
    background: #fff;
    border: 1px solid #9A9A9A;
    color: #444;
    font-weight: 400;
    font-size: 16px;
    cursor: pointer;
`;