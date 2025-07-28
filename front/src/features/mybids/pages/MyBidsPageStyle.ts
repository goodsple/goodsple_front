import styled from 'styled-components';

export const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  padding-top: 120px;
`;

export const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 30px;
  border-bottom: 2px solid #f1f1f1;
  padding-bottom: 15px;
`;

export const AuctionList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
`;