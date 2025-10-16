import styled from 'styled-components';

export const Scroll = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 16px 32px 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 0;

  /* 채팅 영역에서만 네이티브 스크롤 숨김 */
  scrollbar-width: none;        /* Firefox */
  &::-webkit-scrollbar{ width: 0; height: 0; }  /* WebKit */
  overscroll-behavior: contain; /* 바운스/부모 스크롤 방지 */
`;

export const DateDivider = styled.div`
  text-align: center;
  margin: 20px 0 40px;      
  color: #000;
  font-weight: 700;
  font-size: 14px;
`;

/* 메시지 사이에 끼워 넣는 간격 */
export const Spacer = styled.div<{ size: number }>`
  height: ${({ size }) => `${size}px`};
  flex: 0 0 auto;
`;

export const UnreadDivider = styled.div`
  display: flex; 
  align-items: center; 
  gap: 12px;
  margin: 14px 0;
  color: #9A9A9A; 
  font-size: 12px;
  &::before, 
  &::after { content: ""; flex: 1; height: 1px; background: #EAE7E2; }
`;

export const UnreadPill = styled.span`
  padding: 4px 10px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid #EAE7E2;
  font-weight: 700;
`;
