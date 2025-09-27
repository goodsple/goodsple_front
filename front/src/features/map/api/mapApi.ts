import axiosInstance from '../../../api/axiosInstance';
import type { MapGood } from '../types/map'; // 아래에서 생성할 타입

// 백엔드 API에 보낼 파라미터 타입
export interface MapBounds {
  swLat: number;
  swLng: number;
  neLat: number;
  neLng: number;
}

/**
 * 지도 영역 내의 굿즈 목록을 조회하는 API 함수
 */
export const getGoodsInBounds = async (bounds: MapBounds): Promise<MapGood[]> => {
  const response = await axiosInstance.get('/map/goods', { params: bounds });
  // 백엔드는 List<>만 반환하므로 response.data를 바로 사용
  return response.data; 
};