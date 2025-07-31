import { useEffect, useState } from 'react';
import type { AuctionStatus as AuctionStatusType } from '../types/auction';
import * as S from './AuctionStatusStyle';

interface Props {
  status: AuctionStatusType;
  timeLeft: number;
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const AuctionStatus: React.FC<Props> = ({ status, timeLeft }) => {
    const [priceChanged, setPriceChanged] = useState(false);

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