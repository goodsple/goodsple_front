import styled, { css } from 'styled-components';

const COLORS = {
  bg:'#FFFFFF', line:'#EAE7E2', muted:'#9A9A9A',
  trackBg:'#F8F6F3', railBg:'#FAF8F8', thumb:'#9A9A9A', cap:'#E6E2DC'
};

export const Layout = styled.div<{ hasSider: boolean }>`
    box-sizing: border-box;
    display: grid;
    grid-template-columns: minmax(360px, 1fr) 24px minmax(360px, 1fr);
    height: calc(100vh - 140px);
    background: #FFFFFF;
    border: 1px solid #EAE7E2;
    margin: 0 24px;
    overflow: hidden;
`;

export const Sider = styled.aside`
  overflow: hidden;
`;

  /* 세로 구분 열 */
  export const Divider = styled.div`
    display:flex;
    align-items:stretch;
    justify-content:center;
  `;
  
  /* 트랙 전체 (세로 100%) */
  export const Track = styled.div`
    position: relative;
    width: 20px;              
    height: 100%;
    border-left:1px solid #ddd;
    border-right : 1px solid #ddd;
  `;
  
  /* 트랙 안의 중앙 세로 라인 (예전 ::before 대체) */
  export const Line = styled.div`
    position: absolute;
    top: 0; bottom: 0;
    left: 50%;
    width: 1px;
    transform: translateX(-50%);
    background: ${COLORS.line};
    z-index: 1;               /* 레일/썸/캡보다 아래 */
  `;
  
  /* 레일(배경) – 중앙에 가느다란 배경 띠 */
  export const Rail = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 16px;              /* 레일 폭 */
    top: 0; bottom: 0;
    background: ${COLORS.railBg};
    z-index: 2;               /* 라인 위, 썸/캡 아래 */
    pointer-events: none;
  `;
  
  /* 위/아래 삼각형 캡 */
  export const CapUp = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 8px solid ${COLORS.thumb};  /* 연한 회색 삼각형 */
    z-index: 4;                               
    pointer-events: none;
    padding: 3px 0;           
  `;
  
  export const CapDown = styled(CapUp)`
    top: auto;
    bottom: 0;
    transform: translateX(-50%) rotate(180deg);
  `;
  
  /* 썸(움직이는 부분) – 더 짧고 도드라지게 */
  export const Thumb = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 10px;
    border-radius: 999px;
    background: ${COLORS.thumb};
    box-shadow: inset 0 0 0 1px rgba(0,0,0,.06);
    cursor: grab;
    z-index: 3;               /* 레일 위, 캡 아래여도 OK */
    &:active { cursor: grabbing; }
  `;
  

/* ===== 오른쪽 영역 ===== */
export const Main = styled.section<{ mode: 'empty' | 'chat' }>`
  display: grid;
  grid-template-rows: ${({ mode }) => (mode === 'chat' ? '1fr var(--composer-h, 76px)' : '1fr')};
  min-height: 0; /* 내부 스크롤 작동 핵심 */
`;

export const Content = styled.div<{withBorders?: boolean}>`
  border-bottom: ${({withBorders}) => (withBorders ? `1px solid ${COLORS.line}` : '0')};
  overflow: hidden; /* 내부(MessageList)만 스크롤 */
`;

/* 첫 진입/빈화면 등은 기존 그대로 */
export const InitialWrap = styled.div`
  height:100%;
  display:grid;
  grid-template-rows:auto 1fr;
`;
export const EmptyState = styled.div`
    height:100%; 
    display:grid; 
    place-items:center; 
    color:${COLORS.muted};
`;
export const EmptyBox = styled.div`
    width: clamp(680px, 78%, 1120px);
    display:flex; 
    flex-direction:column; 
    align-items:center; 
    gap:14px;
`;
export const EmptyImg = styled.img`
    width:72px; 
    height:72px; 
    object-fit:contain; 
    opacity:.7;
`;
export const EmptyText = styled.div`
    font-size:20px; 
    font-weight:500;
`;

const hideNativeScrollbar = css`
  /* Firefox */
  scrollbar-width: none;
  /* WebKit (Chrome, Safari, Edge) */
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  /* 상위로 스크롤/바운스 전파 방지 */
  overscroll-behavior: contain;
`;

export const InitScroll = styled.div`
  height: 100%;
  overflow: auto;
  ${hideNativeScrollbar}
`;

