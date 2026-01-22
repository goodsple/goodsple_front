import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { LogDetail } from '../types/chatLog';
import * as S from './AdminChatLogDetailPageStyle';

const AdminChatLogDetailPage = () => {
  const { logId } = useParams<{ logId: string }>();

  const [log, setLog] = useState<LogDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError(false);

      try {
        const res = await fetch(`/api/admin/chatbot/logs/${logId}`);

        if (!res.ok) {
          throw new Error('로그 상세 조회 실패');
        }

        const data: LogDetail = await res.json();
        setLog(data);
      } catch (err) {
        console.error(err);
        setError(true);
        setLog(null);
      } finally {
        setLoading(false);
      }
    };

    if (logId) {
      fetchDetail();
    }
  }, [logId]);

  /* ===== 상태별 렌더링 ===== */

  if (loading) {
    return <div style={{ padding: '40px' }}>로그를 불러오는 중입니다...</div>;
  }

  if (error || !log) {
    return <div style={{ padding: '40px' }}>로그를 찾을 수 없습니다.</div>;
  }

  return (
    <S.PageContainer>
      <S.Header>
        <S.BackLink to="/admin/chatbot/logs">목록으로</S.BackLink>
      </S.Header>

      {/* 요약 정보 */}
      <S.SummaryBox>
        <S.SummaryItem>
          <strong>사용자 ID:</strong> {log.loginId ?? '비회원'}
        </S.SummaryItem>

        <S.SummaryItem>
          <strong>최초 질문:</strong> {log.initialMessage}
        </S.SummaryItem>

        <S.SummaryItem>
          <strong>최종 의도:</strong> {log.finalIntent ?? '-'}
        </S.SummaryItem>

        <S.SummaryItem>
          <strong>신뢰도:</strong>{' '}
          {log.confidence < 0.7 ? (
            <S.LowConfidence>
              {(log.confidence * 100).toFixed(0)}%
            </S.LowConfidence>
          ) : (
            <span>{(log.confidence * 100).toFixed(0)}%</span>
          )}
        </S.SummaryItem>
      </S.SummaryBox>

      {/* 대화 내용 */}
      <S.ChatContainer>
        {log.conversation.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            대화 내역이 없습니다.
          </div>
        ) : (
          log.conversation.map((msg, index) => (
            <S.MessageBubble
              key={index}
              $isUser={msg.sender === 'user'}
            >
              <S.MessageText>{msg.text}</S.MessageText>
              <S.MessageTime>{msg.timestamp}</S.MessageTime>
            </S.MessageBubble>
          ))
        )}
      </S.ChatContainer>
    </S.PageContainer>
  );
};

export default AdminChatLogDetailPage;
