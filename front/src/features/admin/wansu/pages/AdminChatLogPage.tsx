import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../../components/common/pagination/Pagination';
import { Table, Tbody, Td, Th, Thead, Tr } from '../components/AuctionTableStyle';
import ChatLogControls from '../components/ChatLogControls';
import type { ChatLog } from '../types/chatLog';
import * as PageStyle from './AdminAuctionPageStyle';
import * as S from './AdminChatLogPageStyle';

const ITEMS_PER_PAGE = 10;

const AdminChatLogPage = () => {
  const navigate = useNavigate();

  const [logs, setLogs] = useState<ChatLog[]>([]);
  const [activeTab, setActiveTab] = useState<'FAQ' | 'QNA'>('QNA');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
   const fetchLogs = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/admin/chatbot/logs?type=${activeTab}&page=${currentPage}&size=${ITEMS_PER_PAGE}`
      );

      if (!res.ok) throw new Error('로그 목록 조회 실패');

      const data = await res.json();

      setLogs(data);
      // setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
      setTotalPages(data.length < ITEMS_PER_PAGE ? currentPage : currentPage + 1);
    } catch (error) {
      console.error(error);
      setLogs([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

    fetchLogs();
  }, [activeTab, currentPage]);

  // 탭 변경 시 페이지 초기화
  const handleTabChange = (tab: 'FAQ' | 'QNA') => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <PageStyle.PageContainer>
      <PageStyle.ContentCard>
        <ChatLogControls />

        {/* 탭 */}
        <S.TabGroup>
          <S.TabButton
            $isActive={activeTab === 'FAQ'}
            onClick={() => handleTabChange('FAQ')}
          >
            FAQ
          </S.TabButton>
          <S.TabButton
            $isActive={activeTab === 'QNA'}
            onClick={() => handleTabChange('QNA')}
          >
            QNA
          </S.TabButton>
        </S.TabGroup>

        {/* 테이블 */}
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
            {loading ? (
              <Tr>
                <Td colSpan={5} style={{ textAlign: 'center' }}>
                  로딩 중입니다...
                </Td>
              </Tr>
            ) : logs.length === 0 ? (
              <Tr>
                <Td colSpan={5} style={{ textAlign: 'center' }}>
                  조회된 로그가 없습니다.
                </Td>
              </Tr>
            ) : (
              logs.map(log => (
                <Tr
                  key={log.logId}
                  onClick={() => navigate(`/admin/chatbot/logs/${log.logId}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <Td>{log.loginId ?? '비회원'}</Td>
                  <Td>{log.logInitialQuestion}</Td>
                  <Td>{log.logPredictedIntent}</Td>
                  <Td>{(log.logConfidenceScore * 100).toFixed(0)}%</Td>
                  <Td>{log.logCreatedAt}</Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <PageStyle.PaginationWrapper>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </PageStyle.PaginationWrapper>
        )}
      </PageStyle.ContentCard>
    </PageStyle.PageContainer>
  );
};

export default AdminChatLogPage;
