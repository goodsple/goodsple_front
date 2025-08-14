// src/features/admin/types/auction.ts
export interface AuctionAdminDetail {
  id: number;
  productName: string;
  description: string;
  startPrice: number;
  minBidUnit: number;
  startTime: string; // ISO String
  endTime: string;   // ISO String
  imageUrls: string[];
  status: string;
}

export interface AuctionAdminResult {
productName: string;
imageUrl: string;
startPrice: number;
startTime: string;
endTime: string;
finalPrice: number | null;
status: string;
paymentStatus: string | null;
winnerInfo: {
userId: number;
nickname: string;
phone: string;
} | null;
shippingInfo: {
name: string;
phone: string;
address: string;
message: string;
} | null;
bidHistory: {
time: string;
bidder: string;
price: number;
}[];
}