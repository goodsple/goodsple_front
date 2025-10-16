import * as S from './MessageBubbleStyle';

type MsgStatus = 'sent' | 'read'; // ← 전송중 제거

const statusLabel = (s?: MsgStatus) => (s === 'read' ? '읽음' : '안읽음');

export default function MessageBubble({
  mine,
  text,
  time,
  status,
}: {
  mine: boolean;
  text: string;
  time: string;
  status?: MsgStatus; // ← 타입 수정
}) {
  return (
    <S.Row mine={mine}>
      {/* 내가 보낸 말풍선이면 메타가 왼쪽으로 오도록 먼저 렌더링 */}
      {mine && (
        <S.Meta mine={mine}>
          <span>{time}</span>
          {typeof status !== 'undefined' && (
            <span className={status === 'read' ? 'read' : 'unread'}>
              {statusLabel(status)}
            </span>
          )}
        </S.Meta>
      )}

      <S.Bubble mine={mine}>{text}</S.Bubble>

      {/* 상대 메시지일 땐 기존처럼 말풍선 오른쪽에 메타 */}
      {!mine && (
        <S.Meta mine={mine}>
          <span>{time}</span>
        </S.Meta>
      )}
    </S.Row>
  );
}
