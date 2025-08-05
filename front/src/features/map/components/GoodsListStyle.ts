import styled from 'styled-components';

export const ListContainer = styled.div`
  width: 380px;
  height: 100%;
  border-left: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`;

export const ListHeader = styled.div`
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #444444;
  border-bottom: 1px solid #e0e0e0;
  flex-shrink: 0;
`;

export const GoodsListUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  flex-grow: 1;
`;

export const GoodsItemLi = styled.li`
  display: flex;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover { background-color: #f8f9fa; }

  img { width: 80px; height: 100px; object-fit: cover; border-radius: 6px; margin-right: 16px; }
  .item-details { display: flex; flex-direction: column; justify-content: center; }
  .item-name { font-size: 16px; font-weight: 500; color: #444; margin-bottom: 8px; }
  .item-price { font-size: 15px; font-weight: bold; color: #997BEB; }
`;

export const NoResults = styled.div`
  padding: 40px;
  text-align: center;
  color: #868e96;
`;