import type { ItemInfo } from '../types/auction';
import * as S from './AuctionItemInfoStyle';

interface Props {
  itemInfo: ItemInfo;
  onShare: () => void;
  onShowRules: () => void;
}

const AuctionItemInfo: React.FC<Props> = ({ itemInfo, onShare, onShowRules }) => {
  return (
    <S.Wrapper>
      <S.Header>
        <S.Title>{itemInfo.title}</S.Title>
        <S.ShareButton onClick={onShare}>🔗</S.ShareButton>
      </S.Header>
      <S.Image src={itemInfo.images[0]} alt={itemInfo.title} />
      <S.DescriptionWrapper>
        <S.DescriptionTitle>상품 설명</S.DescriptionTitle>
        <S.DescriptionText>{itemInfo.description}</S.DescriptionText>
        <S.RulesButton onClick={onShowRules}>경매 규칙 보기</S.RulesButton>
      </S.DescriptionWrapper>
    </S.Wrapper>
  );
};

export default AuctionItemInfo;