// map/pages/MapViewPage.tsx (최종본)

import { useEffect, useRef, useState } from 'react';
import Pagination from '../../../components/common/pagination/Pagination';
import GoodsList from '../components/GoodsList';
import GoodsMap from '../components/GoodsMap';
import type { MapGood } from '../mock/mapData';
import { mockMapGoodsData } from '../mock/mapData';
import * as S from './MapViewPageStyle';

const ITEMS_PER_PAGE = 5; // 아이템 개수 5개로 수정

const MapViewPage = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number }>({ lat: 35.824223, lng: 127.147953 });
  const [visibleGoods, setVisibleGoods] = useState<MapGood[]>(mockMapGoodsData);
  const [selectedMarker, setSelectedMarker] = useState<{ items: MapGood[], position: { lat: number, lng: number } } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const debounceTimer = useRef<number | null>(null);

  const handleMapIdle = (map: kakao.maps.Map) => {
    if (debounceTimer.current) { clearTimeout(debounceTimer.current); }
    debounceTimer.current = setTimeout(() => {
      const bounds = map.getBounds();
      const newVisibleGoods = mockMapGoodsData.filter(good =>
        bounds.contain(new kakao.maps.LatLng(good.lat, good.lng))
      );
      setVisibleGoods(newVisibleGoods);
      setCurrentPage(1);
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
    
    // ✨ 마커-리스트 연동 로직 (이전 코드에 빠져있었을 수 있는 부분)
    const clickedItem = itemsAtSamePosition[0];
    if (clickedItem) {
      const itemIndexInVisibleList = visibleGoods.findIndex(g => g.id === clickedItem.id);
      if (itemIndexInVisibleList > -1) {
        const targetPage = Math.ceil((itemIndexInVisibleList + 1) / ITEMS_PER_PAGE);
        setCurrentPage(targetPage);
      }
    }
  };
  
  const handleListItemClick = (good: MapGood) => {
    setLocation({ lat: good.lat, lng: good.lng });
    handleMarkerClick({ lat: good.lat, lng: good.lng }); 
  };

  const totalPages = Math.ceil(visibleGoods.length / ITEMS_PER_PAGE);
  const paginatedGoods = visibleGoods.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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

      <S.ListWrapper> {/* ✨ 스크롤과 레이아웃을 담당하는 Wrapper */}
        <GoodsList 
          visibleGoods={paginatedGoods}
          totalCount={visibleGoods.length}
          onItemClick={handleListItemClick}
        />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </S.ListWrapper>
    </S.PageLayout>
  );
};

export default MapViewPage;