import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 24px;
`;

export const SearchGroup = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ced4da;
  border-radius: 6px;
  background-color: #fff;
`;
export const SearchSelect = styled.select`
  border: none;
  background: transparent;
  padding: 8px 12px;
  font-size: 14px;
`;
export const SearchInput = styled.input`
  border: none;
  border-left: 1px solid #ced4da;
  padding: 8px 12px;
  font-size: 14px;
  min-width: 200px;
  &:focus { outline: none; }
`;
export const SearchButton = styled.button`
  border: none;
  background: transparent;
  padding: 8px 12px;
  cursor: pointer;
`;
export const FilterGroup = styled.div` display: flex; align-items: center; gap: 8px; `;
export const DateInput = styled.input`
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 6px;
`;
export const StatusFilterGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto; /* 오른쪽으로 밀기 */
`;
export const StatusButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ced4da;
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
  &.active {
    background-color: #997BEB;
    color: white;
    border-color: #997BEB;
  }
`;
export const RegisterButton = styled.button`
  background-color: #997BEB;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;