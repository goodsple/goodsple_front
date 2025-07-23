import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr; /* 화면을 1 : 1.5 : 1 비율의 3단으로 나눔 */
  gap: 24px; /* 컬럼 사이의 간격 */
  padding: 40px;
  max-width: 1400px;
  margin: 0 auto;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;