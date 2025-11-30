import { useNavigate } from 'react-router-dom';
import type { MyWonAuction } from '../../mybids/types/mybids';
import CountdownTimer from './CountdownTimer';
import * as S from './MyBidCardStyle';

interface Props {
  auction: MyWonAuction; 
}

const translatePaymentStatus = (status: string) => {
  switch (status) {
    case 'pending': return '미결제';
    case 'paid': return '결제 완료';
    case 'expired': return '미결제(기한초과)';
    default: return status;
  }
};

const MyBidCard: React.FC<Props> = ({ auction }) => {
  const navigate = useNavigate(); 

  const paymentStatusKo = translatePaymentStatus(auction.paymentStatus);

  const getStatusClass = () => {
    if (paymentStatusKo === '결제 완료') return 'paid';
    if (paymentStatusKo === '미결제') return 'unpaid';
    return 'expired';
  };

  const getButton = () => {
    switch (paymentStatusKo) {
      case '미결제':
        return (
          <S.PayButton 
            onClick={() => navigate(`/payment/${auction.orderId}`)}
          >
            결제하기
          </S.PayButton>
        );
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
        <S.CardEndDate>경매 종료일: {new Date(auction.auctionEndTime).toLocaleDateString()}</S.CardEndDate>
        <S.CardTitle>{auction.productName}</S.CardTitle>
        <S.CardPrice>최종 낙찰가: {auction.finalPrice.toLocaleString()}원</S.CardPrice>
        
        {paymentStatusKo === '미결제' && auction.paymentDueDate && (
          <S.CountdownTimer>
            <CountdownTimer dueDate={new Date(auction.paymentDueDate)} />
          </S.CountdownTimer>
        )}

        <S.StatusBadge className={getStatusClass()}>
          {paymentStatusKo}
        </S.StatusBadge>

        {getButton()}
      </S.CardBody>
    </S.Card>
  );
};

export default MyBidCard;