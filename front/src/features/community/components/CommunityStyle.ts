import styled from "styled-components";


export const CommunityContainer = styled.div`
        width: 100vw;
        min-height: 100vh;
        padding-top : 150px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #FFFDFA;
        color: #444444;
`;

export const CommunityChatLayout = styled.div`
        width: 76vw;
        height: 70vh;
        display: flex;
        border: 1px solid #444444;
        border-radius: 15px;
        
`;

export const ChatRoomList = styled.div`
        width: 20%;
        border-right: 1px solid #444;
        border-radius: 15px 0 0 15px;
        padding-top: 30px;

        img {
            width: 180px;
            display: block;      
            margin: 0 auto;    
            margin-bottom: 35px;  
        }

        ul {
            padding: 0;
            margin: 0;
        }

`;

export const StyledHr = styled.hr`
        color: #444;
        margin: 0;
        
`

export const ChatRoomItem = styled.li<{ selected: boolean }>`
        padding: 23px 15px;
        cursor: pointer;
        border-bottom: 1px solid #aaa;
        font-size: 20px;
        font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
        background-color: ${({ selected }) => (selected ? '#997beba0;' : 'transparent')};

        &:hover {
            background-color: #a787ffff;;
        }
`;

export const ChatMessageArea = styled.div`
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px 0;
        overflow-y: auto;
`;

export const EmptyMessageArea = styled.div`
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #444444;
        font-size: 24px;
`;

export const ChatMessageBubble = styled.div<{ isMine: boolean }>`
        max-width: 60%;
        padding: 10px 14px;
        border-radius: 16px;
        background-color: ${({ isMine }) => (isMine ? '#D7C4F5' : '#e0e0e0')};
        align-self: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
        margin: 8px 16px;
        font-size: 15px;
`;


export const ChatInputBox = styled.div`
        width: 90%;
        height: 80px;
        display: flex;
        // align-items: center;
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 12px 12px 0 0;
        margin: 0 auto;
        background-color: #fff;
        display: flex;
        flex-direction: column;
`;


export const ChatTextarea = styled.textarea`
        flex: 1;
        border: none;
        outline: none;
        font-size: 16px;
        // margin-right: 10px;
        resize: none;
        height: 100%;
        line-height: 1.4;
        font-family: inherit;

        
        &::placeholder {
            color: #aaa;
        }
`;


export const MessageTypeToggle = styled.div`
        display: flex;
        border: 1px solid #ccc;
        border-radius: 10px;
        overflow: hidden;
        margin-right: 10px;
`;

export const TypeButton = styled.button<{ selected: boolean }>`
        padding: 5px 12px;
        border: none;
        background-color: ${({ selected }) => (selected ? '#ebf898ff' : 'transparent')};
        font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
        cursor: pointer;
        font-size: 16px;
        color: #444;
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
            width: 25px;
            height: 25px;
        }
    `;