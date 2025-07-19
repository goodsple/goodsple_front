import styled from 'styled-components';

// 전체 페이지를 감싸는 컨테이너
export const PageContainer = styled.div`
  padding: 2rem;
  background-color: #FFFDFA; // 전역 배경색과 동일하게
`;

// 상단 배너 섹션
export const BannerSection = styled.section`
  background-color: #E6E6FA; // 연한 보라색 배경
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
    font-size: 24px; // H2 (부제)
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  p {
    font-size: 14px; // 본문보다 약간 작은 텍스트
    line-height: 1.6;
    margin: 0;
  }
`;

export const CharacterImage = styled.img`
  height: 120px; // 이미지 크기 조절
`;

// 회색 박스들을 감싸는 그리드 컨테이너
export const GridContainer = styled.div`
  display: grid;
  /* 2개의 열을 동일한 비율로 생성 */
  grid-template-columns: repeat(2, 1fr); 
  gap: 1.5rem; // 박스 사이의 간격
`;

// 공통 회색 박스 스타일
export const InfoBox = styled.div`
  background-color: #E0E0E0; // 회색 배경
  border-radius: 15px;
  padding: 1.5rem;
  height: 150px; // 기본 높이 설정
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px; // H3 (소제목)
  font-weight: bold;

  /* 특정 박스가 가로로 길게 차지하도록 설정 */
  &.full-width {
    grid-column: 1 / -1; // 1번 열에서 마지막 열까지 차지
  }
`;