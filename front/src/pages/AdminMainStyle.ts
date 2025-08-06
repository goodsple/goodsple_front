import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 2rem;
  background-color: #FFFDFA;
`;

export const BannerSection = styled.section`
  background-color: #E7DEFF;
  border-radius: 15px; 
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2rem; 
`;

export const TextContent = styled.div`
  h2 {
    font-size: 24px;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  p {
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
  }
`;

export const CharacterImage = styled.img`
  height: 220px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 1.5rem;
`;

export const InfoBox = styled.div`
  background-color: #E0E0E0;
  border-radius: 15px;
  padding: 1.5rem;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;

  &.full-width {
    grid-column: 1 / -1;
  }
`;