import axiosInstance from '../../../api/axiosInstance';
import type { AuctionPageData } from '../types/auction';

/**
 * 사용자용 경매 페이지의 초기 데이터를 조회하는 API 함수
 * @param auctionId 조회할 경매 ID
 */
export const getAuctionPageData = async (auctionId: number): Promise<AuctionPageData> => {
  const response = await axiosInstance.get(`/auctions/${auctionId}`);
  return response.data;
};