/**
 * 파일 경로: src/main/api/mainPageApi.ts
 */

// [수정 전] 깡통 axios (토큰 처리 안 됨, 변환 안 됨)
// import axios from 'axios'; 

// [수정 후] 우리가 만든 똑똑한 axiosInstance 가져오기
// (경로는 실제 파일 위치에 맞춰주세요. 예: ../../api/axiosInstance)
import axiosInstance from '../../../api/axiosInstance';

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

export const getMainPageData = async (): Promise<UserMainPageResponse> => {
  // [수정] axios.get -> axiosInstance.get 으로 변경
  // baseURL이 이미 '/api'로 설정되어 있으므로, 여기서는 '/main/auction'만 적으면 됩니다.
  // (기존: /api/main/auction -> 변경: /main/auction)
  const response = await axiosInstance.get<UserMainPageResponse>('/main/auction');
  
  return response.data;
};