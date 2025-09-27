import React from 'react';
import { CustomOverlayMap, Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';
import type { MapGood } from '../types/map'; // [수정] '../mock/mapData' -> '../types/map'
import * as S from './GoodsMapStyle';

interface Props {
  isLoading: boolean; // [추가] 로딩 상태 prop
  goodsList: MapGood[];
  center: { lat: number, lng: number };
  onCreate: (map: kakao.maps.Map) => void; // [추가] onCreate prop 타입 정의
  onIdle: (map: kakao.maps.Map) => void;
  onMarkerClick: (position: { lat: number; lng: number }) => void;
  selectedMarker: { items: MapGood[], position: { lat: number, lng: number } } | null;
  setSelectedMarker: (selection: null) => void;
}

// [추가] 거래 타입을 한글로 변환하는 함수
const translateTradeType = (type: string) => {
  if (type === 'DIRECT') return '직거래';
  if (type === 'BOTH') return '모두 가능';
  if (type === 'DELIVERY') return '택배거래';
  return type;
};

const GoodsMapComponent: React.FC<Props> = ({ 
  isLoading, goodsList, center, onCreate, onIdle, onMarkerClick, selectedMarker, setSelectedMarker 
}) => {
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
              <S.InfoWindow onWheel={(e) => e.stopPropagation()}>
                <S.InfoHeader>
                  <S.InfoClose onClick={() => setSelectedMarker(null)}>X</S.InfoClose>
                </S.InfoHeader>
                <S.InfoBody>
                  <img src={selectedMarker.items[0].imageUrl} alt={selectedMarker.items[0].name} />
                  <S.InfoContent>
                    <S.InfoTitle>{selectedMarker.items[0].name}</S.InfoTitle>
                    <S.InfoPrice>{translateTradeType(selectedMarker.items[0].tradeType)}</S.InfoPrice>
                    <S.InfoLink href="#">상세보기</S.InfoLink>
                  </S.InfoContent>
                </S.InfoBody>
              </S.InfoWindow>
            ) : (
              <S.MultiInfoWindow onWheel={(e) => e.stopPropagation()}>
                <S.MultiInfoHeader>
                  이 위치의 굿즈 ({selectedMarker.items.length}개)
                  <S.InfoClose onClick={() => setSelectedMarker(null)}>X</S.InfoClose>
                </S.MultiInfoHeader>
                <S.MultiItemList>
                  {selectedMarker.items.map(item => (
                    <li key={item.id} className="multi-item">
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
      <S.ResearchButton>현 지도에서 재검색</S.ResearchButton>
    </S.MapContainer>
  );
};

// 3. React.memo로 GoodsMapComponent를 감싸서 최종적으로 export 합니다.
export default React.memo(GoodsMapComponent);