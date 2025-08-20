// src/components/community/Community.tsx
import { useState, type KeyboardEvent } from 'react';
import Logo from '../../../assets/images/logo.png';
import sendIcon from '../../../assets/images/send_purple.png';
import SearchBox from '../../usermain/components/SearchBox';
import type { ChatMessage, MessageType } from '../hooks/useWebSocket';
import { useWebSocket } from '../hooks/useWebSocket';
import * as s from './CommunityStyle';
import CommUserInfoModal from './CommUserInfoModal';

export interface ChatRoom {
  id: string;
  name: string;
}

const Community: React.FC = () => {
  const chatRooms: ChatRoom[] = [
    { id: 'K-POP', name: 'K-POP 채팅방' },
    { id: 'MOVIE', name: '영화/드라마 채팅방' },
    { id: 'GAME', name: '게임 채팅방' },
    { id: 'ANIMATION', name: '애니메이션 채팅방' },
  ];

  const myUserId = Number(localStorage.getItem('userId'));
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [input, setInput] = useState<string>('');
  const [messageType, setMessageType] = useState<MessageType>('normal');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = useState<any>(null);

  const { roomMessages, onlineCount, isConnected, sendMessage } = useWebSocket(selectedRoom, myUserId);

  const handleSend = () => {
    if (!selectedRoom) return;
    sendMessage(selectedRoom, { roomId: selectedRoom, text: input, type: messageType });
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleProfileClick = (msg: ChatMessage) => {
    setSelectedUserInfo({
      userName: msg.userName,
      badgeName: 'LV. 3 굿즈 수호자',
      badgeImage: '/assets/images/sample_badge.png',
      userProfile: msg.userProfile,
    });
    setProfileModalOpen(true);
  };

  return (
    <>
      <SearchBox />
      <s.CommunityContainer>
        <s.CommunityChatLayout>
          {/* --- 채팅방 목록 --- */}
          <s.ChatRoomList>
            <img src={Logo} alt="로고" />
            <s.StyledHr />
            <ul>
              {chatRooms.map((room) => (
                <s.ChatRoomItem
                  key={room.id}
                  selected={selectedRoom === room.id}
                  onClick={() => setSelectedRoom(room.id)}
                >
                  {room.name}
                </s.ChatRoomItem>
              ))}
            </ul>
          </s.ChatRoomList>

          {/* --- 채팅 메시지 영역 --- */}
          <s.ChatMessageArea>
            {!selectedRoom ? (
              <s.EmptyMessageArea>채팅방을 눌러 채팅에 참여하세요!</s.EmptyMessageArea>
            ) : (
              <>
                <s.RoomHeader>
                  <span>{chatRooms.find((r) => r.id === selectedRoom)?.name}</span>
                  <span>현재 접속자: {onlineCount}명</span>
                </s.RoomHeader>

                <s.ChatMessagesWrapper>
                  {(roomMessages[selectedRoom] || []).map((msg, idx) => (
                    <s.ChatMessageItem key={idx} isMine={msg.userId === myUserId}>
                      <s.ProfileSection>
                        <s.ProfileImage
                          src={msg.userProfile}
                          alt="프로필 이미지"
                          onClick={() => handleProfileClick(msg)}
                        />
                        <s.UserName>{msg.userName}</s.UserName>
                      </s.ProfileSection>
                      <s.ChatMessageBubble isMine={msg.userId === myUserId}>{msg.text}</s.ChatMessageBubble>
                    </s.ChatMessageItem>
                  ))}
                </s.ChatMessagesWrapper>

                {/* --- 프로필 모달 --- */}
                {profileModalOpen && selectedUserInfo && (
                  <CommUserInfoModal
                    userName={selectedUserInfo.userName}
                    badgeName={selectedUserInfo.badgeName}
                    badgeImage={selectedUserInfo.badgeImage}
                    userProfile={selectedUserInfo.userProfile}
                    onClose={() => setProfileModalOpen(false)}
                  />
                )}

                {/* --- 입력창 --- */}
                <s.ChatInputBox>
                  <s.InputRow>
                    <s.MessageTypeToggle>
                      <s.TypeButton
                        selected={messageType === 'normal'}
                        onClick={() => setMessageType('normal')}
                      >
                        일반
                      </s.TypeButton>
                      <s.TypeButton
                        selected={messageType === 'announcement'}
                        onClick={() => setMessageType('announcement')}
                      >
                        확성기
                      </s.TypeButton>
                    </s.MessageTypeToggle>

                    <s.ChatTextarea
                      placeholder="메시지를 입력해주세요. (Shift + Enter 로 줄바꿈)"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      maxLength={200}
                    />

                    <s.SendButton onClick={handleSend} disabled={!isConnected}>
                      <img src={sendIcon} alt="채팅 전송 버튼" />
                    </s.SendButton>
                  </s.InputRow>

                  <s.AnnouncementCountMessage>
                    <ul>
                      <li>확성기 사용 → 한달에 2번 사용가능</li>
                    </ul>
                  </s.AnnouncementCountMessage>
                </s.ChatInputBox>
              </>
            )}
          </s.ChatMessageArea>
        </s.CommunityChatLayout>
      </s.CommunityContainer>
    </>
  );
};

export default Community;
