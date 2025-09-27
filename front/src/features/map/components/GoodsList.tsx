// map/components/GoodsList.tsx (최종본)

import type { MapGood } from '../types/map';
import * as S from './GoodsListStyle';

interface Props {
  visibleGoods: MapGood[];
  totalCount: number;
  onItemClick: (good: MapGood) => void;
}

const translateTradeType = (type: string) => {
  if (type === 'DIRECT') return '직거래';
  if (type === 'BOTH') return '모두 가능';
  if (type === 'DELIVERY') return '택배거래';
  return type;
};

const GoodsList: React.FC<Props> = ({ visibleGoods, totalCount, onItemClick }) => {
  return (
    // ✨ GoodsList의 내용은 ListContainer 대신 div로 감싸거나,
    // ListContainer 스타일을 GoodsListStyle.ts 에서 제거하고
    // MapViewPageStyle.ts 로 옮겨서 ListWrapper로 사용합니다.
    // 여기서는 가장 간단한 구조를 위해 별도 컨테이너 없이 반환합니다.
    <>
      <S.ListHeader>이 지역의 굿즈 목록 ({totalCount}개)</S.ListHeader>
      <S.GoodsListUl>
        {visibleGoods.length > 0 ? (
          visibleGoods.map((good) => (
            <S.GoodsItemLi key={good.id} onClick={() => onItemClick(good)}>
              <img src={good.imageUrl} alt={good.name} />
              <div className="item-details">
                 <div className="item-name">{good.name}</div>
                 <div className="item-price">
                {translateTradeType(good.tradeType)}
              </div>
              </div>
            </S.GoodsItemLi>
          ))
        ) : (
          <S.NoResults>이 지역에는 굿즈가 없습니다.</S.NoResults>
        )}
      </S.GoodsListUl>
    </>
  );
};

export default GoodsList;