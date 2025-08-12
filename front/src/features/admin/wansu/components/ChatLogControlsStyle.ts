import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ControlRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Label = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #495057;
  width: 80px;
  flex-shrink: 0;
`;

export const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  width: 250px;
  font-size: 14px;
`;