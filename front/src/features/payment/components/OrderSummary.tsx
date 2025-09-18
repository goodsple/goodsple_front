// import type { OrderItem } from '../mock/paymentData';
import { SHIPPING_FEE } from '../mock/paymentData';
import * as S from './OrderSummaryStyle';

interface OrderItemSummary {
  productName: string;
  imageUrl: string;
  finalPrice: number;
}

interface Props {
  orderItem: OrderItemSummary; // [수정] 타입을 새로 만든 것으로 변경
  isProcessing: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const OrderSummary: React.FC<Props> = ({ orderItem, isProcessing, onSubmit }) => {
  // Number() 함수를 사용하여 finalPrice를 숫자로 확실하게 변환한 후 더합니다.
  const totalPrice = Number(orderItem.finalPrice) + SHIPPING_FEE;
  return (
    <S.SummaryCard>
      <S.Title>주문 상품 정보</S.Title>
      <S.OrderItem>
        <S.ItemImage src={orderItem.imageUrl} alt={orderItem.productName} />
        <S.ItemInfo>
          <p>{orderItem.productName}</p>
          <strong>{orderItem.finalPrice.toLocaleString()}원</strong>
        </S.ItemInfo>
      </S.OrderItem>
      <hr/>
      <S.Title>최종 결제 금액</S.Title>
      <S.PriceSummary>
        <p><span>상품 금액</span><span>{orderItem.finalPrice.toLocaleString()}원</span></p>
        <p><span>배송비</span><span>{SHIPPING_FEE.toLocaleString()}원</span></p>
        <hr/>
        <p className="total-price"><span>총 결제 금액</span><strong>{totalPrice.toLocaleString()}원</strong></p>
      </S.PriceSummary>
      <S.FinalPayButton onClick={onSubmit} disabled={isProcessing}>
        {isProcessing ? '결제 진행 중...' : `${totalPrice.toLocaleString()}원 결제하기`}
      </S.FinalPayButton>
    </S.SummaryCard>
  );
};

export default OrderSummary;