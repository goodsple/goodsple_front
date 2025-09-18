// GET /api/orders/{orderId}/payment-info 응답 타입
export interface PaymentInfo {
  orderId: string;
  productName: string;
  imageUrl: string;
  amount: number;
}

// 배송 정보 타입
export interface ShippingInfo {
  name: string;
  phone: string;
  postalCode: string;
  address: string;
  message: string;
}

// POST /api/payments/confirm 요청 타입
export interface PaymentConfirmPayload {
  paymentKey: string;
  orderId: string; // 우리 시스템의 orderId (예: "3")
  tossOrderId: string; // 토스페이먼츠의 orderId (예: "ORD_3_...")
  amount: number;
  shippingInfo: ShippingInfo;
}