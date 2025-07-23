import type { ItemInfo } from '../types/auction';
import * as S from './AuctionItemInfoStyle';

interface Props {
  itemInfo: ItemInfo;
}

const AuctionItemInfo: React.FC<Props> = ({ itemInfo }) => {
  return (
    <S.Wrapper>
      <S.ImageContainer>
        {/* 이미지를 여기에 표시합니다. */}
        <img src={itemInfo.images[0]} alt={itemInfo.title} width="300" />
      </S.ImageContainer>
      <S.InfoContainer>
        <S.Title>{itemInfo.title}</S.Title>
        <S.Description>{itemInfo.description}</S.Description>
      </S.InfoContainer>
    </S.Wrapper>
  );
};

export default AuctionItemInfo;