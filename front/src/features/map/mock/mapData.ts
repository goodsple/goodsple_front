// 지도에 표시될 굿즈 아이템의 타입
export interface MapGood {
  id: number;
  name: string;
  price: number;
  lat: number;
  lng: number;
  imageUrl: string;
}

// 목업 데이터 배열
export const mockMapGoodsData: MapGood[] = [
  { id: 1, name: 'IVE 아이엠 포토카드', price: 5000, lat: 35.8242, lng: 127.1480, imageUrl: 'https://picsum.photos/seed/ive_map/80/100' },
  { id: 2, name: '뉴진스 버니니 교환', price: 0, lat: 35.8255, lng: 127.1495, imageUrl: 'https://picsum.photos/seed/nj_map/80/100' },
  { id: 3, name: '세븐틴 FML 개봉앨범', price: 3000, lat: 35.8230, lng: 127.1500, imageUrl: 'https://picsum.photos/seed/svt_map/80/100' },
  { id: 4, name: '라이즈 겟어기타 앨범', price: 8000, lat: 35.8248, lng: 127.1465, imageUrl: 'https://picsum.photos/seed/riize_map/80/100' },
  { id: 5, name: '[희귀] BTS 2018 메모리즈', price: 150000, lat: 35.8260, lng: 127.1478, imageUrl: 'https://picsum.photos/seed/bts_map/80/100' },
  { id: 6, name: '르세라핌 포카 교환해요', price: 0, lat: 35.8225, lng: 127.1485, imageUrl: 'https://picsum.photos/seed/lsf_map/80/100' },
  // 위치가 겹치는 데이터
  { id: 7, name: '아이브 포카 교환 원해요', price: 0, lat: 35.8242, lng: 127.1480, imageUrl: 'https://picsum.photos/seed/ive_map2/80/100' },
  { id: 8, name: '아이브 애프터라이크 포카', price: 4000, lat: 35.8242, lng: 127.1480, imageUrl: 'https://picsum.photos/seed/ive_map3/80/100' },
];