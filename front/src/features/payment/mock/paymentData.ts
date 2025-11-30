export interface OrderItem {
  id: number;
  productName: string;
  imageUrl: string;
  finalPrice: number;
}

export interface ShippingInfo {
  name: string;
  phone: string;
  address: string;
  postalCode: string;
  message: string;
}

export const SHIPPING_FEE = 3000;

export const mockOrderItemData: OrderItem = {
  id: 1,
  productName: 'NEW JEANS 1st EP NEW JEANS BAG (희귀 민지 버전)',
  imageUrl: 'https://picsum.photos/seed/payment/100/100',
  finalPrice: 77000,
};

export const mockInitialShippingInfo: ShippingInfo = {
  name: '김민지',
  phone: '010-1234-5678',
  address: '전북 전주시 완산구 노송광장로 10',
  postalCode: '54994',
  message: '부재 시 문 앞에 놓아주세요.',
};