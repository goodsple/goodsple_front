import axiosInstance from '../../../api/axiosInstance';
import type { PagedResponse } from '../../../types/common';
import type { MyWonAuction } from '../types/mybids';

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