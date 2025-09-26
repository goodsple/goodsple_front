import { useMemo, useRef, useState } from 'react';
import type { Room, Msg } from '../types/exchangeChat';
import RoomList from './RoomList';
import MessageList from './MessageList';
import Composer from './Composer';
import * as S from './ChatLayoutStyle';
import ProfileIntro from './ProfileIntro';
import PostPreviewCard from './PostPreviewCard';
import chatImg from '../../../assets/images/chatImg.png';
import CenterScrollbar from './CenterScrollbar';

export default function ChatLayout({
  myUserId, rooms, getMessages, onSend, onLeaveRoom, initialRoomId,
}: {
  myUserId: number;
  rooms: Room[];
  getMessages: (roomId: string) => Msg[];
  onSend: (roomId: string, text: string) => void;
  onLeaveRoom: (roomId: string) => void;
  initialRoomId?: string;
}) {
  const [currentRoomId, setCurrentRoomId] = useState<string | undefined>(initialRoomId);
  const currentRoom = useMemo(() => rooms.find(r => r.id === currentRoomId), [rooms, currentRoomId]);
  const messages = useMemo(() => (currentRoomId ? getMessages(currentRoomId) : []), [currentRoomId, getMessages]);

  const listRef = useRef<HTMLDivElement>(null);

  const isRoomSelected = !!currentRoom;
  const isFirstChat = isRoomSelected && messages.length === 0;
  const mode: 'empty' | 'chat' = isRoomSelected ? 'chat' : 'empty';

  const handleSelect = (id: string) => {
    setCurrentRoomId(id);
    // 임시: rooms 배열이 상위에서 내려오는 고정값이면,
    // 리스트 내부에서 UI만 숨기는 방향으로 처리하세요.
  };

  return (
    <S.Layout>
      <S.Sider>
        <RoomList 
            ref={listRef} 
            rooms={rooms} 
            currentRoomId={currentRoomId} 
            onSelect={handleSelect}
            onLeaveRoom={onLeaveRoom}
        />
      </S.Sider>

      <CenterScrollbar scrollEl={listRef.current} />

      {/* ★ 방 미선택이면 헤더/컴포저 없이 단일 영역 */}
      <S.Main mode={mode}>
      {mode === 'empty' ? (
        <S.Content withBorders={false}>
          <S.EmptyState>
            <S.EmptyBox>
              <S.EmptyImg src={chatImg} alt="채팅 안내" />
              <S.EmptyText>대화방을 선택해 주세요 :)</S.EmptyText>
            </S.EmptyBox>
          </S.EmptyState>
        </S.Content>
      ) : (
        <>
          <S.Content withBorders>
            {isFirstChat ? (
              <S.InitialWrap>
                {currentRoom!.postPreview && (
                  <PostPreviewCard post={currentRoom!.postPreview} />
                )}
                <ProfileIntro
                  nickname={currentRoom!.nick}
                  avatar={currentRoom!.avatar}
                  levelText={currentRoom!.levelText}
                  verified={currentRoom!.verified}
                />
              </S.InitialWrap>
            ) : (
              <MessageList myUserId={myUserId} messages={messages} />
            )}
          </S.Content>

          <Composer
            disabled={!isRoomSelected}
            onSend={(text) => onSend(currentRoom!.id, text)}
          />
        </>
      )}
    </S.Main>
    </S.Layout>
  );
}