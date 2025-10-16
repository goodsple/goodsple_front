import { useEffect, useState } from 'react'; // useEffect 추가
import Pagination from '../../../components/common/pagination/Pagination';
import { getMyWonAuctions } from '../../mybids/api/myBidsApi'; // [수정] 새로 만든 API 함수 import
import type { MyWonAuction } from '../../mybids/types/mybids'; // [수정] 새로 만든 타입 import
import MyBidCard from '../components/MyBidCard';
import * as S from './MyBidsPageStyle';

const ITEMS_PER_PAGE = 6;

const MyBidsPage = () => {
  // [추가] 로딩 및 데이터 상태 관리
  const [wonAuctions, setWonAuctions] = useState<MyWonAuction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // [추가] API 호출을 위한 useEffect
  useEffect(() => {
    const fetchWonAuctions = async () => {
      setIsLoading(true);
      try {
        const response = await getMyWonAuctions({
          page: currentPage - 1, // 백엔드는 page가 0부터 시작
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
  }, [currentPage]); // currentPage가 변경될 때마다 API를 다시 호출

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  // [추가] 로딩 중 UI 처리
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
        {/* [수정] 목업 데이터 대신 API로부터 받아온 wonAuctions 사용 */}
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