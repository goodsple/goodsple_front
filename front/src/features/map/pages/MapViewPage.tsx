import { useEffect, useRef, useState } from 'react';
import GoodsList from '../components/GoodsList';
import GoodsMap from '../components/GoodsMap';
import type { MapGood } from '../mock/mapData';
import { mockMapGoodsData } from '../mock/mapData';
import * as S from './MapViewPageStyle';

const MapViewPage = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number }>({ lat: 35.824223, lng: 127.147953 });
  const [visibleGoods, setVisibleGoods] = useState<MapGood[]>(mockMapGoodsData);
  const [selectedMarker, setSelectedMarker] = useState<{ items: MapGood[], position: { lat: number, lng: number } } | null>(null);
  
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const handleMapIdle = (map: kakao.maps.Map) => {
    if (debounceTimer.current) { clearTimeout(debounceTimer.current); }
    debounceTimer.current = setTimeout(() => {
      const bounds = map.getBounds();
      const newVisibleGoods = mockMapGoodsData.filter(good =>
        bounds.contain(new kakao.maps.LatLng(good.lat, good.lng))
      );
      setVisibleGoods(newVisibleGoods);
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
      <GoodsList 
        visibleGoods={visibleGoods}
        onItemClick={handleListItemClick}
      />
    </S.PageLayout>
  );
};

export default MapViewPage;