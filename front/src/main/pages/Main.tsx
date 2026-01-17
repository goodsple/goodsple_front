import { useEffect, useState } from 'react';

import { getMainPageData, type UserMainPageResponse } from '../api/mainPageApi';

import { useNavigate } from 'react-router-dom';

import chatbotIcon from '../../assets/images/chatbot.png';
import CSS from '../../features/usermain/components/UserMainComponents.module.css';

import AuctionSection from '../components/AuctionSection';
import MainBannerSection from '../components/MainBannerSection';
import WhatsNewSection from '../components/WhatsNewSection';

import CateButtons from '../../features/usermain/components/CateButtons';
import CommMegaPhoneBox from '../../features/usermain/components/CommMegaPhoneBox';
import SearchBox from '../../features/usermain/components/SearchBox';

function Main() {
  const navigate = useNavigate();

  const [pageData, setPageData] = useState<UserMainPageResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getMainPageData();
        setPageData(data);
      } catch (error) {
        console.error('메인 페이지 데이터 로딩 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChatbotClick = () => {
    navigate('/chatbot');
  };

  return (
    <>
      {/* 검색 + 카테고리 */}
      <SearchBox />
      <CateButtons />

      {/* 확성기 공지 */}
      <CommMegaPhoneBox />

      {/* 컨텐츠 영역 */}
      <MainBannerSection />
      <WhatsNewSection />
      <AuctionSection
        data={pageData?.mainAuction || null}
        isLoading={isLoading}
      />

      <button className={CSS.chatbotButton} onClick={handleChatbotClick}>
        <img src={chatbotIcon} alt="Chatbot Icon" />
      </button>
    </>
  );
}
export default Main;
