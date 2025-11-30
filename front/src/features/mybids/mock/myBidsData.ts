export interface WonAuction {
  id: number;
  productName: string;
  imageUrl: string;
  finalPrice: number;
  endDate: string;
  paymentStatus: '미결제' | '결제 완료' | '미결제(기한초과)';
  paymentDueDate: Date | null;
}

const initialMockData: WonAuction[] = [
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
  {
    id: 4,
    productName: '에스파 앨범 양도',
    imageUrl: 'https://picsum.photos/seed/aespa/200/200',
    finalPrice: 12000,
    endDate: '2025-06-26',
    paymentStatus: '미결제(기한초과)',
    paymentDueDate: new Date('2025-07-01'), 
  },
];

const generateMoreData = (count: number, startId: number): WonAuction[] => {
  const moreData: WonAuction[] = [];
  const statuses: WonAuction['paymentStatus'][] = ['미결제', '결제 완료', '미결제(기한초과)'];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const newId = startId + i;
    const status = statuses[i % 3];
    let paymentDueDate: Date | null = null;
    
    if (status === '미결제') {
        paymentDueDate = new Date(now.getTime() + (i % 5 + 1) * 24 * 60 * 60 * 1000); 
    } else if (status === '미결제(기한초과)') {
        paymentDueDate = new Date(now.getTime() - (i % 5 + 1) * 24 * 60 * 60 * 1000); 
    }

    moreData.push({
      id: newId,
      productName: `샘플 상품 ${newId}`,
      imageUrl: `https://picsum.photos/seed/sample${newId}/200/200`,
      finalPrice: Math.floor(Math.random() * 1000) * 100 + 10000, 
      endDate: `2025-07-${String(i % 30 + 1).padStart(2, '0')}`,
      paymentStatus: status,
      paymentDueDate: paymentDueDate,
    });
  }
  return moreData;
};

export const mockMyBidsData: WonAuction[] = [
  ...initialMockData,
  ...generateMoreData(21, 5), 
];