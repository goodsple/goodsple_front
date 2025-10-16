import axiosInstance from '../../../api/axiosInstance';
import type { PagedResponse } from '../../../types/common';
import type { MyWonAuction } from '../types/mybids'; // 아래에서 생성할 타입

// 페이지네이션 파라미터 타입을 정의합니다.
export interface MyBidsParams {
  page: number;
  size: number;
}

/**
 * 나의 낙찰 내역 목록을 조회하는 API 함수
 */
export const getMyWonAuctions = async (params: MyBidsParams): Promise<PagedResponse<MyWonAuction>> => {
  const response = await axiosInstance.get('/my-bids/won-auctions', { params });
  return response.data;
};