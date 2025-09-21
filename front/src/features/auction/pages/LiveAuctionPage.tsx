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
  
  // [추가] 모달의 상태를 관리할 새로운 state
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    title: '',
    content: '',
    onConfirm: () => {},
  });

  const numericAuctionId = Number(auctionId);
  // [수정] 훅에서 systemMessage를 받아옵니다.
  const { auctionUpdate, chatMessage, systemMessage, sendBid, sendChat } = useAuctionSocket(numericAuctionId);

  
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

  // [추가] 시스템 메시지를 수신했을 때 모달을 띄우는 useEffect
  useEffect(() => {
    if (!systemMessage) return;

    if (systemMessage.type === 'AUCTION_CANCELLED') {
      setModalInfo({
        isOpen: true,
        title: '경매 중지',
        content: systemMessage.message,
        onConfirm: () => navigate('/'), // 확인 버튼 누르면 메인으로 이동
      });
    } else if (systemMessage.type === 'AUCTION_ENDED') {
      setModalInfo({
        isOpen: true,
        title: '경매 종료',
        content: systemMessage.message,
        onConfirm: () => navigate('/'), // 확인 버튼 누르면 메인으로 이동
      });
    }
  }, [systemMessage, navigate]);

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
      
      {/* 
        ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ 이 부분이 핵심 수정 사항입니다. ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
        기존에 있던 2개의 ConfirmModal을 아래 1개로 통합합니다.
        이제 이 모달은 '경매 참여 불가' 알림과 '경매 중지/종료' 알림을 모두 처리합니다.
      */}
      <ConfirmModal
        // [수정] 참여 불가 상태이거나, 또는 시스템 메시지로 인해 모달이 열려야 할 때 isOpen은 true가 됩니다.
        isOpen={auctionData.currentUser.isBanned || modalInfo.isOpen}
        
        // [수정] 시스템 메시지 모달이 우선적으로 표시되고, 그렇지 않으면 참여 불가 메시지가 표시됩니다.
        title={modalInfo.isOpen ? modalInfo.title : "경매 참여 불가"}
        content={modalInfo.isOpen ? modalInfo.content : "회원님은 현재 경매 참여가 제한된 상태입니다."}
        
        confirmText="메인으로"
        
        // [수정] 확인 버튼 클릭 시 동작도 동적으로 결정됩니다.
        onConfirm={modalInfo.isOpen ? modalInfo.onConfirm : () => navigate('/')}
      />
      
      {/* 신고 모달 (기존과 동일) */}
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