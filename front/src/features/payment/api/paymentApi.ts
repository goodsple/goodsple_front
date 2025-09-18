import axiosInstance from '../../../api/axiosInstance';
import type { PaymentConfirmPayload, PaymentInfo } from '../types/payment';

/**
 * 결제 페이지에 필요한 초기 주문 정보를 조회하는 API
 */
export const getPaymentPageInfo = async (orderId: number): Promise<PaymentInfo> => {
  const response = await axiosInstance.get(`/orders/${orderId}/payment-info`);
  return response.data;
};

/**
 * 최종 결제 승인을 백엔드에 요청하는 API
 */
export const confirmPayment = async (payload: PaymentConfirmPayload): Promise<void> => {
  await axiosInstance.post('/payments/confirm', payload);
};