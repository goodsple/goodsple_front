// features/auction/pages/LiveAuctionPage.tsx (최종 수정본)

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// 컴포넌트 임포트
import ConfirmModal from '../../../components/common/modal/ConfirmModal';
import ReportModal from '../../../components/common/modal/ReportModal';
import AuctionItemInfo from '../components/AuctionItemInfo';
import AuctionStatus from '../components/AuctionStatus';
import BidHistory from '../components/BidHistory';
import BidPanel from '../components/BidPanel';
import LiveChat from '../components/LiveChat';
import AuctionRulesModal from '../modals/AuctionRulesModal';

// API 및 커스텀 훅 import
import { getAuctionPageData } from '../api/auctionApi';
import { useAuctionSocket } from '../hooks/useAuctionSocket';

// 타입 import
import type { AuctionPageData, ChatMessage } from '../types/auction';
import * as S from './LiveAuctionPageStyle';

const LiveAuctionPage = () => {
  const navigate = useNavigate();
  const { auctionId } = useParams();
  
  // --- 상태 변수 정의 ---
  const [auctionData, setAuctionData] = useState<AuctionPageData | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportingUser, setReportingUser] = useState<string | null>(null);
  
  // --- WebSocket 커스텀 훅 사용 ---
  const numericAuctionId = Number(auctionId);
  const { auctionUpdate, chatMessage, sendBid, sendChat } = useAuctionSocket(numericAuctionId);

  // --- useEffect 훅 ---

  // 1. 페이지 최초 로드 시, REST API로 경매 초기 데이터 불러오기
  useEffect(() => {
    if (!numericAuctionId) return;

    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const data = await getAuctionPageData(numericAuctionId);
        setAuctionData(data);
        // 서버에서 받은 종료 시간과 현재 시간의 차이를 계산하여 타이머 초기화
        const endTime = new Date(data.status.endTime).getTime();
        const now = new Date().getTime();
        setTimeLeft(Math.max(0, Math.floor((endTime - now) / 1000)));
      } catch (error) {
        console.error("Failed to fetch auction data:", error);
        alert("경매 정보를 불러올 수 없습니다.");
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, [numericAuctionId, navigate]);

  // 2. 타이머 설정
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // 3. WebSocket으로 '경매 상태 업데이트' 메시지 수신 시 처리
  useEffect(() => {
    if (!auctionUpdate || !auctionData) return;

    setAuctionData(prev => prev ? ({
      ...prev,
      status: {
        ...prev.status,
        currentPrice: auctionUpdate.currentPrice,
        highestBidderNickname: auctionUpdate.topBidderNickname,
      },
      bidHistory: [auctionUpdate.newBid, ...prev.bidHistory],
    }) : null);

    // 시간 연장 처리
    const newEndTime = new Date(auctionUpdate.extendedEndTime).getTime();
    const now = new Date().getTime();
    setTimeLeft(Math.max(0, Math.floor((newEndTime - now) / 1000)));

  }, [auctionUpdate]);

  // 4. WebSocket으로 '채팅 메시지' 수신 시 처리
  useEffect(() => {
    if (!chatMessage || !auctionData) return;

    const newChatMessage: ChatMessage = {
        chatId: Date.now(), // 임시 ID
        userNickname: chatMessage.senderNickname,
        message: chatMessage.message,
        timestamp: chatMessage.timestamp,
    };

    setAuctionData(prev => prev ? ({
      ...prev,
      chatHistory: [...prev.chatHistory, newChatMessage],
    }) : null);
  }, [chatMessage]);


  // --- 이벤트 핸들러 ---
  const handlePlaceBid = (amount: number) => {
    if (!auctionData) return false;
    if (amount > auctionData.status.currentPrice) {
      sendBid(amount); // WebSocket으로 입찰 메시지 전송
      return true;
    }
    alert(`현재가(${auctionData.status.currentPrice.toLocaleString()}원)보다 높은 금액을 입력해야 합니다.`);
    return false;
  };

  const handleSendChat = (message: string) => {
    sendChat(message); // WebSocket으로 채팅 메시지 전송
  };

  const handleShare = () => alert('경매 링크가 복사되었습니다! (기능 구현 필요)');
  
  const handleReport = (user: string) => {
    setReportingUser(user);
    setIsReportModalOpen(true);
  };

  const handleConfirmReport = (selectedIds: number[], detailText: string) => {
    console.log(`${reportingUser}님을 다음 사유로 신고:`, selectedIds, detailText);
    alert(`${reportingUser}님을 신고했습니다.`);
    setIsReportModalOpen(false);
    setReportingUser(null);
  };

  if (isLoading || !auctionData) {
    return <div>경매 정보를 불러오는 중입니다...</div>;
  }

  return (
    <>
      <S.PageWrapper>
        <S.LeftColumn>
          <AuctionItemInfo 
            itemInfo={auctionData.itemInfo} 
            onShare={handleShare}
            onShowRules={() => setIsRulesModalOpen(true)}
          />
        </S.LeftColumn>
        
        <S.CenterColumn>
          <AuctionStatus 
            status={auctionData.status}
            timeLeft={timeLeft}
          />
          <BidPanel
            status={auctionData.status}
            currentUserNickname={auctionData.currentUser.nickname}
            onPlaceBid={handlePlaceBid}
          />
          <BidHistory
            bidHistory={auctionData.bidHistory}
            currentUserNickname={auctionData.currentUser.nickname}
          />
        </S.CenterColumn>
        
        <S.RightColumn>
          <LiveChat
            chatHistory={auctionData.chatHistory}
            onSendChat={handleSendChat}
            onReport={handleReport}
          />
        </S.RightColumn>
      </S.PageWrapper>

      <AuctionRulesModal 
        isOpen={isRulesModalOpen} 
        onClose={() => setIsRulesModalOpen(false)} 
      />
      
      {/* TODO: 아래 모달들은 실제 데이터와 연동 필요 */}
      <ConfirmModal
        isOpen={false} // isPausedModalOpen
        title="경매 일시 중지"
        content="관리자에 의해 경매가 잠시 중지되었습니다."
        confirmText="메인으로"
        onConfirm={() => navigate('/')}
      />

      <ConfirmModal
        isOpen={auctionData.currentUser.isBanned} // isPenaltyModalOpen
        title="경매 참여 불가"
        content="회원님은 현재 경매 참여가 제한된 상태입니다."
        confirmText="메인으로"
        onConfirm={() => navigate('/')}
      />

      {isReportModalOpen && (
        <ReportModal
          onConfirm={handleConfirmReport}
          onCancel={() => setIsReportModalOpen(false)}
        />
      )}
    </>
  );
};

export default LiveAuctionPage;