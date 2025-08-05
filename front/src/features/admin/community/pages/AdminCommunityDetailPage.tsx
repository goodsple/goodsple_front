// Pages/AdminCommunityDetailPage.tsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { mockCommunityData } from '../mock/CommData';
import * as s from './AdminCommunityDetailPageStyle';

// 메시지 타입
interface ChatMessage {
    id: number;
    userId: string;
    content: string;
    time: string;
}

// 더미 메시지 
const dummyMessages: ChatMessage[] = [
    { id: 1, userId: 'user01', content: '엑소 콘서트 간다 ~~~~~~', time: '10:30:50' },
    { id: 2, userId: 'user02', content: '우와 티켓팅 성공하셨네요~', time: '10:30:20' },
    { id: 3, userId: 'user03', content: '엑소 점퍼 가실분 ~~ 구해요 ~~~', time: '10:30:45' },
    { id: 4, userId: 'user04', content: '엑소 콘서트 간다 ~~~~~~', time: '10:30:50' },
    { id: 5, userId: 'user05', content: '우와 티켓팅 성공하셨네요~', time: '10:30:20' },
    { id: 6, userId: 'user06', content: '엑소 점퍼 가실분 ~~ 구해요 ~~~', time: '10:30:45' },
    { id: 3, userId: 'user03', content: '엑소 점퍼 가실분 ~~ 구해요 ~~~', time: '10:30:45' },
    { id: 4, userId: 'user04', content: '엑소 콘서트 간다 ~~~~~~', time: '10:30:50' },
    { id: 5, userId: 'user05', content: '우와 티켓팅 성공하셨네요~', time: '10:30:20' },
    { id: 6, userId: 'user06', content: '엑소 점퍼 가실분 ~~ 구해요 ~~~', time: '10:30:45' },
    { id: 3, userId: 'user03', content: '엑소 점퍼 가실분 ~~ 구해요 ~~~', time: '10:30:45' },
    { id: 4, userId: 'user04', content: '엑소 콘서트 간다 ~~~~~~', time: '10:30:50' },
    { id: 5, userId: 'user05', content: '우와 티켓팅 성공하셨네요~', time: '10:30:20' },
    { id: 6, userId: 'user06', content: '엑소 점퍼 가실분 ~~ 구해요 ~~~', time: '10:30:45' },
];

const AdminCommunityDetailPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { date, roomId } = location.state as { date: string; roomId: string };

    const [searchUserId, setSearchUserId] = useState('');
    const [searchContent, setSearchContent] = useState('');

    // 해당 날짜+방의 정보 찾기
    const chatStat = mockCommunityData.find((item) => item.date === date && item.roomId === roomId);

    const filteredMessages = dummyMessages.filter((msg) => {
            const userMatch = searchUserId ? msg.userId.includes(searchUserId) : true;
            const contentMatch = searchContent ? msg.content.includes(searchContent) : true;
            return userMatch && contentMatch;
    });

    if (!chatStat) return <div>해당 데이터를 찾을 수 없습니다.</div>;

    return (
        <s.Container>
                <s.Header>
                    <s.Info><b>작성일 : </b> {chatStat.date}</s.Info>
                    <s.Info><b>채팅방 ID : </b>{chatStat.roomId}</s.Info>
                    <s.Info><b>참여자 수 : </b> {chatStat.userCount}명</s.Info>
                    <s.Info><b>메시지 수 : </b>{chatStat.messageCount}개</s.Info>
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
                {filteredMessages.map((msg) => (
                <s.MessageBubble key={msg.id} isMine={msg.userId === 'user03'}>
                    <div>{msg.content}</div>
                    <s.Time>{msg.time}</s.Time>
                </s.MessageBubble>
                ))}
            </s.MessageBox>
        </s.Container>
    );
};

export default AdminCommunityDetailPage;
