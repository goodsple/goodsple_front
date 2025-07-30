import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  
  th, td {
    border-bottom: 1px solid #dee2e6;
    padding: 14px 12px;
    text-align: center;
    vertical-align: middle;
  }

  th {
    background-color: #f8f9fa;
    font-weight: 600;
  }
  
  tbody tr:hover {
    background-color: #f1f3f5;
  }
  
  td[colspan] {
    text-align: center;
    padding: 50px;
    color: #868e96;
  }
`;

export const StatusBadge = styled.span<{status: string}>`
  padding: 5px 10px;
  border-radius: 15px;
  font-weight: bold;
  font-size: 12px;
  color: white;
  background-color: ${({status}) => 
    status === '예정' ? '#adb5bd' : 
    status === '진행중' ? '#228be6' :
    '#495057'
  };
`;
export const PaymentStatusBadge = styled.span<{status: string}>`
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  color: white;
  background-color: ${({status}) =>
    status === '결제 완료' ? '#20c997' :
    status === '미결제' ? '#fd7e14' :
    '#e03131' // 미결제(기한초과)
  };
`;
export const ActionButton = styled.button`
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-size: 12px;
  margin: 0 4px;
  &.view { background-color: #12b886; }
  &.edit { background-color: #f59f00; }
  &.stop { background-color: #fa5252; }
`;