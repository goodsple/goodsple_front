import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  padding: 24px;
  min-height: 0;
  height: 100%;
`;

export const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 16px;
`;

export const MessageList = styled.ul` /* ✨ div -> ul */
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 16px;
  padding: 0;
  list-style: none;
  
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MessageItem = styled.li` /* ✨ Message -> MessageItem, div -> li */
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  font-size: 14px;
  gap: 5px;
  
  &:hover button {
    opacity: 1;
  }
`;

export const MessageContent = styled.div`
  flex-grow: 1;
`;

export const Sender = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

export const Text = styled.span`
  color: #495057;
  word-break: break-all;
`;

export const ReportButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.3;
  padding: 0;
  font-size: 12px;
  transition: opacity 0.2s;
`;

export const Form = styled.form`
  display: flex;
  gap: 10px;
`;

export const Input = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 8px;
`;

export const Button = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: #444444;
  color: white;
  border-radius: 8px;
  cursor: pointer;
`;