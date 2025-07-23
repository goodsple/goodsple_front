import type { Bid } from '../types/auction';
import * as S from './BidHistoryStyle';

interface Props {
  bidHistory: Bid[];
  currentUserNickname: string;
}

const BidHistory: React.FC<Props> = ({ bidHistory, currentUserNickname }) => {
  return (
    <S.Wrapper>
      <S.Title>입찰 내역</S.Title>
      <S.List>
        {bidHistory.map((bid) => (
          <S.ListItem key={bid.bidId} $isMyBid={bid.userNickname === currentUserNickname}>
            <span>{new Date(bid.timestamp).toLocaleTimeString('en-GB')}</span>
            <span>{bid.userNickname}</span>
            <span>{bid.bidAmount.toLocaleString()}원</span>
          </S.ListItem>
        ))}
      </S.List>
    </S.Wrapper>
  );
};

export default BidHistory;