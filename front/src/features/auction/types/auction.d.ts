// 경매 관련 모든 타입을 모아서 관리합니다.
export interface ItemInfo {
  id: string;
  title: string;
  description: string;
  images: string[];
}

export interface AuctionStatus {
  startTime: string;
  endTime: string;
  startPrice: number;
  currentPrice: number;
  highestBidderNickname: string;
  minBidUnit: number;
}

export interface Bid {
  bidId: number;
  userNickname: string;
  bidAmount: number;
  timestamp: string;
}

export interface ChatMessage {
  chatId: number;
  userNickname: string;
  message: string;
  timestamp: string;
}

export interface CurrentUser {
  nickname: string;
  isBanned: boolean;
}