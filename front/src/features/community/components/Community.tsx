import type { IMessage, StompSubscription } from '@stomp/stompjs';
import { Client } from '@stomp/stompjs';
import type React from 'react';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import SockJS from 'sockjs-client';
import axiosInstance from '../../../api/axiosInstance';
import Logo from '../../../assets/images/logo.png';
import sendIcon from '../../../assets/images/send_purple.png';
import SearchBox from '../../usermain/components/SearchBox';
import * as s from './CommunityStyle';
import CommUserInfoModal from './CommUserInfoModal';

type MessageType = 'normal' | 'announcement';

export interface ChatMessage {
  userId: number;
  roomId: string;
  text: string;
  type: MessageType;
  userName: string;
  userProfile: string;
}

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

  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [roomMessages, setRoomMessages] = useState<{ [room: string]: ChatMessage[] }>({});
  const [onlineCount, setOnlineCount] = useState<number>(0);
  const [input, setInput] = useState<string>('');
  const [messageType, setMessageType] = useState<MessageType>('normal');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = useState<{
    userName: string;
    userProfile: string;
    badgeName: string;
    badgeImage: string;
  } | null>(null);

  const myUserId = Number(localStorage.getItem('userId'));
  const [isConnected, setIsConnected] = useState(false);
  const stompClientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<StompSubscription | null>(null);
  const onlineSubscriptionRef = useRef<StompSubscription | null>(null);

  // --- 채팅 기록 불러오기 ---
  const fetchChatHistory = async (roomId: string) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      localStorage.clear();
      window.location.href = '/login';
      return;
    }

    try {
      const res = await axiosInstance.get<ChatMessage[]>(`/chat/history/${roomId}`);
      setRoomMessages((prev) => ({ ...prev, [roomId]: res.data }));
    } catch (err: any) {
      if (err.response?.status === 401) {
        alert('세션이 만료되었거나 로그인이 필요합니다.');
        localStorage.clear();
        window.location.href = '/login';
      } else {
        console.error('채팅 기록 불러오기 실패:', err);
      }
    }
  };

  // --- WebSocket 연결 ---
  const connectWebSocket = (roomId: string) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    if (stompClientRef.current) {
      subscriptionRef.current?.unsubscribe();
      onlineSubscriptionRef.current?.unsubscribe();
      stompClientRef.current.deactivate();
    }

    const socket = new SockJS('/ws'); // 서버 주소는 프록시나 baseURL에 맞춰 상대경로 사용 가능
    const stompClient = new Client({
      webSocketFactory: () => socket as any,
      reconnectDelay: 5000,
      connectHeaders: { Authorization: `Bearer ${token}` },
      onConnect: () => {
        stompClientRef.current = stompClient;
        setIsConnected(true);

        subscriptionRef.current = stompClient.subscribe(`/topic/${roomId}`, (message: IMessage) => {
          const body = JSON.parse(message.body) as ChatMessage;
          setRoomMessages((prev) => ({
            ...prev,
            [roomId]: [...(prev[roomId] || []), body],
          }));
        });

        onlineSubscriptionRef.current = stompClient.subscribe(`/topic/roomUsers/${roomId}`, (message: IMessage) => {
          setOnlineCount(Number(message.body));
        });

        stompClient.publish({
          destination: `/app/join/${roomId}`,
          body: JSON.stringify({ userName: localStorage.getItem('userName') || '익명' }),
        });
      },
      onStompError: (frame) => console.error('STOMP Error:', frame.body),
      onDisconnect: () => setIsConnected(false),
    });

    stompClient.activate();
  };

  // --- 방 변경 시 처리 ---
  useEffect(() => {
    if (selectedRoom) {
      setIsConnected(false);
      fetchChatHistory(selectedRoom);
      connectWebSocket(selectedRoom);
    }

    return () => {
      subscriptionRef.current?.unsubscribe();
      onlineSubscriptionRef.current?.unsubscribe();
      stompClientRef.current?.deactivate();
    };
  }, [selectedRoom]);

  // --- 메시지 전송 ---
  const handleSend = () => {
    const stompClient = stompClientRef.current;
    if (!stompClient || !stompClient.connected || !selectedRoom) return;

    const msg = { roomId: selectedRoom, text: input, type: messageType };
    stompClient.publish({ destination: `/app/sendMessage/${selectedRoom}`, body: JSON.stringify(msg) });
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
                        <s.ProfileImage src={msg.userProfile} alt="프로필 이미지" onClick={() => handleProfileClick(msg)} />
                        <s.UserName>{msg.userName}</s.UserName>
                      </s.ProfileSection>
                      <s.ChatMessageBubble isMine={msg.userId === myUserId}>{msg.text}</s.ChatMessageBubble>
                    </s.ChatMessageItem>
                  ))}
                </s.ChatMessagesWrapper>

                {profileModalOpen && selectedUserInfo && (
                  <CommUserInfoModal
                    userName={selectedUserInfo.userName}
                    badgeName={selectedUserInfo.badgeName}
                    badgeImage={selectedUserInfo.badgeImage}
                    userProfile={selectedUserInfo.userProfile}
                    onClose={() => setProfileModalOpen(false)}
                  />
                )}

                <s.ChatInputBox>
                  <s.InputRow>
                    <s.MessageTypeToggle>
                      <s.TypeButton selected={messageType === 'normal'} onClick={() => setMessageType('normal')}>일반</s.TypeButton>
                      <s.TypeButton selected={messageType === 'announcement'} onClick={() => setMessageType('announcement')}>확성기</s.TypeButton>
                    </s.MessageTypeToggle>

                    <s.ChatTextarea placeholder="메시지를 입력해주세요. (Shift + Enter 로 줄바꿈)"
                                    value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} maxLength={200} />

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
