export interface AdminAuction {
  id: number;
  productName: string;
  startTime: string;
  endTime: string;
  currentPrice: number;
  status: '예정' | '진행중' | '종료';
  paymentStatus: '결제 완료' | '미결제' | '미결제(기한초과)' | null;
}

export const mockAdminAuctionData: AdminAuction[] = [
  { id: 1, productName: 'NEW JEANS 1st EP NEW JEANS BAG (민지 버전)', startTime: '2025-07-01 20:00', endTime: '2025-07-01 21:00', currentPrice: 77000, status: '종료', paymentStatus: '미결제(기한초과)' },
  { id: 2, productName: '[희귀] BTS 2018 메모리즈', startTime: '2025-06-30 18:00', endTime: '2025-06-30 19:00', currentPrice: 185000, status: '종료', paymentStatus: '결제 완료' },
  { id: 3, productName: 'IVE 아이엠 포토카드 일괄', startTime: '2025-07-01 13:00', endTime: '2025-07-01 14:05', currentPrice: 66000, status: '진행중', paymentStatus: null },
  { id: 4, productName: '세븐틴 FML 개봉앨범', startTime: '2025-07-02 20:00', endTime: '2025-07-02 21:00', currentPrice: 5000, status: '예정', paymentStatus: null },
  { id: 5, productName: '르세라핌 포카 교환', startTime: '2025-07-03 20:00', endTime: '2025-07-03 21:00', currentPrice: 0, status: '예정', paymentStatus: null },
  { id: 6, productName: '에스파 앨범', startTime: '2025-06-28 10:00', endTime: '2025-06-28 11:00', currentPrice: 22000, status: '종료', paymentStatus: '미결제' },
];