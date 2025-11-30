import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../../../components/common/pagination/Pagination';
import { getAdminAuctions, updateAdminAuctionStatus } from '../api/auctionApi';
import AuctionTable from '../components/AuctionTable';
import type { AdminAuction } from '../mock/adminAuctionData';
import * as S from './AdminAuctionPageStyle';

const ITEMS_PER_PAGE = 10;

const STATUS_MAP: { [key: string]: string } = {
  '전체': '', 
  '예정': 'scheduled',
  '진행': 'active',
  '종료': 'ended',
  '중지': 'cancelled',
};

const AdminAuctionPage = () => {
  const [auctions, setAuctions] = useState<AdminAuction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [statusFilter, setStatusFilter] = useState('전체'); 
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const statuses = ['전체', '예정', '진행', '종료', '중지'];

  const handleStatusChange = async (auctionId: number, newStatus: string, statusKo: string) => {
    if (!window.confirm(`정말로 경매(ID: ${auctionId}) 상태를 '${statusKo}'(으)로 변경하시겠습니까?`)) {
        return;
    }
    try {
        await updateAdminAuctionStatus(auctionId, newStatus);
        alert('상태가 성공적으로 변경되었습니다.');
        setRefreshTrigger(prev => prev + 1);
    } catch (error) {
        console.error('상태 변경에 실패했습니다:', error);
        alert('상태 변경에 실패했습니다.');
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setCurrentPage(1);
      setSearchTerm(inputValue);
    }
  };

  useEffect(() => {
    const fetchAuctions = async () => {
      setIsLoading(true);
      try {
        const apiStatus = STATUS_MAP[statusFilter];

        const response = await getAdminAuctions({
          page: currentPage - 1,
          size: ITEMS_PER_PAGE,
          status: apiStatus, 
          productName: searchTerm,
          startDate: startDate,
          endDate: endDate,
        });
        setAuctions(response.content);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("경매 목록을 불러오는 데 실패했습니다:", error);
        alert("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuctions();
  }, [statusFilter, searchTerm, currentPage, refreshTrigger, startDate, endDate]);

  return (
    <S.PageContainer>
      <S.ContentCard>
        <S.FilterSection>
          <S.FilterRow>
            <S.FilterLabel>상품명</S.FilterLabel>
            <S.StyledInput 
              type="text" 
              placeholder="검색 후 엔터" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
          </S.FilterRow>
          <S.FilterRow>
            <S.FilterLabel>경매 시작 날짜</S.FilterLabel>
            <S.DateInput type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <span>~</span>
            <S.DateInput type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </S.FilterRow>
        </S.FilterSection>
        
        <S.TabGroup>
          <S.StatusFilterGroup>
            {statuses.map(status => (
              <S.StatusTab 
                key={status}
                onClick={() => {
                  setCurrentPage(1); 
                  setStatusFilter(status);
                }}
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

        {isLoading ? (
          <div>로딩 중...</div>
        ) : (
          <AuctionTable auctions={auctions} onStatusChange={handleStatusChange} />
        )}

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
