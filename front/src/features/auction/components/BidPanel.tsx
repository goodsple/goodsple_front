import { useState } from 'react';
import type { AuctionStatus, CurrentUser } from '../types/auction';
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
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        placeholder={`${(status.currentPrice + status.minBidUnit).toLocaleString()}원 이상`}
      />
      <button>입찰하기</button>
      {/* TODO: 빠른 입찰 버튼들 추가 */}
    </S.Wrapper>
  );
};

export default BidPanel;