import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  min-width: 1200px; /* 최소 너비 */
  margin: 0 auto;
  padding: 40px 20px 60px;
  box-sizing: border-box;
`;

export const TabWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  border-bottom: 2px solid #ccc;
`;

export const Tab = styled.button<{ $active: boolean }>`
  padding: 16px 32px;
  background: none;
  border: none;
  border-bottom: 3px solid ${({ $active }) => ($active ? '#997BEB' : 'transparent')};
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  color: ${({ $active }) => ($active ? '#000' : '#999')};
  cursor: pointer;
  font-size: 20px;
`;