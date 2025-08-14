import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
  margin-top: 40px;

  th, td {
    padding: 12px 8px;
    border-bottom: 1px solid #e0e0e0;
    text-align: center;
  }

  th {
    background: #f5f5f5;
    font-weight: 600;
  }

  tbody tr:hover {
    background: #997BEB;
    color: #fff;
    cursor: pointer;
  }
`;

export const SortableTh = styled.th`
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  /* 옵션: 살짝 호버 효과 */
  &:hover {
    background-color: #f9f9f9;
  }
`;

export const Button = styled.button`
  margin: 0 4px;
  padding: 5px 10px;
  border: 1px solid #444;
  border-radius: 5px;
  color: #444;
  background: #fff;
  cursor: pointer;
  font-size: 0.875rem;

  /* 활성화일 때만 hover 효과 */
  &:not(:disabled):hover {
    background: #E03131;
    color: #fff;
  }

  /* 비활성화 상태 */
  &:disabled {
    background: #D9D9D9;   
    color: #666;          
    border-color: #bbb;   
    cursor: not-allowed;   
    /* pointer-events: none; 
  }
  
`;
