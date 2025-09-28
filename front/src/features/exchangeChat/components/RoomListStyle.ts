import styled from 'styled-components';

const COLORS = {
  line: '#EAE7E2',
  muted: '#9AA0A6',
  gray: '#6B7280',
  danger: '#DF3636'
};

export const Wrap = styled.div`
  height: 100%;
  display: flex; 
  flex-direction: column;
`;

export const Title = styled.div`
  padding: 18px 16px;
  font-size: 22px;
  font-weight: 600;
`;

export const Scroll = styled.div`
  overflow-y: auto;
  padding-bottom: 8px;
`;

export const Item = styled.button<{active?: boolean}>`
    position: relative; 
    width: 100%;
    background: ${({active}) => (active ? '#FAFAFA' : 'transparent')};
    border: 0;
    text-align: left; 
    cursor: pointer;
    padding: 12px 14px 12px 14px;
    padding-right: 40px;
    border-top: 1px solid ${COLORS.line};
`;

export const Row = styled.div`
    display: flex; 
    gap: 12px; 
    align-items: center;
`;

export const Avatar = styled.div`
    width: 44px;
    height: 44px;
    border-radius: 999px;
    background: #ddd; 
    background-size: cover; 
    background-position: center;
    flex: 0 0 44px;
`;

export const NickLine = styled.div`
    display: flex;
    align-items: center; 
    gap: 6px;
`;

export const Nick = styled.span`
    font-weight: 800;
`;

export const Time = styled.span`
  color: ${COLORS.muted}; 
  font-size: 12px;
`;

export const Last = styled.div`
  color: ${COLORS.gray}; 
  font-size: 14px;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis;
`;

export const Unread = styled.span`
  position: absolute;
  right: 48px;       
  top: 50%;
  transform: translateY(-50%);

  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: 999px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  background: #DF3636; 

  /* 숫자가 9 이상일 때도 모양 유지 */
  box-sizing: border-box;
`;

export const KebabBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 12px;
  width: 28px;
  height: 28px;
  border: 0;
  background: transparent;
  display: grid;
  place-items: center;
  cursor: pointer;
  color: ${COLORS.muted};
  opacity: 0.9;

  &:hover { background: rgba(0,0,0,0.04); }
  &:focus-visible { outline: 2px solid #E5E7EB; }
`;

/* 메뉴 박스 */
export const Menu = styled.div`
  position: absolute;
  top: 38px;
  right: 20px;
  min-width: 100px;
  background: #fff;
  border: 1px solid ${COLORS.line};
  box-shadow: 0 6px 18px rgba(0,0,0,.08);
  z-index: 20;
  overflow: hidden;
`;

/* 메뉴 아이템 */
export const MenuItem = styled.button`
  width: 100%;
  padding: 10px 12px;
  background: #fff;
  border: 0;
  text-align: left;
  cursor: pointer;
  font-size: 14px;

  &:hover { background: #F7F7F7; }
`;
