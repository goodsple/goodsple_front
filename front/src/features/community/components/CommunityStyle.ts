import styled from "styled-components";


export const CommunityContainer = styled.div`
        width: 100vw;
        min-height: 100vh;
        align-items: center;
        display: flex;
        flex-direction: column;
        color: #444444;
        background: #FFFDFA;
`;

export const CommunityChatLayout = styled.div`
        width: 76vw;
        min-width: 600px;
        height: 75vh;
        margin-top: 70px;
        display: flex;
        border-radius: 15px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

// 채팅방 선택 박스
export const ChatRoomList = styled.div`
        width: 23%;
        min-width: 230px;
        max-height: 100%;
        padding: 30px 0;
        border-radius: 15px 0 0 15px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        overflow-y: hidden;

        img {
            width: 190px;
            margin: 0 auto;    
            margin-bottom: 35px;  
            display: block;      
        }

        ul {
            padding: 0;
            margin: 0;
        }
`;

export const StyledHr = styled.hr`
        border: none;
        border-top: 1px solid #cacacaff;
        margin: 0;

`;

export const ChatRoomItem = styled.li<{ selected: boolean }>`
        padding: 23px 15px;
        background-color: ${({ selected }) => (selected ? '#997beba0;' : 'transparent')};
        font-size: 20px;
        font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
        border-bottom: 1px solid #cacacaff;
        cursor: pointer;

        &:hover {
            background-color: #a787ffff;;
        }
`;


// 채팅 화면
export const ChatMessageArea = styled.div`
        width: 80%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
`;

export const ChatMessagesWrapper = styled.div`
        flex: 1;
        padding: 10px 0;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
`;

export const EmptyMessageArea = styled.div`
        height: 100%;
        color: #444444;
        font-size: 24px;
        align-items: center;
        display: flex;
        justify-content: center;
`;

export const ChatMessageBubble = styled.div<{ isMine: boolean }>`
        max-width: 60%;
        background-color: ${({ isMine }) => (isMine ? '#D7C4F5' : '#e0e0e0')};
        padding: 11px 15px;
        margin: 13px 16px;
        font-size: 16px;
        border-radius: 15px;
        align-self: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
        word-wrap: break-word;
        word-break: break-word;
        white-space: pre-wrap;
`;

export const ChatMessageItem = styled.div<{ isMine: boolean }>`
        margin: 6px 15px;
        align-items: flex-end;
        display: flex;
        flex-direction: ${({ isMine }) => (isMine ? 'row-reverse' : 'row')};
        flex-wrap: wrap;
`;

export const ProfileSection = styled.div`
        margin: 0 5px;
        align-items: center;
        display: flex;
        flex-direction: column;
`;

export const ProfileImage = styled.img`
        width: 42px;
        height: 42px;
        border: 1px solid #444;
        border-radius: 50%;
        object-fit: cover;
        cursor: pointer;
`;

export const UserName = styled.div`
        margin-top: 4px;
        font-size: 14px;
        font-weight: 500;
        color: #444;
`;

// 메시지 입력창 
export const ChatInputBox = styled.div`
        width: 85%;
        height: 90px;
        padding: 10px;
        margin: 0 auto;
        border: 1px solid #ccc;
        border-radius: 12px 12px 0 0;
        background-color: #fff;
        display: flex;
        flex-direction: column;
`;


export const ChatTextarea = styled.textarea`
        font-size: 16px;
        font-family: inherit;
        line-height: 1.5;
        flex: 1;
        border: none;
        outline: none;
        resize: none;

        &::placeholder {
            color: #aaa;
        }
`;


export const MessageTypeToggle = styled.div`
        margin-right: 10px;
        border: 1px solid #ccc;
        border-radius: 10px;
        display: flex;
        overflow: hidden;
`;

export const TypeButton = styled.button<{ selected: boolean }>`
        padding: 5px 12px;
        color: #444;
        font-size: 16px;
        font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
        border: none;
        background-color: ${({ selected }) => (selected ? '#ebf898ff' : 'transparent')};
        cursor: pointer;
`;


export const InputRow = styled.div`
        display: flex;
`;

export const AnnouncementCountMessage = styled.div`
        color: #997BEB;
        font-size: 16px;
        font-weight: 300;

        li {
            list-style-type: disc;
        }
`;

export const SendButton = styled.button`
        background: none;
        border: none;
        cursor: pointer;

        img{
            width: 30px;
            height: 30px;
        }
    `;