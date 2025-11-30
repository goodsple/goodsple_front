import axiosInstance from '../../api/axiosInstance';

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
  const response = await axiosInstance.get<UserMainPageResponse>('/main/auction');
  return response.data;
};