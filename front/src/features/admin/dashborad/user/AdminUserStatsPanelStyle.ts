import styled from "styled-components";

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
  margin-bottom: 14px;
`;

export const Title = styled.h3`
  font-size: 22px;
  font-weight: 700;
  margin: 0;
`;

export const TodayVisitors = styled.div`
  font-size: 14px;
  color: #444;

  strong {
    font-weight: 700;
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
  }

  strong {
    font-weight: 700;
    margin-left: 4px;
  }
`;

/* 표 설명 텍스트 (최근 3개월 기준) */
export const TableNote = styled.div`
  font-size: 12px;
  color: #777;
  text-align: right;
  margin-bottom: 6px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  margin-top: 4px;

  thead th {
    font-weight: 500;
    text-align: center;
    padding: 10px 6px;
    background-color: #fafafa;
    border-bottom: 2px solid #e3e3e3;
  }

  tbody td {
    padding: 9px 6px;
    text-align: center;
    border-bottom: 1px solid #f0f0f0;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody td:first-child {
    font-weight: 600;
  }
`;
