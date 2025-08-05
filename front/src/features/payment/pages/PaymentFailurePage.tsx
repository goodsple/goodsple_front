import { useNavigate } from 'react-router-dom';
import * as S from './PaymentResultPageStyle'; // 공통 스타일 사용

const PaymentFailurePage = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate(-1); // 이전 페이지(결제 페이지)로 돌아가기
  };

  return (
    <S.PageWrapper>
      <S.ResultCard className="failure">
        <S.Icon>⚠️</S.Icon>
        <S.Title>결제에 실패했습니다.</S.Title>
        <S.Message>
          결제 처리 중 오류가 발생했습니다. <br />
          잠시 후 다시 시도해주시기 바랍니다.
        </S.Message>

        <S.FailureInfo>
          <p><strong>오류 사유 (예시)</strong></p>
          <p>카드 한도 초과 또는 잔액 부족</p>
        </S.FailureInfo>

        <S.Actions>
          <S.ActionLink to="/">메인으로</S.ActionLink>
          {/* ✨ 버튼 태그 사용 및 danger prop 추가 */}
          <S.ActionButton onClick={handleRetry} $danger>다시 시도</S.ActionButton>
        </S.Actions>
      </S.ResultCard>
    </S.PageWrapper>
  );
};

export default PaymentFailurePage;