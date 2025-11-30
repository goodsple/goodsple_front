import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const PageWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 180px); /* 헤더와 푸터 높이를 제외한 영역 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  box-sizing: border-box;
`;

export const ResultCard = styled.div`
  background-color: white;
  padding: 50px 60px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  text-align: center;
  max-width: 600px;
  width: 100%;

  &.failure {
    h1 {
      color: #e03131;
    }
  }
`;

export const Icon = styled.div`
  font-size: 60px;
  line-height: 1;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 28px;
  margin-top: 0;
  margin-bottom: 15px;
  color: #212529;
`;

export const Message = styled.p`
  font-size: 16px;
  color: #495057;
  line-height: 1.6;
  margin-bottom: 40px;
`;

export const OrderSummary = styled.div`
  border-top: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
  padding: 20px 0;
  margin-bottom: 40px;
  text-align: left;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 15px;

  &:last-child {
    margin-bottom: 0;
  }

  span:first-child {
    color: #868e96;
  }
  span:last-child {
    font-weight: 500;
    color: #343a40;
  }

  &.total {
    font-size: 18px;
    font-weight: bold;
    span:last-child {
      color: #997BEB;
    }
  }
`;

export const FailureInfo = styled.div`
  background-color: #fff5f5;
  border: 1px solid #ffc9c9;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 40px;
  text-align: left;

  p {
    margin: 0;
    font-size: 14px;
  }
  
  strong {
    display: block;
    margin-bottom: 5px;
    font-size: 15px;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const buttonStyles = css<{ $primary?: boolean; $danger?: boolean }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid ${({ $primary, $danger }) => ($primary || $danger ? 'transparent' : '#ced4da')};
  background-color: ${({ $primary, $danger }) => 
    $danger ? '#e03131' : 
    $primary ? '#997BEB' : 
    'white'};
  color: ${({ $primary, $danger }) => ($primary || $danger ? 'white' : '#495057')};
`;

export const ActionLink = styled(Link)<{ $primary?: boolean; $danger?: boolean }>`
  ${buttonStyles}
`;

export const ActionButton = styled.button<{ $primary?: boolean; $danger?: boolean }>`
  ${buttonStyles}
`;