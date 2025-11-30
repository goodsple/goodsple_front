import styled from 'styled-components';

export const PageLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
`;

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

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  z-index: 10; // 다른 요소들 위에 보이도록 z-index 설정
`;