/**
 * 파일 경로: src/features/usermain/components/UserMainComponents/CurrentAuction.tsx
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { UserMainAuction } from '../types/mainPage';
import CSS from './UserMainComponents.module.css';

// 남은 시간을 계산하고 'HH:mm:ss' 형식으로 변환하는 함수
const formatTimeLeft = (endTime: string) => {
  const now = new Date().getTime();
  const end = new Date(endTime).getTime();
  const diff = Math.floor((end - now) / 1000);

  if (diff <= 0) return '00:00:00';

  const hours = String(Math.floor(diff / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
  const seconds = String(diff % 60).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};

interface Props {
  auction: UserMainAuction;
}

const CurrentAuction: React.FC<Props> = ({ auction }) => {
  const [timeLeft, setTimeLeft] = useState(() => formatTimeLeft(auction.endTime));
  const isScheduled = auction.status === 'scheduled';

  // 1초마다 남은 시간을 업데이트하는 타이머
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(formatTimeLeft(auction.endTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [auction.endTime]);

  return (
    <div className={CSS.currentAuction}>
      <div className={CSS.imageContainer}>
        <img src={auction.imageUrl} alt={auction.auctionTitle} />
        {/* '예정' 상태일 때만 반투명 오버레이를 보여줍니다. */}
        {isScheduled && (
          <div className={CSS.scheduledOverlay}>
            <p>경매 예정</p>
            {/* 'ko-KR' 옵션으로 한국 날짜/시간 형식으로 표시 */}
            <span>{new Date(auction.startTime).toLocaleString('ko-KR')} 시작</span>
          </div>
        )}
      </div>
      <div className={CSS.currentAuctionRight}>
        <p className={CSS.prTitle}>
          {isScheduled ? '곧 시작될 경매' : '현재 진행중인 경매'}
        </p>
        <p className={CSS.prName}>{auction.auctionTitle}</p>
        <div className={CSS.prTextWrap}>
          <div className={CSS.prText1Wrap}>
            <p>시작가</p>
            <p>현재 입찰가</p>
            <p>남은 시간</p>
          </div>
          <div className={CSS.prText2Wrap}>
            <p>{auction.startPrice.toLocaleString()}원</p>
            <div className={CSS.currentBidBox}>
              <p className={CSS.currentBid}>{auction.currentPrice.toLocaleString()}원</p>
            </div>
            <p>{timeLeft}</p>
          </div>
        </div>
        <Link to={`/auction/live/${auction.auctionId}`} className={CSS.auctionLink}>
          <button className={CSS.auctionButton} disabled={isScheduled}>
            {isScheduled ? '대기중' : '참여하기'}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CurrentAuction;