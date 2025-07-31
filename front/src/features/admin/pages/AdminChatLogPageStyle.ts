import styled from 'styled-components';

export const TabGroup = styled.div`
  display: flex;
  border-bottom: 2px solid #f1f3f5;
  margin: 24px 0;
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
  margin-bottom: -2px;
`;