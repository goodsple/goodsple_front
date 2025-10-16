/**
 * 파일 경로: src/features/auction/api/auctionApi.ts (새로 만드세요)
 * 설명: 사용자용 경매 관련 API 요청 함수들을 모아놓은 파일입니다.
 */
import axiosInstance from '../../../api/axiosInstance';
import type { AuctionPageData } from '../types/auction';

/**
 * 사용자용 경매 페이지의 초기 데이터를 조회하는 API 함수
 * @param auctionId 조회할 경매 ID
 */
export const getAuctionPageData = async (auctionId: number): Promise<AuctionPageData> => {
  // 사용자용 API 엔드포인트는 /api/auctions/{auctionId} 라고 가정합니다.
  // 이 API는 백엔드에 새로 만들어야 합니다.
  const response = await axiosInstance.get(`/auctions/${auctionId}`);
  return response.data;
};