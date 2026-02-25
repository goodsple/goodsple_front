import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  padding: 12px 14px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  font-size: 22px;
  font-weight: 700;
  margin: 0;
`;

export const DateText = styled.span`
  font-size: 11px;
  color: #888;
  font-weight: 400;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  flex: 1;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  height: 20px;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Rank = styled.span<{ $highlight?: boolean }>`
  width: 20px;
  font-weight: 700;
  color: ${({ $highlight }) => ($highlight ? '#e53935' : '#666')};
`;

export const Keyword = styled.span`
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Count = styled.span`
  font-size: 11px;
  color: #999;
  margin-left: 6px;
`;

export const Change = styled.span`
  font-size: 10px;
  margin-left: 4px;
`;

export const Up = styled.span`
  color: #e53935;
  font-weight: 600;
`;

export const Down = styled.span`
  color: #1e88e5;
  font-weight: 600;
`;

export const Flat = styled.span`
  color: #aaa;
`;

export const SummaryColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  margin-bottom: 6px;
`;

export const StatLine = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  strong {
    font-weight: 700;
  }
`;

export const SummaryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  font-size: 14px;
  margin: 10px 0 10px 0;
`;

export const StatBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  gap: 1px;
`;

export const StatLabel = styled.span`
  font-weight: 400;
  color: #444;
`;

export const StatValue = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
`;

export const MetaRow = styled.div`
  font-size: 11px;
  color: #777;
  display: flex;
  gap: 6px;
  margin-bottom: 6px;

  strong {
    font-weight: 700;
  }
`;