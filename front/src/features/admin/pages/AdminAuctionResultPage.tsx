import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PaymentStatusBadge, StatusBadge, Table, Tbody, Td, Th, Thead, Tr } from '../components/AuctionTableStyle';
import type { AuctionResult } from '../mock/auctionResultData';
import { findAuctionResultById } from '../mock/auctionResultData'; // ✨ 수정: 함수를 import
import * as S from './AdminAuctionResultPageStyle';

const AdminAuctionResultPage = () => {
  const { auctionId } = useParams();
  const [resultData, setResultData] = useState<AuctionResult | null>(null);

  useEffect(() => {
    // ✨ 수정: URL의 auctionId를 숫자로 변환하여 데이터 찾기
    const id = Number(auctionId); 
    if (id) {
      const data = findAuctionResultById(id);
      setResultData(data || null);
    }
  }, [auctionId]);

  if (!resultData) {
    return <div style={{padding: '40px'}}>ID에 해당하는 경매 결과가 없거나 불러오는 중...</div>;
  }

  // ... (이하 return 문은 기존과 동일) ...
  return (
    <S.PageContainer>
      <S.ContentCard>
        <S.ResultGrid>
          <S.ResultSection>
            <S.SectionTitle>상품 정보</S.SectionTitle>
            <S.ProductInfo>
              <img src={resultData.imageUrl} alt={resultData.productName} />
              <div>
                <strong>{resultData.productName}</strong>
                <p>시작가: {resultData.startPrice.toLocaleString()}원</p>
                <p>경매 기간: {resultData.startTime} ~ {resultData.endTime}</p>
              </div>
            </S.ProductInfo>
          </S.ResultSection>

          <S.ResultSection>
            <S.SectionTitle>경매 결과</S.SectionTitle>
            <S.InfoTable>
              <S.InfoRow>
                <S.InfoLabel>최종 낙찰가</S.InfoLabel>
                <S.InfoValue className="price">{resultData.finalPrice.toLocaleString()}원</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>낙찰자</S.InfoLabel>
                <S.InfoValue>{resultData.winnerInfo.nickname} ({resultData.winnerInfo.userId})</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>연락처</S.InfoLabel>
                <S.InfoValue>{resultData.winnerInfo.phone}</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>경매 상태</S.InfoLabel>
                <S.InfoValue><StatusBadge $status={resultData.status}>{resultData.status}</StatusBadge></S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>결제 상태</S.InfoLabel>
                <S.InfoValue>
                  {resultData.paymentStatus ? <PaymentStatusBadge $status={resultData.paymentStatus}>{resultData.paymentStatus}</PaymentStatusBadge> : '-'}
                </S.InfoValue>
              </S.InfoRow>
            </S.InfoTable>
          </S.ResultSection>

          {resultData.shippingInfo && (
            <S.ResultSection className="full-width">
              <S.SectionTitle>배송 정보</S.SectionTitle>
              <S.InfoTable>
                  <S.InfoRow>
                    <S.InfoLabel>받는 사람</S.InfoLabel>
                    <S.InfoValue>{resultData.shippingInfo.name}</S.InfoValue>
                  </S.InfoRow>
                  <S.InfoRow>
                    <S.InfoLabel>연락처</S.InfoLabel>
                    <S.InfoValue>{resultData.shippingInfo.phone}</S.InfoValue>
                  </S.InfoRow>
                  <S.InfoRow>
                    <S.InfoLabel>배송 주소</S.InfoLabel>
                    <S.InfoValue>{resultData.shippingInfo.address}</S.InfoValue>
                  </S.InfoRow>
                   <S.InfoRow>
                    <S.InfoLabel>배송 메시지</S.InfoLabel>
                    <S.InfoValue>{resultData.shippingInfo.message || '-'}</S.InfoValue>
                  </S.InfoRow>
              </S.InfoTable>
            </S.ResultSection>
          )}
        </S.ResultGrid>
        
        <S.ResultSection className="full-width">
          <S.SectionTitle>입찰 전체 기록</S.SectionTitle>
          <Table>
            <Thead>
              <Tr>
                <Th>입찰 시간</Th>
                <Th>입찰자</Th>
                <Th>입찰 금액</Th>
              </Tr>
            </Thead>
            <Tbody>
              {resultData.bidHistory.map((bid, index) => (
                <Tr key={index}>
                  <Td>{bid.time}</Td>
                  <Td>{bid.bidder}</Td>
                  <Td>{bid.price.toLocaleString()}원</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </S.ResultSection>
        
        <S.PageActions>
          <S.BackButton to="/admin/auctions">목록으로</S.BackButton>
        </S.PageActions>
      </S.ContentCard>
    </S.PageContainer>
  );
};

export default AdminAuctionResultPage;