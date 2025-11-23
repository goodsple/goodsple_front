import * as S from './MessageBubbleStyle';

type MsgStatus = 'sent' | 'read';

type Props = {
  mine: boolean;
  text: string;
  time: string;
  status?: MsgStatus;
  /** 최신 내 메시지에 한해 안읽음 표시할지 */
  showUnreadWhenNotRead?: boolean;
};

export default function MessageBubble({
  mine,
  text,
  time,
  status,
  showUnreadWhenNotRead = false,
}: Props) {
  const showRead   = mine && status === 'read';
  const showUnRead = mine && showUnreadWhenNotRead && status !== 'read';

  return (
    <S.Row $mine={mine}>
      {mine && (
        <S.Meta $mine={mine}>
          <span>{time}</span>
          {showRead   && <span className="read">읽음</span>}
          {showUnRead && <span className="unread">안읽음</span>}
        </S.Meta>
      )}

      <S.Bubble $mine={mine}>{text}</S.Bubble>

      {!mine && (
        <S.Meta $mine={mine}>
          <span>{time}</span>
        </S.Meta>
      )}
    </S.Row>
  );
}
