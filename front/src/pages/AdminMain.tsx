import * as S from './AdminMainStyle';

import adminBannerImg from '../assets/images/main-banner.png';
import AdminAuctionStatsPanel from '../features/admin/dashboard/auction/AdminAuctionStatsPanel';
import AdminCommunityStatsPanel from '../features/admin/dashboard/community/AdminCommunityPanel';
import AdminPopularKeywordsPanel from '../features/admin/dashboard/keyword/AdminPopularKeywordsPanel';
import AdminReportStatsPanel from '../features/admin/dashboard/report/AdminReportStatsPanel';
import AdminUserStatsPanel from '../features/admin/dashboard/user/AdminUserStatsPanel';

function AdminMain() {
  return (
    <S.PageContainer>
      <S.BannerSection>
        <S.BannerImage src={adminBannerImg} alt="관리자 페이지 배너" />
      </S.BannerSection>

      <S.ContentWrapper>
        <S.GridContainer>
          <S.InfoBox>
            <AdminUserStatsPanel />
          </S.InfoBox>
          <S.InfoBox>
            <AdminReportStatsPanel />
          </S.InfoBox>
          <S.InfoBox className="full-width">
            <AdminAuctionStatsPanel />
          </S.InfoBox>
          <S.InfoBox>
            <AdminCommunityStatsPanel />
          </S.InfoBox>
          <S.InfoBox>
            <AdminPopularKeywordsPanel />
          </S.InfoBox>
        </S.GridContainer>
      </S.ContentWrapper>
    </S.PageContainer>
  );
}

export default AdminMain;
