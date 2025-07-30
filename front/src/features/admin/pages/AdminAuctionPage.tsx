import { useEffect, useState } from 'react';
import AdminControls from '../components/AdminControls';
import AuctionTable from '../components/AuctionTable';
import { mockAdminAuctionData } from '../mock/adminAuctionData';
import * as S from './AdminAuctionPageStyle';

const AdminAuctionPage = () => {
  const [auctions] = useState(mockAdminAuctionData);
  const [filteredAuctions, setFilteredAuctions] = useState(auctions);
  const [statusFilter, setStatusFilter] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');

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
  }, [statusFilter, searchTerm, auctions]);

  return (
    <S.PageWrapper>
      <AdminControls 
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />
      <AuctionTable auctions={filteredAuctions} />
      {/* TODO: 페이지네이션 컴포넌트 추가 */}
    </S.PageWrapper>
  );
};
export default AdminAuctionPage;