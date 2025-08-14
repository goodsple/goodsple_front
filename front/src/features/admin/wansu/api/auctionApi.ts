/**
 * 파일 경로: src/features/admin/api/auctionApi.ts (새로 만드세요)
 * 설명: 관리자용 경매 관련 API 요청 함수들을 모아놓은 파일입니다.
 */
import axiosInstance from '../../../../api/axiosInstance'; // 팀원이 만든 axios 인스턴스를 import 합니다.
import type { PagedResponse } from '../../../../types/common'; // 페이지네이션 타입을 위한 공통 타입 (필요시 생성)
import type { AdminAuction } from '../mock/adminAuctionData'; // 기존 목업 데이터 타입 재활용
import type { AuctionAdminDetail, AuctionAdminResult } from '../types/auction'; // 상세 정보 타입을 위한 import 추가

// 검색 조건을 위한 타입 정의
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
  // '전체' 상태는 파라미터에서 제외
  const apiParams = { ...params };
  if (apiParams.status === '전체') {
    delete apiParams.status;
  }

  // GET 요청 실행. axiosInstance가 자동으로 토큰을 헤더에 넣어줍니다.
  const response = await axiosInstance.get('/admin/auctions', { params: apiParams });
  
  // 백엔드 응답 형식에 맞게 데이터를 변환하여 반환합니다.
  // 백엔드 DTO와 프론트엔드 타입 이름이 다를 경우 여기서 맞춰줍니다.
  // 백엔드가 보내주는 PagedResponse DTO의 필드명('content')과 일치시킵니다.
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
  startTime: string; // ISO 8601 형식 (예: 2025-09-02T21:00:00+09:00)
  endTime: string;
  imageUrls: string[];
}

/**
 * 이미지를 서버에 업로드하고 URL을 반환하는 API 함수
 * @param imageFile 업로드할 이미지 파일
 * @returns 업로드된 이미지의 URL
 */
export const uploadImage = async (imageFile: File): Promise<string> => {
  // 1. FormData 객체를 생성하여 이미지 파일을 담습니다.
  const formData = new FormData();
  formData.append('file', imageFile); // 백엔드 @RequestPart("file") 이름과 일치해야 합니다.

  // 2. 이미지 업로드 API 호출 (Content-Type을 multipart/form-data로 설정)
  // 경매 이미지를 업로드하므로, URL의 {type} 부분에 'auction'을 사용합니다.
  const response = await axiosInstance.post('/upload/auction', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  // 3. 백엔드가 { "url": "..." } 형태로 응답하므로, response.data.url을 반환합니다.
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
  // 백엔드 응답(AuctionAdminDetailResponse)을 프론트엔드 타입(AuctionAdminDetail)으로 변환
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
  // 백엔드 응답(AuctionAdminResultResponse)을 프론트엔드 타입(AuctionAdminResult)으로 변환
  // 백엔드에서 null로 올 수 있는 객체들을 안전하게 처리합니다.
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
  // 백엔드 DTO 형식에 맞춰 { "status": "..." } 형태로 전송합니다.
  await axiosInstance.patch(`/admin/auctions/${auctionId}/status`, { status });
};