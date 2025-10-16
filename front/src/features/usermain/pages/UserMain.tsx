/**
 * 파일 경로: src/features/usermain/pages/UserMain.tsx
 */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import chatbotIcon from '../../../assets/images/chatbot.png';
import PopupNotice from '../../notice/PopupNotice';
import { getMainPageData } from '../api/mainPageApi';
import BasicComponents from '../components/BasicComponents';
import BestPost from '../components/BestPost';
import CurrentAuction from '../components/CurrentAuction';
import RealTimeEventZone from '../components/RealTimeEventZone';
import RealTimePopular from '../components/RealTimePopular';
import CSS from '../components/UserMainComponents.module.css';
import type { UserMainPageData } from '../types/mainPage';

function UserMain() {

  const navigate = useNavigate();

  const [pageData, setPageData] = useState<UserMainPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getMainPageData();
        setPageData(data);
      } catch (error) {
        console.error("메인 페이지 데이터를 불러오는 데 실패했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChatbotClick = () => {
    navigate("/chatbot");
  };

  return (
    <>
      <PopupNotice />
      <BasicComponents />
      <RealTimePopular />
      <RealTimeEventZone />
      
      {/* --- 경매 카드 섹션 --- */}
      {isLoading ? (
        <div className={CSS.currentAuction}>
          <div className={CSS.preparingOverlay}>
            <p className={CSS.preparingTitle}>경매 정보를 불러오는 중...</p>
          </div>
        </div>
      ) : pageData?.mainAuction ? (
        <CurrentAuction auction={pageData.mainAuction} />
      ) : (
        // 대표 경매가 없을 때 "준비중" UI를 표시합니다.
        <div className={CSS.currentAuction}>
          <div className={CSS.preparingOverlay}>
            <span className={CSS.preparingTitle}>경매 준비중</span>
            <span className={CSS.preparingSubtitle}>다음 경매를 기대해주세요!</span>
          </div>
        </div>
      )}

      <BestPost />

      <button className={CSS.chatbotButton} onClick={handleChatbotClick}>
        <img src={chatbotIcon} alt='Chatbot Icon' />
      </button>

    </>
  );
}

export default UserMain;