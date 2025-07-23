import type { Bid } from '../types/auction.d.ts';
import * as S from './BidHistoryStyle';

interface Props {
  bidHistory: Bid[];
}

const BidHistory: React.FC<Props> = ({ bidHistory }) => {
  return (
    <S.Wrapper>
      <S.Title>입찰 내역</S.Title>
      <S.Table>
        <S.Thead>
          <S.Tr>
            <S.Th>시간</S.Th>
            <S.Th>입찰자</S.Th>
            <S.Th>입찰금액</S.Th>
          </S.Tr>
        </S.Thead>
        <S.Tbody>
          {bidHistory.map((bid) => (
            <S.Tr key={bid.bidId}>
              <S.Td>{new Date(bid.timestamp).toLocaleTimeString()}</S.Td>
              <S.Td>{bid.userNickname}</S.Td>
              <S.Td>{bid.bidAmount.toLocaleString()}원</S.Td>
            </S.Tr>
          ))}
        </S.Tbody>
      </S.Table>
    </S.Wrapper>
  );
};

export default BidHistory;