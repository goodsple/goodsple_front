// [수정 1] 깡통 axios 대신 우리가 만든 '똑똑한 axiosInstance'를 가져와야 합니다.
// (만약 axiosInstance 파일 위치가 다르면 경로를 수정해주세요!)
// 보통 src/api/axiosInstance.ts 에 있다면 ../../api/axiosInstance 가 됩니다.
import axiosInstance from '../../api/axiosInstance';

// 1. 데이터 타입 정의 (그대로 유지)
export interface AuctionData {
  auctionId: number;
  auctionTitle: string; 
  imageUrl: string;
  startPrice: number;
  currentPrice: number;
  startTime: string;
  endTime: string;
  status: string;
}

export interface UserMainPageResponse {
  mainAuction: AuctionData;
}

// 2. API 호출 함수
export const getMainPageData = async (): Promise<UserMainPageResponse> => {
  const response = await axiosInstance.get<UserMainPageResponse>('/main/auction');
  return response.data;
};