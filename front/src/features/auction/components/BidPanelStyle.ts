import styled from 'styled-components';

export const Wrapper = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const HighlightMessage = styled.div`
  color: #B1FF90; /* 서브컬러2 - 형광연두 */
  background-color: #444;
  font-weight: 700;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
`;

export const BidInputContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const BidInput = styled.input`
  flex: 1;
  padding: 14px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 16px;
  text-align: right;

  &::placeholder {
    color: #aaa;
  }
`;

export const BidButton = styled.button`
  background-color: #997BEB;
  color: #fff;
  border: none;
  padding: 14px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
`;

export const QuickBidButtons = styled.div`
  display: flex;
  gap: 10px;
`;

export const QuickBidButton = styled.button`
  flex: 1;
  background-color: #f8f9fa;
  border: 1px solid #d9d9d9;
  color: #666;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #997BEB;
    color: #997BEB;
  }
`;