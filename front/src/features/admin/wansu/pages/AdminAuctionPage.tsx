// admin/pages/AdminAuctionPage.tsx (최종본)

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../../../components/common/pagination/Pagination';
import { getAdminAuctions } from '../api/auctionApi'; // 1. API 함수 import
import AuctionTable from '../components/AuctionTable';
import type { AdminAuction } from '../mock/adminAuctionData';
import * as S from './AdminAuctionPageStyle';

const ITEMS_PER_PAGE = 10;

const AdminAuctionPage = () => {
  const [auctions, setAuctions] = useState<AdminAuction[]>([]); // 2. 경매 목록 상태
  const [isLoading, setIsLoading] = useState(true); // 3. 로딩 상태 추가
  const [totalPages, setTotalPages] = useState(0); // 4. 전체 페이지 수 상태
  const [statusFilter, setStatusFilter] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const statuses = ['전체', '예정', '진행', '종료', '중지'];

  // 5. 필터나 페이지가 변경될 때마다 API를 호출하는 useEffect
  useEffect(() => {
    const fetchAuctions = async () => {
      setIsLoading(true);
      try {
        const response = await getAdminAuctions({
          page: currentPage - 1, // 백엔드는 0부터 시작하므로 -1
          size: ITEMS_PER_PAGE,
          status: statusFilter,
          productName: searchTerm,
        });
        setAuctions(response.content);
        setTotalPages(response.totalPages);
      } catch (error) {
        // axiosInstance에 에러 인터셉터가 있다면 거기서 처리될 수 있습니다.
        // 없다면 여기서 에러 처리를 합니다. (예: alert, 에러 페이지로 이동)
        console.error("경매 목록을 불러오는 데 실패했습니다:", error);
        alert("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuctions();
  }, [statusFilter, searchTerm, currentPage]); // 의존성 배열에 currentPage 추가

  return (
    <S.PageContainer>
      <S.ContentCard>
        {/* ✨ 인라인 스타일을 모두 제거하고 스타일 컴포넌트로 대체 */}
        <S.FilterSection>
          <S.FilterRow>
            <S.FilterLabel>상품명</S.FilterLabel>
            <S.StyledInput 
              type="text" 
              placeholder="검색" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </S.FilterRow>
          <S.FilterRow>
            <S.FilterLabel>등록 날짜</S.FilterLabel>
            <S.DateInput type="date" />
            <span>~</span>
            <S.DateInput type="date" />
          </S.FilterRow>
        </S.FilterSection>
        
        <S.TabGroup>
          <S.StatusFilterGroup>
            {statuses.map(status => (
              <S.StatusTab 
                key={status}
                onClick={() => setStatusFilter(status)}
                $isActive={statusFilter === status}
              >
                {status}
              </S.StatusTab>
            ))}
          </S.StatusFilterGroup>
          <Link to="/admin/auctions/create">
            <S.RegisterButton>경매 등록</S.RegisterButton>
          </Link>
        </S.TabGroup>

        <AuctionTable auctions={auctions} />

        {totalPages > 1 && (
          <S.PaginationWrapper>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </S.PaginationWrapper>
        )}
      </S.ContentCard>
    </S.PageContainer>
  );
};
export default AdminAuctionPage;