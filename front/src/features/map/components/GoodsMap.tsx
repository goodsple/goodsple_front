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
              // 단일 아이템 정보창
              <S.InfoWindow onWheel={(e) => e.stopPropagation()}> {/* ✨ 이벤트 전파 막기 */}
                <S.InfoHeader>
                  <S.InfoClose onClick={() => setSelectedMarker(null)}>X</S.InfoClose>
                </S.InfoHeader>
                <S.InfoBody>
                  <img src={selectedMarker.items[0].imageUrl} alt={selectedMarker.items[0].name} />
                  <S.InfoContent>
                    <div className="info-title">{selectedMarker.items[0].name}</div>
                    <div className="info-price">{selectedMarker.items[0].price === 0 ? '교환' : `${selectedMarker.items[0].price.toLocaleString()}원`}</div>
                    <a href="#">상세보기</a>
                  </S.InfoContent>
                </S.InfoBody>
              </S.InfoWindow>
            ) : (
              // 여러 아이템 정보창
              <S.MultiInfoWindow onWheel={(e) => e.stopPropagation()}> {/* ✨ 이벤트 전파 막기 */}
                <S.MultiInfoHeader>
                  이 위치의 굿즈 ({selectedMarker.items.length}개)
                  <S.InfoClose onClick={() => setSelectedMarker(null)}>X</S.InfoClose>
                </S.MultiInfoHeader>
                <S.MultiItemList>
                  {selectedMarker.items.map(item => (
                    <li key={item.id} className="multi-item">
                      <img src={item.imageUrl} alt={item.name}/>
                      <div>
                        <div>{item.name}</div>
                        <div>{item.price === 0 ? '교환' : `${item.price.toLocaleString()}원`}</div>
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