import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column; /* ✨ 세로 나열 */
  gap: 16px;
`;

export const ControlRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Label = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #495057;
  width: 80px;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
`;

export const SearchInput = styled.input`
  padding: 8px 32px 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  width: 300px;
  font-size: 14px;
`;

export const SearchIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #868e96;
`;

export const DateFilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DateInput = styled.input`
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 14px;
`;