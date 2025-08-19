/**
 * 파일 경로: src/features/admin/components/AuctionTable.tsx
 */
import { useNavigate } from 'react-router-dom';
import type { AdminAuction } from '../mock/adminAuctionData';
import { translateStatusToKo } from '../utils/statusUtils';
import * as S from './AuctionTableStyle';

interface Props {
  auctions: AdminAuction[];
  // 부모로부터 받을 onStatusChange 함수의 타입을 정의합니다.
  onStatusChange: (auctionId: number, newStatus: string, statusKo: string) => void;
}

const AuctionTable: React.FC<Props> = ({ auctions, onStatusChange }) => {
  const navigate = useNavigate();

  const handleRowClick = (auction: AdminAuction) => {
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

  const renderActionButtons = (auction: AdminAuction) => {
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
              onClick={(e) => handleButtonClick(e, () => onStatusChange(auction.id, 'cancelled', '중지'))}
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
      case 'cancelled':
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
              onClick={(e) => handleButtonClick(e, () => onStatusChange(auction.id, 'active', '재개'))}
            >
              재개
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
        {auctions.map(auction => (
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
        ))}
      </tbody>
    </S.Table>
  );
};
export default AuctionTable;