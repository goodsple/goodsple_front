// ExchangeChatPage.tsx
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ChatLayout from '../components/ChatLayout';
import type { Room, Msg } from '../types/exchangeChat';
import { getMyUserIdFromToken } from '../../../utils/jwtUtils';
import { getRoomSummaries, getMessages, postMessage, leaveRoom } from '../api/ExchangeChatApi';
import { ChatSocket } from '../ws/chatSocket';

type NavState = {
  isNewRoom?: boolean;
  isWriter?: boolean;
  peer?: { userId: number; nickname: string; avatar?: string; levelText?: string };
  postPreview?: {
    title: string;
    thumb?: string;
    tags?: string[];
    method?: '직거래' | '택배';
    regionText?: string;
  };
};

export default function ExchangeChatPage() {
  const { roomId: roomIdParam } = useParams<{ roomId?: string }>();
  const [sp] = useSearchParams();
  const location = useLocation() as { state?: NavState };

  const initialRoomId =
    (roomIdParam && roomIdParam.trim()) ||
    (sp.get('roomId') && sp.get('roomId')!.trim()) ||
    undefined;

  const isNewRoom = location.state?.isNewRoom === true;
  const isWriter  = location.state?.isWriter === true;
  const peer = location.state?.peer;
  const postPreview = location.state?.postPreview;

  // 로그인
  const myUserId = getMyUserIdFromToken();
  if (!myUserId) return <div>로그인이 필요합니다.</div>;

  const canSeeAllRooms = isWriter;

  const [rooms, setRooms] = useState<Room[]>([]);
  const [messagesByRoom, setMessagesByRoom] = useState<Record<string, Msg[]>>({});
  const [currentRoomId, setCurrentRoomId] = useState<string | undefined>(initialRoomId);

  // 왼쪽 컬럼은 항상 보이게(아이템 감춤은 RoomList에서 처리)
  const showRooms = true;

  // 깜빡임 방지: 구매자 + 신규 진입이면 첫 프레임 잠금
  const listLockedInit = !canSeeAllRooms && isNewRoom === true;
  const [listLocked, setListLocked] = useState<boolean>(listLockedInit);

  // STOMP
  const token = localStorage.getItem('accessToken') ?? '';
  const socket = useMemo(() => new ChatSocket(token), [token]);
  useEffect(() => { socket.activate(); return () => socket.deactivate(); }, [socket]);

  /** ① 방 요약 로드 */
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const list = await getRoomSummaries();
        if (!alive) return;

        const next = canSeeAllRooms
          ? list
          : list.map(r => ({
              ...r,
              // 신규 진입이면 전체 숨김, 아니라면 initialRoomId만 노출
              hidden: isNewRoom ? true : (initialRoomId ? r.id !== initialRoomId : true),
            }));

        setRooms(next);
        if (listLockedInit) requestAnimationFrame(() => setListLocked(false));
      } catch (e) {
        console.error(e);
      }
    })();
    return () => { alive = false; };
  }, [canSeeAllRooms, initialRoomId, isNewRoom, listLockedInit]);

  /** ② 신규 방이면 임시 Room 삽입(우측 카드/프로필 표시용) */
  useEffect(() => {
    if (!initialRoomId || !isNewRoom) return;
    if (rooms.some(r => r.id === initialRoomId)) return;

    const now = new Date().toISOString();
    const temp: Room = {
      id: initialRoomId,
      nick: peer?.nickname ?? '상대방',
      avatar: peer?.avatar,
      verified: undefined,
      levelText: peer?.levelText,
      last: '처음 대화를 시작해보세요!',
      unread: 0,
      updatedAt: now,
      postPreview,
      hidden: !canSeeAllRooms, // 작성자는 보이고, 구매자는 숨김
    };

    setRooms(prev => [temp, ...prev]);
    setMessagesByRoom(prev => ({ ...prev, [initialRoomId]: [] }));
    if (listLockedInit) requestAnimationFrame(() => setListLocked(false));
  }, [initialRoomId, isNewRoom, peer, postPreview, rooms.length, canSeeAllRooms, listLockedInit]);

  /** ③ 기존 방이면 메시지 로드 */
  useEffect(() => {
    if (!initialRoomId || isNewRoom) return;
    (async () => {
      if (messagesByRoom[initialRoomId]) return;
      const msgs = await getMessages(initialRoomId, { limit: 50, myUserId });
      setMessagesByRoom(prev => ({ ...prev, [initialRoomId]: msgs }));
      setRooms(prev => prev.map(r => (r.id === initialRoomId ? { ...r, unread: 0 } : r)));
    })();
  }, [initialRoomId, isNewRoom, myUserId, messagesByRoom]);

  /** ④ 전송 */
  const handleSend = async (roomId: string, text: string) => {
    const trimmed = (text ?? '').trim();
    if (!trimmed) return;

    const clientId =
      globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

    try {
      const saved = await postMessage({ roomId, text: trimmed });
      const appended: Msg = {
        id: saved?.messageId != null ? String(saved.messageId) : undefined,
        clientId,
        senderId: saved?.senderId ?? myUserId,
        text: saved?.message ?? trimmed,
        at: saved?.chatMessageCreatedAt ?? new Date().toISOString(),
        status: 'sent',
      };

      setMessagesByRoom(prev => ({ ...prev, [roomId]: [...(prev[roomId] ?? []), appended] }));
      setRooms(prev =>
        prev.map(r =>
          r.id === roomId
            ? { ...r, last: appended.text, updatedAt: appended.at!, unread: 0, hidden: false }
            : r
        )
      );
    } catch (e) {
      console.error('send failed', e);
    }
  };

  /** 방 입장 */
  const handleEnterRoom = async (roomId: string) => {
    setCurrentRoomId(roomId);

    setRooms(prev =>
      prev.map(r => ({
        ...r,
        unread: r.id === roomId ? 0 : (r.unread ?? 0),
        hidden: canSeeAllRooms ? false : r.id !== roomId,
      }))
    );

    if (!messagesByRoom[roomId]) {
      try {
        const msgs = await getMessages(roomId, { limit: 50, myUserId });
        setMessagesByRoom(prev => ({ ...prev, [roomId]: msgs }));
      } catch (e) {
        console.error(e);
      }
    }
  };

  /** 방 나가기 */
  const handleLeaveRoom = async (roomId: string) => {
    try { await leaveRoom(roomId); } catch (e) { console.error(e); }
    setRooms(prev => prev.filter(r => r.id !== roomId));
    setMessagesByRoom(prev => {
      const { [roomId]: _drop, ...rest } = prev;
      return rest;
    });
    if (currentRoomId === roomId) setCurrentRoomId(undefined);
  };

  /** 소켓 수신 */
  const onNewIncoming = useCallback((payload: any) => {
    const rid = String(payload?.roomId ?? payload?.data?.roomId ?? '');
    const raw = payload?.message ?? payload?.data?.message ?? payload?.data ?? payload ?? {};
    if (!rid) return;

    const msg: Msg = {
      id: raw?.messageId != null ? String(raw.messageId) : raw?.id != null ? String(raw.id) : undefined,
      senderId: Number(raw?.senderId ?? raw?.from ?? 0),
      text: String(raw?.message ?? raw?.content ?? raw?.text ?? ''),
      at: raw?.chatMessageCreatedAt ?? raw?.createdAt ?? new Date().toISOString(),
    };

    const isMine = msg.senderId === myUserId;
    const isOpen = rid === currentRoomId;
    const hiddenNext = canSeeAllRooms ? false : !isOpen;

    setMessagesByRoom(prev => {
      const list = prev[rid] ?? [];
      if (msg.id && list.some(m => m.id === msg.id)) return prev;
      return { ...prev, [rid]: [...list, msg] };
    });

    setRooms(prev => {
      const exists = prev.some(r => r.id === rid);
      if (!exists) {
        const placeholder: Room = {
          id: rid,
          nick: '상대방',
          last: msg.text,
          unread: (isOpen || isMine) ? 0 : 1,
          updatedAt: msg.at!,
          hidden: hiddenNext,
        };
        return [placeholder, ...prev];
      }
      return prev.map(r =>
        r.id === rid
          ? { ...r, last: msg.text, updatedAt: msg.at!, unread: (isOpen || isMine) ? 0 : (r.unread ?? 0) + 1, hidden: hiddenNext }
          : r
      );
    });
  }, [currentRoomId, myUserId, canSeeAllRooms]);

  useEffect(() => {
    const unsub = socket.subscribeUser(myUserId, (data: any) => {
      const payload = data?.type === 'message:new' ? (data.data ?? data) : data;
      onNewIncoming(payload);
    });
    return () => { try { unsub(); } catch {} };
  }, [socket, myUserId, onNewIncoming]);

  useEffect(() => {
    if (!currentRoomId) return;
    const unsub = socket.subscribeRoom(currentRoomId, (data: any) => {
      const payload = data?.type === 'message:new' ? (data.data ?? data) : data;
      onNewIncoming(payload);
    });
    return () => { try { unsub(); } catch {} };
  }, [socket, currentRoomId, onNewIncoming]);

  /** 정렬 */
  const visibleRooms = useMemo(
    () => [...rooms].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
    [rooms],
  );

  /** 초기 방 키 */
  const chatLayoutKey = useMemo(() => initialRoomId ?? 'no-room', [initialRoomId]);

  /** 메시지 0개인 기존 방에도 카드/프로필이 뜨도록 postPreview 주입 */
  useEffect(() => {
    if (!initialRoomId || !postPreview) return;
    const msgs = messagesByRoom[initialRoomId] ?? [];
    if (msgs.length === 0) {
      setRooms(prev =>
        prev.map(r =>
          r.id === initialRoomId
            ? { ...r, postPreview, hidden: canSeeAllRooms ? false : true }
            : r
        )
      );
    }
  }, [initialRoomId, postPreview, messagesByRoom, canSeeAllRooms]);

  return (
    <ChatLayout
      key={chatLayoutKey}
      myUserId={myUserId}
      rooms={visibleRooms}
      getMessages={(roomId) => messagesByRoom[roomId] ?? []}
      onSend={handleSend}
      onLeaveRoom={handleLeaveRoom}
      onEnterRoom={handleEnterRoom}
      initialRoomId={initialRoomId}
      showRooms={showRooms}              // ← 항상 true
      listProps={{ isWriter, isNewRoom, listLocked }}
    />
  );
}
