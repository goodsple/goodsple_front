import React from 'react';
import { CustomOverlayMap, Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router-dom'; // <<-- Link 대신 useNavigate를 import 하세요.
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
   onDragStart: () => void;
    isMapMoved: boolean;
    onResearch: () => void;
}

// [추가] 거래 타입을 한글로 변환하는 함수
const translateTradeType = (type: string) => {
  if (type === 'DIRECT') return '직거래';
  if (type === 'BOTH') return '모두 가능';
  if (type === 'DELIVERY') return '택배거래';
  return type;
};

const GoodsMapComponent: React.FC<Props> = ({ 
  onDragStart, isMapMoved, onResearch, isLoading, goodsList, center, onCreate, onIdle, onMarkerClick, selectedMarker, setSelectedMarker 
}) => {

  const navigate = useNavigate(); // <<-- 이 한 줄을 추가하세요.

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
  // 클릭 이벤트가 지도로 전파되는 것을 막습니다.
  onClick={(e) => e.stopPropagation()}
  // 더블클릭 시 지도가 확대되는 것을 막습니다. (가장 중요!)
  onDoubleClick={(e) => e.stopPropagation()}
  // 마우스를 누르는 이벤트가 지도로 전달되어 드래그가 시작되는 것을 막습니다.
  onMouseDown={(e) => e.stopPropagation()}
  // 마우스 휠 스크롤 시 지도가 확대/축소되는 것을 막습니다.
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
{/* 3. onClick 이벤트로 수정 */}
                  <S.InfoLink
  onClick={(e) => {
    // 1. 이 이벤트가 부모(InfoWindow)로 전파되는 것을 막습니다.
    e.stopPropagation();
    // 2. 그런 다음, 안전하게 페이지 이동을 실행합니다.
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
      // ↓↓↓↓↓↓ 이 부분을 추가하세요 ↓↓↓↓↓↓
      // 사용자가 클릭 또는 더블클릭 시 상세 페이지로 이동합니다.
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

// 3. React.memo로 GoodsMapComponent를 감싸서 최종적으로 export 합니다.
export default React.memo(GoodsMapComponent);