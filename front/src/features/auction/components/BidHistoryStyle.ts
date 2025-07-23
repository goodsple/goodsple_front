import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden; /* 테이블 radius 적용을 위함 */
`;

export const Title = styled.div`
  padding: 16px;
  font-weight: 700;
  font-size: 16px;
  color: #444;
  border-bottom: 1px solid #f0f0f0;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Thead = styled.thead`
  background-color: #f8f9fa;
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
`;

export const Th = styled.th`
  padding: 12px;
  text-align: center;
  font-weight: 500;
  font-size: 14px;
  color: #888;
`;

export const Tbody = styled.tbody``;

export const Td = styled.td`
  padding: 12px;
  text-align: center;
  font-size: 14px;
  color: #666;
  border-top: 1px solid #f0f0f0;
`;