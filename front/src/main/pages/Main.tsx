import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getMainPageData, type UserMainPageResponse } from '../api/mainPageApi';


import chatbotIcon from '../../assets/images/chatbot.png';

import AuctionSection from '../components/AuctionSection';
import MainBannerSection from '../components/MainBannerSection';
import WhatsNewSection from '../components/WhatsNewSection';

import CateButtons from '../components/CateButtons';
import CommMegaPhoneBox from '../components/CommMegaPhoneBox';
import SearchBox from '../components/SearchBox';
import PopupNotice from '../../features/notice/PopupNotice';

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
    {/* 팝업 공지사항 */}
    <PopupNotice />

      {/* 검색 + 카테고리 */}
      <SearchBox />
      <CateButtons />

        {/* 확성기 공지 */}
        <CommMegaPhoneBox />
        
        {/* 컨텐츠 영역 */}
        <MainBannerSection/>
        <WhatsNewSection/>
        <AuctionSection 
                data={pageData?.mainAuction || null} 
                isLoading={isLoading} 
            />

            <img
                src={chatbotIcon}
                alt="챗봇"
                onClick={() => navigate('/chatbot')}
                style={{
                    position: 'fixed',
                    right: '30px',
                    bottom: '30px',
                    width: '70px',
                    cursor: 'pointer',
                    zIndex: 1000,
                }}
            />
        </>
    )
}
export default Main;
