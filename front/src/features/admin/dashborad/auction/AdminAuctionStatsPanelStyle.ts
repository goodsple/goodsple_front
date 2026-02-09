import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  padding-top: 4px;
`;

export const HeaderRow = styled.div`
  margin-bottom: 14px;
`;

export const HeaderTopRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
`;

export const Title = styled.h3`
  font-size: 22px;
  font-weight: 700;
  margin: 0;
`;

export const MetricBadge = styled.div`
  font-size: 14px;
  color: #444;
  font-weight: 400;

  strong {
    font-weight: 600;
    margin-left: 4px;
  }
`;

export const SummaryRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  font-size: 14px;

  span {
    color: #444;
    font-weight: 400;
  }

  strong {
    font-weight: 600;
    margin-left: 4px;
  }
`;

export const TableNote = styled.div`
  font-size: 12px;
  color: #777;
  text-align: right;
  margin-bottom: 6px;
  font-weight: 400;
`;

export const ChartBox = styled.div`
  width: 100%;
  height: 260px;
  margin-top: 4px;
`;

export const ChartHint = styled.div`
  font-size: 12px;
  color: #777;
  text-align: right;
  margin-top: 6px;
  font-weight: 400;
`;
