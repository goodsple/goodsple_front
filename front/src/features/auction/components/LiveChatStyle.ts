import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  height: 100%; /* 부모 높이를 채움 */
  max-height: 700px; /* 최대 높이 제한 */
`;

export const Title = styled.div`
  padding: 16px;
  font-weight: 700;
  font-size: 16px;
  color: #444;
  border-bottom: 1px solid #f0f0f0;
`;

export const MessageList = styled.ul`
  flex-grow: 1;
  overflow-y: auto;
  padding: 16px;
  margin: 0;
  list-style: none;
`;

export const MessageItem = styled.li`
  padding: 4px 0;
  font-size: 14px;
  line-height: 1.5;
`;

export const Sender = styled.span`
  font-weight: 700;
  margin-right: 8px;
  color: #555;
`;

export const MessageText = styled.span`
  color: #444;
`;

export const ChatInputContainer = styled.div`
  padding: 16px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  gap: 10px;
`;

export const ChatInput = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 14px;
`;

export const SendButton = styled.button`
  background-color: #997BEB;
  color: #fff;
  border: none;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
`;