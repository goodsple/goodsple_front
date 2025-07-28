// 낙찰 내역 아이템의 타입을 정의합니다.
export interface WonAuction {
  id: number;
  productName: string;
  imageUrl: string;
  finalPrice: number;
  endDate: string;
  paymentStatus: '미결제' | '결제 완료' | '미결제(기한초과)';
  paymentDueDate: Date | null;
}

// 목업 데이터 배열을 정의하고 export합니다.
export const mockMyBidsData: WonAuction[] = [
  {
    id: 1,
    productName: 'NEW JEANS 1st EP NEW JEANS BAG (희귀 민지 버전)',
    imageUrl: 'https://picsum.photos/seed/newjeans/200/200',
    finalPrice: 77000,
    endDate: '2025-06-29',
    paymentStatus: '미결제',
    paymentDueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 48시간 후
  },
  {
    id: 4,
    productName: '에스파 앨범 양도',
    imageUrl: 'https://picsum.photos/seed/aespa/200/200',
    finalPrice: 12000,
    endDate: '2025-06-26',
    paymentStatus: '미결제(기한초과)',
    paymentDueDate: new Date(Date.now() - 1000), // 이미 과거
  },
  {
    id: 2,
    productName: '[희귀] BTS 2018 메모리즈',
    imageUrl: 'https://picsum.photos/seed/bts/200/200',
    finalPrice: 185000,
    endDate: '2025-06-28',
    paymentStatus: '결제 완료',
    paymentDueDate: null,
  },
  {
    id: 3,
    productName: 'IVE 아이엠 포토카드 일괄',
    imageUrl: 'https://picsum.photos/seed/ive/200/200',
    finalPrice: 25000,
    endDate: '2025-06-27',
    paymentStatus: '결제 완료',
    paymentDueDate: null,
  },
];