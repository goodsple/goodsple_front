// AuctionSection.tsx
import * as Ac from "./AuctionSectionStyle";

const dummyAuction = {
  title: "NEW JEANS 1st EP 'NEW JEANS' BAG",
  startPrice: 50000,
  currentPrice: 85320,
  remainTime: "01:20",
};

const AuctionSection = () => {
  return (
    <Ac.Section>
     <Ac.Window>
        <Ac.WindowHeader>
            <Ac.WindowTitle>What&apos;s Your Price?</Ac.WindowTitle>
            <Ac.WindowControls>
            <span className="yellow" />
            <span className="gray" />
            <span className="red" />
            </Ac.WindowControls>
        </Ac.WindowHeader>

    <Ac.WindowBody>
        <Ac.ThumbArea>
        <Ac.ThumbCard>
            <Ac.ThumbImage src="" alt="경매 상품 이미지" />
        </Ac.ThumbCard>
        </Ac.ThumbArea>

        <Ac.InfoArea>
        <Ac.InfoTopLabel>현재 진행중인 경매</Ac.InfoTopLabel>
        <Ac.AuctionTitle>NEW JEANS 1st EP &apos;NEW JEANS&apos; BAG</Ac.AuctionTitle>

        <Ac.PriceTable>
            <div className="row">
            <span className="label">시작가</span>
            <span className="value">50,000~</span>
            </div>
            <div className="row">
            <span className="label">현재 입찰가</span>
            <span className="value">
                <span className="highlight">85,320</span>
            </span>
            </div>
            <div className="row">
            <span className="label">남은 시간</span>
            <span className="value">01:20</span>
            </div>
        </Ac.PriceTable>

        <Ac.ButtonRow>
            <Ac.JoinButton>참여하기</Ac.JoinButton>
        </Ac.ButtonRow>
        </Ac.InfoArea>
    </Ac.WindowBody>
</Ac.Window>

    </Ac.Section>
  );
};

export default AuctionSection;
