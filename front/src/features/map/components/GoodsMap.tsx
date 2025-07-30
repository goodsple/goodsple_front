import React from 'react';
import { CustomOverlayMap, Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';
import type { MapGood } from '../mock/mapData';
import * as S from './GoodsMapStyle';

interface Props {
  goodsList: MapGood[];
  center: { lat: number, lng: number };
  onIdle: (map: kakao.maps.Map) => void;
  onMarkerClick: (position: { lat: number; lng: number }) => void;
  selectedMarker: { items: MapGood[], position: { lat: number, lng: number } } | null;
  setSelectedMarker: (selection: null) => void;
}

const GoodsMap: React.FC<Props> = ({ 
  goodsList, center, onIdle, onMarkerClick, selectedMarker, setSelectedMarker 
}) => {
  return (
    <S.MapContainer>
      <Map center={center} style={{ width: '100%', height: '100%' }} level={4} onIdle={onIdle}>
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
                    <S.InfoPrice>{selectedMarker.items[0].price === 0 ? '교환' : `${selectedMarker.items[0].price.toLocaleString()}원`}</S.InfoPrice>
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
                          {item.price === 0 ? '교환' : `${item.price.toLocaleString()}원`}
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

export default GoodsMap;