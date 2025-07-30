import { useEffect, useState } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from '../components/AuctionTableStyle';
import ChatLogControls from '../components/ChatLogControls';
import type { ChatLog } from '../mock/chatLogData';
import { mockChatLogData } from '../mock/chatLogData';
import * as S from './AdminAuctionPageStyle';

const AdminChatLogPage = () => {
  const [logs] = useState(mockChatLogData);
  const [filteredLogs, setFilteredLogs] = useState<ChatLog[]>(logs);
  const [activeTab, setActiveTab] = useState<'FAQ' | 'QNA'>('QNA');

  useEffect(() => {
    const result = logs.filter(log => log.type === activeTab);
    setFilteredLogs(result);
  }, [activeTab, logs]);

  return (
    <S.PageContainer>
      <S.ContentCard>
        <ChatLogControls 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
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
      </S.ContentCard>
    </S.PageContainer>
  );
};

export default AdminChatLogPage;