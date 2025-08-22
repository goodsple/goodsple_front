/**
 * 파일 경로: src/features/usermain/types/mainPage.ts (새로 만드세요)
 * 설명: 사용자 메인 페이지에서 사용하는 TypeScript 타입을 정의합니다.
 */

// 경매 카드 하나에 대한 타입
export interface UserMainAuction {
  auctionId: number;
  auctionTitle: string;
  imageUrl: string;
  startPrice: number;
  currentPrice: number;
  startTime: string; // ISO String 형식 (예: "2025-08-21T05:56:00+09:00")
  endTime: string;   // ISO String 형식
  status: 'active' | 'scheduled' | 'ended';
}

// 메인 페이지 전체 데이터에 대한 타입
export interface UserMainPageData {
  mainAuction: UserMainAuction | null; // 대표 경매 (없을 경우 null)
  upcomingAuctions: UserMainAuction[];
  recentlyEndedAuctions: UserMainAuction[];
}
