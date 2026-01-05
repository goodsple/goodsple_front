import React, { useEffect, useRef, useState } from 'react';
import type { ChatMessage } from '../types/auction';
import * as S from './LiveChatStyle';

interface Props {
  chatHistory: ChatMessage[];
  onSendChat: (message: string) => void;
  onReport: (user: string) => void;
}

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

export default React.memo(LiveChatComponent);