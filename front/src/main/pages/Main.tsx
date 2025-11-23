import AuctionSection from "../components/AuctionSection";
import MainBannerSection from "../components/MainBannerSection";
import WhatsNewSection from "../components/WhatsNewSection";

import SearchBox from "../../features/usermain/components/SearchBox";
import CateButtons from "../../features/usermain/components/CateButtons";
import CommMegaPhoneBox from "../../features/usermain/components/CommMegaPhoneBox";

function Main() {
    return(
        <>
        {/* 검색 + 카테고리 */}
        <SearchBox />
        <CateButtons />

        {/* 확성기 공지 */}
        <CommMegaPhoneBox />
        
        {/* 컨텐츠 영역 */}
        <MainBannerSection/>
        <WhatsNewSection/>
        <AuctionSection/>
        </>
    )
}
export default Main;