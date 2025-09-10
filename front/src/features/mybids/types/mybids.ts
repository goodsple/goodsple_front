// 백엔드의 MyBidsResponse DTO와 일치하는 타입
export interface MyWonAuction {
  auctionId: number;
  productName: string;
  imageUrl: string;
  auctionEndTime: string;  // ISO 8601 형식의 날짜 문자열
  finalPrice: number;
  paymentStatus: 'pending' | 'paid' | 'expired'; // 백엔드 ENUM 값을 기반으로 타입 제한
  paymentDueDate: string | null; // ISO 8601 형식 또는 null
}