// 결제할 상품 아이템의 타입
export interface OrderItem {
  id: number;
  productName: string;
  imageUrl: string;
  finalPrice: number;
}

// 배송 정보 타입
export interface ShippingInfo {
  name: string;
  phone: string;
  address: string;
  postalCode: string;
  message: string;
}

// 배송비 상수
export const SHIPPING_FEE = 3000;

// 목업 데이터
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