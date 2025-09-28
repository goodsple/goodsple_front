import styled from 'styled-components';

const COLORS = {
  muted: '#9AA0A6',
};

export const Scroll = styled.div`
    height: 100%;
    overflow-y: auto;
    padding: 16px 18px;
    display: flex;
    flex-direction: column;
    gap: 0px;
`;

export const DateDivider = styled.div`
  text-align: center;
  margin: 20px 0 40px;      
  color: ${COLORS.muted};
  font-weight: 700;
  font-size: 14px;
`;

/* 메시지 사이에 끼워 넣는 간격 */
export const Spacer = styled.div<{ size: number }>`
  height: ${({ size }) => `${size}px`};
  flex: 0 0 auto;
`;

export const UnreadDivider = styled.div`
  display: flex; align-items: center; gap: 12px;
  margin: 14px 0;
  color: #9AA0A6; font-size: 12px;
  &::before, &::after { content: ""; flex: 1; height: 1px; background: #EAE7E2; }
`;

export const UnreadPill = styled.span`
  padding: 4px 10px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid #EAE7E2;
  font-weight: 700;
`;
