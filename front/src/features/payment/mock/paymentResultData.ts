export interface PaymentResult {
  orderId: string;
  productName: string;
  totalPrice: number;
}

export const mockPaymentResultData: PaymentResult = {
  orderId: 'GOODS-12345678',
  productName: 'NEW JEANS 1st EP NEW JEANS BAG (희귀 민지 버전)',
  totalPrice: 80000,
};