import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { confirmPayment } from '../api/paymentApi';
import * as S from './PaymentResultPageStyle';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasBeenCalled = useRef(false); 
  
  const [orderInfo, setOrderInfo] = useState({
    orderId: '',
    productName: '', 
    totalPrice: 0,
  });

  useEffect(() => {

    if (hasBeenCalled.current) {
      return;
    }

    const processPayment = async () => {
      const paymentKey = searchParams.get('paymentKey');
      const tossOrderId = searchParams.get('orderId'); 
      const amount = searchParams.get('amount');

      const ourOrderId = tossOrderId ? tossOrderId.split('_')[1] : null;

      if (!paymentKey || !ourOrderId || !tossOrderId || !amount) { 
        setError('잘못된 결제 정보입니다.');
        setIsLoading(false);
        return;
      }

      const savedShippingInfo = sessionStorage.getItem('shippingInfo');
      if (!savedShippingInfo) {
          setError('배송 정보가 유실되었습니다. 다시 시도해주세요.');
          setIsLoading(false);
          return;
      }
      const shippingInfoData = JSON.parse(savedShippingInfo);

      hasBeenCalled.current = true;

      try {
        await confirmPayment({
          paymentKey,
          orderId: ourOrderId,
          tossOrderId: tossOrderId,
          amount: Number(amount),
          shippingInfo: shippingInfoData, 
        });

        sessionStorage.removeItem('shippingInfo');
        setOrderInfo({
            orderId: ourOrderId,
            productName: "주문 상품", 
            totalPrice: Number(amount),
        });

      } catch (err: any) {
        console.error("결제 승인 실패:", err);
        sessionStorage.removeItem('shippingInfo'); 
        setError(err.response?.data?.message || '결제 승인에 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    processPayment();
  }, [searchParams]);

  if (isLoading) {
    return <div>결제 승인 중...</div>;
  }

  if (error) {
    return (
      <S.PageWrapper>
        <S.ResultCard className="failure">
            <S.Icon>⚠️</S.Icon>
            <S.Title>결제 승인에 실패했습니다.</S.Title>
            <S.Message>{error}</S.Message>
        </S.ResultCard>
      </S.PageWrapper>
    );
  }

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
            <span>{orderInfo.orderId}</span>
          </S.SummaryRow>
          <S.SummaryRow>
            <span>상품명</span>
            <span>{orderInfo.productName}</span>
          </S.SummaryRow>
          <S.SummaryRow className="total">
            <span>최종 결제 금액</span>
            <span>{orderInfo.totalPrice.toLocaleString()}원</span>
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