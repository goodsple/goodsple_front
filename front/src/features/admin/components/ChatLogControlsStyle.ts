import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

export const ControlRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const SearchGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Label = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #495057;
  width: 80px;
`;

export const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  width: 250px;
  font-size: 14px;
`;

export const TabGroup = styled.div`
  display: flex;
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
  padding: 8px 16px;
  border: 1px solid #ced4da;
  background-color: ${({ $isActive }) => $isActive ? '#997BEB' : '#fff'};
  color: ${({ $isActive }) => $isActive ? '#fff' : '#495057'};
  cursor: pointer;
  
  &:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  &:not(:last-child) {
    border-right: none;
  }
  &:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;