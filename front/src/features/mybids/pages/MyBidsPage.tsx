// MyBidsPage.tsx (수정 완료된 코드)

import { useState } from 'react'; // 1. useState import
import Pagination from '../../../components/common/pagination/Pagination'; // 2. Pagination 컴포넌트 import
import MyBidCard from '../components/MyBidCard';
import { mockMyBidsData } from '../mock/myBidsData';
import * as S from './MyBidsPageStyle';

const ITEMS_PER_PAGE = 6; // 한 페이지에 보여줄 아이템 수 (디자인에 맞게 조절)

const MyBidsPage = () => {
  // 3. 현재 페이지 상태 관리
  const [currentPage, setCurrentPage] = useState(1);

  // 4. 페이지네이션 정보 계산
  const totalPages = Math.ceil(mockMyBidsData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBids = mockMyBidsData.slice(startIndex, endIndex);

  // 5. 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 페이지 상단으로 스크롤하는 로직을 추가하면 사용자 경험이 좋아집니다.
    window.scrollTo(0, 0);
  };

  return (
    <S.PageWrapper>
      <S.Title>나의 낙찰 내역</S.Title>
      <S.AuctionList>
        {/* 전체 데이터 대신, 현재 페이지 데이터(currentBids)를 map으로 렌더링 */}
        {currentBids.length > 0 ? (
          currentBids.map((auction) => (
            <MyBidCard key={auction.id} auction={auction} />
          ))
        ) : (
          <p>아직 낙찰받은 내역이 없습니다.</p>
        )}
      </S.AuctionList>

      {/* 6. Pagination 컴포넌트 렌더링 및 props 전달 */}
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