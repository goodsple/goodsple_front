// admin/pages/AdminAuctionPage.tsx (최종본)

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../../../components/common/pagination/Pagination';
import AuctionTable from '../components/AuctionTable';
import { mockAdminAuctionData } from '../mock/adminAuctionData';
import * as S from './AdminAuctionPageStyle';

const ITEMS_PER_PAGE = 10;

const AdminAuctionPage = () => {
  const [auctions] = useState(mockAdminAuctionData);
  const [filteredAuctions, setFilteredAuctions] = useState(auctions);
  const [statusFilter, setStatusFilter] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const statuses = ['전체', '예정', '진행', '종료', '중지'];

  useEffect(() => {
    let result = auctions;
    if (statusFilter !== '전체') {
      result = result.filter(auction => auction.status === statusFilter);
    }
    if (searchTerm) {
      result = result.filter(auction => 
        auction.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredAuctions(result);
    setCurrentPage(1);
  }, [statusFilter, searchTerm, auctions]);

  const totalPages = Math.ceil(filteredAuctions.length / ITEMS_PER_PAGE);
  const paginatedAuctions = filteredAuctions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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

        <AuctionTable auctions={paginatedAuctions} />

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