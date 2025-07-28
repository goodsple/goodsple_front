import { useEffect, useRef, useState } from 'react';
import type { ChatMessage } from '../types/auction';
import * as S from './LiveChatStyle';

interface Props {
  chatHistory: ChatMessage[];
  onReport: (user: string) => void;
}

const LiveChat: React.FC<Props> = ({ chatHistory, onReport }) => {
  const [newMessage, setNewMessage] = useState('');
  const messageListRef = useRef<HTMLUListElement>(null); // ✨ ref 타입 ul로 변경
  
  useEffect(() => {
    const messageList = messageListRef.current;
    if (!messageList) return;

    // ✨ 스크롤 로직 변경
    const scrollBottom = messageList.scrollHeight - messageList.scrollTop;
    const shouldScroll = scrollBottom <= messageList.clientHeight + 50; // 50px 정도 여유

    if (shouldScroll) {
      setTimeout(() => {
        messageList.scrollTop = messageList.scrollHeight;
      }, 0);
    }
  }, [chatHistory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // TODO: 실제 채팅 메시지 전송 로직
    console.log("전송할 메시지:", newMessage);
    setNewMessage('');
  };

  return (
    <S.Wrapper>
      <S.Title>실시간 채팅</S.Title>
      <S.MessageList ref={messageListRef}> {/* ✨ ref 연결 */}
        {chatHistory.map((chat) => (
          <S.MessageItem key={chat.chatId}> {/* ✨ S.Message -> S.MessageItem */}
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