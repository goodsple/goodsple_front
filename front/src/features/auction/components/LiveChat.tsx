/**
 * 파일 경로: src/features/auction/components/LiveChat.tsx
 */
import React, { useEffect, useRef, useState } from 'react'; // 1. React를 import 합니다.
import type { ChatMessage } from '../types/auction';
import * as S from './LiveChatStyle';

interface Props {
  chatHistory: ChatMessage[];
  onSendChat: (message: string) => void;
  onReport: (user: string) => void;
}

// 2. 기존 컴포넌트 로직을 별도의 상수로 분리합니다.
const LiveChatComponent: React.FC<Props> = ({ chatHistory, onSendChat, onReport }) => {
  const [newMessage, setNewMessage] = useState('');
  const messageListRef = useRef<HTMLUListElement>(null);
  
  useEffect(() => {
    const messageList = messageListRef.current;
    if (!messageList) return;

    const scrollBottom = messageList.scrollHeight - messageList.scrollTop;
    const shouldScroll = scrollBottom <= messageList.clientHeight + 50;

    if (shouldScroll) {
      setTimeout(() => {
        messageList.scrollTop = messageList.scrollHeight;
      }, 0);
    }
  }, [chatHistory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    onSendChat(newMessage);
    setNewMessage('');
  };

  return (
    <S.Wrapper>
      <S.Title>실시간 채팅</S.Title>
      <S.MessageList ref={messageListRef}>
        {chatHistory.map((chat) => (
          <S.MessageItem key={chat.chatId}>
            <S.MessageContent>
              <S.Sender>{chat.userNickname}:</S.Sender>
              <S.Text>{chat.message}</S.Text>
            </S.MessageContent>
            <S.ReportButton onClick={() => onReport(chat.userNickname)}>🚨</S.ReportButton>
          </S.MessageItem>
        ))}
      </S.MessageList>
      <S.Form onSubmit={handleSubmit}>
        <S.Input 
          type="text" 
          placeholder="채팅 메시지 입력..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <S.Button type="submit">전송</S.Button>
      </S.Form>
    </S.Wrapper>
  );
};

// 3. React.memo로 컴포넌트를 감싸서 export 합니다.
// 이렇게 하면 props가 변경되지 않는 한, 부모 컴포넌트가 리렌더링되어도 LiveChat은 리렌더링되지 않습니다.
export default React.memo(LiveChatComponent);