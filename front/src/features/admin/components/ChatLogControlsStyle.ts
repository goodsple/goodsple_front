import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 24px;
`;

export const FilterSection = styled.div`
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

export const TabGroup = styled.div`
  display: flex;
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
  padding: 12px 20px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${({ $isActive }) => $isActive ? '#997BEB' : '#868e96'};
  font-size: 16px;
  font-weight: ${({ $isActive }) => $isActive ? '700' : '500'};
  border-bottom: 2px solid ${({ $isActive }) => $isActive ? '#997BEB' : 'transparent'};
`;