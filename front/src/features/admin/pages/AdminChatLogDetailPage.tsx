import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { LogDetail } from '../mock/chatLogDetailData';
import { mockLogDetailData } from '../mock/chatLogDetailData';
import * as S from './AdminChatLogDetailPageStyle';

const AdminChatLogDetailPage = () => {
  const { logId } = useParams();
  const [log, setLog] = useState<LogDetail | null>(null);

  useEffect(() => {
    // 실제로는 logId로 API 호출
    console.log(`ID: ${logId} 로그 상세 데이터 불러오기`);
    setLog(mockLogDetailData);
  }, [logId]);

  if (!log) {
    return <div style={{padding: '40px'}}>로그를 찾을 수 없습니다.</div>;
  }

  return (
    <S.PageContainer>
      <S.Header>
        <S.BackLink to="/admin/chatbot/logs">
         목록으로 
        </S.BackLink>
      </S.Header>

      <S.SummaryBox>
        <S.SummaryItem><strong>사용자 ID:</strong> {log.user}</S.SummaryItem>
        <S.SummaryItem><strong>최초 질문:</strong> {log.initialMessage}</S.SummaryItem>
        <S.SummaryItem><strong>최종 의도:</strong> {log.finalIntent}</S.SummaryItem>
        <S.SummaryItem>
          <strong>신뢰도:</strong> 
          {log.confidence < 0.7 ? (
            <S.LowConfidence>{(log.confidence * 100).toFixed(0)}%</S.LowConfidence>
          ) : (
            <span>{(log.confidence * 100).toFixed(0)}%</span>
          )}
        </S.SummaryItem>
      </S.SummaryBox>

      <S.ChatContainer>
        {log.conversation.map((msg, index) => (
          <S.MessageBubble key={index} $isUser={msg.sender === 'user'}>
            <S.MessageText>{msg.text}</S.MessageText>
            <S.MessageTime>{msg.timestamp}</S.MessageTime>
          </S.MessageBubble>
        ))}
      </S.ChatContainer>
    </S.PageContainer>
  );
};

export default AdminChatLogDetailPage;