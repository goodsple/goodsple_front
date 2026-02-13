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
  margin-bottom: 10px;
`;

export const Title = styled.h3`
  font-size: 22px;
  font-weight: 700;
  margin: 0;
`;

export const UnresolvedBadge = styled.div`
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
    font-weight: 400;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody td:first-child {
    font-weight: 600;
  }
`;
