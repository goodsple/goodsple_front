import { useState } from 'react';
import type { ChatMessage } from '../types/auction.d.ts';
import * as S from './LiveChatStyle';

interface Props {
  chatHistory: ChatMessage[];
}

const LiveChat: React.FC<Props> = ({ chatHistory }) => {
  const [message, setMessage] = useState('');

  return (
    <S.Wrapper>
      <S.Title>실시간 채팅</S.Title>
      <S.MessageList>
        {chatHistory.map((msg) => (
          <S.MessageItem key={msg.chatId}>
            <S.Sender>{msg.userNickname}:</S.Sender>
            <S.MessageText>{msg.message}</S.MessageText>
          </S.MessageItem>
        ))}
      </S.MessageList>
      <S.ChatInputContainer>
        <S.ChatInput 
            value={message} 
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
        />
        <S.SendButton>전송</S.SendButton>
      </S.ChatInputContainer>
    </S.Wrapper>
  );
};

export default LiveChat;