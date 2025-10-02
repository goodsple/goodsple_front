import { useCallback, useEffect, useRef, useState } from 'react'; // useCallback 추가
import { useNavigate } from 'react-router-dom'; // <<-- 이 한 줄을 추가하세요.
import Pagination from '../../../components/common/pagination/Pagination';
import { getGoodsInBounds } from '../api/mapApi'; // [수정] 새로 만든 API 함수 import
import GoodsList from '../components/GoodsList';
import GoodsMap from '../components/GoodsMap';
import type { MapGood } from '../types/map'; // [수정] 새로 만든 타입 import
import * as S from './MapViewPageStyle';

const ITEMS_PER_PAGE = 5;

const MapViewPage = () => {
  const navigate = useNavigate(); // <<-- 이 한 줄을 추가하세요.
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 37.566826, lng: 126.9786567 }); // [수정] 초기 위치를 서울 중심으로 변경
  const [goodsOnMap, setGoodsOnMap] = useState<MapGood[]>([]); // [수정] 지도 전체의 굿즈 목록
  const [visibleGoods, setVisibleGoods] = useState<MapGood[]>([]); // [수정] 현재 화면에 보이는 굿즈 목록
  const [selectedMarker, setSelectedMarker] = useState<{ items: MapGood[], position: { lat: number, lng: number } } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // [추가] 로딩 상태
  
  const mapRef = useRef<kakao.maps.Map>(null); // [추가] 카카오맵 인스턴스를 저장하기 위한 ref
  const debounceTimer = useRef<number | null>(null);

  const [isMapMoved, setIsMapMoved] = useState(false); // 1. 지도 이동 여부 state 추가

  // 2. 지도 이동 시작 시 호출될 핸들러 추가
    const handleMapDragStart = useCallback(() => {
        setIsMapMoved(true);
    }, []);

  // [수정] handleMapIdle 로직을 API 호출 방식으로 변경
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
        setGoodsOnMap(data); // API로 받아온 데이터를 전체 굿즈 목록으로 설정
        setVisibleGoods(data); // 처음엔 전체 목록을 보여줌 (필터링 전)
        setCurrentPage(1);
      } catch (error) {
        console.error("지도 굿즈 정보를 불러오는 데 실패했습니다:", error);
        alert("데이터를 불러올 수 없습니다.");
      } finally {
        setIsLoading(false);

        setIsMapMoved(false); 
        // ↑↑↑↑↑↑ 데이터 로딩이 끝나면 버튼을 다시 숨깁니다.
      }
    }, 300);
  }, []); // 의존성 배열이 비어있으므로, 이 함수는 컴포넌트가 처음 렌더링될 때 딱 한번만 생성됩니다.

  // 3. 재검색 버튼 클릭 핸들러 추가
    const handleResearchClick = useCallback(() => {
        if (mapRef.current) {
            handleMapIdle(mapRef.current);
            setIsMapMoved(false);
        }
    }, [handleMapIdle]);

  useEffect(() => {
    // geolocation을 사용하여 현재 위치 가져오기 (컴포넌트 마운트 시 한번만 실행)
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
          // 위치 정보를 못 가져올 경우 기본값(서울 중심)을 사용
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
    console.log("!!! 지도 생성이 완료되어 handleMapCreate가 호출되었습니다. !!!"); // <<-- 이 로그를 추가하세요.
    mapRef.current = map; // 지도 인스턴스를 ref에 저장 (선택사항이지만 유용함)
    handleMapIdle(map); // 지도가 로드되자마자 첫 데이터 조회를 위해 idle 핸들러를 수동으로 호출
  }, [handleMapIdle]); // handleMapIdle 함수가 변경될 때만 이 함수도 새로 생성됩니다.

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
  
// 굿즈 목록의 아이템을 클릭했을 때 호출되는 함수
const handleListItemClick = useCallback((good: MapGood) => {
    // 지도의 중심을 클릭된 굿즈의 위치로 이동시킵니다.
    setMapCenter({ lat: good.lat, lng: good.lng });
    // 해당 위치의 마커를 클릭한 것과 동일한 효과를 줍니다 (정보창 표시).
    handleMarkerClick({ lat: good.lat, lng: good.lng }); 
}, [handleMarkerClick]); // 의존성 배열도 handleMarkerClick으로 변경합니다.

  const totalPages = Math.ceil(visibleGoods.length / ITEMS_PER_PAGE);
  const paginatedGoods = visibleGoods.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <S.PageLayout>
      <GoodsMap 
        isLoading={isLoading} // [추가] 로딩 상태를 자식에게 전달
        goodsList={goodsOnMap} // [수정] mock 데이터 대신 API로 받은 goodsOnMap 사용
        center={mapCenter}
        onCreate={handleMapCreate} 
        onIdle={handleMapIdle}
        onMarkerClick={handleMarkerClick}
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
        onDragStart={handleMapDragStart} // 5. onDragStart prop 추가
                isMapMoved={isMapMoved}         // 6. isMapMoved prop 추가
                onResearch={handleResearchClick} // 7. onResearch prop 추가
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