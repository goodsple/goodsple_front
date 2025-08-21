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

// 1. 경매 페이지 최초 진입 시 REST API로부터 받을 전체 데이터
export interface AuctionPageData {
  itemInfo: ItemInfo;
  status: AuctionStatus;
  bidHistory: Bid[];
  chatHistory: ChatMessage[];
  currentUser: CurrentUser;
}

// 2. WebSocket으로 수신할 경매 상태 업데이트 메시지
export interface AuctionStatusUpdateResponse {
  type: 'AUCTION_UPDATE';
  currentPrice: number;
  topBidderNickname: string;
  extendedEndTime: string; // ISO String
  newBid: Bid;
}

// 3. WebSocket으로 수신할 실시간 채팅 메시지
export interface ChatMessageResponse {
  type: 'CHAT_MESSAGE';
  senderNickname: string;
  message: string;
  timestamp: string; // ISO String
}