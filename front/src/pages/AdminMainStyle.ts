import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  background-color: #FFFDFA;
`;

export const BannerSection = styled.section`
  width: calc(100% + 80px); 
  margin-left: -40px;       
  margin-right: -40px;      
  margin-bottom: 2rem;
`;

export const CharacterImage = styled.img`
  height: 220px;
`;

export const BannerImage = styled.img`
  width: 100%;
  height: clamp(300px, 32vw, 480px); 
  display: block;
  object-fit: cover;
`;

export const ContentWrapper = styled.div`
  max-width: 1400px;      
  margin: 0 auto;
  padding: 24px 32px;     
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
`;

export const InfoBox = styled.div`
  background-color: #ffffff;
  border-radius: 15px;
  padding: 1.5rem 2rem;
  min-height: 180px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 14px;
  font-weight: 400;

  &.full-width {
    grid-column: 1 / -1;
  }
`;