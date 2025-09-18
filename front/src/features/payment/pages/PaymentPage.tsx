import { loadTossPayments, type PaymentMethod } from '@tosspayments/payment-sdk';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// 컴포넌트, API, 타입 import
import { getPaymentPageInfo } from '../api/paymentApi';
import OrderSummary from '../components/OrderSummary';
import ShippingForm from '../components/ShippingForm';
import type { PaymentInfo, ShippingInfo } from '../types/payment';
import * as S from './PaymentPageStyle';

// 토스페이먼츠에서 제공하는 테스트용 클라이언트 키입니다.
const TOSS_TEST_CLIENT_KEY = 'test_ck_4yKeq5bgrp54zWzB5JOZ8GX0lzW6';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>(); // URL에서 orderId를 가져옴

  // 상태 관리
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: '', phone: '', postalCode: '', address: '', message: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('카드'); // 토스페이먼츠 SDK와 맞춤
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 페이지 로드 시 결제 정보 조회 API 호출
  useEffect(() => {
    if (!orderId) return;
    const fetchPaymentInfo = async () => {
      try {
        const data = await getPaymentPageInfo(Number(orderId));
        setPaymentInfo(data);
      } catch (error) {
        console.error("결제 정보를 불러오는 데 실패했습니다:", error);
        alert("유효하지 않은 주문이거나, 결제 정보를 불러올 수 없습니다.");
        navigate('/mypage/bids');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPaymentInfo();
  }, [orderId, navigate]);
  
  // 배송 정보 입력 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  // '결제하기' 버튼 클릭 시 실행될 메인 함수
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentInfo) return;
    
    setIsProcessing(true);

    try {
      // 1. 토스페이먼츠 SDK 로드
      const tossPayments = await loadTossPayments(TOSS_TEST_CLIENT_KEY);

      // [수정] 플레이스홀더를 모두 제거하고, 순수한 URL만 남깁니다.
    const successCallbackUrl = `${window.location.origin}/payment/success`;

     await tossPayments.requestPayment(paymentMethod, {
      amount: paymentInfo.amount,
      // [수정] 우리 시스템의 orderId를 포함하여 고유 ID를 만듭니다.
      orderId: `ORD_${paymentInfo.orderId}_${new Date().getTime()}`,
      orderName: paymentInfo.productName,
      customerName: shippingInfo.name,
      successUrl: successCallbackUrl, // 수정된 URL 사용
      failUrl: `${window.location.origin}/payment/failure`,
    });
    
    // [제거] 이 부분의 confirmPayment와 navigate는 더 이상 필요 없으므로 삭제합니다.

    } catch (error: any) {
      console.error("결제 처리 중 오류 발생:", error);
      // 사용자가 결제를 취소한 경우
      if (error.code === 'USER_CANCEL') {
        alert('결제를 취소했습니다.');
      } else {
        alert(`결제에 실패했습니다: ${error.message}`);
        navigate('/payment/failure');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // 로딩 중 UI
  if (isLoading || !paymentInfo) {
    return <div>주문 정보를 불러오는 중입니다...</div>;
  }

  return (
    <S.PageLayout>
      <S.FormSection>
        <h1>주문/결제</h1>
        <ShippingForm shippingInfo={shippingInfo} onInfoChange={handleInputChange} />
        <S.FormGroup>
          <S.Title>결제 수단</S.Title>
          <S.PaymentMethods>
            <label><input type="radio" name="paymentMethod" value="카드" checked={paymentMethod === '카드'} onChange={(e) => setPaymentMethod(e.target.value)} /> 신용/체크카드</label>
            <label><input type="radio" name="paymentMethod" value="가상계좌" checked={paymentMethod === '가상계좌'} onChange={(e) => setPaymentMethod(e.target.value)} /> 가상계좌</label>
            <label><input type="radio" name="paymentMethod" value="계좌이체" checked={paymentMethod === '계좌이체'} onChange={(e) => setPaymentMethod(e.target.value)} /> 계좌이체</label>
          </S.PaymentMethods>
        </S.FormGroup>
      </S.FormSection>
      
      <S.SummarySection>
        <OrderSummary 
          // 목업 데이터 대신 API로 받은 실제 데이터를 전달
          orderItem={{
            productName: paymentInfo.productName,
            imageUrl: paymentInfo.imageUrl,
            finalPrice: paymentInfo.amount,
          }} 
          isProcessing={isProcessing} 
          onSubmit={handlePaymentSubmit} 
        />
      </S.SummarySection>
    </S.PageLayout>
  );
};

export default PaymentPage;