import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../components/common/pagination/Pagination';
import { getGoodsInBounds } from '../api/mapApi';
import GoodsList from '../components/GoodsList';
import GoodsMap from '../components/GoodsMap';
import type { MapGood } from '../types/map';
import * as S from './MapViewPageStyle';

const ITEMS_PER_PAGE = 5;

const MapViewPage = () => {
  const navigate = useNavigate(); 
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 37.566826, lng: 126.9786567 }); 
  const [goodsOnMap, setGoodsOnMap] = useState<MapGood[]>([]); 
  const [visibleGoods, setVisibleGoods] = useState<MapGood[]>([]); 
  const [selectedMarker, setSelectedMarker] = useState<{ items: MapGood[], position: { lat: number, lng: number } } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); 
  
  const mapRef = useRef<kakao.maps.Map>(null); 
  const debounceTimer = useRef<number | null>(null);

  const [isMapMoved, setIsMapMoved] = useState(false); 

    const handleMapDragStart = useCallback(() => {
        setIsMapMoved(true);
    }, []);

  const handleMapIdle = useCallback((map: kakao.maps.Map) => {
    if (debounceTimer.current) { 
      clearTimeout(debounceTimer.current); 
    }
    debounceTimer.current = window.setTimeout(async () => {
      setIsLoading(true);
      const bounds = map.getBounds();
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();
      try {
        const data = await getGoodsInBounds({
          swLat: sw.getLat(),
          swLng: sw.getLng(),
          neLat: ne.getLat(),
          neLng: ne.getLng(),
        });
        setGoodsOnMap(data); 
        setVisibleGoods(data); 
        setCurrentPage(1);
      } catch (error) {
        console.error("지도 굿즈 정보를 불러오는 데 실패했습니다:", error);
        alert("데이터를 불러올 수 없습니다.");
      } finally {
        setIsLoading(false);

        setIsMapMoved(false); 
      }
    }, 300);
  }, []); 

    const handleResearchClick = useCallback(() => {
        if (mapRef.current) {
            handleMapIdle(mapRef.current);
            setIsMapMoved(false);
        }
    }, [handleMapIdle]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          console.warn(`Geolocation 에러: ${err.message}`);
        }
      );
    }
    return () => { if (debounceTimer.current) clearTimeout(debounceTimer.current); };
  }, []);

  /**
   * 지도가 처음 생성되었을 때 호출되는 함수
   * @param map 생성된 카카오맵 인스턴스
   */
  const handleMapCreate = useCallback((map: kakao.maps.Map) => {
    console.log("!!! 지도 생성이 완료되어 handleMapCreate가 호출되었습니다. !!!"); 
    mapRef.current = map; 
    handleMapIdle(map); 
  }, [handleMapIdle]); 

  const handleMarkerClick = useCallback((markerPosition: { lat: number, lng: number }) => {
    const itemsAtSamePosition = goodsOnMap.filter(
      good => good.lat === markerPosition.lat && good.lng === markerPosition.lng
    );
    setSelectedMarker({ items: itemsAtSamePosition, position: markerPosition });
    
    const clickedItem = itemsAtSamePosition[0];
    if (clickedItem) {
      const itemIndexInVisibleList = visibleGoods.findIndex(g => g.id === clickedItem.id);
      if (itemIndexInVisibleList > -1) {
        const targetPage = Math.ceil((itemIndexInVisibleList + 1) / ITEMS_PER_PAGE);
        setCurrentPage(targetPage);
      }
    }
  }, [goodsOnMap, visibleGoods]);
  
const handleListItemClick = useCallback((good: MapGood) => {
    setMapCenter({ lat: good.lat, lng: good.lng });
    handleMarkerClick({ lat: good.lat, lng: good.lng }); 
}, [handleMarkerClick]); 

  const totalPages = Math.ceil(visibleGoods.length / ITEMS_PER_PAGE);
  const paginatedGoods = visibleGoods.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <S.PageLayout>
      <GoodsMap 
        isLoading={isLoading} 
        goodsList={goodsOnMap} 
        center={mapCenter}
        onCreate={handleMapCreate} 
        onIdle={handleMapIdle}
        onMarkerClick={handleMarkerClick}
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
        onDragStart={handleMapDragStart} 
                isMapMoved={isMapMoved}         
                onResearch={handleResearchClick} 
      />

      <S.ListWrapper>
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