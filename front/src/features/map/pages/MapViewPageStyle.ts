// map/pages/MapViewPageStyle.ts (수정)
import styled from 'styled-components';

export const PageLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
`;

// ✨ 아래 Wrapper 스타일을 추가합니다.
export const ListWrapper = styled.div`
  width: 380px;
  height: 100%;
  border-left: 1px solid #e0e0e0;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  
  /* 세로 스크롤 제어 */
  overflow-y: auto;

  /* 스크롤바 UI 숨기기 */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;