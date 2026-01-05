import api from "../../../api/axiosInstance";

// 타입 전용 import
import type {
  StartRoomDTO,
  RoomSummaryDTO,
  MessageDTO,
  Room,
  Msg,
} from "../types/exchangeChat";

import { getMyUserIdFromToken } from '../../../utils/jwtUtils';

// 런타임 매퍼
import { toRoom, toMsg } from "../types/exchangeChat";

/** 방 생성 또는 기존 방 재사용 */
export async function startRoom(
  peerId: number,
  postId: number
): Promise<{ roomId: string; room?: Room; isNew?: boolean }> {
  const { data } = await api.post<StartRoomDTO | { roomId: number | string }>(
    "/chat/rooms",
    { peerId, postId }
  );

  // 응답 형태 호환 처리
  if ("roomId" in data && typeof data.roomId !== "undefined") {
    return { roomId: String(data.roomId) };
  }

  // StartRoomDTO 형태(선언 기준): { isNewRoom, ...RoomSummaryDTO 필드 }
  const room = toRoom(data as StartRoomDTO);
  const isNew = (data as StartRoomDTO).isNewRoom;
  return { roomId: room.id, room, isNew };
}

/** 내 채팅방 요약 목록 (무인자) */
export async function getRoomSummaries(): Promise<Room[]> {
  // 백엔드는 토큰(Authorization)으로 사용자 식별
  const { data } = await api.get<RoomSummaryDTO[]>('/chat/rooms/summary', {
    params: { size: 50, page: 0 },
  });

  // 매퍼에 meId 넘기면 writer/peer 보정에 사용 가능(옵션)
  const meId = getMyUserIdFromToken() ?? undefined;
  return (data ?? []).map(d => toRoom(d, meId));
}

/** 메시지 페이지 로드 */
export async function getMessages(
  roomId: string,
  opts: { limit?: number; beforeId?: number; myUserId?: number } = {}
): Promise<Msg[]> {
  const { limit = 50, beforeId } = opts;
  const { data } = await api.get(`/chat/rooms/${roomId}/messages`, {
    params: { limit, beforeId },
  });

  // 백엔드: { messages, myLastReadMessageId, peerLastReadMessageId }
  const list: MessageDTO[] = Array.isArray(data?.messages)
    ? data.messages
    : (data ?? []);

  const msgs = list.map(toMsg);

  // 상대가 읽은 커서가 함께 오면 내 메시지에 read 반영
  const peerLast = Number(data?.peerLastReadMessageId ?? 0);
  if (peerLast > 0) {
    const meId = opts.myUserId ?? getMyUserIdFromToken() ?? undefined;
    if (meId) {
      for (const m of msgs) {
        const mid = Number(m.id ?? 0);
        if (m.senderId === meId && mid > 0 && mid <= peerLast) {
          m.status = 'read';
        }
      }
    }
  }
  return msgs;
}

/** 메시지 전송 */
export async function postMessage(payload: { roomId: string; text: string }) {
  const { data } = await api.post('/chat/messages', {
    roomId: Number(payload.roomId),
    text: payload.text,
  });
  // { messageId, senderId, message, chatMessageCreatedAt, ... }
  return data;
}

/** 읽음 커서(HTTP) — WS와 함께 쓰면 정합성 ↑ */
export async function markRead(roomId: string, lastReadMessageId: number) {
    await api.post('/chat/read', {
      roomId: Number(roomId),
      lastReadMessageId,      // ← 필드명 일치!
    });
  }

/** 방 나가기 (백엔드에 엔드포인트가 있는 경우만 동작) */
export async function leaveRoom(roomId: string): Promise<void> {
  await api.delete(`/chat/rooms/${roomId}`).catch(() => {});
}
