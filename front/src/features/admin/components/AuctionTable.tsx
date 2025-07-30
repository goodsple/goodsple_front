import type { AdminAuction } from '../mock/adminAuctionData';
import * as S from './AuctionTableStyle';

interface Props {
  auctions: AdminAuction[];
}

const AuctionTable: React.FC<Props> = ({ auctions }) => {
  const renderActionButtons = (status: AdminAuction['status']) => {
    switch (status) {
      case '예정':
        return <><S.ActionButton variant="수정">수정</S.ActionButton><S.ActionButton variant="중지">중지</S.ActionButton></>;
      case '진행': // ✨ '진행중' -> '진행'
        return <><S.ActionButton variant="수정">수정</S.ActionButton><S.ActionButton variant="중지">중지</S.ActionButton></>;
      case '종료':
        return <S.ActionButton variant="결과">결과</S.ActionButton>;
      case '중지':
        return <><S.ActionButton variant="수정">수정</S.ActionButton><S.ActionButton variant="시작">시작</S.ActionButton></>;
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
            <tr key={auction.id}>
              <td>{auction.id}</td>
              <td style={{textAlign: 'left', width: '30%'}}>{auction.productName}</td>
              <td>{auction.startTime}</td>
              <td>{auction.endTime}</td>
              <td>{auction.currentPrice.toLocaleString()}원</td>
              <td><S.StatusBadge>{auction.status}</S.StatusBadge></td>
              <td>
                {auction.paymentStatus ? (
                  <S.PaymentStatusBadge status={auction.paymentStatus}>
                    {auction.paymentStatus}
                  </S.PaymentStatusBadge>
                ) : '-'}
              </td>
              <td><S.ActionButtonGroup>{renderActionButtons(auction.status)}</S.ActionButtonGroup></td>
            </tr>
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