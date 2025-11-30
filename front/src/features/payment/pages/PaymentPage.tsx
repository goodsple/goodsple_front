import { loadTossPayments, type PaymentMethod } from '@tosspayments/payment-sdk';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getPaymentPageInfo } from '../api/paymentApi';
import OrderSummary from '../components/OrderSummary';
import ShippingForm from '../components/ShippingForm';
import type { PaymentInfo, ShippingInfo } from '../types/payment';
import * as S from './PaymentPageStyle';

const TOSS_TEST_CLIENT_KEY = 'test_ck_4yKeq5bgrp54zWzB5JOZ8GX0lzW6';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>(); 

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: '', phone: '', postalCode: '', address: '', message: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('카드'); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentInfo) return;
    
    setIsProcessing(true);

    try {

        sessionStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
      const tossPayments = await loadTossPayments(TOSS_TEST_CLIENT_KEY);

    const successCallbackUrl = `${window.location.origin}/payment/success`;

     await tossPayments.requestPayment(paymentMethod, {
      amount: paymentInfo.amount,
      orderId: `ORD_${paymentInfo.orderId}_${new Date().getTime()}`,
      orderName: paymentInfo.productName,
      customerName: shippingInfo.name,
      successUrl: successCallbackUrl, 
      failUrl: `${window.location.origin}/payment/failure`,
    });
    

    } catch (error: any) {
      console.error("결제 처리 중 오류 발생:", error);
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