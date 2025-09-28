import * as S from './ MessageBubbleStyle';

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
      <S.Bubble mine={mine}>{text}</S.Bubble>
      <S.Meta mine={mine}>
        <span>{time}</span>
        {/* 내 메시지에만 상태 노출 */}
        {mine && typeof status !== 'undefined' && (
          <span className={status === 'read' ? 'read' : 'unread'}>
            {statusLabel(status)}
          </span>
        )}
      </S.Meta>
    </S.Row>
  );
}
