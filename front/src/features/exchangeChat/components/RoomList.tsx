import type { Room } from '../types/exchangeChat';
import * as S from './RoomListStyle';
import levelImg from '../../../assets/images/LV3.png';
import { forwardRef, useEffect, useState } from 'react';

const relTime = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const m = 60_000, h = 60*m, d = 24*h;
  if (diff < h) return `${Math.max(1, Math.floor(diff/m))}분전`;
  if (diff < d) return `${Math.floor(diff/h)}시간전`;
  return `${Math.floor(diff/d)}일전`;
};

type Props = {
  rooms: Room[];
  currentRoomId?: string;
  onSelect: (id: string) => void;
  onLeaveRoom: (id: string) => void; 
};

const RoomList = forwardRef<HTMLDivElement, Props>(
  ({ rooms, currentRoomId, onSelect, onLeaveRoom }, ref) => {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    // 바깥 클릭 시 메뉴 닫기
    useEffect(() => {
      const onDocClick = () => setOpenMenuId(null);
      document.addEventListener('click', onDocClick);
      return () => document.removeEventListener('click', onDocClick);
    }, []);

    return (
      <S.Wrap>
        <S.Title>전체 대화</S.Title>
        <S.Scroll ref={ref}>
          {rooms.map(r => {
            const active = r.id === currentRoomId;
            const menuOpen = openMenuId === r.id;

            return (
              <S.Item
                key={r.id}
                active={active}
                onClick={() => onSelect(r.id)}
              >
                <S.Row>
                  <S.Avatar style={{ backgroundImage: r.avatar ? `url(${r.avatar})` : undefined }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <S.NickLine>
                      <S.Nick>{r.nick}</S.Nick>
                      {r.verified && <img src={levelImg} alt="레벨 3 이미지" width={16} />}
                      <S.Time>• {relTime(r.updatedAt)}</S.Time>
                    </S.NickLine>
                    <S.Last>{r.last}</S.Last>
                  </div>
                  {r.unread > 0 && <S.Unread>{r.unread}</S.Unread>}
                </S.Row>

                <S.KebabBtn
                  aria-label="대화방 메뉴 열기"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(prev => (prev === r.id ? null : r.id));
                  }}
                >
                  {/* 세로 점 3개 아이콘 */}
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
          })}
        </S.Scroll>
      </S.Wrap>
    );
  }
);

export default RoomList;
