/**
 * 파일 경로: src/features/usermain/api/mainPageApi.ts (새로 만드세요)
 * 설명: 사용자 메인 페이지 관련 API 요청 함수들을 모아놓은 파일입니다.
 */
import axiosInstance from '../../../api/axiosInstance';
import type { UserMainPageData } from '../types/mainPage';

/**
 * 사용자 메인 페이지에 필요한 모든 경매 목록을 조회하는 API 함수
 */
export const getMainPageData = async (): Promise<UserMainPageData> => {
  // 이전에 Swagger로 테스트했던 /api/main/auctions 엔드포인트를 호출합니다.
  const response = await axiosInstance.get('/main/auction');
  return response.data;
};