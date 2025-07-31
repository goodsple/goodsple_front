import type { ShippingInfo } from '../mock/paymentData';
import * as S from './ShippingFormStyle';

interface Props {
  shippingInfo: ShippingInfo;
  onInfoChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ShippingForm: React.FC<Props> = ({ shippingInfo, onInfoChange }) => {
  return (
    <S.FormGroup>
      <S.Title>배송 정보</S.Title>
      <S.InputRow>
        <S.Label>받는 사람</S.Label>
        <S.Input type="text" name="name" value={shippingInfo.name} onChange={onInfoChange} />
      </S.InputRow>
      <S.InputRow>
        <S.Label>연락처</S.Label>
        <S.Input type="text" name="phone" value={shippingInfo.phone} onChange={onInfoChange} />
      </S.InputRow>
      <S.InputRow>
        <S.Label>우편번호</S.Label>
        <S.Input type="text" name="postalCode" value={shippingInfo.postalCode} onChange={onInfoChange} style={{flexBasis: '150px'}} />
        <S.SearchAddressButton>주소 검색</S.SearchAddressButton>
      </S.InputRow>
      <S.InputRow>
        <S.Label>배송 주소</S.Label>
        <S.Input type="text" name="address" value={shippingInfo.address} onChange={onInfoChange} />
      </S.InputRow>
      <S.InputRow>
        <S.Label>배송 메시지</S.Label>
        <S.Textarea name="message" value={shippingInfo.message} onChange={onInfoChange} rows={3}></S.Textarea>
      </S.InputRow>
    </S.FormGroup>
  );
};

export default ShippingForm;