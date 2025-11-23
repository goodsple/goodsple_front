import bannerImg from '../../assets/images/main-banner.png';
import * as Mb from './MainBannerSectionStyle';

const MainBannerSection = () => {
    return (
      <Mb.BannerSection>
            <Mb.BannerImage src={bannerImg} alt="굿즈 교환 메인 배너" />
      </Mb.BannerSection>
    );
  };
  
  export default MainBannerSection;