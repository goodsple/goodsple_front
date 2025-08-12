import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 40px;
  /* background-color: #f8f9fa; ✨ 회색 배경 제거 */
  min-height: calc(100vh - 70px);
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end; /* ✨ 오른쪽 정렬로 변경 */
  align-items: center;
  margin-bottom: 20px;
`;

/* ✨ PageTitle은 더 이상 사용하지 않으므로 삭제 */

export const BackLink = styled(Link)`
  /* ✨ 새로운 버튼 디자인 */
  background-color: #e9ecef;
  color: #495057;
  padding: 10px 25px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;
  border: 1px solid #dee2e6;
  
  &:hover {
    background-color: #dee2e6;
  }
`;

export const SummaryBox = styled.div`
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;

export const SummaryItem = styled.div`
  font-size: 15px;
  strong {
    margin-right: 8px;
    font-weight: 600;
  }
`;

export const LowConfidence = styled.span`
  color: #E53E3E;
  font-weight: 700;
  background-color: #FED7D7;
  padding: 3px 6px;
  border-radius: 5px;
`;

export const ChatContainer = styled.div`
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px 30px;
  height: 600px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const MessageBubble = styled.div<{ $isUser: boolean }>`
  max-width: 65%;
  padding: 12px 18px;
  border-radius: 20px;
  line-height: 1.6;
  background-color: ${({ $isUser }) => $isUser ? '#E9D5FF' : '#F0F0F0'};
  align-self: ${({ $isUser }) => $isUser ? 'flex-end' : 'flex-start'};
  border-bottom-right-radius: ${({ $isUser }) => $isUser ? '5px' : '20px'};
  border-bottom-left-radius: ${({ $isUser }) => $isUser ? '20px' : '5px'};
`;

export const MessageText = styled.p`
  margin: 0;
  font-size: 15px;
`;

export const MessageTime = styled.span`
  display: block;
  font-size: 12px;
  color: #888;
  margin-top: 8px;
  text-align: right;
`;