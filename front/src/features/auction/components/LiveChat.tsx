import type { ChatMessage } from '../types/auction';
import * as S from './LiveChatStyle';

interface Props {
  chatHistory: ChatMessage[];
}

const LiveChat: React.FC<Props> = ({ chatHistory }) => {
  return (
    <S.Wrapper>
      <S.MessageList>
        {chatHistory.map((msg) => (
          <S.MessageItem key={msg.chatId}>
            <strong>{msg.userNickname}:</strong> {msg.message}
          </S.MessageItem>
        ))}
      </S.MessageList>
      {/* TODO: 채팅 입력 폼 추가 */}
    </S.Wrapper>
  );
};

export default LiveChat;