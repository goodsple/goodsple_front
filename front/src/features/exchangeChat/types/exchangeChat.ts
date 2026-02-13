/**
 * --------------------------------------------------------------------------
 * 목적:
 *  - 프론트 표시용 엔티티 타입(Room, Msg)
 *  - 백엔드 응답 DTO 타입(RoomSummaryDTO, MessageDTO 등)
 *  - DTO -> 프론트 엔티티 매핑 함수(toRoom, toMsg)
 *
 * 사용처:
 *  - RoomList / MessageList / ProfileIntro 등 채팅 관련 화면 전반
 *  - API 호출부(axios)와 컴포넌트 사이의 어댑터 계층
 *
 * 설계 포인트:
 *  - 프론트 엔티티(화면 기준)와 백엔드 DTO(전송 기준)를 분리
 *  - id(number) ↔ id(string) 일관 변환 (UI/라우터 key 충돌 예방)
 *  - 읽음 상태(status)는 커서/WS ack 반영 시 계산 (지연 일관성)
 * --------------------------------------------------------------------------
 */

/* =========================
 * 프론트 표시용 엔티티 타입
 * ========================= */
  export type Room = {
    /** 문자열 id: 라우팅/리스트 key 안정성 */
    id: string;
    nick: string;
    avatar?: string;
    verified?: boolean;
    /** 마지막 메시지 프리뷰 */
    last?: string;
    /** 리스트 숫자 배지 표시용 */
    unread?: number;
    /** 정렬 기준 시간(마지막 활동 시각) ISO */
    updatedAt: string;
  
    // 최초 진입(게시글 → 채팅하기) 프로필/프리뷰용
    postPreview?: {
        title: string;
        thumb?: string;
        method?: '직거래' | '택배';
        regionText?: string;        
        tags?: string[];
    };
    levelText?: string;
    badgeImageUrl?: string;

    /** 좌측 목록에서 숨길지 여부(구매자용) */
    hidden?: boolean; // 기본 undefined/false
  };
  
  /**
   * 메시지 엔티티
   * - status: 서버 확정/읽음 커서 반영 시 채움
   * - clientId: 낙관적 전송/중복 방지용(선택)
   */
  export type Msg = {
    id?: string;           // 서버 messageId (낙관적 단계에서는 없을 수 있음)
    clientId?: string;     // 클라이언트 생성 ID (crypto.randomUUID 등)
    senderId: number;
    text: string;
    at?: string | null;            // ISO
    status?: 'sent' | 'read';
  };
  
  /* =========================
   * 백엔드 응답 DTO (전송 스펙)
   * =========================
   * 컨트롤러/API 계약을 그대로 표현. 화면에서 직접 쓰지 말고 매퍼로 변환할 것.
   */
  export type RoomSummaryDTO = {
    roomId: number | string;
    peer?: {
      userId: number;
      nickname: string;
      avatar?: string | null;
      verified?: boolean | null;
      levelText?: string | null;
      badgeImageUrl?: string | null;
    } | null;
    last?: { id?: number | string; text?: string | null; createdAt?: string | null } | null;
    lastMessage?:
      | { messageId?: number | string; text?: string | null; createdAt?: string | null }
      | null;
    unreadCount?: number | null;
    updatedAt?: string | null;
    postPreview?: { title: string; thumb?: string; tags?: string[] };
  
    // userId?: number 를 추가 (옵션)
    writer?: { userId?: number; nickname: string; avatar?: string; verified?: boolean; levelText?: string };
  };
  
  
  // 방 생성/재사용 응답(최초 생성 여부 플래그 포함)
  export type StartRoomDTO = RoomSummaryDTO & { isNewRoom: boolean };
  
  // 단일 메시지 레코드
  export type MessageDTO = {
    messageId: number | string;
    roomId?: number | string;
    senderId: number;
  
    // 서버마다 달라질 수 있는 필드들
    message?: string | null;              // 표준 (우리 컨트롤러)
    text?: string | null;                 // 다른 변형
    content?: string | null;              // 다른 변형
    body?: string | null;                 // 다른 변형
  
    chatMessageCreatedAt?: string | null; // 표준 (우리 컨트롤러)
    createdAt?: string | null;            // 다른 변형
    at?: string | null;                   // 다른 변형
    time?: string | null;                 // 다른 변형
  };
  
  // 읽음 커서 Ack (예: WS로 수신)
  export type ReadAckDTO = {
    roomId: number | string;
    userId: number;
    lastReadMessageId: number;
  };
  
  /* =========================
   * 매핑 함수 (DTO -> 엔티티)
   * =========================
   * 역할: 백엔드 스펙 변경을 UI로부터 격리.
   * 주의: number id는 모두 String()으로 통일 변환.
   */
  export const toRoom = (d: RoomSummaryDTO, meId?: number): Room => {
    // 1) 기본: peer만 사용
    let p = d.peer ?? null;
  
    // 2) 예외: peer가 없으면 writer 고려(단, writer.userId !== meId일 때만)
    if (!p && d.writer) {
      const w = d.writer;
      if (!meId || w.userId == null || w.userId !== meId) {
        p = {
          userId: w.userId ?? -1,
          nickname: w.nickname,
          avatar: w.avatar ?? undefined,
          verified: w.verified ?? false,
          levelText: w.levelText ?? undefined,
        };
      }
    }
  
    // 3) 그래도 없으면 placeholder
    const nickname = p?.nickname ?? '상대방';
    const avatar   = p?.avatar ?? undefined;
    const verified = !!p?.verified;
    const level    = p?.levelText ?? undefined;
    const badgeImg = p?.badgeImageUrl ?? undefined;
  
    // 마지막 메시지 추출 (last / lastMessage 모두 대응)
    const lastRaw = d.last ?? d.lastMessage ?? null;
    const lastText = (lastRaw?.text ?? '') || '';
    const lastCreatedAt =
      (lastRaw && ('createdAt' in lastRaw ? lastRaw.createdAt : null)) ?? null;
  
    const updated = d.updatedAt ?? lastCreatedAt ?? new Date().toISOString();
  
    return {
      id: String(d.roomId),
      nick: nickname,
      avatar,
      verified,
      levelText: level,
      badgeImageUrl: badgeImg,
      last: lastText,
      unread: d.unreadCount ?? 0,
      updatedAt: updated,
      postPreview: d.postPreview,
    };
  };  
  
  
  /**
   * 메시지 매핑
   * - 서버 필드명(chatMessageCreatedAt) → 프론트 필드명(at) 통일
   * - text/at 누락 시 안전 기본값으로 보정
   */
  export const toMsg = (m: MessageDTO): Msg => {
    // 텍스트 폴백
    const text =
      m?.message ??
      (m as any)?.text ??
      (m as any)?.content ??
      (m as any)?.body ??
      '';
  
    // 시간(ISO) 폴백
    const at =
      m?.chatMessageCreatedAt ??
      (m as any)?.createdAt ??
      (m as any)?.at ??
      (m as any)?.time ??
      null;
  
    return {
      id: m?.messageId != null ? String(m.messageId) : undefined,
      senderId: m?.senderId ?? 0,
      text,
      at,
      // status는 getMessages()에서 커서 기반으로 보정
    };
  };
  
    /* =========================
    * 사용 예시 (참고)
    * =========================
    * // 방 생성/재사용
    * const { data } = await api.post<StartRoomDTO>('/api/chat/rooms', { peerId, postId });
    * const meId = * 로그인 유저 id * 0;
    * const room: Room = toRoom(data, meId);
    *
    * // 리스트
    * const { data: list } = await api.get<RoomSummaryDTO[]>('/api/chat/rooms/summary');
    * const rooms: Room[] = list.map(d => toRoom(d, meId));
    *
    * // 메시지
    * const { data } = await api.get(`/api/chat/rooms/${roomId}/messages`, { params: { limit: 50 }});
    * const msgs: Msg[] = (Array.isArray(data) ? data : data.messages).map(toMsg);
    *
    * // 읽음 ACK 수신 시(상대가 내 메시지 읽음)
    * // applyReadAck: 내 메시지 중 Number(id) <= lastReadMessageId → status='read'
    */
  
