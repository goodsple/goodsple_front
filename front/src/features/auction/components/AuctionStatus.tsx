/**
 * 파일 경로: src/features/auction/components/AuctionStatus.tsx
 */
import { useEffect, useState } from 'react';
import type { AuctionStatus as AuctionStatusType } from '../types/auction';
import * as S from './AuctionStatusStyle';

// 음수일 경우 '00:00'을 반환하도록 수정
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

  // ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ 타이머 로직을 이 컴포넌트 내부로 옮겼습니다. ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  useEffect(() => {
    const calculateTimeLeft = () => {
      const endTimeMs = new Date(status.endTime).getTime();
      const nowMs = new Date().getTime();
      return Math.max(0, Math.floor((endTimeMs - nowMs) / 1000));
    };

    setTimeLeft(calculateTimeLeft()); // 최초 남은 시간 설정

    // 1초마다 남은 시간을 다시 계산하여 업데이트
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // 컴포넌트가 사라질 때 타이머를 정리합니다.
    return () => clearInterval(timer);
  }, [status.endTime]); // 경매 종료 시간이 바뀔 때만 타이머를 재설정합니다.
  // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

  // 가격 변경 시 애니메이션 효과를 위한 useEffect
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