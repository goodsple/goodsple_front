// features/auction/pages/LiveAuctionPage.tsx (최종 수정본)

import { useCallback, useEffect, useState } from 'react';
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
  
  const [auctionData, setAuctionData] = useState<AuctionPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportingUser, setReportingUser] = useState<string | null>(null);
  
  const numericAuctionId = Number(auctionId);
  const { auctionUpdate, chatMessage, sendBid, sendChat } = useAuctionSocket(numericAuctionId);

  // 페이지 최초 로드 시 데이터 불러오기
  useEffect(() => {
    if (!numericAuctionId) return;
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const data = await getAuctionPageData(numericAuctionId);
        setAuctionData(data);
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

  // WebSocket으로 '경매 상태 업데이트' 메시지 수신 시 처리
  useEffect(() => {
    if (!auctionUpdate || !auctionData) return;
    setAuctionData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        status: {
          ...prev.status,
          currentPrice: auctionUpdate.currentPrice,
          highestBidderNickname: auctionUpdate.topBidderNickname,
          endTime: auctionUpdate.extendedEndTime,
        },
        bidHistory: [auctionUpdate.newBid, ...prev.bidHistory],
      };
    });
  }, [auctionUpdate]);

  // WebSocket으로 '채팅 메시지' 수신 시 처리
  useEffect(() => {
    if (!chatMessage || !auctionData) return;
    const newChatMessage: ChatMessage = {
        chatId: Date.now(),
        userNickname: chatMessage.senderNickname,
        message: chatMessage.message,
        timestamp: chatMessage.timestamp,
    };
    setAuctionData(prev => prev ? ({
      ...prev,
      chatHistory: [...prev.chatHistory, newChatMessage],
    }) : null);
  }, [chatMessage]);

  const handlePlaceBid = useCallback((amount: number) => {
    if (!auctionData) return false;
    if (amount > auctionData.status.currentPrice) {
      sendBid(amount);
      return true;
    }
    alert(`현재가(${auctionData.status.currentPrice.toLocaleString()}원)보다 높은 금액을 입력해야 합니다.`);
    return false;
  }, [auctionData, sendBid]);

  const handleSendChat = useCallback((message: string) => {
    sendChat(message);
  }, [sendChat]);

  const handleShare = useCallback(() => alert('경매 링크가 복사되었습니다! (기능 구현 필요)'), []);
  
  const handleReport = useCallback((user: string) => {
    setReportingUser(user);
    setIsReportModalOpen(true);
  }, []);

  const handleConfirmReport = useCallback((selectedIds: number[], detailText: string) => {
    console.log(`${reportingUser}님을 다음 사유로 신고:`, selectedIds, detailText);
    alert(`${reportingUser}님을 신고했습니다.`);
    setIsReportModalOpen(false);
    setReportingUser(null);
  }, [reportingUser]);

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
          <AuctionStatus status={auctionData.status} />
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
      
      <ConfirmModal
        isOpen={false} 
        title="경매 일시 중지"
        content="관리자에 의해 경매가 잠시 중지되었습니다."
        confirmText="메인으로"
        onConfirm={() => navigate('/')}
      />

      <ConfirmModal
        isOpen={auctionData.currentUser.isBanned}
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