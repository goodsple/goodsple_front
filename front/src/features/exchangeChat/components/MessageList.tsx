import React, { forwardRef } from 'react';
import MessageBubble from './MessageBubble';
import * as S from './MessageListStyle';
import type { Msg } from '../types/exchangeChat';

const parseDate = (v?: string | Date | null) => {
  if (!v) return null;
  const d = v instanceof Date ? v : new Date(v);
  return isNaN(d.getTime()) ? null : d;
};

// 로컬 기준 YYYY-MM-DD (at이 없으면 '오늘' 날짜로 그룹핑)
const dayKey = (v?: string | Date | null) => {
  const d = parseDate(v) ?? new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
};

// 로컬 HH:mm (at 없으면 공백)
const fmtTime = (v?: string | Date | null) => {
    const d = parseDate(v);
    if (!d) return '';
    const h = d.getHours();
    const mm = String(d.getMinutes()).padStart(2, '0');
    const h12 = h % 12 || 12;              // 0 → 12 처리
    const ampm = h < 12 ? '오전' : '오후';
    return `${ampm} ${h12}:${mm}`;
};

const MessageList = forwardRef<HTMLDivElement, { myUserId: number; messages: Msg[] }>(
  ({ myUserId, messages }, ref) => {
    let lastDateKey = '';

    // 읽음 계산(옵션): 상대가 보낸 것 중 read가 아닌 개수
    const unreadCount = messages.filter(
      (m) => m.senderId !== myUserId && m.status !== 'read'
    ).length;
    const firstUnreadIndex = messages.findIndex(
      (m) => m.senderId !== myUserId && m.status !== 'read'
    );
    const firstUnreadId =
      firstUnreadIndex >= 0
        ? (messages[firstUnreadIndex].id ?? messages[firstUnreadIndex].clientId)
        : undefined;

    return (
      // ★ ref를 스크롤 div에 꽂아줘야 CenterScrollbar가 제어 가능
      <S.Scroll ref={ref}>
        {messages.map((m, i) => {
          // 키: 서버 id → 없으면 clientId → 마지막 백업
          const key = m.id ?? m.clientId ?? `row-${i}-${m.senderId}`;

          // 날짜 구분선: at 없으면 오늘로 묶어서라도 구분선 표시
          const curKey = dayKey(m.at);
          const showDate = curKey !== lastDateKey;
          if (showDate) lastDateKey = curKey;

          // 묶음 간격 계산 (at 없으면 넉넉히 띄움)
          const prev = i > 0 ? messages[i - 1] : undefined;
          const prevAt = prev ? parseDate(prev.at) : null;
          const curAt = parseDate(m.at);
          const sameSender = !!prev && prev.senderId === m.senderId;
          const closeTime =
            !!prev && !!prevAt && !!curAt && Math.abs(curAt.getTime() - prevAt.getTime()) <= 3 * 60 * 1000;
          const spacer = i === 0 ? 0 : sameSender && closeTime ? 8 : 18;

          return (
            <div key={key}>
              {showDate && <S.DateDivider>{curKey}</S.DateDivider>}

              {/* 처음 안읽음 위치에 구분선 */}
              {firstUnreadId &&
                (m.id === firstUnreadId || m.clientId === firstUnreadId) &&
                unreadCount > 0 && (
                  <S.UnreadDivider>
                    <S.UnreadPill>안읽음 {unreadCount}</S.UnreadPill>
                  </S.UnreadDivider>
                )}

              {spacer > 0 && <S.Spacer size={spacer} />}

              <MessageBubble
                mine={m.senderId === myUserId}
                text={m.text ?? ''}      // 안전하게 표시
                time={fmtTime(m.at)}     // at 없으면 ''
                status={m.status}        // 'sent' | 'read' (내 메시지일 때만 표시됨)
              />
            </div>
          );
        })}
        <S.Spacer size={36} />
      </S.Scroll>
    );
  }
);

export default MessageList;
