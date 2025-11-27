/**
 * 파일 경로: src/components/AuctionSection.tsx
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Ac from "./AuctionSectionStyle";

// [중요] 백엔드 UserMainAuctionDto.java와 100% 일치시킨 타입 정의
export interface AuctionData {
  auctionId: number;
  auctionTitle: string;  // 백엔드 이름(auctionTitle)에 맞춤!
  imageUrl: string;
  startPrice: number;
  currentPrice: number;
  startTime: string;
  endTime: string;
  status: string;
}

interface Props {
  data: AuctionData | null; // 부모에게서 받은 데이터
  isLoading: boolean;
}

// 시간 계산 함수 (기존 동일)
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
  
  // 데이터가 없거나(null), mainAuction이 비어있을 경우 처리
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

  // 상태가 'scheduled' (대문자/소문자 확인 필요, 보통 백엔드 enum은 대문자일 수 있음)
  // 안전하게 대소문자 무시하고 비교
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
            
            {/* 여기를 title -> auctionTitle로 변경 */}
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