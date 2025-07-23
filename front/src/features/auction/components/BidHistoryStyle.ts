import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

export const Title = styled.h3`
  margin: 24px 24px 10px 24px;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0 24px 24px 24px;
  margin: 0;
  overflow-y: auto;
  font-size: 14px;
  flex-grow: 1;
  
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ListItem = styled.li<{ $isMyBid: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 8px 4px;
  border-bottom: 1px solid #f1f3f5;
  background-color: ${({ $isMyBid }) => $isMyBid ? '#F8FFC7' : 'transparent'};
`;