import type { Bid } from '../types/auction';
import * as S from './BidHistoryStyle';

interface Props {
  bidHistory: Bid[];
}

const BidHistory: React.FC<Props> = ({ bidHistory }) => {
  return (
    <S.Wrapper>
      <S.Table>
        <thead>
          <tr>
            <S.Th>시간</S.Th>
            <S.Th>입찰자</S.Th>
            <S.Th>입찰금액</S.Th>
          </tr>
        </thead>
        <tbody>
          {bidHistory.map((bid) => (
            <tr key={bid.bidId}>
              <S.Td>{new Date(bid.timestamp).toLocaleTimeString()}</S.Td>
              <S.Td>{bid.userNickname}</S.Td>
              <S.Td>{bid.bidAmount.toLocaleString()}원</S.Td>
            </tr>
          ))}
        </tbody>
      </S.Table>
    </S.Wrapper>
  );
};

export default BidHistory;