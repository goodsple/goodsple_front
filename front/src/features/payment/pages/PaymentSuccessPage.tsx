import { mockPaymentResultData } from '../mock/paymentResultData';
import * as S from './PaymentResultPageStyle'; // 공통 스타일 사용

const PaymentSuccessPage = () => {
  return (
    <S.PageWrapper>
      <S.ResultCard>
        <S.Icon>🎉</S.Icon>
        <S.Title>결제가 성공적으로 완료되었습니다!</S.Title>
        <S.Message>
          주문해주셔서 감사합니다. <br />
          나의 낙찰 내역에서 상세 정보를 확인하실 수 있습니다.
        </S.Message>

        <S.OrderSummary>
          <S.SummaryRow>
            <span>주문 번호</span>
            <span>{mockPaymentResultData.orderId}</span>
          </S.SummaryRow>
          <S.SummaryRow>
            <span>상품명</span>
            <span>{mockPaymentResultData.productName}</span>
          </S.SummaryRow>
          <S.SummaryRow className="total">
            <span>최종 결제 금액</span>
            <span>{mockPaymentResultData.totalPrice.toLocaleString()}원</span>
          </S.SummaryRow>
        </S.OrderSummary>

        <S.Actions>
          <S.ActionLink to="/">메인으로</S.ActionLink>
          <S.ActionLink to="/mypage/bids" $primary>낙찰 내역 확인하기</S.ActionLink>
        </S.Actions>
      </S.ResultCard>
    </S.PageWrapper>
  );
};

export default PaymentSuccessPage;