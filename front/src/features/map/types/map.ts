// 백엔드의 MapGoodsResponse DTO와 일치하는 타입
export interface MapGood {
  id: number;
  name: string;
  tradeType: 'DIRECT' | 'BOTH' | 'DELIVERY'; // [수정] price -> tradeType (타입 제한)
  lat: number;
  lng: number;
  imageUrl: string;
}