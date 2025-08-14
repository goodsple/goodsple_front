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