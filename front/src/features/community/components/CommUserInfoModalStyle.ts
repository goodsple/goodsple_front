import styled from "styled-components";

export const Overlay = styled.div`
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

export const Modal = styled.div`
        background: white;
        padding: 20px 30px;
        border-radius: 15px;
        width: 350px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        position: relative;
        text-align: center;
`;

export const TopBar = styled.div`
        display: flex;
        justify-content: flex-end;
`;

export const Report = styled.div`
        font-size: 16px;
        color: #997beb;
        display: flex;
        justify-content: center;
        cursor: pointer;

        img {
            width: 20px;
            margin-right: 5px; 
        }
`;

export const CenterBar = styled.div`
        display: flex;
        padding: 20px 0;
        align-items: center;
`;

export const ProfileImage = styled.div`
        width: 120px;
        height: 120px;
        border-radius: 60px;
        background: #444;
`;

export const Info = styled.div`
        text-align: left;
        margin-left: 23px;
`;

export const UserName = styled.div`
        font-size: 24px;
        font-weight: 600;
`;

export const BadgeInfo = styled.div`
        font-size: 16px;
        font-weight: 500;
        margin: 30px 0;
        display: flex;
        align-items: center;
`;

export const BadgeImage = styled.div`
        width: 30px;
        height: 30px;
        margin-left: 10px;
        border-radius: 50px;
        background: #444;
`;

export const BtnGroup = styled.div`
        display: flex;
        gap: 20px;
        align-items: center;
`;

export const CancelBtn = styled.div`
        width: 55%;
        line-height: 42px;
        color: #997BEB;
        background: #ffffff;
        font-size: 16px;
        font-weight: 500;
        border: 1px solid #997BEB;
        border-radius: 10px;
        cursor: pointer;
`;

export const ChatBtn = styled.div`
        width: 55%;
        line-height: 42px;
        color: #ffffff;
        background: #997BEB;
        font-size: 16px;
        font-weight: 500;
        border: none;
        border-radius: 10px;
        cursor: pointer;
`;
