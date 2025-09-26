import styled from 'styled-components';

const COLORS = { line: '#EAE7E2' };

export const Card = styled.div`
  border-bottom: 1px solid ${COLORS.line};
  padding: 10px 14px;
  display: flex; 
  align-items: center; 
  gap: 12px;
`;

export const Thumb = styled.div`
  width: 64px; 
  height: 64px; 
  border-radius: 8px;
  background: #e5e7eb; 
  background-size: cover; 
  background-position: center;
  flex: 0 0 64px;
`;

export const Title = styled.div`
  font-weight: 800;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis;
`;

export const Tags = styled.div`
  display: flex; 
  gap: 8px; 
  flex-wrap: wrap; 
  margin-top: 6px;
`;

export const Tag = styled.span`
  font-size: 12px; 
  padding: 3px 8px; 
  border: 1px solid ${COLORS.line}; 
  border-radius: 999px;
`;
