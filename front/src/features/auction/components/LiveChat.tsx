import { useEffect, useRef, useState } from 'react';
import type { ChatMessage } from '../types/auction';
import * as S from './LiveChatStyle';

interface Props {
  chatHistory: ChatMessage[];
  onReport: (user: string) => void;
}

const LiveChat: React.FC<Props> = ({ chatHistory, onReport }) => {
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef<null | HTMLDivElement>(null);
  
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 채팅 메시지 전송 로직
    console.log(newMessage);
    setNewMessage('');
  };

  return (
    <S.Wrapper>
      <S.Title>실시간 채팅</S.Title>
      <S.MessageList>
        {chatHistory.map((chat) => (
          <S.Message key={chat.chatId}>
            <S.MessageContent>
              <S.Sender>{chat.userNickname}:</S.Sender>
              <S.Text>{chat.message}</S.Text>
            </S.MessageContent>
            <S.ReportButton onClick={() => onReport(chat.userNickname)}>🚨</S.ReportButton>
          </S.Message>
        ))}
        <div ref={chatEndRef} />
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

export default LiveChat;