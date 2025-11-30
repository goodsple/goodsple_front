import axiosInstance from '../../../../api/axiosInstance';
import type { PagedResponse } from '../../../../types/common';
import type { AdminAuction } from '../mock/adminAuctionData';
import type { AuctionAdminDetail, AuctionAdminResult } from '../types/auction';

export interface AuctionSearchParams {
  page?: number;
  size?: number;
  status?: string;
  productName?: string;
  startDate?: string;
  endDate?: string;
}

/**
 * 관리자용 경매 목록을 조회하는 API 함수
 * @param params 검색 조건 객체
 */
export const getAdminAuctions = async (params: AuctionSearchParams): Promise<PagedResponse<AdminAuction>> => {
  const apiParams = { ...params };
  if (apiParams.status === '전체') {
    delete apiParams.status;
  }

  const response = await axiosInstance.get('/admin/auctions', { params: apiParams });
  
  return {
    content: response.data.content.map((auction: any) => ({
      id: auction.id,
      productName: auction.productName,
      startTime: auction.startTime, 
      endTime: auction.endTime,     
      currentPrice: auction.currentPrice,
      status: auction.status,
      paymentStatus: auction.paymentStatus,
    })),
    currentPage: response.data.currentPage,
    totalPages: response.data.totalPages,
    totalElements: response.data.totalElements,
  };
};

// TODO: 경매 생성, 수정, 상세 조회 API 함수들을 여기에 추가할 수 있습니다.

/**
 * 경매 생성을 위한 데이터 타입 정의
 */
export interface AuctionCreateData {
  productName: string;
  description: string;
  startPrice: number;
  minBidUnit: number;
  startTime: string; 
  endTime: string;
  imageUrls: string[];
}

/**
 * 이미지를 서버에 업로드하고 URL을 반환하는 API 함수
 * @param imageFile 업로드할 이미지 파일
 * @returns 업로드된 이미지의 URL
 */
export const uploadImage = async (imageFile: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', imageFile); 

  const response = await axiosInstance.post('/upload/auction', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data.url;
};

/**
 * 새로운 경매를 생성하는 API 함수
 * @param auctionData 생성할 경매 데이터
 */
export const createAdminAuction = async (auctionData: AuctionCreateData): Promise<void> => {
  await axiosInstance.post('/admin/auctions', auctionData);
};

/**
 * 경매 수정을 위한 데이터 타입 정의 (생성과 유사)
 */
export interface AuctionUpdateData extends AuctionCreateData {}

/**
 * 관리자용 경매 상세 정보를 조회하는 API 함수 (수정 페이지용)
 * @param auctionId 조회할 경매 ID
 */
export const getAdminAuctionDetail = async (auctionId: number): Promise<AuctionAdminDetail> => {
  const response = await axiosInstance.get(`/admin/auctions/${auctionId}`);
  return {
    id: response.data.id,
    productName: response.data.productName,
    description: response.data.description,
    startPrice: response.data.startPrice,
    minBidUnit: response.data.minBidUnit,
    startTime: response.data.startTime,
    endTime: response.data.endTime,
    imageUrls: response.data.imageUrls,
    status: response.data.status,
  };
};

/**
 * 경매 정보를 수정하는 API 함수
 * @param auctionId 수정할 경매 ID
 * @param auctionData 수정할 경매 데이터
 */
export const updateAdminAuction = async (auctionId: number, auctionData: AuctionUpdateData): Promise<void> => {
  await axiosInstance.put(`/admin/auctions/${auctionId}`, auctionData);
};

/**
 * 관리자용 경매 결과 상세 정보를 조회하는 API 함수
 * @param auctionId 조회할 경매 ID
 */
export const getAdminAuctionResult = async (auctionId: number): Promise<AuctionAdminResult> => {
  const response = await axiosInstance.get(`/admin/auctions/${auctionId}/result`);
  return {
    productName: response.data.productName,
    imageUrl: response.data.imageUrl,
    startPrice: response.data.startPrice,
    startTime: response.data.startTime,
    endTime: response.data.endTime,
    finalPrice: response.data.finalPrice,
    status: response.data.status,
    paymentStatus: response.data.paymentStatus,
    winnerInfo: response.data.winnerInfo || null,
    shippingInfo: response.data.shippingInfo || null,
    bidHistory: response.data.bidHistory || [],
  };
};

/**
 * 관리자가 경매 상태를 변경하는 API 함수 (중지/재개 등)
 * @param auctionId 상태를 변경할 경매 ID
 * @param status 새로운 상태 값 ('cancelled', 'active' 등)
 */
export const updateAdminAuctionStatus = async (auctionId: number, status: string): Promise<void> => {
  await axiosInstance.patch(`/admin/auctions/${auctionId}/status`, { status });
};