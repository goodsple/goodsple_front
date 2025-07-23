import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  gap: 30px;
  padding: 40px;
  padding-top: 100px; /* 헤더 높이를 고려 */
  max-width: 1600px;
  margin: 0 auto;
  height: 100vh; /* 뷰포트 높이 꽉 채우기 */
  box-sizing: border-box;
`;

export const LeftColumn = styled.div`
  flex: 1.2;
  overflow-y: auto;
  padding-right: 20px;
`;

export const CenterColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 0;
`;

export const RightColumn = styled.div`
  width: 360px; /* 채팅창 너비 고정 */
  display: flex;
`;