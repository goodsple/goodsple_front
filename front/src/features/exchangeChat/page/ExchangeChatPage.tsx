import { useSearchParams } from 'react-router-dom';
import ChatLayout from '../components/ChatLayout';
import type { Room, Msg } from '../types/exchangeChat';

export default function ExchangeChatPage() {
    const [sp] = useSearchParams();
    const initialRoomId = sp.get('roomId') ?? undefined;
    const myUserId = 10;

    const rooms: Room[] = [
        {
          id: 'r1',
          nick: '굿또',
          verified: true,
          last: '저랑 교환 가능하실까요?',
          unread: 2, // ← 미확인 2개
          updatedAt: '2025-07-01T14:31:00+09:00'
        },
        {
          id: 'r2',
          nick: '도라에몽',
          verified: true,
          levelText: 'LV. 4 레전드 덕후',
          postPreview: {
            title: '엑스 백현 포카 교환',
            thumb: '/images/sample/post1.png',
            tags: ['직거래', '택배거래']
          },
          last: '처음 대화를 시작해보세요!',
          unread: 0,
          updatedAt: '2025-07-01T09:10:00+09:00'
        }
      ];

      const messagesByRoom: Record<string, Msg[]> = {
        r1: [
          // 읽은 과거 메시지들
          { id: 'm1', senderId: 20,       text: '안녕하세요, 저랑 교환 가능하실까요? 혹시 내일 오후 3시 가능할까요?', at: '2025-07-01T11:30:00+09:00', status: 'read' },
          { id: 'm2', senderId: myUserId, text: '음~ 그 시간은 안돼요. 다른 시간은 어떠세요?',                       at: '2025-07-01T11:31:00+09:00', status: 'read' },
      
          // ▼ 여기부터 "안읽음" 시작: 상대가 보낸 메시지를 'sent'로
          { id: 'm3', senderId: 20,       text: '그럼 저녁 7시 가능할까요?',                                       at: '2025-07-01T11:31:20+09:00', status: 'sent' },
          { id: 'm4', senderId: 20,       text: '장소는 올리브영 앞 맞죠?',                                         at: '2025-07-01T11:31:50+09:00', status: 'sent' },
        ],
        r2: [],
      };

    return (
    <ChatLayout
        myUserId={myUserId}
        rooms={rooms}
        getMessages={(roomId) => messagesByRoom[roomId] ?? []}
        onSend={(roomId, text) => console.log('SEND', { roomId, text })}
        onLeaveRoom={(roomId) => alert(`채팅방 나가기: ${roomId}`)}
        initialRoomId={initialRoomId} 
    />
    );
}
