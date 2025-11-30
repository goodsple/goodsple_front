import * as S from './AdminMainStyle';

import adminBannerImg from '../assets/images/main-banner.png';
import AdminUserStatsPanel from '../features/admin/dashborad/user/AdminUserStatsPanel';
import AdminReportStatsPanel from '../features/admin/dashborad/report/ AdminReportStatsPanel';

function AdminMain() {
  return (
    <S.PageContainer>
      <S.BannerSection>
        <S.BannerImage src={adminBannerImg} alt="관리자 페이지 배너" />
      </S.BannerSection>

      <S.ContentWrapper>
        <S.GridContainer>
          <S.InfoBox>
            <AdminUserStatsPanel/>
          </S.InfoBox>
          <S.InfoBox>
            <AdminReportStatsPanel/>
          </S.InfoBox>
          <S.InfoBox className="full-width">라이브 경매</S.InfoBox>
          <S.InfoBox>커뮤니티</S.InfoBox>
          <S.InfoBox>인기검색어</S.InfoBox>
        </S.GridContainer>
      </S.ContentWrapper>
    </S.PageContainer>
  );
}

export default AdminMain;