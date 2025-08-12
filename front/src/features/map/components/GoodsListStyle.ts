// map/components/GoodsListStyle.ts (최종본)

import styled from 'styled-components';

// ✨ ListContainer는 MapViewPageStyle로 옮겨지므로 여기서는 제거합니다.

export const ListHeader = styled.div`
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #444444;
  border-bottom: 1px solid #e0e0e0;
  flex-shrink: 0; /* 컨테이너 크기가 줄어들 때 헤더는 줄어들지 않도록 설정 */
`;

export const GoodsListUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  /* ✨ flex-grow 와 overflow-y 를 제거하여 부모가 스크롤을 제어하도록 함 */
`;

export const GoodsItemLi = styled.li`
  display: flex;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover { background-color: #f8f9fa; }

  img { width: 80px; height: 100px; object-fit: cover; border-radius: 6px; margin-right: 16px; }
  .item-details { display: flex; flex-direction: column; justify-content: center; min-width: 0; }
  
  .item-name { 
    font-size: 16px; 
    font-weight: 500; 
    color: #444; 
    margin-bottom: 8px;
    
    /* ✨ 가로 스크롤 방지를 위한 핵심 코드 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item-price { font-size: 15px; font-weight: bold; color: #997BEB; }
`;

export const NoResults = styled.div`
  padding: 40px;
  text-align: center;
  color: #868e96;
`;