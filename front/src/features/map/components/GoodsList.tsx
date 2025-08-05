import type { MapGood } from '../mock/mapData';
import * as S from './GoodsListStyle';

interface Props {
  visibleGoods: MapGood[];
  onItemClick: (good: MapGood) => void;
}

const GoodsList: React.FC<Props> = ({ visibleGoods, onItemClick }) => {
  return (
    <S.ListContainer>
      <S.ListHeader>이 지역의 굿즈 목록 ({visibleGoods.length}개)</S.ListHeader>
      <S.GoodsListUl>
        {visibleGoods.length > 0 ? (
          visibleGoods.map((good) => (
            <S.GoodsItemLi key={good.id} onClick={() => onItemClick(good)}>
              <img src={good.imageUrl} alt={good.name} />
              <div className="item-details">
                <div className="item-name">{good.name}</div>
                <div className="item-price">
                  {good.price === 0 ? '교환' : `${good.price.toLocaleString()}원`}
                </div>
              </div>
            </S.GoodsItemLi>
          ))
        ) : (
          <S.NoResults>이 지역에는 굿즈가 없습니다.</S.NoResults>
        )}
      </S.GoodsListUl>
    </S.ListContainer>
  );
};

export default GoodsList;