import { Table, Tbody, Td, Th, Thead, Tr } from '../components/AuctionTableStyle'; // 테이블 스타일 재사용
import ChatLogControls from '../components/ChatLogControls';
import { mockChatLogData } from '../mock/chatLogData';
import * as S from './AdminAuctionPageStyle'; // 페이지 레이아웃 스타일 재사용

const AdminChatLogPage = () => {
  // TODO: 필터링 된 로그를 상태로 관리
  const logs = mockChatLogData;

  return (
    <S.PageContainer>
      <S.ContentCard>
        <ChatLogControls />
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
            {logs.map(log => (
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
        {/* TODO: 페이지네이션 컴포넌트 추가 */}
      </S.ContentCard>
    </S.PageContainer>
  );
};

export default AdminChatLogPage;