import type { Room } from '../types/exchangeChat';
import * as S from './RoomListStyle';
import { forwardRef, useEffect, useState } from 'react';

const relTime = (iso?: string) => {
  const d = iso ? new Date(iso) : null;
  if (!d || isNaN(d.getTime())) return '방금 전';
  const diff = Date.now() - d.getTime();
  const m = 60_000, h = 60*m, dms = 24*h;
  if (diff < m) return '방금 전';
  if (diff < h) return `${Math.floor(diff/m)}분전`;
  if (diff < dms) return `${Math.floor(diff/h)}시간전`;
  return `${Math.floor(diff/dms)}일전`;
};

type Props = {
  rooms: Room[];
  currentRoomId?: string;
  onSelect: (id: string) => void;
  onLeaveRoom: (id: string) => void;
  isWriter?: boolean;
  isNewRoom?: boolean;
  listLocked?: boolean; // 깜빡임 방지용
};

const RoomList = forwardRef<HTMLDivElement, Props>(
  ({ rooms, currentRoomId, onSelect, onLeaveRoom, isWriter, listLocked }, ref) => {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [fadeInEmpty, setFadeInEmpty] = useState(false);

    useEffect(() => {
      const onDocClick = () => setOpenMenuId(null);
      document.addEventListener('click', onDocClick);
      return () => document.removeEventListener('click', onDocClick);
    }, []);

    const visible = rooms.filter(r => !r.hidden);

    // 구매자 + 첫 진입 잠금 or 실제로 비어있음 → 빈 상태 표현
    const showEmpty = (listLocked === true) || visible.length === 0;

    useEffect(() => {
      if (showEmpty) requestAnimationFrame(() => setFadeInEmpty(true));
      else setFadeInEmpty(false);
    }, [showEmpty]);

    return (
      <S.Wrap>
        <S.Title>전체 대화</S.Title>

        {/* $empty=true면 네이티브 스크롤 숨김 */}
        <S.Scroll ref={ref} $empty={showEmpty} style={{ position: 'relative' }}>
          {showEmpty ? (
            <S.EmptyCenter className={fadeInEmpty ? 'show' : ''}>
              {isWriter
                ? '아직 대화가 없어요.\n구매자가 메시지를 보내면 여기에 표시돼요. :)'
                : '아직 대화가 없어요.\n오른쪽에서 첫 메시지를 보내 시작해 보세요. :)'}
            </S.EmptyCenter>
          ) : (
            visible.map((r) => {
              const menuOpen = openMenuId === r.id;
              const unread = r.unread ?? 0;

              return (
                <S.Item
                  key={r.id}
                  $active={r.id === currentRoomId}
                  onClick={() => onSelect(r.id)}
                >
                  <S.Row>
                    <S.Avatar style={{ backgroundImage: r.avatar ? `url(${r.avatar})` : undefined }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <S.NickLine>
                        <S.Nick>{r.nick}</S.Nick>
                        <S.Time>• {relTime(r.updatedAt)}</S.Time>
                      </S.NickLine>
                      <S.Last>{r.last}</S.Last>
                    </div>
                    {unread > 0 && <S.Unread>{unread}</S.Unread>}
                  </S.Row>

                  <S.KebabBtn
                    aria-label="대화방 메뉴 열기"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(prev => (prev === r.id ? null : r.id));
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <circle cx="12" cy="5" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="12" cy="19" r="2" />
                    </svg>
                  </S.KebabBtn>

                  {menuOpen && (
                    <S.Menu onClick={(e) => e.stopPropagation()}>
                      <S.MenuItem
                        className="danger"
                        onClick={() => {
                          setOpenMenuId(null);
                          onLeaveRoom(r.id);
                        }}
                      >
                        채팅방 나가기
                      </S.MenuItem>
                    </S.Menu>
                  )}
                </S.Item>
              );
            })
          )}
        </S.Scroll>
      </S.Wrap>
    );
  }
);

RoomList.displayName = 'RoomList';
export default RoomList;
