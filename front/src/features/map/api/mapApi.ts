import axiosInstance from '../../../api/axiosInstance';
import type { MapGood } from '../types/map';

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
  return response.data; 
};