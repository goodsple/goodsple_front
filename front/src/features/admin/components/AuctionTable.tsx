import type { AdminAuction } from '../mock/adminAuctionData';
import * as S from './AuctionTableStyle';

interface Props {
  auctions: AdminAuction[];
}

const AuctionTable: React.FC<Props> = ({ auctions }) => {
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
              <td style={{textAlign: 'left'}}>{auction.productName}</td>
              <td>{auction.startTime}</td>
              <td>{auction.endTime}</td>
              <td>{auction.currentPrice.toLocaleString()}원</td>
              <td><S.StatusBadge status={auction.status}>{auction.status}</S.StatusBadge></td>
              <td>
                {auction.paymentStatus ? (
                  <S.PaymentStatusBadge status={auction.paymentStatus}>
                    {auction.paymentStatus}
                  </S.PaymentStatusBadge>
                ) : '-'}
              </td>
              <td>
                <S.ActionButton className="view">결과</S.ActionButton>
                <S.ActionButton className="edit">수정</S.ActionButton>
                <S.ActionButton className="stop">중지</S.ActionButton>
              </td>
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