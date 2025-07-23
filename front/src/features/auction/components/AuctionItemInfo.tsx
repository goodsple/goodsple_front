import type { ItemInfo } from '../types/auction.d.ts';
import * as S from './AuctionItemInfoStyle';

interface Props {
  itemInfo: ItemInfo;
}

const AuctionItemInfo: React.FC<Props> = ({ itemInfo }) => {
  return (
    <S.Wrapper>
      <S.ImageContainer>
        <img src={itemInfo.images[0]} alt={itemInfo.title} />
      </S.ImageContainer>
      <S.InfoContainer>
        <div>
            <S.Title>{itemInfo.title}</S.Title>
            <S.Description>{itemInfo.description}</S.Description>
        </div>
        <S.AuctionRulesButton>경매 규칙 보기</S.AuctionRulesButton>
      </S.InfoContainer>
    </S.Wrapper>
  );
};

export default AuctionItemInfo;