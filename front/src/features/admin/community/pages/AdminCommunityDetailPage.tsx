import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../api/axiosInstance';
import * as s from './AdminCommunityDetailPageStyle';

interface ChatMessage {
  communityId: number;
  userId: number;
  content: string;
  commCreatedAt: string; 
  type: string;
}

const AdminCommunityDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as {
    date?: string;
    commRoomId?: string;
    userCount?: number;
    messageCount?: number;
  } | undefined;

  const date = state?.date;
  const commRoomId = state?.commRoomId;
  const userCount = state?.userCount ?? 0;
  const messageCount = state?.messageCount ?? 0;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [searchUserId, setSearchUserId] = useState('');
  const [searchContent, setSearchContent] = useState('');

  useEffect(() => {
    if (!date || !commRoomId) {
      alert("상세보기 정보를 불러올 수 없습니다.");
      navigate('/admin/community');
      return;
    }

    const fetchMessages = async () => {
      try {
        // date 그대로 사용
        const formattedDate = date;

        const res = await axiosInstance.get('/admin/community/details', {
          params: {
            date: formattedDate,
            commRoomId: commRoomId
          }
        });

        const formattedData = res.data.map((msg: ChatMessage) => ({
          ...msg,
          commCreatedAt: new Date(msg.commCreatedAt).toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })
        }));

        setMessages(formattedData);
      } catch (err: any) {
        console.error('상세보기 불러오기 실패:', JSON.stringify(err.response?.data, null, 2) || err.message); 
      }
    };

    fetchMessages();
  }, [commRoomId, date, navigate]);

  const filteredMessages = messages.filter(
    (msg) =>
      (searchUserId ? msg.userId.toString().includes(searchUserId) : true) &&
      (searchContent ? msg.content.includes(searchContent) : true)
  );

  return (
    <s.Container>
      <s.Header>
        <s.Info><b>작성일 : </b>{date}</s.Info>
        <s.Info><b>채팅방 ID : </b>{commRoomId}</s.Info>
        <s.Info><b>참여자 수 : </b>{userCount}명</s.Info>
        <s.Info><b>메시지 수 : </b>{messageCount}개</s.Info>
        <s.BackButton onClick={() => navigate('/admin/community')}>목록으로</s.BackButton>
      </s.Header>

      <s.FilterBox>
        <s.FilterItem>
          <label>사용자 ID : </label>
          <s.SearchInput
            placeholder="사용자 ID"
            value={searchUserId}
            onChange={(e) => setSearchUserId(e.target.value)}
          />
        </s.FilterItem>

        <s.FilterItem>
          <label>채팅 내용 : </label>
          <s.SearchInput
            placeholder="채팅 내용"
            value={searchContent}
            onChange={(e) => setSearchContent(e.target.value)}
          />
        </s.FilterItem>
      </s.FilterBox>

      <s.MessageBox>
        {filteredMessages.map((msg, idx) => (
          <s.MessageBubble
            key={`${msg.communityId}-${idx}`} // unique key
            isMine={msg.userId === 3}
          >
            <div>{msg.content}</div>
            <s.Time>{msg.commCreatedAt}</s.Time>
          </s.MessageBubble>
        ))}
      </s.MessageBox>
    </s.Container>
  );
};

export default AdminCommunityDetailPage;
