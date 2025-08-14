/**
 * 파일 경로: src/features/admin/components/AuctionTable.tsx
 */
import { useNavigate } from 'react-router-dom';
import type { AdminAuction } from '../mock/adminAuctionData';
import { translateStatusToKo } from '../utils/statusUtils';
import * as S from './AuctionTableStyle';

interface Props {
  auctions: AdminAuction[];
}

const AuctionTable: React.FC<Props> = ({ auctions }) => {
  const navigate = useNavigate();

  const handleRowClick = (auction: AdminAuction) => {
    // 백엔드에서 받은 영어 status 값으로 비교
    if (auction.status.toLowerCase() === 'ended') {
      navigate(`/admin/auctions/${auction.id}/result`);
    } else {
      navigate(`/admin/auctions/edit/${auction.id}`);
    }
  };
  
  const handleButtonClick = (e: React.MouseEvent, callback: () => void) => {
    e.stopPropagation();
    callback();
  };

  // 버튼 렌더링 로직
  const renderActionButtons = (auction: AdminAuction) => {
    // 백엔드에서 받은 영어 원본 값으로 비교
    switch (auction.status.toLowerCase()) {
      case 'scheduled':
      case 'active':
        return (
          <>
            <S.ActionButton 
              variant="수정" 
              onClick={(e) => handleButtonClick(e, () => navigate(`/admin/auctions/edit/${auction.id}`))}
            >
              수정
            </S.ActionButton>
            <S.ActionButton 
              variant="중지"
              onClick={(e) => handleButtonClick(e, () => alert(`ID ${auction.id} 경매 중지 (기능 구현 필요)`))}
            >
              중지
            </S.ActionButton>
          </>
        );
      case 'ended':
        return (
          <S.ActionButton 
            variant="결과"
            onClick={(e) => handleButtonClick(e, () => navigate(`/admin/auctions/${auction.id}/result`))}
          >
            결과
          </S.ActionButton>
        );
      case 'cancelled': // DB ENUM 값인 'cancelled'로 비교
         return (
          <>
            <S.ActionButton 
              variant="수정"
              onClick={(e) => handleButtonClick(e, () => navigate(`/admin/auctions/edit/${auction.id}`))}
            >
              수정
            </S.ActionButton>
            <S.ActionButton 
              variant="시작"
              onClick={(e) => handleButtonClick(e, () => alert(`ID ${auction.id} 경매 시작 (기능 구현 필요)`))}
            >
              시작
            </S.ActionButton>
          </>
        );
      default:
        return null;
    }
  }

  return (
    <S.Table>
      <thead>
        <tr>
            <th>NO</th>
            <th>상품명</th>
            <th>시작 시간</th>
            <th>종료 시간</th>
            <th>현재가/낙찰가</th>
            <th>경매 상태</th>
            <th>결제 상태</th>
            <th>관리</th>
        </tr>
      </thead>
      <tbody>
        {auctions.length > 0 ? (
          auctions.map(auction => (
            <S.ClickableTr key={auction.id} onClick={() => handleRowClick(auction)}>
              <td>{auction.id}</td>
              <td style={{textAlign: 'left', width: '30%'}}>{auction.productName}</td>
              <td>{auction.startTime}</td>
              <td>{auction.endTime}</td>
              <td>{auction.currentPrice.toLocaleString()}원</td>
              <td><S.StatusBadge>{translateStatusToKo(auction.status, 'auction')}</S.StatusBadge></td>
              <td>
                {auction.paymentStatus ? (
                  <S.PaymentStatusBadge $status={translateStatusToKo(auction.paymentStatus, 'payment')}>
                    {translateStatusToKo(auction.paymentStatus, 'payment')}
                  </S.PaymentStatusBadge>
                ) : '-'}
              </td>
              <td><S.ActionButtonGroup>{renderActionButtons(auction)}</S.ActionButtonGroup></td>
            </S.ClickableTr>
          ))
        ) : (
          <tr>
            <td colSpan={8}>검색 결과가 없습니다.</td>
          </tr>
        )}
      </tbody>
    </S.Table>
  );
};
export default AuctionTable;
