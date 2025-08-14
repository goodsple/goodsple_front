/**
 * 파일 경로: src/features/admin/api/auctionApi.ts (새로 만드세요)
 * 설명: 관리자용 경매 관련 API 요청 함수들을 모아놓은 파일입니다.
 */
import axiosInstance from '../../../../api/axiosInstance'; // 팀원이 만든 axios 인스턴스를 import 합니다.
import type { PagedResponse } from '../../../../types/common'; // 페이지네이션 타입을 위한 공통 타입 (필요시 생성)
import type { AdminAuction } from '../mock/adminAuctionData'; // 기존 목업 데이터 타입 재활용

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
