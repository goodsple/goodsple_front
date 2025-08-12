// admin/pages/AdminChatLogPage.tsx (최종본)

import { useEffect, useState } from 'react';
import Pagination from '../../../../components/common/pagination/Pagination'; // ✨ Pagination 컴포넌트 import
import { Table, Tbody, Td, Th, Thead, Tr } from '../components/AuctionTableStyle';
import ChatLogControls from '../components/ChatLogControls';
import type { ChatLog } from '../mock/chatLogData';
import { mockChatLogData } from '../mock/chatLogData';
import * as PageStyle from './AdminAuctionPageStyle'; // ✨ 페이지 레이아웃 및 PaginationWrapper 스타일 재사용
import * as S from './AdminChatLogPageStyle';

const ITEMS_PER_PAGE = 10; // 한 페이지에 10개씩

const AdminChatLogPage = () => {
  const [logs] = useState(mockChatLogData);
  const [filteredLogs, setFilteredLogs] = useState<ChatLog[]>(logs);
  const [activeTab, setActiveTab] = useState<'FAQ' | 'QNA'>('QNA');
  const [currentPage, setCurrentPage] = useState(1); // ✨ 1. 페이지 상태 추가

  useEffect(() => {
    // 탭 기반 필터링
    const result = logs.filter(log => log.type === activeTab);
    setFilteredLogs(result);
    setCurrentPage(1); // ✨ 2. 탭 변경 시 1페이지로 리셋
  }, [activeTab, logs]);

  // ✨ 3. 페이지네이션을 위한 데이터 계산
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
            {/* ✨ 페이지네이션 된 데이터를 map으로 렌더링 */}
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

        {/* ✨ 4. 페이지네이션 컴포넌트 렌더링 */}
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