import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAdminAuctionResult } from '../api/auctionApi';
import { PaymentStatusBadge, StatusBadge, Table, Tbody, Td, Th, Thead, Tr } from '../components/AuctionTableStyle';
import type { AuctionAdminResult } from '../types/auction';
import { translateStatusToKo } from '../utils/statusUtils';
import * as S from './AdminAuctionResultPageStyle';

const AdminAuctionResultPage = () => {
  const { auctionId } = useParams();
  const [resultData, setResultData] = useState<AuctionAdminResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      if (!auctionId) return;
      setIsLoading(true);
      try {
        const data = await getAdminAuctionResult(Number(auctionId));
        setResultData(data);
      } catch (error) {
        console.error('경매 결과를 불러오는 데 실패했습니다:', error);
        alert('경매 결과를 불러올 수 없습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchResult();
  }, [auctionId]);

  if (isLoading) {
    return <div style={{padding: '40px'}}>데이터를 불러오는 중...</div>;
  }

  if (!resultData) {
    return <div style={{padding: '40px'}}>ID에 해당하는 경매 결과가 없습니다.</div>;
  }

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
                <S.InfoValue className="price">
                  {resultData.finalPrice ? `${resultData.finalPrice.toLocaleString()}원` : '낙찰자 없음'}
                </S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>낙찰자</S.InfoLabel>
                <S.InfoValue>
                  {resultData.winnerInfo ? `${resultData.winnerInfo.nickname} (${resultData.winnerInfo.userId})` : '-'}
                </S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>연락처</S.InfoLabel>
                <S.InfoValue>{resultData.winnerInfo?.phone || '-'}</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>경매 상태</S.InfoLabel>
                <S.InfoValue><StatusBadge>{translateStatusToKo(resultData.status, 'auction')}</StatusBadge></S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>결제 상태</S.InfoLabel>
                <S.InfoValue>
                  {resultData.paymentStatus ? 
                    <PaymentStatusBadge $status={translateStatusToKo(resultData.paymentStatus, 'payment')}>
                      {translateStatusToKo(resultData.paymentStatus, 'payment')}
                    </PaymentStatusBadge> 
                    : '-'}
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
              {resultData.bidHistory.length > 0 ? (
                resultData.bidHistory.map((bid, index) => (
                  <Tr key={index}>
                    <Td>{bid.time}</Td>
                    <Td>{bid.bidder}</Td>
                    <Td>{bid.price.toLocaleString()}원</Td>
                  </Tr>
                ))
              ) : (
                <Tr><Td colSpan={3}>입찰 기록이 없습니다.</Td></Tr>
              )}
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