export interface AdminAuction {
  id: number;
  productName: string;
  startTime: string;
  endTime: string;
  currentPrice: number;
  status: '예정' | '진행' | '종료' | '중지';
  paymentStatus: '결제 완료' | '결제대기' | '기한초과' | null;
}

const initialMockData: AdminAuction[] = [
  { id: 1, productName: 'NEW JEANS 1st EP NEW JEANS BAG (민지 버전)', startTime: '2025-07-29 20:00', endTime: '2025-07-29 21:00', currentPrice: 77000, status: '종료', paymentStatus: '기한초과' },
  { id: 2, productName: '[희귀] BTS 2018 메모리즈', startTime: '2025-07-30 18:00', endTime: '2025-07-30 19:00', currentPrice: 185000, status: '종료', paymentStatus: '결제 완료' },
  { id: 3, productName: 'IVE 아이엠 포토카드 일괄', startTime: '2025-08-13 01:00', endTime: '2025-08-13 02:00', currentPrice: 66000, status: '진행', paymentStatus: null },
  { id: 4, productName: '세븐틴 FML 개봉앨범', startTime: '2025-08-14 20:00', endTime: '2025-08-14 21:00', currentPrice: 5000, status: '예정', paymentStatus: null },
  { id: 5, productName: '르세라핌 포카 교환', startTime: '2025-07-28 20:00', endTime: '2025-07-28 21:00', currentPrice: 0, status: '종료', paymentStatus: null },
  { id: 6, productName: '에스파 앨범', startTime: '2025-07-27 10:00', endTime: '2025-07-27 11:00', currentPrice: 22000, status: '종료', paymentStatus: '결제대기' },
];

const generateMoreAdminAuctions = (count: number, startId: number): AdminAuction[] => {
  const moreData: AdminAuction[] = [];
  const now = new Date('2025-08-13T02:00:00'); 

  for (let i = 0; i < count; i++) {
    const newId = startId + i;
    let status: AdminAuction['status'];
    let paymentStatus: AdminAuction['paymentStatus'] = null;
    
    const daysOffset = (i % 20) - 10; 
    const hour = Math.floor(Math.random() * 24);
    const startTime = new Date(now.getTime() + daysOffset * 24 * 60 * 60 * 1000);
    startTime.setHours(hour, 0, 0, 0);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); 

    if (now < startTime) {
      status = '예정';
    } else if (now >= startTime && now <= endTime) {
      status = '진행';
    } else {
      status = '종료';
      const paymentStatuses: AdminAuction['paymentStatus'][] = ['결제 완료', '결제대기', '기한초과', null];
      paymentStatus = paymentStatuses[i % 4];
    }
    
    if (i > 0 && i % 5 === 0) {
      status = '중지';
      paymentStatus = null;
    }

    const formatDateTime = (date: Date) => {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    };

    moreData.push({
      id: newId,
      productName: `관리자 테스트 상품 ${newId}`,
      startTime: formatDateTime(startTime),
      endTime: formatDateTime(endTime),
      currentPrice: Math.floor(Math.random() * 200000) + 1000,
      status: status,
      paymentStatus: paymentStatus,
    });
  }
  return moreData;
};

export const mockAdminAuctionData: AdminAuction[] = [
  ...initialMockData,
  ...generateMoreAdminAuctions(24, 7),
];