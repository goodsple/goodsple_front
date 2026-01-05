import { useEffect, useState } from 'react';
import Pagination from '../../../components/common/pagination/Pagination';
import { getMyWonAuctions } from '../../mybids/api/myBidsApi';
import type { MyWonAuction } from '../../mybids/types/mybids';
import MyBidCard from '../components/MyBidCard';
import * as S from './MyBidsPageStyle';

const ITEMS_PER_PAGE = 6;

const MyBidsPage = () => {
  const [wonAuctions, setWonAuctions] = useState<MyWonAuction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchWonAuctions = async () => {
      setIsLoading(true);
      try {
        const response = await getMyWonAuctions({
          page: currentPage - 1, 
          size: ITEMS_PER_PAGE,
        });
        setWonAuctions(response.content);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("나의 낙찰 내역을 불러오는 데 실패했습니다:", error);
        alert("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWonAuctions();
  }, [currentPage]); 

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  if (isLoading) {
    return (
      <S.PageWrapper>
        <S.Title>나의 낙찰 내역</S.Title>
        <div>데이터를 불러오는 중입니다...</div>
      </S.PageWrapper>
    );
  }

  return (
    <S.PageWrapper>
      <S.Title>나의 낙찰 내역</S.Title>
      <S.AuctionList>
        {wonAuctions.length > 0 ? (
          wonAuctions.map((auction) => (
            <MyBidCard key={auction.auctionId} auction={auction} />
          ))
        ) : (
          <p>아직 낙찰받은 내역이 없습니다.</p>
        )}
      </S.AuctionList>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </S.PageWrapper>
  );
};

export default MyBidsPage;