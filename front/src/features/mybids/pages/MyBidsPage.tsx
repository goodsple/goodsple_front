import MyBidCard from '../components/MyBidCard';
import { mockMyBidsData } from '../mock/myBidsData';
import * as S from './MyBidsPageStyle';

const MyBidsPage = () => {
  return (
    <S.PageWrapper>
      <S.Title>나의 낙찰 내역</S.Title>
      <S.AuctionList>
        {mockMyBidsData.length > 0 ? (
          mockMyBidsData.map((auction) => (
            <MyBidCard key={auction.id} auction={auction} />
          ))
        ) : (
          <p>아직 낙찰받은 내역이 없습니다.</p>
        )}
      </S.AuctionList>
    </S.PageWrapper>
  );
};

export default MyBidsPage;