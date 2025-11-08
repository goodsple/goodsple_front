import { useEffect, useMemo, useRef, useState } from 'react';
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
  myUserId, rooms, getMessages, onSend, onLeaveRoom, onEnterRoom, initialRoomId,
  showRooms = true, listProps,
}: {
  myUserId: number;
  rooms: Room[];
  getMessages: (roomId: string) => Msg[];
  onSend: (roomId: string, text: string) => void;
  onLeaveRoom: (roomId: string) => void;
  onEnterRoom?: (roomId: string) => void;
  initialRoomId?: string;
  showRooms?: boolean; // 컬럼 유지 여부
  listProps?: { isWriter?: boolean; isNewRoom?: boolean; listLocked?: boolean };
}) {
  const [currentRoomId, setCurrentRoomId] = useState<string | undefined>(initialRoomId);

  const currentRoom = useMemo(() => rooms.find(r => r.id === currentRoomId), [rooms, currentRoomId]);
  const messages = useMemo(() => (currentRoomId ? getMessages(currentRoomId) : []), [currentRoomId, getMessages]);

  const listRef = useRef<HTMLDivElement>(null);
  const msgScrollRef = useRef<HTMLDivElement | null>(null);

  const isRoomSelected = !!currentRoom;
  const isFirstChat = isRoomSelected && messages.length === 0;
  const mode: 'empty' | 'chat' = isRoomSelected ? 'chat' : 'empty';

  const handleSelect = (id: string) => {
    setCurrentRoomId(id);
    onEnterRoom?.(id);
  };

  // 메시지 변경/방 변경 시 맨 아래로
  useEffect(() => {
    const el = msgScrollRef.current;
    if (!el) return;
    requestAnimationFrame(() => { el.scrollTop = el.scrollHeight; });
  }, [messages.length, currentRoomId]);

  // 실제 삭제된 경우만 선택 해제(초기 rooms=[] 단계에서 해제 방지)
  useEffect(() => {
    if (!currentRoomId) return;
    if (rooms.length === 0) return;
    const exist = rooms.some(r => r.id === currentRoomId);
    if (!exist) setCurrentRoomId(undefined);
  }, [rooms, currentRoomId]);

  // rooms 로드 후 initialRoomId가 나타나면 자동 선택 회복
  useEffect(() => {
    if (!currentRoomId && initialRoomId && rooms.some(r => r.id === initialRoomId)) {
      setCurrentRoomId(initialRoomId);
      onEnterRoom?.(initialRoomId);  // 초기 자동 선택에도 enter 콜백 실행
    }
  }, [rooms, currentRoomId, initialRoomId]);

  return (
    <S.Layout hasSider={showRooms}>
      {/* 좌측 컬럼은 유지, 아이템 숨김은 RoomList에서 처리 */}
      <S.Sider>
        {showRooms && (
          <RoomList
            ref={listRef}
            rooms={rooms}
            currentRoomId={currentRoomId}
            onSelect={handleSelect}
            onLeaveRoom={onLeaveRoom}
            isWriter={listProps?.isWriter}
            isNewRoom={listProps?.isNewRoom}
            listLocked={listProps?.listLocked}
          />
        )}
      </S.Sider>

      {/* 가운데 커스텀 스크롤바 */}
      <CenterScrollbar
        scrollRef={msgScrollRef}
        bindKey={`${currentRoomId}|${messages.length}`}
      />

      {/* 우측 */}
      <S.Main mode={mode} style={{ ['--composer-h' as any]: '76px' }}>
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
                // 첫 대화 화면도 스크롤 대상 DOM을 만들어 ref 연결
                <S.InitScroll ref={msgScrollRef}>
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
                </S.InitScroll>
            ) : (
                // 기존 그대로: 메시지 리스트 자체가 스크롤 대상
                <MessageList ref={msgScrollRef} myUserId={myUserId} messages={messages} />
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
