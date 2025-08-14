/**
 * 파일 경로: src/features/admin/api/auctionApi.ts (새로 만드세요)
 * 설명: 관리자용 경매 관련 API 요청 함수들을 모아놓은 파일입니다.
 */
import axiosInstance from '../../../../api/axiosInstance'; // 팀원이 만든 axios 인스턴스를 import 합니다.
import type { PagedResponse } from '../../../../types/common'; // 페이지네이션 타입을 위한 공통 타입 (필요시 생성)
import type { AdminAuction } from '../mock/adminAuctionData'; // 기존 목업 데이터 타입 재활용
import type { AuctionAdminDetail } from '../types/auction'; // 상세 정보 타입을 위한 import 추가

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
  // TODO: 백엔드 S3 이미지 업로드 API가 구현되면 아래 주석을 해제하고 실제 로직을 연결해야 합니다.
  /*
  const formData = new FormData();
  formData.append('image', imageFile);

  // 이미지 업로드 API 호출 (Content-Type을 multipart/form-data로 설정)
  const response = await axiosInstance.post('/uploads/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.imageUrl; // 백엔드가 { "imageUrl": "..." } 형태로 응답한다고 가정
  */

  // 임시 목업 로직: 1초 후, 임시 이미지 URL을 반환합니다.
  console.log("임시 이미지 업로드 시뮬레이션:", imageFile.name);
  return new Promise(resolve => {
    setTimeout(() => {
      // 실제와 비슷한 형태의 임시 URL을 반환합니다.
      resolve(`https://placehold.co/600x400/EEE/31343C?text=Image-Preview`);
    }, 1000);
  });
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

