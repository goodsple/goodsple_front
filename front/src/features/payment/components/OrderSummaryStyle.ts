import styled from 'styled-components';

export const SummaryCard = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 24px;
`;

export const Title = styled.h2`
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 20px;
`;

export const OrderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  background-color: #e9ecef;
`;

export const ItemInfo = styled.div`
  p {
    margin: 0 0 8px 0;
    font-size: 15px;
  }
  strong {
    font-size: 18px;
  }
`;

export const PriceSummary = styled.div`
  p {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    font-size: 15px;
    color: #495057;
  }
  .total-price {
    font-size: 18px;
    margin-top: 15px;
  }
  .total-price strong {
    font-size: 24px;
    color: #997BEB;
  }
`;

export const FinalPayButton = styled.button`
  width: 100%;
  padding: 16px;
  margin-top: 20px;
  border: none;
  background-color: #997BEB;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  
  &:disabled {
    background-color: #ced4da;
    cursor: not-allowed;
  }
`;