import styled from 'styled-components';

const COLORS = { line: '#EAE7E2', muted: '#9A9A9A' };

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
`;

export const Title = styled.div`
  padding: 16px;
  font-weight: 700;
  font-size:22px;
`;

export const Scroll = styled.div<{ $empty?: boolean }>`
  height: 100%;
  overflow: ${({ $empty }) => ($empty ? 'hidden' : 'auto')};

  /* 빈 상태일 때 기본 스크롤바 완전 숨김 */
  ${({ $empty }) =>
    $empty &&
    `
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  `}
`;

export const Item = styled.button<{ $active?: boolean }>`
  width: 100%;
  text-align: left;
  background: ${({ $active }) => ($active ? '#F6F3FF' : 'transparent')};
  border: 0;
  border-bottom: 1px solid ${COLORS.line};
  padding: 12px 14px;
  cursor: pointer;
  position: relative;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e5e7eb;
  background-size: cover;
  background-position: center;
  flex: 0 0 40px;
`;

export const NickLine = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Nick = styled.span`
  font-weight: 700;
`;

export const Time = styled.span`
  font-size: 12px;
  color: ${COLORS.muted};
`;

export const Last = styled.div`
  font-size: 13px;
  color: #555;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Unread = styled.span`
  background: #6c5ce7;
  color: #fff;
  border-radius: 999px;
  font-size: 12px;
  padding: 2px 8px;
  margin-left: 6px;
  line-height: 1;
`;

export const KebabBtn = styled.button`
  position: absolute;
  right: 8px;
  top: 12px;
  border: 0;
  background: transparent;
  color: #999;
  cursor: pointer;
`;

export const Menu = styled.div`
  position: absolute;
  right: 8px;
  top: 32px;
  background: #fff;
  border: 1px solid ${COLORS.line};
  border-radius: 8px;
  overflow: hidden;
  z-index: 10;
`;

export const MenuItem = styled.button`
  width: 160px;
  padding: 10px 12px;
  text-align: left;
  background: #fff;
  border: 0;
  font-size: 14px;
  cursor: pointer;

  &.danger {
    color: #d63031;
  }

  &:hover {
    background: #fafafa;
  }
`;

/* 빈 상태 전용 컨테이너 */
export const EmptyCenter = styled.div`
  position: absolute;       /* 스크롤 높이 영향을 안 주도록 고정 */
  inset: 0;
  display: grid;
  place-items: center;      /* 수직/수평 중앙 */
  text-align: center;
  padding: 16px;
  color: #9A9A9A;
  line-height: 1.6;
  white-space: pre-line;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity .25s ease, transform .25s ease;

  &.show {
    opacity: 1;
    transform: translateY(0);
  }
`;
