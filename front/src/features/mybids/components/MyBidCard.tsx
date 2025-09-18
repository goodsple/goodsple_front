import { useNavigate } from 'react-router-dom'; // [추가] useNavigate 훅 import
import type { MyWonAuction } from '../../mybids/types/mybids'; // [수정] 타입을 새로 만든 것으로 변경
import CountdownTimer from './CountdownTimer';
import * as S from './MyBidCardStyle';

interface Props {
  auction: MyWonAuction; // [수정] Props 타입 변경
}

// [추가] 백엔드 상태값을 한글로 변환하는 함수
const translatePaymentStatus = (status: string) => {
  switch (status) {
    case 'pending': return '미결제';
    case 'paid': return '결제 완료';
    case 'expired': return '미결제(기한초과)';
    default: return status;
  }
};

const MyBidCard: React.FC<Props> = ({ auction }) => {
  const navigate = useNavigate(); // [추가] navigate 함수 생성

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
            // [수정] auction.auctionId -> auction.orderId 로 변경합니다.
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
        {/* [수정] 백엔드 필드명(auctionEndTime)에 맞게 수정하고, 날짜 포맷팅 적용 */}
        <S.CardEndDate>경매 종료일: {new Date(auction.auctionEndTime).toLocaleDateString()}</S.CardEndDate>
        <S.CardTitle>{auction.productName}</S.CardTitle>
        <S.CardPrice>최종 낙찰가: {auction.finalPrice.toLocaleString()}원</S.CardPrice>
        
        {/* [수정] paymentDueDate가 null이 아닐 때만 타이머 렌더링 */}
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