import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ChatLayout from '../components/ChatLayout';
import type { Room, Msg } from '../types/exchangeChat';
import { getMyUserIdFromToken } from '../../../utils/jwtUtils';
import { getRoomSummaries, getMessages, postMessage, leaveRoom, markRead } from '../api/ExchangeChatApi';
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

  // 작성자는 전체 방 노출, 구매자는 상황에 따라 제한
  const canSeeAllRooms = isWriter;

  const [rooms, setRooms] = useState<Room[]>([]);
  const [messagesByRoom, setMessagesByRoom] = useState<Record<string, Msg[]>>({});
  const [currentRoomId, setCurrentRoomId] = useState<string | undefined>(initialRoomId);

  // 좌측 컬럼은 항상 보이게(아이템 감춤은 RoomList에서 처리)
  const showRooms = true;

  // 깜빡임 방지: 구매자 + 신규 진입이면 첫 프레임 잠금
  const listLockedInit = !canSeeAllRooms && isNewRoom === true;
  const [listLocked, setListLocked] = useState<boolean>(listLockedInit);

  // STOMP
  const token = localStorage.getItem('accessToken') ?? '';
  const socket = useMemo(() => new ChatSocket(token), [token]);
  useEffect(() => { socket.activate(); return () => socket.deactivate(); }, [socket]);

  /* ───────────────────────── 공통 헬퍼 ───────────────────────── */

  // 마지막(가장 큰) message id
  const maxId = (list: Msg[]) =>
    list.reduce((mx, m) => {
      const n = Number(m.id ?? 0);
      return Number.isFinite(n) && n > mx ? n : mx;
    }, 0);

  // 좌측 리스트의 특정 방 배지를 0으로 고정
  const zeroUnread = (roomId: string) => {
    setRooms(prev => prev.map(r => (r.id === roomId ? { ...r, unread: 0 } : r)));
  };

  /**
   * 읽음 낙관 반영
   *  - who: 'me'   → 내가 읽었음  (상대가 보낸 메시지들을 read)
   *        'peer' → 상대가 읽었음(내가 보낸 메시지들을 read)
   */
  const applyReadOptimistic = (roomId: string, upToId: number, who: 'me' | 'peer') => {
    if (!upToId) return;
    setMessagesByRoom(prev => {
      const list = prev[roomId] ?? [];
      const next = list.map(m => {
        const mid = Number(m.id ?? -1);
        if (!Number.isFinite(mid) || mid <= 0 || mid > upToId) return m;

        if (who === 'me') {
          return (m.senderId !== myUserId) ? { ...m, status: 'read' as const } : m;
        } else {
          return (m.senderId === myUserId) ? { ...m, status: 'read' as const } : m;
        }
      });
      return { ...prev, [roomId]: next };
    });
  };

  /* ───────────────────────── ① 방 요약 로드 ───────────────────────── */
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const list = await getRoomSummaries(); // 무인자 호출(백엔드가 토큰으로 me 판별)
        if (!alive) return;

        // 구매자 UX:
        // - initialRoomId가 있으면 그 방 외엔 숨김(1:1 뷰)
        // - initialRoomId가 없으면 숨김 없이 전체 노출(빈 목록 방지)
        const next = canSeeAllRooms
          ? list
          : (initialRoomId
              ? list.map(r => ({ ...r, hidden: r.id !== initialRoomId }))
              : list);

        setRooms(next);
        if (listLockedInit) requestAnimationFrame(() => setListLocked(false));
      } catch (e) {
        console.error(e);
      }
    })();
    return () => { alive = false; };
  }, [canSeeAllRooms, initialRoomId, isNewRoom, listLockedInit]);

  /* ───────────────── ② 신규 방이면 임시 Room 삽입(우측 카드/프로필) ──────────────── */
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
      hidden: !canSeeAllRooms, // 작성자는 보이고, 구매자는 숨김(1:1)
    };

    setRooms(prev => [temp, ...prev]);
    setMessagesByRoom(prev => ({ ...prev, [initialRoomId]: [] }));
    if (listLockedInit) requestAnimationFrame(() => setListLocked(false));
  }, [initialRoomId, isNewRoom, peer, postPreview, rooms.length, canSeeAllRooms, listLockedInit]);

  /* ─────────────── ③ 기존 방이면 메시지 로드(+바로 읽음 커서 전송: 내가 읽음) ─────────────── */
  useEffect(() => {
    if (!initialRoomId || isNewRoom) return;
    (async () => {
      if (messagesByRoom[initialRoomId]) {
        const last = maxId(messagesByRoom[initialRoomId]);
        if (last > 0) {
          socket.sendRead(initialRoomId, last);
          try { await markRead(initialRoomId, last); } catch {}
          applyReadOptimistic(initialRoomId, last, 'me');
          zeroUnread(initialRoomId); // ← 리스트 배지 0 고정
        }
        return;
      }
      const msgs = await getMessages(initialRoomId, { limit: 50, myUserId });
      setMessagesByRoom(prev => ({ ...prev, [initialRoomId]: msgs }));
      setRooms(prev => prev.map(r => (r.id === initialRoomId ? { ...r, unread: 0 } : r)));

      const last = maxId(msgs);
      if (last > 0) {
        socket.sendRead(initialRoomId, last);
        try { await markRead(initialRoomId, last); } catch {}
        applyReadOptimistic(initialRoomId, last, 'me');
        zeroUnread(initialRoomId); // ← 리스트 배지 0 고정
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialRoomId, isNewRoom, myUserId]);

  /* ───────────────────────── ④ 전송 ───────────────────────── */
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

  /* ─────────────── 방 입장(읽음 커서 포함: 내가 읽음) ─────────────── */
  const handleEnterRoom = async (roomId: string) => {
    setCurrentRoomId(roomId);

    // 리스트 배지 0 고정
    zeroUnread(roomId);

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

        const last = maxId(msgs);
        if (last > 0) {
          socket.sendRead(roomId, last);
          try { await markRead(roomId, last); } catch {}
          applyReadOptimistic(roomId, last, 'me');
          zeroUnread(roomId); // ← 리스트 배지 0 고정
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      const last = maxId(messagesByRoom[roomId]);
      if (last > 0) {
        socket.sendRead(roomId, last);
        try { await markRead(roomId, last); } catch {}
        applyReadOptimistic(roomId, last, 'me');
        zeroUnread(roomId); // ← 리스트 배지 0 고정
      }
    }
  };

  /* ───────────────────────── 방 나가기 ───────────────────────── */
  const handleLeaveRoom = async (roomId: string) => {
    try { await leaveRoom(roomId); } catch (e) { console.error(e); }
    setRooms(prev => prev.filter(r => r.id !== roomId));
    setMessagesByRoom(prev => {
      const { [roomId]: _drop, ...rest } = prev;
      return rest;
    });
    if (currentRoomId === roomId) setCurrentRoomId(undefined);
  };

  /* ─────────────── 소켓 수신 공통(message:new) ─────────────── */
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

    // 열린 방에서 "상대"가 보낸 메시지라면 → 내가 읽은 것으로 처리
    if (!isMine && isOpen) {
      const upTo = Number(msg.id ?? 0);
      if (upTo > 0) {
        applyReadOptimistic(rid, upTo, 'me');
        socket.sendRead(rid, upTo);
        (async () => { try { await markRead(rid, upTo); } catch {} })();
        zeroUnread(rid); // ← 리스트 배지 0 고정
      }
    }
  }, [currentRoomId, myUserId, canSeeAllRooms, socket]);

  /* ───────────────────────── WS 구독: user 토픽 ───────────────────────── */
  useEffect(() => {
    const unsub = socket.subscribeUser(myUserId, (packet: any) => {
      const type = packet?.type ?? '';
      const data = packet?.data ?? packet;

      if (type === 'message:new') {
        onNewIncoming(data);
        return;
      }
      if (type === 'message:read') {
        const rid = String(data?.roomId ?? '');
        const readerId = Number(data?.userId ?? 0);
        const last = Number(data?.lastReadMessageId ?? 0);
        if (!rid || !last) return;

        if (readerId !== myUserId) {
          // 상대가 내 메시지를 읽음
          applyReadOptimistic(rid, last, 'peer');
        } else {
          // 내가 읽음(서버 브로드캐스트 수신) → 리스트 배지 0 고정
          zeroUnread(rid);
        }
      }
    });
    return () => { try { unsub(); } catch {} };
  }, [socket, myUserId, onNewIncoming]);

  /* ───────────────────────── WS 구독: room 토픽 ───────────────────────── */
  useEffect(() => {
    if (!currentRoomId) return;
    const unsub = socket.subscribeRoom(currentRoomId, (packet: any) => {
      const type = packet?.type ?? '';
      const data = packet?.data ?? packet;

      if (type === 'message:new') {
        onNewIncoming(data);
        return;
      }
      if (type === 'message:read') {
        const rid = String(data?.roomId ?? '');
        const readerId = Number(data?.userId ?? 0);
        const last = Number(data?.lastReadMessageId ?? 0);
        if (!rid || !last) return;

        if (readerId !== myUserId) {
          applyReadOptimistic(rid, last, 'peer');
        } else {
          zeroUnread(rid); // 내가 읽음 → 배지 0
        }
      }
    });
    return () => { try { unsub(); } catch {} };
  }, [socket, currentRoomId, myUserId, onNewIncoming]);

  /* ───────────────────────── 정렬/키/프리뷰 주입 ───────────────────────── */
  const visibleRooms = useMemo(
    () => [...rooms].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
    [rooms],
  );

  const chatLayoutKey = useMemo(() => initialRoomId ?? 'no-room', [initialRoomId]);

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

  /* ───────────────────────── 렌더 ───────────────────────── */
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
      showRooms={showRooms}
      listProps={{ isWriter, isNewRoom, listLocked }}
    />
  );
}
