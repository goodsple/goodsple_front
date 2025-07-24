import { createPortal } from 'react-dom';
import * as S from './AuctionRulesModalStyle';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AuctionRulesModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <S.Backdrop onClick={onClose}>
      <S.Content onClick={(e) => e.stopPropagation()}>
        <S.Title>경매 규칙 안내</S.Title>
        <S.Rule>1. 입찰은 항상 현재 최고가보다 높은 금액으로만 가능합니다.</S.Rule>
        <S.Rule>2. 경매 종료 60초 이내에 새로운 입찰이 발생하면, 남은 시간이 60초로 자동 연장됩니다.</S.Rule>
        <S.Rule>3. 경매 종료 후, 낙찰자는 48시간 이내에 결제를 완료해야 합니다.</S.Rule>
        <S.Rule>4. 기한 내 미결제 시, 해당 낙찰은 무효 처리되며 경매 참여에 불이익을 받을 수 있습니다.</S.Rule>
        <S.CloseButton onClick={onClose}>닫기</S.CloseButton>
      </S.Content>
    </S.Backdrop>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default AuctionRulesModal;