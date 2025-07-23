import type { AuctionStatus as AuctionStatusType } from '../types/auction.d.ts';
import * as S from './AuctionStatusStyle';

interface Props {
  status: AuctionStatusType;
}

const AuctionStatus: React.FC<Props> = ({ status }) => {
  // TODO: 여기에 status.endTime을 기준으로 남은 시간을 계산하는 타이머 로직 추가
  return (
    <S.Wrapper>
      <div>
        <S.CurrentPriceLabel>현재가</S.CurrentPriceLabel>
        <S.Price>{status.currentPrice.toLocaleString()}원</S.Price>
      </div>
      <div>
        <S.TimerLabel>남은 시간</S.TimerLabel>
        <S.Timer>00:00</S.Timer>
      </div>
    </S.Wrapper>
  );
};

export default AuctionStatus;