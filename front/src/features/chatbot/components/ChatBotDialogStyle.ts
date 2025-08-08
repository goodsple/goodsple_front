import styled from "styled-components";


export const ChatbotBody = styled.div`
        padding: 20px;
        height: 500px;
        display: flex;
        flex-direction: column;
        gap: 10px;
`;

// 채팅 영역 (스크롤되는 곳)
export const ChatArea = styled.div`
        display: flex;
        flex-direction: column;
        gap: 10px;
`;

export const ChatBotProfile = styled.img`
        width: 60px;
        height: 60px;
        border: 1px solid #a1a1a1ff;
        border-radius: 30px;
`;

export const ChatBox = styled.div`
        margin-top: 15px;
        display: flex;
`;

export const ChatBotMessageBox = styled.div`
        padding: 15px;
        margin-left: 15px;
        font-size: 16px;
        border-radius: 15px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
`;

export const ChatBotMessage = styled.div`
        line-height: 35px;
        font-size: 18px;
`;

// 사용자 메시지
export const UserMessage = styled.div`
        max-width: 80%;
        background: #fff;
        color: #444;
        padding: 15px;
        margin: 5px 0;
        border-radius: 15px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
        font-size: 16px;
        line-height: 1.4;
`;

// FAQ/QNA 버튼 영역
export const SelectBtnWrapper = styled.div`
        display: flex;
        justify-content: flex-end;
        gap: 15px;
        margin-top: 10px;
`;

export const SelectBtn = styled.button<{ selected?: boolean }>`
        padding: 14px 25px;
        border-radius: 10px;
        border: 1px solid #997beb;
        background-color: ${({ selected }) => (selected ? '#d2c4ff' : '#fff')};
        color: ${({ selected }) => (selected ? 'white' : '#444')};
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;

        &:hover {
            color: white;
            background-color: #d2c4ff;
        }
`;

// FAQ => option 버튼들 
export const OptionBtn = styled.button`
        padding: 10px 20px;
        border-radius: 10px;
        border: 1px solid #997beb;
        background-color: white;
        color: #444;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;

        &:hover {
            background-color: #d2c4ff;
        }
`;

// 입력창
export const InputBoxWrapper = styled.div`
        min-height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 13px;
        border: 1px solid #ccc;
        border-radius: 10px;
        background-color: #fefcf9;
        margin-top: 15px;
        // position: absolute;
        position: sticky;
        box-sizing: border-box;
`;

// input 필드
export const InputField = styled.input`
        height: 100%;
        border: none;
        outline: none;
        font-size: 16px;
        background-color: transparent;
        color: #444;
        flex: 1;
    
        &::placeholder {
            color: #999999ff;
        }
`;

// 전송 버튼
export const SendBtn = styled.button`
        padding: 0;
        background: none;
        border: none;
        margin-left: 10px;
        cursor: pointer;

        & > img {
            width: 30px;
            height: 30px;
        }
`;



