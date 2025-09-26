import MessageBubble from './ MessageBubble';
import * as S from './MessageListStyle';
import type { Msg } from '../types/exchangeChat';

export default function MessageList({
  myUserId,
  messages,
}: { myUserId: number; messages: Msg[] }) {
  const fmtDate = (iso: string) => new Date(iso).toISOString().slice(0, 10);
  let lastDate = '';

  // ★ 안읽음 정보 계산 (상대가 보낸 것 중 read가 아닌 것)
  const unreadCount = messages.filter(m => m.senderId !== myUserId && m.status !== 'read').length;
  const firstUnread = messages.find(m => m.senderId !== myUserId && m.status !== 'read');
  const firstUnreadId = firstUnread?.id;

  return (
    <S.Scroll>
      {messages.map((m, i) => {
        const curDate = fmtDate(m.at);
        const showDate = curDate !== lastDate;
        if (showDate) lastDate = curDate;

        const prev = i > 0 ? messages[i - 1] : undefined;
        const sameSender = !!prev && prev.senderId === m.senderId;
        const closeTime =
          !!prev && Math.abs(new Date(m.at).getTime() - new Date(prev.at).getTime()) <= 3 * 60 * 1000;
        const spacer = i === 0 ? 0 : sameSender && closeTime ? 8 : 18;

        return (
          <div key={m.id}>
            {showDate && <S.DateDivider>{curDate}</S.DateDivider>}

            {/* ★ 처음 안읽음 위치에 구분선 */}
            {firstUnreadId === m.id && unreadCount > 0 && (
              <S.UnreadDivider>
                <S.UnreadPill>안읽음 {unreadCount}</S.UnreadPill>
              </S.UnreadDivider>
            )}

            {spacer > 0 && <S.Spacer size={spacer} />}
            <MessageBubble
              mine={m.senderId === myUserId}
              text={m.text}
              time={new Date(m.at).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
              status={m.status}  // 'sent' | 'read' (내 메시지에만 보여짐)
            />
          </div>
        );
      })}
      <S.Spacer size={12} />
    </S.Scroll>
  );
}
