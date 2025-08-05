import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderSummary from '../components/OrderSummary';
import ShippingForm from '../components/ShippingForm';
import { mockInitialShippingInfo, mockOrderItemData } from '../mock/paymentData';
import * as S from './PaymentPageStyle';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState(mockInitialShippingInfo);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (Math.random() < 0.8) {
        navigate('/payment/success');
      } else {
        navigate('/payment/failure');
      }
    }, 2000);
  };

  return (
    <S.PageLayout>
      <S.FormSection>
        <h1>주문/결제</h1>
        <ShippingForm shippingInfo={shippingInfo} onInfoChange={handleInputChange} />
        <S.FormGroup>
          <S.Title>결제 수단</S.Title>
          <S.PaymentMethods>
            <label><input type="radio" name="paymentMethod" value="credit-card" checked={paymentMethod === 'credit-card'} onChange={(e) => setPaymentMethod(e.target.value)} /> 신용/체크카드</label>
            <label><input type="radio" name="paymentMethod" value="kakao-pay" checked={paymentMethod === 'kakao-pay'} onChange={(e) => setPaymentMethod(e.target.value)} /> 카카오페이</label>
            <label><input type="radio" name="paymentMethod" value="bank-transfer" checked={paymentMethod === 'bank-transfer'} onChange={(e) => setPaymentMethod(e.target.value)} /> 무통장 입금</label>
          </S.PaymentMethods>
        </S.FormGroup>
      </S.FormSection>
      
      <S.SummarySection>
        <OrderSummary 
          orderItem={mockOrderItemData} 
          isProcessing={isProcessing} 
          onSubmit={handlePaymentSubmit} 
        />
      </S.SummarySection>
    </S.PageLayout>
  );
};

export default PaymentPage;