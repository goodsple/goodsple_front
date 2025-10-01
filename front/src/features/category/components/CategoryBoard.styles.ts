// CategoryBoard.styles.ts
import styled from 'styled-components';

export const BoardWrapper = styled.div`
  width: 1200px;
  margin: 60px auto;  // 검색창 위 여백 추가
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const BoardSearchWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

// export const BoardSearchInput = styled.input`
//   padding: 8px 12px;
//   border: 1px solid #997BEB;
//   border-radius: 5px;
//   font-family: 'Pretendard', sans-serif;
//   font-size: 15px;
//   color: #444444;

//   &::placeholder {
//     color: rgba(153, 123, 235, 0.5);
//   }
// `;

// export const SearchButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   display: flex;
//   align-items: center;

//   img {
//     width: 20px;
//     height: 20px;
//   }
// `;

export const WriteButton = styled.button`
  background-color: #997BEB;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;


  

  &:hover {
    opacity: 0.9;
  }
`;

export const CateTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: 'Pretendard', sans-serif;
`;

export const TableHead = styled.thead`
  background-color: #f5f5f5;
`;

export const TableRow = styled.tr`
  &:hover {
    background-color: #f9f9f9;
  }
`;

export const TableHeader = styled.th`
  padding: 12px;
  text-align: center;
  border-bottom: 2px solid #997BEB;
  font-weight: 600;
`;

export const TableData = styled.td`
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid rgba(153, 123, 235, 0.5);
  vertical-align: middle;

  img {
    width: 20px;
    height: 20px;
    margin: 0 2px;
    cursor: pointer;
  }
`;

export const EmptyRow = styled.tr`
  td {
    text-align: center;
    padding: 20px;
    color: #999999;
  }
`;
