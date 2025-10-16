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
  }
`;


export const Thead = styled.thead``;
export const Tbody = styled.tbody``;
export const Tr = styled.tr``;
export const Th = styled.th``;
export const Td = styled.td``;

// ✨ '경매 상태' 배지: 색상 통일
export const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 12px;
  color: #fff;
  background-color: #997BEB; /* 연보라 */
  
  display: inline-block;
  min-width: 50px;
  text-align: center;
  box-sizing: border-box;
`;

// ✨ '결제 상태' 배지: 타입 수정
export const PaymentStatusBadge = styled.span<{ $status: '결제 완료' | '결제대기' | '기한초과' }>`
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 12px;
  display: inline-block;
  min-width: 50px;
  text-align: center;
  box-sizing: border-box;

  color: ${({ $status }) => ($status === '결제대기' ? '#444' : '#fff')};
  background-color: ${({ $status }) => {
    switch($status) {
      case '결제 완료': return '#B1FF90'; // 연두
      case '결제대기': return '#F8FFC7'; // 노랑
      case '기한초과': return '#FA5252'; // 빨강
      default: return '#ced4da';
    }
  }};
`;

export const ActionButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

export const ActionButton = styled.button<{ variant: string }>`
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-size: 12px;
  background-color: ${({ variant }) => 
    variant === '수정' || variant === '결과' ? '#997BEB' : '#444444'
  };
`;

export const ClickableTr = styled.tr`
  cursor: pointer;

  &:hover {
    background-color: #f1f3f5; // 마우스를 올렸을 때 배경색 변경
  }
`;