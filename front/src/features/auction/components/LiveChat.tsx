// features/auction/components/LiveChat.tsx (수정본)

import { useEffect, useRef, useState } from 'react';
import type { ChatMessage } from '../types/auction';
import * as S from './LiveChatStyle';

interface Props {
  chatHistory: ChatMessage[];
  onSendChat: (message: string) => void;
  onReport: (user: string) => void;
}

const LiveChat: React.FC<Props> = ({ chatHistory, onSendChat, onReport }) => {
  const [newMessage, setNewMessage] = useState('');
  const messageListRef = useRef<HTMLUListElement>(null);
  
  // 기존에 잘 구현되어 있던 스크롤 로직입니다.
  useEffect(() => {
    const messageList = messageListRef.current;
    if (!messageList) return;

    // 사용자가 직접 위로 스크롤해서 이전 내용을 보고 있을 때는 자동으로 내리지 않도록 처리
    const scrollBottom = messageList.scrollHeight - messageList.scrollTop;
    const shouldScroll = scrollBottom <= messageList.clientHeight + 50; // 50px 정도 여유

    if (shouldScroll) {
      // 새 메시지가 추가된 후, DOM이 업데이트될 시간을 주기 위해 setTimeout 사용
      setTimeout(() => {
        messageList.scrollTop = messageList.scrollHeight;
      }, 0);
    }
  }, [chatHistory]); // chatHistory가 변경될 때마다 이 로직이 실행됩니다.

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // 부모 컴포넌트(LiveAuctionPage)로부터 받은 onSendChat 함수를 호출합니다.
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

export default LiveChat;