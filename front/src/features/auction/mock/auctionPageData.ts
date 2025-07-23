// --- 실제 목업 데이터 ---

export const mockAuctionPageData = {
  // (2) AuctionItemInfo 컴포넌트용 데이터
  itemInfo: {
    id: 'auc123',
    title: 'NEW JEANS 1st EP NEW JEANS BAG (희귀 민지 버젼)',
    description: '미개봉 새상품입니다. 민지 버전은 정말 희귀한 매물입니다. 배송은 입금 확인 후 다음날 바로 보내드립니다. 꼼꼼하게 포장해드려요!',
    images: [
      '/path/to/image1.jpg', // 실제 이미지가 있다면 경로를, 없다면 임시 경로를 사용
      '/path/to/image2.jpg',
    ],
  },
  // (3) AuctionStatus, (4) BidPanel 컴포넌트용 데이터
  status: {
    startTime: '2025-07-23T20:00:00Z',
    endTime: '2025-07-23T21:00:00Z',
    startPrice: 50000,
    currentPrice: 127000,
    highestBidderNickname: '민지팬',
    minBidUnit: 1000,
  },
  // (6) BidHistory 컴포넌트용 데이터
  bidHistory: [
    { bidId: 3, userNickname: '민지팬', bidAmount: 127000, timestamp: '2025-07-23T20:15:30Z' },
    { bidId: 2, userNickname: '해린고양이', bidAmount: 126000, timestamp: '2025-07-23T20:14:00Z' },
    { bidId: 1, userNickname: '뉴진스러버', bidAmount: 125000, timestamp: '2025-07-23T20:12:10Z' },
  ],
  // (5) LiveChat 컴포넌트용 데이터
  chatHistory: [
    { chatId: 1, userNickname: '뉴진스러버', message: '이거 꼭 사고 싶어요!', timestamp: '2025-07-23T20:16:00Z' },
    { chatId: 2, userNickname: '하니팜', message: '와 가격 계속 오르네 ㄷㄷ', timestamp: '2025-07-23T20:15:45Z' },
  ],
  // 현재 접속한 사용자 정보 (조건부 UI 테스트용)
  currentUser: {
    nickname: '해린고양이', // '민지팬'으로 바꾸면 '최고 입찰자' UI 테스트 가능
    isBanned: false,      // true로 바꾸면 '경매 참여 불가' 모달 테스트 가능
  },
};