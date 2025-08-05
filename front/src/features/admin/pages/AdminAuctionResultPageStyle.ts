import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 40px;
//   background-color: #f8f9fa;
  min-height: calc(100vh - 70px);
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 900;
  margin: 0 0 20px 0;
`;

export const ContentCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;

export const ResultGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 30px;
`;

export const ResultSection = styled.div`
  &.full-width {
    grid-column: 1 / -1;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 18px;
  margin-top: 0;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f1f3f5;
`;

export const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  img {
    width: 100px; height: 100px;
    border-radius: 8px;
    background-color: #f8f9fa;
    object-fit: cover;
  }
  strong { font-size: 16px; display: block; margin-bottom: 10px; }
  p { font-size: 14px; color: #868e96; margin: 5px 0; }
`;

export const InfoTable = styled.div``;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  font-size: 14px;
`;

export const InfoLabel = styled.span`
  color: #868e96;
`;

export const InfoValue = styled.span`
  font-weight: 500;
  color: #212529;
  &.price {
    font-weight: bold;
    font-size: 16px;
    color: #997BEB;
  }
`;

export const PageActions = styled.div`
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
`;

export const BackButton = styled(Link)`
  background-color: #868e96;
  padding: 10px 25px;
  border: none;
  border-radius: 8px;
  color: white;
  text-decoration: none;
  font-weight: bold;
`;