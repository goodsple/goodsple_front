import styled from "styled-components";

export const ChatbotBody = styled.div`
        width: 95%;
        padding: 35px 0 ;
        margin: 40px auto;
        border-radius: 15px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
`;

export const ChatBotProfile = styled.img`
        width: 60px;
        border: 1px solid #a1a1a1ff;
        border-radius: 30px;
`;

export const Card = styled.div`
        margin-left: 20px;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
`;

export const ChatbotMessage = styled.div`
        width: 85%;
        line-height: 40px;
        font-size: 18px;
`;

export const MessageWrapper = styled.div`
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
`;

export const ChatbotBtn = styled.div`
        width: 95%;
        height: 65px;
        margin: auto;
        margin-top: 40px;
        color: white;
        background: #997beb;
        border-radius: 15px;
        font-size: 20px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;

        &:hover {
            background: #7A56DA;
        }
`;

export const SendIcon = styled.img`
        width: 33px;
        border: none;
`;
