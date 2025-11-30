import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ConfirmModal from '../../../components/common/modal/ConfirmModal';
import ReportModal from '../../../components/common/modal/ReportModal';
import AuctionItemInfo from '../components/AuctionItemInfo';
import AuctionStatus from '../components/AuctionStatus';
import BidHistory from '../components/BidHistory';
import BidPanel from '../components/BidPanel';
import LiveChat from '../components/LiveChat';
import AuctionRulesModal from '../modals/AuctionRulesModal';

import { getAuctionPageData } from '../api/auctionApi';
import { useAuctionSocket } from '../hooks/useAuctionSocket';

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
  
  
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    title: '',
    content: '',
    onConfirm: () => {},
  });

  const numericAuctionId = Number(auctionId);
  const { auctionUpdate, chatMessage, systemMessage, errorMessage, sendBid, sendChat } = useAuctionSocket(numericAuctionId);


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

  useEffect(() => {
    if (!systemMessage) return;

    if (systemMessage.type === 'AUCTION_CANCELLED') {
      setModalInfo({
        isOpen: true,
        title: '경매 중지',
        content: systemMessage.message,
        onConfirm: () => navigate('/'), 
      });
    } else if (systemMessage.type === 'AUCTION_ENDED') {
      setModalInfo({
        isOpen: true,
        title: '경매 종료',
        content: systemMessage.message,
        onConfirm: () => navigate('/'), 
      });
    }
  }, [systemMessage, navigate]);

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage.message); 
    }
  }, [errorMessage]);

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
        isOpen={auctionData.currentUser.isBanned || modalInfo.isOpen}
        
        title={modalInfo.isOpen ? modalInfo.title : "경매 참여 불가"}
        content={modalInfo.isOpen ? modalInfo.content : "회원님은 현재 경매 참여가 제한된 상태입니다."}
        
        confirmText="메인으로"
        
        onConfirm={modalInfo.isOpen ? modalInfo.onConfirm : () => navigate('/')}
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