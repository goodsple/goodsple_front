import * as S from './AdminMainStyle';
// 이미지 경로를 실제 위치에 맞게 수정해주세요.
import adminCharacterImg from '../assets/images/adminmain.png';

function AdminMain() {
  return (
    <S.PageContainer>
      {/* 1. 상단 배너 */}
      <S.BannerSection>
        <S.TextContent>
          <h2>모든 팬덤의 굿즈가 흐르는 곳</h2>
          <p>
            굿즈플은 K-POP을 비롯한 여러 팬덤의 액세서리, 앨범, 포토카드, 의류, 스티커, 문구류 등<br />
            굿즈가 중고거래되는 앱입니다. 팬덤 문화에 특화된 굿즈 교환 및 거래 플랫폼입니다.<br />
            희귀 팬템을 전문적으로 연결하고, 모든 팬들의 즐거운 거래 경험을 제공합니다.
          </p>
        </S.TextContent>
        <S.CharacterImage src={adminCharacterImg} alt="관리자 페이지 캐릭터" />
      </S.BannerSection>

      {/* 2. 회색 정보 박스 그리드 */}
      <S.GridContainer>
        <S.InfoBox>회원통계</S.InfoBox>
        <S.InfoBox>신고통계</S.InfoBox>
        
        {/* 가로로 긴 박스 */}
        <S.InfoBox className="full-width">카테고리 통계</S.InfoBox>
        
        <S.InfoBox>커뮤니티</S.InfoBox>
        <S.InfoBox>인기검색어</S.InfoBox>
        
        {/* 가로로 긴 박스 */}
        <S.InfoBox className="full-width">라이브 경매</S.InfoBox>
      </S.GridContainer>
    </S.PageContainer>
  );
}

export default AdminMain;