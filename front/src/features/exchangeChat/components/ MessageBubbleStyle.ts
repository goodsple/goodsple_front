import styled from 'styled-components';

const COLORS = {
  primary: '#997BEB',   // 내 메시지 보라 테두리
  gray:    '#D9D9D9',   // 상대 메시지 회색 테두리
  text:    '#1F2937',
  muted:   '#9AA0A6',
};

export const Row = styled.div<{ mine?: boolean }>`
  display: flex;
  justify-content: ${({ mine }) => (mine ? 'flex-end' : 'flex-start')};
  align-items: flex-end;
  gap: 6px;
`;

export const Bubble = styled.div<{ mine?: boolean }>`
  max-width: 64%;
  background: #fff;
  color: ${COLORS.text};
  border: 1.5px solid ${({ mine }) => (mine ? COLORS.primary : COLORS.gray)};
  border-radius: ${({ mine }) =>
    mine ? '16px 16px 4px 16px' : '16px 16px 16px 4px'};
  padding: 10px 12px;
  box-shadow: 0 1px 2px rgba(0,0,0,.05);
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 14px;
  line-height: 1.45;
`;

/* 말풍선 바깥 오른쪽에 붙는 메타 정보 */
export const Meta = styled.div<{ mine?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  color: ${COLORS.muted};
  white-space: nowrap;
  margin-left: ${({ mine }) => (mine ? '6px' : '6px')};
  margin-right: ${({ mine }) => (mine ? '0' : '0')};

  .read {
    color: ${COLORS.muted};
  }
  .unread { color: ${COLORS.primary}; } 
`;
