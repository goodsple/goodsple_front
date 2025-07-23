import { useEffect, useState } from 'react';

// 컴포넌트 임포트
import AuctionItemInfo from '../components/AuctionItemInfo';
import AuctionStatus from '../components/AuctionStatus';
import BidHistory from '../components/BidHistory';
import BidPanel from '../components/BidPanel';
import LiveChat from '../components/LiveChat';
import AuctionRulesModal from '../modals/AuctionRulesModal'; // 모달 분리

// 스타일 및 목업 데이터 임포트
import { AUCTION_EXTEND_THRESHOLD, AUCTION_EXTEND_TIME, mockAuctionPageData } from '../mock/auctionPageData';
import type { Bid, ChatMessage } from '../types/auction';
import * as S from './LiveAuctionPageStyle';

// 현재 로그인한 사용자 (테스트용)
const CURRENT_USER_NICKNAME = '해린고양이';

const LiveAuctionPage = () => {
  // --- 상태 변수 정의 ---
  const [auctionData, setAuctionData] = useState(mockAuctionPageData);
  const [timeLeft, setTimeLeft] = useState(mockAuctionPageData.status.initialTimeLeft);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [priceChanged, setPriceChanged] = useState(false);

  // --- useEffect 훅 (시뮬레이션 로직) ---
  // 타이머
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // 다른 사람의 입찰/채팅 시뮬레이션
  useEffect(() => {
    const simulationInterval = setInterval(() => {
      // 새로운 입찰 시뮬레이션
      if (Math.random() < 0.3) {
        const newPrice = auctionData.status.currentPrice + Math.floor(Math.random() * 5 + 1) * 1000;
        const newBid: Bid = { bidId: Date.now(), userNickname: '경쟁자' + Math.floor(Math.random() * 10), bidAmount: newPrice, timestamp: new Date().toISOString() };
        
        setAuctionData(prev => ({
            ...prev,
            status: { ...prev.status, currentPrice: newPrice, highestBidderNickname: newBid.userNickname },
            bidHistory: [newBid, ...prev.bidHistory]
        }));
        setPriceChanged(true); // 가격 변경 애니메이션 트리거
      }
      // 새로운 채팅 시뮬레이션
      if (Math.random() < 0.4) {
        const newChat: ChatMessage = { chatId: Date.now(), userNickname: '구경꾼', message: '우와... 갖고 싶다', timestamp: new Date().toISOString() };
        setAuctionData(prev => ({ ...prev, chatHistory: [...prev.chatHistory, newChat] }));
      }
    }, 5000);
    return () => clearInterval(simulationInterval);
  }, [auctionData.status.currentPrice]);

  // 가격 변경 하이라이트 효과를 위한 타이머
  useEffect(() => {
    if (priceChanged) {
      const timeout = setTimeout(() => setPriceChanged(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [priceChanged]);

  // --- 이벤트 핸들러 ---
  const handlePlaceBid = (amount: number) => {
    if (amount > auctionData.status.currentPrice) {
      const newBid: Bid = { bidId: Date.now(), userNickname: CURRENT_USER_NICKNAME, bidAmount: amount, timestamp: new Date().toISOString() };
      
      setAuctionData(prev => ({
        ...prev,
        status: { ...prev.status, currentPrice: amount, highestBidderNickname: newBid.userNickname },
        bidHistory: [newBid, ...prev.bidHistory]
      }));
      setPriceChanged(true);

      // 경매 시간 연장
      if (timeLeft < AUCTION_EXTEND_THRESHOLD) {
        setTimeLeft(AUCTION_EXTEND_TIME);
      }
      return true; // 입찰 성공
    }
    alert('현재가보다 높은 금액을 입력해야 합니다.');
    return false; // 입찰 실패
  };
  
  const handleShare = () => alert('경매 링크가 복사되었습니다! (기능 구현 필요)');
  const handleReport = (user: string) => alert(`${user}님을 신고했습니다. (기능 구현 필요)`);

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
            currentUserNickname={CURRENT_USER_NICKNAME}
            onPlaceBid={handlePlaceBid}
          />
          <BidHistory
            bidHistory={auctionData.bidHistory}
            currentUserNickname={CURRENT_USER_NICKNAME}
          />
        </S.CenterColumn>
        
        <S.RightColumn>
          <LiveChat
            chatHistory={auctionData.chatHistory}
            onReport={handleReport}
          />
        </S.RightColumn>
      </S.PageWrapper>

      <AuctionRulesModal 
        isOpen={isRulesModalOpen} 
        onClose={() => setIsRulesModalOpen(false)} 
      />
    </>
  );
};

export default LiveAuctionPage;