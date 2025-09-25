import { useEffect, useState, type KeyboardEvent } from 'react';
import axiosInstance from '../../../api/axiosInstance';
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

type SelectedUserInfo = {
  userId: number;
  nickname: string;
  userProfile: string;
  badgeName: string;
  badgeImage: string;
};

const Community: React.FC = () => {
  const chatRooms: ChatRoom[] = [
    { id: 'K-POP', name: 'K-POP 채팅방' },
    { id: 'MOVIE', name: '영화/드라마 채팅방' },
    { id: 'GAME', name: '게임 채팅방' },
    { id: 'ANIMATION', name: '애니메이션 채팅방' },
  ];

  const storedUserId = localStorage.getItem('userId'); 
  const myUserId: number = storedUserId ? Number(storedUserId) : 0;

  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [input, setInput] = useState<string>('');
  const [messageType, setMessageType] = useState<MessageType>('GENERAL');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = useState<SelectedUserInfo | null>(null);

  const { roomMessages, onlineCount, isConnected, sendMessage, megaphoneRemaining } =
    useWebSocket(selectedRoom, myUserId);

  const handleSend = async () => {
    if (!selectedRoom || !input.trim()) return;

    // 금칙어 체크
    try {
      await axiosInstance.post('/admin/prohibited-words/check', input);
    } catch (err: any) {
      // 금칙어 포함 시 alert
      alert(err.response?.data?.message || '금칙어가 포함되었습니다.');
      return; // 전송 차단
    }

    if (messageType === 'MEGAPHONE' && megaphoneRemaining <= 0) { 
      alert('이번 달 확성기 사용 횟수를 모두 사용했습니다.'); 
      return; // 전송 차단됨
    }

    sendMessage(selectedRoom, { 
      roomId: selectedRoom, 
      content: input, 
      type: messageType
    });

    setMessageType('GENERAL'); // 전송 후 기본값으로 초기화됨
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleProfileClick = async (msg: ChatMessage) => {
    try {
      const res = await axiosInstance.get(`/chat/user/${msg.userId}`);

      const userData = res.data;
      setSelectedUserInfo({
        userId: Number(msg.userId),
        nickname: userData.nickname || '익명',
        userProfile: userData.userProfile || '/assets/images/default_profile.png',
        badgeName: userData.badges?.[0]?.name || 'LV. 1 신규 유저',
        badgeImage: userData.badges?.[0]?.image || '/assets/images/LV1.png',
      });

      setProfileModalOpen(true);
    } catch (err: any) {
      // 서버 응답 확인
      console.error('사용자 정보 불러오기 실패', err.response?.status, err.response?.data);
      alert(`사용자 정보를 불러오지 못했습니다. (${err.response?.status})`);
    }
  };

  // 방 변경 시 스크롤 자동 하단 이동
  useEffect(() => {
    const el = document.getElementById('chatMessagesWrapper');
    if (el) el.scrollTop = el.scrollHeight;
  }, [selectedRoom, roomMessages]);

  return (
    <>
      <SearchBox />
      <s.CommunityContainer>
        <s.CommunityChatLayout>
          {/* 채팅방 목록 */}
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

          {/* 채팅 메시지 영역 */}
          <s.ChatMessageArea>
            {!selectedRoom ? (
              <s.EmptyMessageArea>
                채팅방을 눌러 채팅에 참여하세요!
              </s.EmptyMessageArea>
            ) : (
              <>
                <s.RoomHeader>
                  <span>{chatRooms.find((r) => r.id === selectedRoom)?.name}</span>
                  <span>현재 접속자: {onlineCount}명</span>
                </s.RoomHeader>

                <s.ChatMessagesWrapper id="chatMessagesWrapper">
                  {(roomMessages[selectedRoom] || []).map((msg, idx) => {
                    const isMine = Number(msg.userId) === myUserId;

                    return (
                      <s.ChatMessageItem key={idx} $isMine={isMine}>
                        {/* 상대방 메시지 프로필만 표시 */}
                        {!isMine && (
                          <s.ProfileSection>
                            <s.ProfileImage
                              src={msg.userProfile || '/assets/images/default_profile.png'}
                              alt="프로필 이미지"
                              onClick={() => handleProfileClick(msg)}
                            />
                            <s.UserName>{msg.nickname}</s.UserName>
                          </s.ProfileSection>
                        )}

                        {/* 메시지 내용 */}
                        <s.ChatMessageBubble $isMine={isMine}>
                          {msg.content}
                        </s.ChatMessageBubble>
                      </s.ChatMessageItem>
                    );
                  })}
                </s.ChatMessagesWrapper>

                {/* 프로필 모달 */}
                {profileModalOpen && selectedUserInfo && (
                  <CommUserInfoModal
                    userId={selectedUserInfo.userId} 
                    nickname={selectedUserInfo.nickname}
                    badgeName={selectedUserInfo.badgeName}
                    badgeImage={selectedUserInfo.badgeImage}
                    userProfile={selectedUserInfo.userProfile}
                    onClose={() => setProfileModalOpen(false)}
                  />
                )}

                {/* 메시지 입력창 */}
                <s.ChatInputBox>
                  <s.InputRow>
                    <s.MessageTypeToggle>
                      <s.TypeButton
                        selected={messageType === 'GENERAL'}
                        onClick={() => setMessageType('GENERAL')}
                      >
                        일반
                      </s.TypeButton>
                      <s.TypeButton
                        selected={messageType === 'MEGAPHONE'}
                        onClick={() => {
                          if (megaphoneRemaining > 0) setMessageType('MEGAPHONE'); 
                          else alert('이번 달 확성기 사용 횟수를 모두 사용했습니다.'); 
                        }}
                        disabled={megaphoneRemaining <= 0} // 수정됨✨
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

                  <s.MegaPhoneCountMessage>
                    <ul>
                      <li>
                        {megaphoneRemaining > 0
                          ? `확성기 사용 → 이번 달 ${megaphoneRemaining}번 남음`
                          : '이번 달 확성기 사용 횟수를 모두 사용했습니다.'} 
                      </li> 
                    </ul>
                  </s.MegaPhoneCountMessage>
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
