// myBidsData.ts (수정 완료된 코드)

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

// 기존 목업 데이터 배열을 정의합니다.
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
    paymentDueDate: new Date('2025-07-01'), // 명확한 과거 날짜
  },
];

// ✨ 동적으로 목업 데이터를 생성하는 함수
const generateMoreData = (count: number, startId: number): WonAuction[] => {
  const moreData: WonAuction[] = [];
  const statuses: WonAuction['paymentStatus'][] = ['미결제', '결제 완료', '미결제(기한초과)'];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const newId = startId + i;
    const status = statuses[i % 3];
    let paymentDueDate: Date | null = null;
    
    // 현재 날짜(2025-08-13)를 기준으로 논리적인 날짜 생성
    if (status === '미결제') {
        paymentDueDate = new Date(now.getTime() + (i % 5 + 1) * 24 * 60 * 60 * 1000); // 1~5일 후
    } else if (status === '미결제(기한초과)') {
        paymentDueDate = new Date(now.getTime() - (i % 5 + 1) * 24 * 60 * 60 * 1000); // 1~5일 전
    }

    moreData.push({
      id: newId,
      productName: `샘플 상품 ${newId}`,
      imageUrl: `https://picsum.photos/seed/sample${newId}/200/200`,
      finalPrice: Math.floor(Math.random() * 1000) * 100 + 10000, // 10,000 ~ 109,900
      endDate: `2025-07-${String(i % 30 + 1).padStart(2, '0')}`,
      paymentStatus: status,
      paymentDueDate: paymentDueDate,
    });
  }
  return moreData;
};

// 기존 데이터와 생성된 데이터를 합쳐서 최종 export
export const mockMyBidsData: WonAuction[] = [
  ...initialMockData,
  ...generateMoreData(21, 5), // 21개의 데이터를 추가로 생성 (총 25개)
];