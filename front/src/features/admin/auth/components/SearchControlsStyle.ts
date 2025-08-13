import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 24px; 
`;

export const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;  

  label {
    font-weight: 500;
    white-space: nowrap;
  }

  select,
  input[type="text"],
  input[type="date"] {
    padding: 8px 12px;
    border: 1px solid #9A9A9A;
    border-radius: 5px;
  }
  input[type="text"] {
    width: 208px;
  }

  span {
    margin: 0 4px;
  }
  input[type="checkbox"][data-indeterminate="true"] {
    accent-color: #9aa0a6; /* 체크색보다 연하게 */
  }
`;

export const SearchButton = styled.button`
  padding: 6px 16px;
  background: #997BEB;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    opacity: 0.9;
  }
`;

export const ResetButton = styled.button`
  margin-left: 8px;
  padding: 6px 16px;
  background: #444;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
`;
