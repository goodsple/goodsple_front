import styled from 'styled-components';

const COLORS = {
  primary: '#997BEB',   // 내 메시지 보라 테두리
  gray:    '#D9D9D9',   // 상대 메시지 회색 테두리
  text:    '#000000',
  muted:   '#9A9A9A',
};

export const Row = styled.div<{ $mine: boolean }>`
  display: flex;
  justify-content: ${({ $mine }) => ($mine ? 'flex-end' : 'flex-start')};
  align-items: flex-end;
  gap: 6px;
`;

export const Bubble = styled.div<{ $mine: boolean }>`
  max-width: 64%;
  background: #fff;
  color: ${COLORS.text};
  border: 1.5px solid ${({ $mine }) => ($mine ? COLORS.primary : COLORS.gray)};
  border-radius: ${({ $mine }) =>
    $mine ? '16px 16px 4px 16px' : '16px 16px 16px 4px'};
  padding: 10px 12px;
  box-shadow: 0 1px 2px rgba(0,0,0,.05);
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 14px;
  line-height: 1.45;
`;

/* 말풍선 바깥 오른쪽에 붙는 메타 정보 */
export const Meta = styled.div<{ $mine: boolean }>`
  display: inline-flex;
  align-items: end;
  font-size: 12px;
  color: ${COLORS.muted};
  white-space: nowrap;

  /* 내 메시지: 메타가 왼쪽에 오므로 오른쪽 여백을,
     상대 메시지: 메타가 오른쪽에 오므로 왼쪽 여백을 준다 */
  margin-right: ${({ $mine }) => ($mine ? '6px' : '0')};
  margin-left:  ${({ $mine }) => ($mine ? '0' : '6px')};

  /* 폭이 너무 좁아지지 않게 최소 폭 */
  min-width: 64px;
  text-align: ${({ $mine }) => ($mine ? 'right' : 'left')};

  .read   { color: ${COLORS.muted}; }
  .unread { color: ${COLORS.primary}; }

  flex-direction: column-reverse;
`;
