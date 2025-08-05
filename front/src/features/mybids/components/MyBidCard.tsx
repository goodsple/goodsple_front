import type { WonAuction } from '../mock/myBidsData';
import CountdownTimer from './CountdownTimer';
import * as S from './MyBidCardStyle'; // 아래에서 생성할 스타일 파일

interface Props {
  auction: WonAuction;
}

const MyBidCard: React.FC<Props> = ({ auction }) => {
  const getStatusClass = () => {
    if (auction.paymentStatus === '결제 완료') return 'paid';
    if (auction.paymentStatus === '미결제') return 'unpaid';
    return 'expired';
  };

  const getButton = () => {
    switch (auction.paymentStatus) {
      case '미결제':
        return <S.PayButton>결제하기</S.PayButton>;
      case '미결제(기한초과)':
        return <S.PayButton className="expired" disabled>결제 기한 만료</S.PayButton>;
      case '결제 완료':
        return <S.PayButton className="paid" disabled>결제 완료</S.PayButton>;
      default:
        return null;
    }
  };

  return (
    <S.Card>
      <S.CardImage src={auction.imageUrl} alt={auction.productName} />
      <S.CardBody>
        <S.CardEndDate>경매 종료일: {auction.endDate}</S.CardEndDate>
        <S.CardTitle>{auction.productName}</S.CardTitle>
        <S.CardPrice>최종 낙찰가: {auction.finalPrice.toLocaleString()}원</S.CardPrice>
        
        {auction.paymentStatus === '미결제' && auction.paymentDueDate && (
          <S.CountdownTimer>
            <CountdownTimer dueDate={auction.paymentDueDate} />
          </S.CountdownTimer>
        )}

        <S.StatusBadge className={getStatusClass()}>
          {auction.paymentStatus}
        </S.StatusBadge>

        {getButton()}
      </S.CardBody>
    </S.Card>
  );
};

export default MyBidCard;