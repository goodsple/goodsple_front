import { useState } from 'react';
import type { AuctionStatus } from '../types/auction';
import * as S from './BidPanelStyle';

interface Props {
  status: AuctionStatus;
  currentUserNickname: string;
  onPlaceBid: (amount: number) => boolean;
}

const BidPanel: React.FC<Props> = ({ status, currentUserNickname, onPlaceBid }) => {
  const [myBidAmount, setMyBidAmount] = useState('');
  const isHighestBidder = currentUserNickname === status.highestBidderNickname;

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bidAmount = parseInt(myBidAmount, 10);
    if (isNaN(bidAmount)) return;

    const success = onPlaceBid(bidAmount);
    if (success) {
      setMyBidAmount('');
    }
  };

  const handleQuickBid = (amount: number) => {
    onPlaceBid(Number(status.currentPrice) + amount);
  };

  return (
    <S.Wrapper>
      {isHighestBidder && (
        <S.MyBidStatus>🎉 회원님이 현재 최고 입찰자입니다!</S.MyBidStatus>
      )}
      <S.Form onSubmit={handleBidSubmit}>
        <S.BidInput 
          type="number" 
          value={myBidAmount} 
          onChange={(e) => setMyBidAmount(e.target.value)} 
          placeholder={`${(Number(status.currentPrice) + Number(status.minBidUnit)).toLocaleString()}원 이상`}
          step="1000"
        />
        <S.BidButton type="submit">입찰하기</S.BidButton>
      </S.Form>
      <S.QuickBidButtons>
        <S.QuickBidButton type="button" onClick={() => handleQuickBid(1000)}>+1,000</S.QuickBidButton>
        <S.QuickBidButton type="button" onClick={() => handleQuickBid(5000)}>+5,000</S.QuickBidButton>
        <S.QuickBidButton type="button" onClick={() => handleQuickBid(10000)}>+10,000</S.QuickBidButton>
      </S.QuickBidButtons>
    </S.Wrapper>
  );
};

export default BidPanel;