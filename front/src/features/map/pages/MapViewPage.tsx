// map/pages/MapViewPage.tsx (이 코드로 덮어쓰기)

import { useEffect, useRef, useState } from 'react';
import Pagination from '../../../components/common/pagination/Pagination';
import GoodsList from '../components/GoodsList';
import GoodsMap from '../components/GoodsMap';
import type { MapGood } from '../mock/mapData';
import { mockMapGoodsData } from '../mock/mapData';
import * as S from './MapViewPageStyle';

const ITEMS_PER_PAGE = 6; // 한 페이지에 6개씩 보여주기

const MapViewPage = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number }>({ lat: 35.824223, lng: 127.147953 });
  const [visibleGoods, setVisibleGoods] = useState<MapGood[]>(mockMapGoodsData);
  const [selectedMarker, setSelectedMarker] = useState<{ items: MapGood[], position: { lat: number, lng: number } } | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // 페이지 상태 추가
  
  const debounceTimer = useRef<number | null>(null);

  // 지도 영역이 바뀔 때마다 실행되는 함수
  const handleMapIdle = (map: kakao.maps.Map) => {
    if (debounceTimer.current) { clearTimeout(debounceTimer.current); }
    debounceTimer.current = setTimeout(() => {
      const bounds = map.getBounds();
      const newVisibleGoods = mockMapGoodsData.filter(good =>
        bounds.contain(new kakao.maps.LatLng(good.lat, good.lng))
      );
      setVisibleGoods(newVisibleGoods);
      setCurrentPage(1); // 지도 이동 시, 목록을 1페이지로 초기화
    }, 300);
  };

  useEffect(() => {
    return () => { if (debounceTimer.current) clearTimeout(debounceTimer.current); };
  }, []);

  const handleMarkerClick = (markerPosition: { lat: number, lng: number }) => {
    const itemsAtSamePosition = mockMapGoodsData.filter(
      good => good.lat === markerPosition.lat && good.lng === markerPosition.lng
    );
    setSelectedMarker({ items: itemsAtSamePosition, position: markerPosition });
  };
  
  const handleListItemClick = (good: MapGood) => {
    setLocation({ lat: good.lat, lng: good.lng });
    handleMarkerClick({ lat: good.lat, lng: good.lng }); 
  };

  // --- 페이지네이션을 위한 계산 ---
  const totalPages = Math.ceil(visibleGoods.length / ITEMS_PER_PAGE);
  const paginatedGoods = visibleGoods.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  // --- 여기까지 ---

  return (
    <S.PageLayout>
      <GoodsMap 
        goodsList={mockMapGoodsData}
        center={location}
        onIdle={handleMapIdle}
        onMarkerClick={handleMarkerClick}
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
      />

      {/* 목록과 페이지네이션을 함께 렌더링 */}
      <div style={{ width: '380px', display: 'flex', flexDirection: 'column' }}>
        <GoodsList 
          visibleGoods={paginatedGoods}       // 잘라낸 데이터 전달
          totalCount={visibleGoods.length}    // 전체 개수 전달
          onItemClick={handleListItemClick}
        />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </S.PageLayout>
  );
};

export default MapViewPage;