import styled from 'styled-components';

export const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background-color: #f8f9fa;
`;

export const CardBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const CardEndDate = styled.p`
  font-size: 13px;
  color: #868e96;
  margin: 0 0 8px 0;
`;

export const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 12px 0;
  flex-grow: 1;
`;

export const CardPrice = styled.p`
  font-size: 20px;
  font-weight: 900;
  color: #343a40;
  margin: 0 0 20px 0;
`;

export const CountdownTimer = styled.div`
  font-size: 13px;
  color: #e64980;
  font-weight: 500;
  margin-bottom: 12px;
  text-align: right;
`;

export const StatusBadge = styled.span`
  align-self: flex-start;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 20px;

  &.paid {
    background-color: #B1FF90;
    color: #212529;
  }
  &.unpaid {
    background-color: #e64980;
    color: white;
  }
  &.expired {
    background-color: #868e96;
    color: white;
  }
`;

export const PayButton = styled.button`
  width: 100%;
  padding: 14px;
  border: none;
  background-color: #997BEB;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  margin-top: auto;

  &.expired {
    background-color: #ced4da;
    cursor: not-allowed;
  }
  &.paid {
    background-color: #B1FF90;
    color: #444;
    cursor: default;
  }
`;