import React, { forwardRef, useMemo } from 'react';
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
  const h12 = h % 12 || 12;
  const ampm = h < 12 ? '오전' : '오후';
  return `${ampm} ${h12}:${mm}`;
};

// 정렬용 보조: at → id(숫자) → clientId(문자)로 비교
const msgSortKey = (m: Msg) => {
  const t = parseDate(m.at)?.getTime() ?? 0;
  const idn = Number(m.id);
  // id가 숫자면 (at이 같을 때) id로 보조 정렬
  if (Number.isFinite(idn)) return [t, idn] as const;
  // id가 없으면 clientId 해시 흉내
  const hash = (m.clientId ?? '').split('').reduce((a, c) => (a * 33 + c.charCodeAt(0)) | 0, 0);
  return [t, hash] as const;
};

const MessageList = forwardRef<HTMLDivElement, { myUserId: number; messages: Msg[] }>(
  ({ myUserId, messages }, ref) => {
    // ⭐ 오래된 → 최신 순으로 정렬된 배열
    const ordered = useMemo(() => {
      const arr = [...messages];
      arr.sort((a, b) => {
        const [ta, ia] = msgSortKey(a);
        const [tb, ib] = msgSortKey(b);
        return ta === tb ? ia - ib : ta - tb; // ASC
      });
      return arr;
    }, [messages]);

    // (1) 상대 안읽음 계산(정렬된 배열 기준)
    const unreadCount = ordered.filter(
      (m) => m.senderId !== myUserId && m.status !== 'read'
    ).length;
    const firstUnreadIndex = ordered.findIndex(
      (m) => m.senderId !== myUserId && m.status !== 'read'
    );
    const firstUnreadId =
      firstUnreadIndex >= 0
        ? (ordered[firstUnreadIndex].id ?? ordered[firstUnreadIndex].clientId)
        : undefined;

    // (2) 최신 내 메시지 id/time (정렬된 배열 기준에서 “마지막”이 최신)
    const latestMyMsgId = useMemo(() => {
      let mx = 0;
      for (const m of ordered) {
        if (m.senderId !== myUserId) continue;
        const idNum = Number(m.id);
        if (Number.isFinite(idNum) && idNum > mx) mx = idNum;
      }
      return mx;
    }, [ordered, myUserId]);

    const latestMyMsgTime = useMemo(() => {
      let mx = 0;
      for (const m of ordered) {
        if (m.senderId !== myUserId) continue;
        const t = m.at ? new Date(m.at).getTime() : 0;
        if (t > mx) mx = t;
      }
      return mx;
    }, [ordered, myUserId]);

    let lastDateKey = '';

    return (
      <S.Scroll ref={ref}>
        {ordered.map((m, i) => {
          const key = m.id ?? m.clientId ?? `row-${i}-${m.senderId}`;

          // 날짜 구분선
          const curKey = dayKey(m.at);
          const showDate = curKey !== lastDateKey;
          if (showDate) lastDateKey = curKey;

          // 간격
          const prev = i > 0 ? ordered[i - 1] : undefined;
          const prevAt = prev ? parseDate(prev.at) : null;
          const curAt = parseDate(m.at);
          const sameSender = !!prev && prev.senderId === m.senderId;
          const closeTime =
            !!prev && !!prevAt && !!curAt && Math.abs(curAt.getTime() - prevAt.getTime()) <= 3 * 60 * 1000;
          const spacer = i === 0 ? 0 : sameSender && closeTime ? 8 : 18;

          // 최신 내 메시지 여부 (id 없을 때 시간으로 보조)
          const mine = m.senderId === myUserId;
          const isLatestMine =
            mine &&
            (
              (Number.isFinite(Number(m.id)) && Number(m.id) === latestMyMsgId) ||
              (!m.id && m.at && new Date(m.at).getTime() === latestMyMsgTime)
            );

          return (
            <div key={key}>
              {showDate && <S.DateDivider>{curKey}</S.DateDivider>}

              {/* 처음 안읽음 위치에 구분선 (정렬된 배열 기준) */}
              {firstUnreadId &&
                (m.id === firstUnreadId || m.clientId === firstUnreadId) &&
                unreadCount > 0 && (
                  <S.UnreadDivider>
                    <S.UnreadPill>안읽음 {unreadCount}</S.UnreadPill>
                  </S.UnreadDivider>
                )}

              {spacer > 0 && <S.Spacer size={spacer} />}

              <MessageBubble
                mine={mine}
                text={m.text ?? ''}
                time={fmtTime(m.at)}
                status={m.status}
                showUnreadWhenNotRead={!!isLatestMine}
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
