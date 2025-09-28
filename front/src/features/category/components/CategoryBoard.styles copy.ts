import styled from 'styled-components';

// 원본
export const BoardWrapper = styled.div`
  padding: 20px;
`;

export const BoardSearchWrap = styled.div`
  display: flex;
  margin-bottom: 20px;
  gap: 10px;
`;

export const BoardSearchInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }
`;

export const WriteButton = styled.button`
  background-color: #997BEB;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    opacity: 0.9;
  }
`;

export const CateTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #f5f5f5;
`;

export const TableRow = styled.tr`
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

export const TableData = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eee;
`;

export const EmptyRow = styled.tr`
  td {
    text-align: center;
    padding: 20px;
  }
`;
