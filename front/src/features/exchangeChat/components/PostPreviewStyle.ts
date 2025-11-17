import styled from 'styled-components';

const COLORS = { line: '#EAE7E2', tag: '#faf7f3', gray: '#6b7280', green: '#B1FF90', purple: '#997BEB' };

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

export const Right = styled.div`
  min-width: 0;
  display: grid;
  gap: 6px;
`;

export const Title = styled.div`
  font-weight: 800;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Method = styled.span<{ $type: '직거래' | '택배' }>`
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  color: #444;
  background: ${({ $type }) => ($type === '직거래' ? COLORS.green : COLORS.purple)};
`;

export const Region = styled.span`
  font-size: 12px;
  color: ${COLORS.gray};
`;

export const Tags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Tag = styled.span`
  font-size: 12px;
  padding: 3px 8px;
  border: 1px solid ${COLORS.line};
  border-radius: 999px;
  background: ${COLORS.tag};
`;
