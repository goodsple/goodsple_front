import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex; /* ✨ Grid 대신 Flexbox 사용 (초안과 동일) */
  gap: 30px;
  padding: 40px;
  padding-top: 100px; /* 헤더 높이를 고려 */
  max-width: 1600px;
  margin: 0 auto;
  box-sizing: border-box;
  
  /* ✨ 페이지 전체의 높이를 헤더 제외한 뷰포트 높이로 설정 */
  height: 100vh; 
`;

export const LeftColumn = styled.div`
  flex: 1.2; /* ✨ 너비 비율 설정 */
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* 내용이 길어지면 스크롤 */
  padding-right: 20px;
`;

export const CenterColumn = styled.div`
  flex: 1; /* ✨ 너비 비율 설정 */
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 0;
`;

export const RightColumn = styled.div`
  width: 360px; /* ✨ 너비 고정 */
  display: flex;
  flex-direction: column;
`;