import { useEffect, useState } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from '../components/AuctionTableStyle';
import ChatLogControls from '../components/ChatLogControls';
import type { ChatLog } from '../mock/chatLogData';
import { mockChatLogData } from '../mock/chatLogData';
import * as PageStyle from './AdminAuctionPageStyle'; // 페이지 레이아웃 스타일 재사용
import * as S from './AdminChatLogPageStyle'; // 탭 스타일 import

const AdminChatLogPage = () => {
  const [logs] = useState(mockChatLogData);
  const [filteredLogs, setFilteredLogs] = useState<ChatLog[]>(logs);
  const [activeTab, setActiveTab] = useState<'FAQ' | 'QNA'>('QNA');

  useEffect(() => {
    // TODO: 실제 필터링 로직 구현
    const result = logs.filter(log => log.type === activeTab);
    setFilteredLogs(result);
  }, [activeTab, logs]);

  return (
    <PageStyle.PageContainer>
      <PageStyle.ContentCard>
        <ChatLogControls />
        
        <S.TabGroup>
          <S.TabButton 
            $isActive={activeTab === 'FAQ'}
            onClick={() => setActiveTab('FAQ')}
          >
            FAQ
          </S.TabButton>
          <S.TabButton 
            $isActive={activeTab === 'QNA'}
            onClick={() => setActiveTab('QNA')}
          >
            QNA
          </S.TabButton>
        </S.TabGroup>

        <Table>
          <Thead>
            <Tr>
              <Th>사용자 ID</Th>
              <Th>질문 메시지</Th>
              <Th>예측 의도</Th>
              <Th>신뢰도</Th>
              <Th>날짜</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredLogs.map(log => (
              <Tr key={log.id}>
                <Td>{log.userId}</Td>
                <Td style={{textAlign: 'left'}}>{log.question}</Td>
                <Td>{log.predictedIntent}</Td>
                <Td>{log.confidence}%</Td>
                <Td>{log.timestamp}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </PageStyle.ContentCard>
    </PageStyle.PageContainer>
  );
};

export default AdminChatLogPage;