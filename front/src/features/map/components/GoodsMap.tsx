import React from 'react';
import { CustomOverlayMap, Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router-dom';
import type { MapGood } from '../types/map';
import * as S from './GoodsMapStyle';

interface Props {
  isLoading: boolean; 
  goodsList: MapGood[];
  center: { lat: number, lng: number };
  onCreate: (map: kakao.maps.Map) => void; 
  onIdle: (map: kakao.maps.Map) => void;
  onMarkerClick: (position: { lat: number; lng: number }) => void;
  selectedMarker: { items: MapGood[], position: { lat: number, lng: number } } | null;
  setSelectedMarker: (selection: null) => void;
   onDragStart: () => void;
    isMapMoved: boolean;
    onResearch: () => void;
}

const translateTradeType = (type: string) => {
  if (type === 'DIRECT') return '직거래';
  if (type === 'BOTH') return '모두 가능';
  if (type === 'DELIVERY') return '택배거래';
  return type;
};

const GoodsMapComponent: React.FC<Props> = ({ 
  onDragStart, isMapMoved, onResearch, isLoading, goodsList, center, onCreate, onIdle, onMarkerClick, selectedMarker, setSelectedMarker 
}) => {

  const navigate = useNavigate(); 

  return (
    <S.MapContainer>
      {isLoading && <S.LoadingOverlay>... 로딩 중 ...</S.LoadingOverlay>}
      <Map center={center} style={{ width: '100%', height: '100%' }} level={4} onCreate={onCreate} onIdle={onIdle}>
        <MarkerClusterer averageCenter={true} minLevel={6}>
          {goodsList.map((good) => (
            <MapMarker
              key={good.id}
              position={{ lat: good.lat, lng: good.lng }}
              onClick={() => onMarkerClick({ lat: good.lat, lng: good.lng })}
            />
          ))}
        </MarkerClusterer>

        {selectedMarker && (
          <CustomOverlayMap position={selectedMarker.position} yAnchor={1.1}>
            {selectedMarker.items.length === 1 ? (
              <S.InfoWindow
  onClick={(e) => e.stopPropagation()}
  onDoubleClick={(e) => e.stopPropagation()}
  onMouseDown={(e) => e.stopPropagation()}
  onWheel={(e) => e.stopPropagation()}
>
                <S.InfoHeader>
                  <S.InfoClose onClick={() => setSelectedMarker(null)}>X</S.InfoClose>
                </S.InfoHeader>
                <S.InfoBody>
                  <img src={selectedMarker.items[0].imageUrl} alt={selectedMarker.items[0].name} />
                  <S.InfoContent>
                    <S.InfoTitle>{selectedMarker.items[0].name}</S.InfoTitle>
                    <S.InfoPrice>{translateTradeType(selectedMarker.items[0].tradeType)}</S.InfoPrice>
                  <S.InfoLink
  onClick={(e) => {
    e.stopPropagation();
    navigate(`/exchange/detail/${selectedMarker.items[0].id}`);
  }}
>
  상세보기
</S.InfoLink>
                  </S.InfoContent>
                </S.InfoBody>
              </S.InfoWindow>
            ) : (
              <S.MultiInfoWindow
  onClick={(e) => e.stopPropagation()}
  onDoubleClick={(e) => e.stopPropagation()}
  onMouseDown={(e) => e.stopPropagation()}
  onWheel={(e) => e.stopPropagation()}
>
                <S.MultiInfoHeader>
                  이 위치의 굿즈 ({selectedMarker.items.length}개)
                  <S.InfoClose onClick={() => setSelectedMarker(null)}>X</S.InfoClose>
                </S.MultiInfoHeader>
                <S.MultiItemList>
                  {selectedMarker.items.map(item => (
                    <li
      key={item.id}
      className="multi-item"
      onClick={() => navigate(`/exchange/detail/${item.id}`)}
      onDoubleClick={() => navigate(`/exchange/detail/${item.id}`)}
    >
                      <img src={item.imageUrl} alt={item.name}/>
                      <div>
                        <div className="multi-item-title">{item.name}</div>
                        <div className="multi-item-price">
                          {translateTradeType(item.tradeType)}
                        </div>
                      </div>
                    </li>
                  ))}
                </S.MultiItemList>
              </S.MultiInfoWindow>
            )}
          </CustomOverlayMap>
        )}
      </Map>
      {isMapMoved && <S.ResearchButton onClick={onResearch}>현 지도에서 재검색</S.ResearchButton>}
    </S.MapContainer>
  );
};

export default React.memo(GoodsMapComponent);