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
  price: number;
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

export interface AuctionPageData {
  itemInfo: ItemInfo;
  status: AuctionStatus;
  bidHistory: Bid[];
  chatHistory: ChatMessage[];
  currentUser: CurrentUser;
}

export interface AuctionStatusUpdateResponse {
  type: 'AUCTION_UPDATE';
  currentPrice: number;
  topBidderNickname: string;
  extendedEndTime: string; 
  newBid: Bid;
}

export interface ChatMessageResponse {
  type: 'CHAT_MESSAGE';
  senderNickname: string;
  message: string;
  timestamp: string; 
}