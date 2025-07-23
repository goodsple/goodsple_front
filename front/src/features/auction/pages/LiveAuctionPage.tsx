import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 컴포넌트 임포트
import ConfirmModal from '../../../components/common/modal/ConfirmModal'; // 범용 모달 경로 확인 필요
import AuctionItemInfo from '../components/AuctionItemInfo';
import AuctionStatus from '../components/AuctionStatus';
import BidHistory from '../components/BidHistory';
import BidPanel from '../components/BidPanel';
import LiveChat from '../components/LiveChat';
import AuctionRulesModal from '../modals/AuctionRulesModal';

// 스타일 및 목업 데이터 임포트
import { AUCTION_EXTEND_THRESHOLD, AUCTION_EXTEND_TIME, mockAuctionPageData } from '../mock/auctionPageData';
import type { Bid, ChatMessage } from '../types/auction';
import * as S from './LiveAuctionPageStyle';

// 현재 로그인한 사용자 (테스트용)
const CURRENT_USER_NICKNAME = '해린고양이';

const LiveAuctionPage = () => {
  const navigate = useNavigate();
  // --- 상태 변수 정의 ---
  const [auctionData, setAuctionData] = useState(mockAuctionPageData);
  const [timeLeft, setTimeLeft] = useState(mockAuctionPageData.status.initialTimeLeft);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isPausedModalOpen, setIsPausedModalOpen] = useState(false);
  const [isPenaltyModalOpen, setIsPenaltyModalOpen] = useState(false);

  // --- useEffect 훅 ---
  // 패널티 유저 확인
  useEffect(() => {
    if (auctionData.currentUser.isBanned) {
      setIsPenaltyModalOpen(true);
    }
  }, [auctionData.currentUser.isBanned]);

  // 타이머
  useEffect(() => {
    if (timeLeft <= 0 || isPausedModalOpen) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isPausedModalOpen]);

  // 다른 사람의 입찰/채팅 및 경매 중지 시뮬레이션
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
      }
      // 새로운 채팅 시뮬레이션
      if (Math.random() < 0.4) {
        const newChat: ChatMessage = { chatId: Date.now(), userNickname: '구경꾼', message: '우와... 갖고 싶다', timestamp: new Date().toISOString() };
        setAuctionData(prev => ({ ...prev, chatHistory: [...prev.chatHistory, newChat] }));
      }
      // 경매 중지 시뮬레이션
      if (Math.random() < 0.05) {
        setIsPausedModalOpen(true);
      }
    }, 5000);
    return () => clearInterval(simulationInterval);
  }, [auctionData.status.currentPrice]);

  // --- 이벤트 핸들러 ---
  const handlePlaceBid = (amount: number) => {
    if (amount > auctionData.status.currentPrice) {
      const newBid: Bid = { bidId: Date.now(), userNickname: CURRENT_USER_NICKNAME, bidAmount: amount, timestamp: new Date().toISOString() };
      
      setAuctionData(prev => ({
        ...prev,
        status: { ...prev.status, currentPrice: amount, highestBidderNickname: newBid.userNickname },
        bidHistory: [newBid, ...prev.bidHistory]
      }));

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

      <ConfirmModal
        isOpen={isPausedModalOpen}
        title="경매 일시 중지"
        content="관리자에 의해 경매가 잠시 중지되었습니다. 잠시 후 다시 시작될 예정입니다."
        confirmText="메인으로" // 버튼 텍스트 변경
        onConfirm={() => navigate('/')} // ✨ 메인 페이지로 이동하도록 수정
      />

      <ConfirmModal
        isOpen={isPenaltyModalOpen}
        title="경매 참여 불가"
        content="회원님은 현재 경매 참여가 제한된 상태입니다. 자세한 내용은 고객센터로 문의해주세요."
        confirmText="메인으로"
        onConfirm={() => navigate('/')}
      />
    </>
  );
};

export default LiveAuctionPage;