import styled from 'styled-components';

const COLORS = { bg:'#FFFFFF', line:'#EAE7E2', muted:'#9AA0A6', track:'#FAF8F8', thumb:'#cfc9c0' };

export const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(360px, 1fr) 20px minmax(360px, 1fr);
  height: calc(100vh - 140px);
  background: #FFFFFF;
  border: 1px solid #EAE7E2;
  margin: 0 24px;
`;

export const Sider = styled.aside`
    overflow: hidden; 
`;


export const Divider = styled.div`
  position: relative; 
  display:flex;
  align-items:center; 
  justify-content:center;

  &::before{ 
    content:'';
    position:absolute; 
    top:0; bottom:0;
    left:50%; 
    width:1px; 
    background:${COLORS.line};
    transform:translateX(-50%);
 }
`;
export const Track = styled.div`
    position:relative; 
    width:10px;
    height:calc(100% - 22px);
    background:${COLORS.track}; 
`;

export const Thumb = styled.div`
    position:absolute;
    left:0; width:8px;
    border-radius:999px; 
    background:${COLORS.thumb}; 
    cursor:grab;
    &:active{cursor:grabbing;} 
`;

export const Main = styled.section<{ mode: 'empty' | 'chat' }>`
  display: grid;
  grid-template-rows: ${({ mode }) => (mode === 'chat' ? '1fr 76px' : '1fr')};
`;


/* ★ 보더 표시 여부 제어 */
export const Content = styled.div<{withBorders?: boolean}>`
  border-bottom: ${({withBorders}) => (withBorders ? `1px solid ${COLORS.line}` : '0')};
  overflow: hidden;
`;

/* 처음 채팅 화면 */
export const InitialWrap = styled.div`
    height:100%;
    display:grid;
    grid-template-rows:auto 1fr; 
`;

/* 빈 상태 */
export const EmptyState = styled.div`
  height: 100%;
  display: grid;
  place-items: center;
  color: ${COLORS.muted};
`;

/* ⬇️ 빈 상태 콘텐츠 박스 폭 상향 (줄 길이 여유) */
export const EmptyBox = styled.div`
  width: clamp(680px, 78%, 1120px); 
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

export const EmptyImg = styled.img`
  width: 72px;
  height: 72px;
  object-fit: contain;
  opacity: 0.7;
`;

export const EmptyText = styled.div`
  font-size: 20px;
  font-weight: 500;
`;