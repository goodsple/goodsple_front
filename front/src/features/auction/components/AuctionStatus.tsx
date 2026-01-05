import { useEffect, useState } from 'react';
import type { AuctionStatus as AuctionStatusType } from '../types/auction';
import * as S from './AuctionStatusStyle';

const formatTime = (seconds: number) => {
  if (seconds < 0) return '00:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

interface Props {
  status: AuctionStatusType;
}

const AuctionStatus: React.FC<Props> = ({ status }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [priceChanged, setPriceChanged] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endTimeMs = new Date(status.endTime).getTime();
      const nowMs = new Date().getTime();
      return Math.max(0, Math.floor((endTimeMs - nowMs) / 1000));
    };

    setTimeLeft(calculateTimeLeft()); 

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [status.endTime]); 
  useEffect(() => {
    setPriceChanged(true);
    const timer = setTimeout(() => setPriceChanged(false), 200);
    return () => clearTimeout(timer);
  }, [status.currentPrice]);

  return (
    <S.Wrapper>
      <S.Timer>
        남은 시간: 
        <S.TimerTime $isUrgent={timeLeft < 60}>{formatTime(timeLeft)}</S.TimerTime>
      </S.Timer>
      <S.PriceLabel>현재 최고가</S.PriceLabel>
      <S.CurrentPrice $priceChanged={priceChanged}>
        {status.currentPrice.toLocaleString()}원
      </S.CurrentPrice>
      <S.HighestBidder>최고 입찰자: {status.highestBidderNickname}</S.HighestBidder>
      <S.StartPrice>시작가: {status.startPrice.toLocaleString()}원</S.StartPrice>
    </S.Wrapper>
  );
};

export default AuctionStatus;