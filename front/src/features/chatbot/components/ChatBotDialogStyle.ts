import styled from "styled-components";


export const ChatbotBody = styled.div`
        padding: 20px;
        // height: 500px;
        height: 100%;
        box-sizing: border-box; /* 패딩이 높이에 포함되도록 설정 */
        display: flex;
        flex-direction: column;
        gap: 10px;
`;

// 채팅 영역 (스크롤되는 곳)
export const ChatArea = styled.div`
        display: flex;
        flex-direction: column;
        gap: 10px;

        /* ⭐️ 변경: 남은 공간을 채우고 스크롤 가능하게 설정 */
        flex: 1; /* 사용 가능한 모든 공간을 차지 */
        overflow-y: auto;/* 내용이 많아지면 세로 스크롤 생성 */
        
        padding-right: 10px; /* 스크롤바와 내용이 겹치지 않도록 패딩 추가 */
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
        // min-height: 60px;
        // display: flex;
        // align-items: center;
        // justify-content: space-between;
        // padding: 0 13px;
        // border: 1px solid #ccc;
        // border-radius: 10px;
        // background-color: #fefcf9;
        // margin-top: 15px;
        // // position: absolute;
        // position: sticky;
        // box-sizing: border-box;

        min-height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 13px;
        border: 1px solid #ccc;
        border-radius: 10px;
        background-color: #fefcf9;
        margin-top: 10px;
        flex-shrink: 0; /* 크기 줄어들지 않도록 */

        /* 고정 느낌 주려면 아래 옵션 추가 가능 */
        // position: sticky;
        // bottom: 0;
        // background-color: #fefcf9;
        // z-index: 10; 
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

export const ChatEndRef = styled.div``;




