// src/features/auction/pages/LiveAuctionPage.tsx
import { useState } from 'react';
import { mockAuctionPageData } from '../mock/auctionPageData';

// ✨ 아래 5개의 컴포넌트를 import하는 코드를 추가해주세요.
import AuctionItemInfo from '../components/AuctionItemInfo';
import AuctionStatus from '../components/AuctionStatus';
import BidHistory from '../components/BidHistory';
import BidPanel from '../components/BidPanel';
import LiveChat from '../components/LiveChat';

const LiveAuctionPage = () => {
  const [auctionData, setAuctionData] = useState(mockAuctionPageData);

  return (
    <div>
      {/* 하위 컴포넌트들이 여기에 위치합니다. */}
      <AuctionItemInfo itemInfo={auctionData.itemInfo} />
        <AuctionStatus status={auctionData.status} />
        <BidPanel status={auctionData.status} currentUser={auctionData.currentUser} />
        <LiveChat chatHistory={auctionData.chatHistory} />
        <BidHistory bidHistory={auctionData.bidHistory} />
    </div>
  );
};

export default LiveAuctionPage;