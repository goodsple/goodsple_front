import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Ac from "./AuctionSectionStyle";

export interface AuctionData {
  auctionId: number;
  auctionTitle: string;  
  imageUrl: string;
  startPrice: number;
  currentPrice: number;
  startTime: string;
  endTime: string;
  status: string;
}

interface Props {
  data: AuctionData | null; 
  isLoading: boolean;
}

const formatTimeLeft = (endTime: string) => {
  const now = new Date().getTime();
  const end = new Date(endTime).getTime();
  const diff = Math.floor((end - now) / 1000);
  if (diff <= 0) return '00:00:00';
  
  const hours = String(Math.floor(diff / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
  const seconds = String(diff % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

const AuctionSection = ({ data, isLoading }: Props) => {
  const [timeLeft, setTimeLeft] = useState('00:00:00');

  useEffect(() => {
    if (!data?.endTime) return;
    
    setTimeLeft(formatTimeLeft(data.endTime));
    const timer = setInterval(() => {
      setTimeLeft(formatTimeLeft(data.endTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [data?.endTime]);

  if (isLoading) return <Ac.Section><div>Loading...</div></Ac.Section>;
  
  if (!data) {
     return (
        <Ac.Section>
            <Ac.Window>
                <Ac.WindowBody>
                    <div>진행 예정인 경매가 없습니다.</div>
                </Ac.WindowBody>
            </Ac.Window>
        </Ac.Section>
     );
  }

  const isScheduled = data.status?.toUpperCase() === 'SCHEDULED';

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
              <Ac.ThumbImage src={data.imageUrl} alt={data.auctionTitle} />
            </Ac.ThumbCard>
          </Ac.ThumbArea>

          <Ac.InfoArea>
            <Ac.InfoTopLabel>
              {isScheduled ? '곧 시작될 경매' : '현재 진행중인 경매'}
            </Ac.InfoTopLabel>
            
            <Ac.AuctionTitle>{data.auctionTitle}</Ac.AuctionTitle>

            <Ac.PriceTable>
              <div className="row">
                <span className="label">시작가</span>
                <span className="value">{data.startPrice.toLocaleString()}~</span>
              </div>
              <div className="row">
                <span className="label">현재 입찰가</span>
                <span className="value">
                  <span className="highlight">{data.currentPrice.toLocaleString()}</span>
                </span>
              </div>
              <div className="row">
                <span className="label">남은 시간</span>
                <span className="value">{timeLeft}</span>
              </div>
            </Ac.PriceTable>

            <Ac.ButtonRow>
              <Link to={`/auction/live/${data.auctionId}`} style={{ textDecoration: 'none' }}>
                 <Ac.JoinButton disabled={isScheduled}>
                    {isScheduled ? '대기중' : '참여하기'}
                 </Ac.JoinButton>
              </Link>
            </Ac.ButtonRow>
          </Ac.InfoArea>
        </Ac.WindowBody>
      </Ac.Window>
    </Ac.Section>
  );
};

export default AuctionSection;