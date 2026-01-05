interface Bid {
  bidder: string;
  price: number;
  time: string;
}

export interface AuctionResult {
  id: number;
  productName: string;
  imageUrl: string;
  startTime: string;
  endTime: string;
  startPrice: number;
  finalPrice: number;
  status: '종료';
  paymentStatus: '결제 완료' | '결제대기' | '기한초과' | null;
  winnerInfo: {
    nickname: string;
    userId: string;
    phone: string;
  };
  shippingInfo: {
    name: string;
    phone: string;
    address: string;
    postalCode: string;
    message: string;
  } | null;
  bidHistory: Bid[];
}

const mockAllAuctionResults: AuctionResult[] = [
  { 
    id: 1, 
    productName: 'NEW JEANS 1st EP NEW JEANS BAG (민지 버전)', 
    imageUrl: 'https://picsum.photos/seed/nj_result/300/300',
    startTime: '2025-07-29 20:00', endTime: '2025-07-29 21:00', 
    startPrice: 50000, finalPrice: 77000, status: '종료', 
    paymentStatus: '기한초과',
    winnerInfo: { nickname: '버니즈', userId: 'bunnies', phone: '010-3333-4444'},
    shippingInfo: null,
    bidHistory: [ { bidder: '버니즈', price: 77000, time: '20:55:10' } ],
  },
  {
    id: 2,
    productName: '[희귀] BTS 2018 메모리즈',
    imageUrl: 'https://picsum.photos/seed/bts_result/300/300',
    startTime: '2025-07-30 18:00', endTime: '2025-07-30 19:00',
    startPrice: 150000, finalPrice: 185000, status: '종료',
    paymentStatus: '결제 완료',
    winnerInfo: { nickname: '아미최고', userId: 'army123', phone: '010-9876-5432' },
    shippingInfo: { name: '김아미', phone: '010-9876-5432', address: '서울시 용산구 한강대로 405', postalCode: '04323', message: '배송 전 연락 부탁드립니다.'},
    bidHistory: [ { bidder: '아미최고', price: 185000, time: '18:59:45' } ],
  },
  {
    id: 6,
    productName: '에스파 앨범',
    imageUrl: 'https://picsum.photos/seed/aespa_result/300/300',
    startTime: '2025-07-27 10:00', endTime: '2025-07-27 11:00',
    startPrice: 10000, finalPrice: 22000, status: '종료',
    paymentStatus: '결제대기',
    winnerInfo: { nickname: '윈터팬', userId: 'winter123', phone: '010-1111-2222' },
    shippingInfo: null,
    bidHistory: [ { bidder: '윈터팬', price: 22000, time: '10:58:10' } ],
  },
];

export const findAuctionResultById = (id: number): AuctionResult | undefined => {
  return mockAllAuctionResults.find(auction => auction.id === id);
};