import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuctionTable from '../components/AuctionTable';
import { mockAdminAuctionData } from '../mock/adminAuctionData';
import * as S from './AdminAuctionPageStyle';

// AdminControls 컴포넌트는 더 이상 사용하지 않거나, 검색/날짜 필터만 남겨둘 수 있습니다.
// 여기서는 페이지에 직접 필터를 구현합니다.

const AdminAuctionPage = () => {
  const [auctions] = useState(mockAdminAuctionData);
  const [filteredAuctions, setFilteredAuctions] = useState(auctions);
  const [statusFilter, setStatusFilter] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');

  const statuses = ['전체', '예정', '진행', '종료', '중지'];

  useEffect(() => {
    let result = auctions;
    if (statusFilter !== '전체') {
      result = result.filter(auction => auction.status === statusFilter);
    }
    setFilteredAuctions(result);
  }, [statusFilter, auctions]);

  return (
    <S.PageContainer>
      <S.ContentCard>
        {/* ✨ 컨트롤 영역을 페이지에 직접 배치 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: 500, width: '80px' }}>상품명</span>
            <input type="text" placeholder="검색" style={{ padding: '8px 12px', border: '1px solid #ced4da', borderRadius: '6px', width: '300px' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: 500, width: '80px' }}>등록 날짜</span>
            <input type="date" style={{ padding: '8px', border: '1px solid #ced4da', borderRadius: '6px' }}/>
            <span>~</span>
            <input type="date" style={{ padding: '8px', border: '1px solid #ced4da', borderRadius: '6px' }}/>
          </div>
        </div>
        
        {/* ✨ 탭 그룹 */}
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

        <AuctionTable auctions={filteredAuctions} />
      </S.ContentCard>
    </S.PageContainer>
  );
};
export default AdminAuctionPage;