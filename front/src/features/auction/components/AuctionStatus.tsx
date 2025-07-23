import type { AuctionStatus as AuctionStatusType } from '../types/auction'; // 타입 이름 충돌 방지
import * as S from './AuctionStatusStyle';

interface Props {
  status: AuctionStatusType;
}

const AuctionStatus: React.FC<Props> = ({ status }) => {
  // TODO: 여기에 status.endTime을 기준으로 남은 시간을 계산하는 타이머 로직 추가
  return (
    <S.Wrapper>
      <S.Price>{status.currentPrice.toLocaleString()}원</S.Price>
      <S.Timer>남은 시간: 00:00</S.Timer>
    </S.Wrapper>
  );
};

export default AuctionStatus;