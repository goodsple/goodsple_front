export interface PaymentInfo {
  orderId: string;
  productName: string;
  imageUrl: string;
  amount: number;
}

export interface ShippingInfo {
  name: string;
  phone: string;
  postalCode: string;
  address: string;
  message: string;
}

export interface PaymentConfirmPayload {
  paymentKey: string;
  orderId: string; 
  tossOrderId: string; 
  amount: number;
  shippingInfo: ShippingInfo;
}