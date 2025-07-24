import type { AuctionStatus, Bid, ChatMessage, ItemInfo } from "../types/auction";

// ✨ 1. 경매 시간 연장 관련 상수 추가 및 export
export const AUCTION_EXTEND_THRESHOLD = 60; // 60초
export const AUCTION_EXTEND_TIME = 60;      // 60초

// --- 타입 확장 ---
// 기존 AuctionStatus 타입에 initialTimeLeft 추가
interface ExtendedAuctionStatus extends AuctionStatus {
  initialTimeLeft: number;
}

// --- 실제 목업 데이터 ---
// 타입을 위에서 확장한 타입으로 지정
export const mockAuctionPageData: {
  itemInfo: ItemInfo;
  status: ExtendedAuctionStatus;
  bidHistory: Bid[];
  chatHistory: ChatMessage[];
  currentUser: { nickname: string; isBanned: boolean; };
} = {
  itemInfo: {
    id: 'auc123',
    title: 'NEW JEANS 1st EP NEW JEANS BAG (희귀 민지 버젼)',
    description: '미개봉 새상품입니다. 민지 버전은 정말 희귀한 매물입니다. 배송은 입금 확인 후 다음날 바로 보내드립니다.',
    images: [
      'https://via.placeholder.com/600x600?text=NewJeans+Bag1',
      'https://via.placeholder.com/600x600?text=NewJeans+Bag2',
    ],
  },
  status: {
    startTime: '2025-07-23T20:00:00Z',
    endTime: '2025-07-23T21:00:00Z',
    startPrice: 50000,
    currentPrice: 127000,
    highestBidderNickname: '민지팬',
    minBidUnit: 1000,
    initialTimeLeft: 300, // ✨ 2. 초기 남은 시간 (5분 = 300초) 추가
  },
  bidHistory: [
    { bidId: 3, userNickname: '민지팬', bidAmount: 127000, timestamp: '2025-07-23T20:15:30Z' },
    { bidId: 2, userNickname: '해린고양이', bidAmount: 126000, timestamp: '2025-07-23T20:14:00Z' },
    { bidId: 1, userNickname: '뉴진스러버', bidAmount: 125000, timestamp: '2025-07-23T20:12:10Z' },
  ],
  chatHistory: [
    { chatId: 1, userNickname: '뉴진스러버', message: '이거 꼭 사고 싶어요!', timestamp: '2025-07-23T20:16:00Z' },
    { chatId: 2, userNickname: '하니팜', message: '와 가격 계속 오르네 ㄷㄷ', timestamp: '2025-07-23T20:15:45Z' },
  ],
  currentUser: {
    nickname: '해린고양이',
    isBanned: false,
  },
};