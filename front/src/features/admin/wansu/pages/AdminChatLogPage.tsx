import { useEffect, useState } from 'react';
import Pagination from '../../../../components/common/pagination/Pagination';
import { Table, Tbody, Td, Th, Thead, Tr } from '../components/AuctionTableStyle';
import ChatLogControls from '../components/ChatLogControls';
import type { ChatLog } from '../mock/chatLogData';
import { mockChatLogData } from '../mock/chatLogData';
import * as PageStyle from './AdminAuctionPageStyle';
import * as S from './AdminChatLogPageStyle';

const ITEMS_PER_PAGE = 10; 

const AdminChatLogPage = () => {
  const [logs] = useState(mockChatLogData);
  const [filteredLogs, setFilteredLogs] = useState<ChatLog[]>(logs);
  const [activeTab, setActiveTab] = useState<'FAQ' | 'QNA'>('QNA');
  const [currentPage, setCurrentPage] = useState(1); 

  useEffect(() => {
    const result = logs.filter(log => log.type === activeTab);
    setFilteredLogs(result);
    setCurrentPage(1); 
  }, [activeTab, logs]);

  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
            {paginatedLogs.map(log => (
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

        {totalPages > 1 && (
          <PageStyle.PaginationWrapper>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </PageStyle.PaginationWrapper>
        )}
      </PageStyle.ContentCard>
    </PageStyle.PageContainer>
  );
};

export default AdminChatLogPage;