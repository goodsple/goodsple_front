// PaymentSuccessPage.tsx

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { confirmPayment } from '../api/paymentApi'; // API 함수 import
import * as S from './PaymentResultPageStyle';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasBeenCalled = useRef(false); // [추가] API 호출 여부를 추적하기 위한 ref
  
  // [추가] 실제 주문 정보를 담을 상태
  const [orderInfo, setOrderInfo] = useState({
    orderId: '',
    productName: '', // 백엔드에서 productName을 받아올 수 있다면 추가
    totalPrice: 0,
  });

  useEffect(() => {

    // [추가] 이미 API가 호출되었다면, 두 번째 실행을 막습니다.
    if (hasBeenCalled.current) {
      return;
    }

    const processPayment = async () => {
      // 1. URL 쿼리 스트링에서 결제 정보 추출
      const paymentKey = searchParams.get('paymentKey');
      const tossOrderId = searchParams.get('orderId'); // 예: "ORD_3_1758..."
      const amount = searchParams.get('amount');

      // [수정] tossOrderId에서 우리 시스템의 orderId를 추출합니다.
      const ourOrderId = tossOrderId ? tossOrderId.split('_')[1] : null;

      if (!paymentKey || !ourOrderId || !tossOrderId || !amount) { // tossOrderId 유효성 검사 추가
        setError('잘못된 결제 정보입니다.');
        setIsLoading(false);
        return;
      }

      // 1. sessionStorage에서 배송 정보를 가져옵니다.
      const savedShippingInfo = sessionStorage.getItem('shippingInfo');
      if (!savedShippingInfo) {
          setError('배송 정보가 유실되었습니다. 다시 시도해주세요.');
          setIsLoading(false);
          return;
      }
      const shippingInfoData = JSON.parse(savedShippingInfo);

      // [추가] API를 호출하기 직전에, 호출했다는 사실을 기록합니다.
      hasBeenCalled.current = true;

      try {
      // 2. 백엔드로 보낼 데이터에, 가져온 배송 정보를 사용합니다.
        await confirmPayment({
          paymentKey,
          orderId: ourOrderId,
          tossOrderId: tossOrderId,
          amount: Number(amount),
          shippingInfo: shippingInfoData, // [수정] 빈 객체 대신 sessionStorage에서 가져온 데이터 사용
        });

        // 3. 성공 시, 사용한 배송 정보를 sessionStorage에서 삭제합니다.
        sessionStorage.removeItem('shippingInfo');
        // 3. 승인 성공 시, 화면에 표시할 정보 설정
        setOrderInfo({
            orderId: ourOrderId,
            productName: "주문 상품", // 백엔드 API가 상품명을 반환하도록 수정하면 더 좋음
            totalPrice: Number(amount),
        });

      } catch (err: any) {
        console.error("결제 승인 실패:", err);
        // [추가] 실패 시에도 sessionStorage 데이터를 지워주는 것이 좋습니다.
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