// src/features/auction/pages/LiveAuctionPage.tsx
import { useState } from 'react';
import { mockAuctionPageData } from '../mock/auctionPageData';
import * as S from './LiveAuctionPageStyle';

// ✨ 아래 5개의 컴포넌트를 import하는 코드를 추가해주세요.
import AuctionItemInfo from '../components/AuctionItemInfo';
import AuctionStatus from '../components/AuctionStatus';
import BidHistory from '../components/BidHistory';
import BidPanel from '../components/BidPanel';
import LiveChat from '../components/LiveChat';

const LiveAuctionPage = () => {
  const [auctionData, setAuctionData] = useState(mockAuctionPageData);

  return (
    // ✨ 2. 기존 div를 PageWrapper로 변경하고 컬럼으로 묶기
    <S.PageWrapper>
      <S.LeftColumn>
        <AuctionItemInfo itemInfo={auctionData.itemInfo} />
      </S.LeftColumn>
      
      <S.CenterColumn>
        <AuctionStatus status={auctionData.status} />
        <BidPanel status={auctionData.status} currentUser={auctionData.currentUser} />
        <BidHistory bidHistory={auctionData.bidHistory} />
      </S.CenterColumn>
      
      <S.RightColumn>
        <LiveChat chatHistory={auctionData.chatHistory} />
      </S.RightColumn>
    </S.PageWrapper>
  );
};

export default LiveAuctionPage;