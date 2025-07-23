import { useState } from 'react';
import type { AuctionStatus, CurrentUser } from '../types/auction.d.ts';
import * as S from './BidPanelStyle';

interface Props {
  status: AuctionStatus;
  currentUser: CurrentUser;
}

const BidPanel: React.FC<Props> = ({ status, currentUser }) => {
  const [bidAmount, setBidAmount] = useState('');
  const isHighestBidder = currentUser.nickname === status.highestBidderNickname;

  return (
    <S.Wrapper>
      {isHighestBidder && (
        <S.HighlightMessage>회원님이 현재 최고 입찰자입니다!</S.HighlightMessage>
      )}
      <S.BidInputContainer>
        <S.BidInput
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder={`${(status.currentPrice + status.minBidUnit).toLocaleString()}원 이상`}
        />
        <S.BidButton>입찰하기</S.BidButton>
      </S.BidInputContainer>
      <S.QuickBidButtons>
        <S.QuickBidButton>+1,000</S.QuickBidButton>
        <S.QuickBidButton>+5,000</S.QuickBidButton>
        <S.QuickBidButton>+10,000</S.QuickBidButton>
      </S.QuickBidButtons>
    </S.Wrapper>
  );
};

export default BidPanel;