import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
`;
export const MessageList = styled.ul`
  flex-grow: 1;
  overflow-y: auto;
  padding: 0;
  margin: 0;
`;
export const MessageItem = styled.li`
  list-style: none;
`;