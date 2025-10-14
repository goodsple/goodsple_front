// AdminCategoryTable.styles.ts
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const RegisterButton = styled.button`
  padding: 10px 20px;
  background-color: #997beb;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #7a5fd1;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 200px;
`;

export const SearchButton = styled.button`
  padding: 8px 14px;
  background-color: #444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #222;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 40px; /* 하단 여백 추가 */

  th, td {
    padding: 12px;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
  }

  th {
    background-color: #f5f5f5;
    font-weight: bold;
  }

  tbody tr:hover {
    background-color: #997beb;
    color: #fff;
    cursor: pointer;
  }
`;

export const ActionButton = styled.button`
  padding: 5px 15px;
  margin: 0 4px;
  font-size: 13px;
  border: 1px solid #aaa;
  background-color: white;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    background-color: #444444;
    color: white;
  }
`;

// 페이지네이션 컨테이너
export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px; /* 테이블과 간격 */
  margin-bottom: 40px; /* 페이지 하단 여백 */
`;
