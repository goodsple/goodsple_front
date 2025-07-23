import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  text-align: center;
`;

export const Timer = styled.div`
  color: #868e96;
  margin-bottom: 16px;
`;

const blink = keyframes`
  50% { opacity: 0.5; }
`;

export const TimerTime = styled.span<{ $isUrgent: boolean }>`
  font-weight: bold;
  color: ${({ $isUrgent }) => ($isUrgent ? '#e64980' : '#495057')};
  transition: color 0.3s;
  animation: ${({ $isUrgent }) => $isUrgent && blink} 1s step-end infinite;
`;

export const PriceLabel = styled.div`
  font-size: 16px;
  color: #495057;
`;

const highlight = keyframes`
  from { transform: scale(1); }
  to { transform: scale(1.1); }
`;

export const CurrentPrice = styled.div<{ $priceChanged: boolean }>`
  font-size: 42px;
  font-weight: 900;
  color: #997BEB;
  margin-bottom: 8px;
  transition: all 0.2s ease-in-out;
  animation: ${({ $priceChanged }) => $priceChanged && highlight} 0.2s ease-in-out;
`;

export const HighestBidder = styled.div`
  color: #868e96;
`;

export const StartPrice = styled.div`
  font-size: 14px;
  color: #868e96;
  margin-top: 8px;
`;