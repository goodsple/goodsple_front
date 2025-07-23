import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;

export const MyBidStatus = styled.div`
  background-color: #B1FF90;
  color: #212529;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const Form = styled.form`
  display: flex;
  gap: 10px;
`;

export const BidInput = styled.input`
  flex-grow: 1;
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 16px;
`;

export const BidButton = styled.button`
  padding: 12px 24px;
  border: none;
  background-color: #997BEB;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
`;

export const QuickBidButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const QuickBidButton = styled.button`
  flex-grow: 1;
  padding: 10px;
  background-color: #f1f3f5;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
`;