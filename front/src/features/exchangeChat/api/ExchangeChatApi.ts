import api from "../../../api/axiosInstance";

// 타입들은 type-only import
import type {
  StartRoomDTO,
  RoomSummaryDTO,
  MessageDTO,
  Room,
  Msg,
} from "../types/exchangeChat";

// 런타임에 쓰이는 매퍼 함수
import { toRoom, toMsg } from "../types/exchangeChat";

/**
 * 채팅방 생성 또는 재사용
 */
export async function startRoom(
  peerId: number,
  postId: number
): Promise<{ room: Room; isNew: boolean }> {
  const { data } = await api.post<StartRoomDTO>("/chat/rooms", { peerId, postId });
  console.debug("[startRoom] response:", data);
  return { room: toRoom(data), isNew: data.isNewRoom };
}

/**
 * 내 채팅방 요약 목록
 */
export async function getRoomSummaries(): Promise<Room[]> {
  const { data } = await api.get("/chat/rooms/summary");
  const rawList: RoomSummaryDTO[] =
    Array.isArray(data)
      ? data
      : data?.items ?? data?.content ?? data?.list ?? data?.data ?? [];
  return rawList.map(toRoom);
}

/**
 * 특정 방의 메시지 페이지 로드
 */
export async function getMessages(
    roomId: string,
    opts: { beforeId?: string; limit?: number; myUserId: number }
  ): Promise<Msg[]> {
    const { data } = await api.get(`/chat/rooms/${roomId}/messages`, { params: opts });
  
    const list: MessageDTO[] = Array.isArray(data)
      ? data
      : data?.messages ?? data?.items ?? data?.content ?? data?.list ?? data?.data ?? [];
  
    const myCursor   = Number(data?.myLastReadMessageId   ?? 0);
    const peerCursor = Number(data?.peerLastReadMessageId ?? 0);
  
    // 1) DTO -> Msg
    const mapped = list.map(toMsg);
  
    // 2) 오래된 → 최신 정렬 (at 우선, 없으면 id)
    mapped.sort((a, b) => {
      const ta = a.at ? new Date(a.at).getTime() : 0;
      const tb = b.at ? new Date(b.at).getTime() : 0;
      if (ta !== tb) return ta - tb;
      const ia = Number(a.id ?? 0), ib = Number(b.id ?? 0);
      return ia - ib;
    });
  
    // 3) 내 메시지의 읽음 상태 계산
    for (const m of mapped) {
      if (m.senderId === opts.myUserId) {
        const idNum = Number(m.id ?? -1);
        m.status = idNum > 0 && idNum <= peerCursor ? 'read' : 'sent';
      }
    }
    return mapped;
}
  
  

/**
 *  메시지 전송 (HTTP)
 * - body: { roomId, text }
 * - return: 서버가 저장한 메시지 객체
 */
export async function postMessage(params: {
  roomId: string;
  text: string;
}): Promise<MessageDTO> {
  const { roomId, text } = params;

  if (!roomId || !text?.trim()) {
    throw new Error("roomId와 text는 필수입니다.");
  }

  const { data } = await api.post(`/chat/messages`, {
    roomId,
    text: text.trim(),
  });

  console.debug("[postMessage] response:", data);
  return data;
}

export async function leaveRoom(roomId: string): Promise<void> {
    // 서버가 DELETE라면 delete로 바꿔줘
    await api.post(`/chat/rooms/${roomId}/leave`);
}
