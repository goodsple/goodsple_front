import type { IMessage, StompSubscription } from '@stomp/stompjs';
import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import axiosInstance from '../../../api/axiosInstance';

export type MessageType = 'GENERAL' | 'MEGAPHONE';

export interface ChatMessage {
  userId: number;
  nickname: string;
  userProfile: string;
  content: string;
  roomId: string;
  type: MessageType;
}

export const useWebSocket = (selectedRoom: string | null, myUserId: number) => {
  const [roomMessages, setRoomMessages] = useState<{ [room: string]: ChatMessage[] }>({});
  const [onlineCount, setOnlineCount] = useState<number>(0);
  const [isConnected, setIsConnected] = useState(false);
  const [megaphoneRemaining, setMegaphoneRemaining] = useState<number>(2);

  const stompClientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<StompSubscription | null>(null);
  const onlineSubscriptionRef = useRef<StompSubscription | null>(null);

  // --- 채팅 기록 불러오기 ---
  const fetchChatHistory = async (roomId: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const res = await axiosInstance.get<ChatMessage[]>(`/chat/history/${roomId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRoomMessages((prev) => ({ ...prev, [roomId]: res.data }));
    } catch (err) {
      console.error('채팅 기록 불러오기 실패:', err);
      setRoomMessages((prev) => ({ ...prev, [roomId]: [] }));
    }
  };

  // --- 확성기 남은 횟수 조회 ---
  const fetchMegaphoneRemaining = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token || myUserId === 0) return;

      const res = await axiosInstance.get<number>(`/chat/megaphone-remaining`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMegaphoneRemaining(res.data);
    } catch (err) {
      console.error('확성기 남은 횟수 조회 실패:', err);
    }
  };

  // --- WebSocket 연결 ---
  const connectWebSocket = (roomId: string) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    if (stompClientRef.current) {
      subscriptionRef.current?.unsubscribe();
      onlineSubscriptionRef.current?.unsubscribe();
      stompClientRef.current.deactivate();
    }

    const socket = new SockJS('/ws');   // 기존 코드

    // ngrok 터널링 주소로 변경(테스트용으로 추가)
    // const NGROK_HOST = 'https://33cf56de0ac8.ngrok-free.app';
    // const socket = new SockJS(`${NGROK_HOST}/ws`);

    const stompClient = new Client({
      webSocketFactory: () => socket as any,
      reconnectDelay: 5000,
      connectHeaders: { Authorization: `Bearer ${token}` },
      onConnect: () => {
        stompClientRef.current = stompClient;
        setIsConnected(true);

        // 채팅 메시지 구독
        subscriptionRef.current = stompClient.subscribe(`/topic/${roomId}`, (message: IMessage) => {
          const body = JSON.parse(message.body) as ChatMessage;
          setRoomMessages((prev) => ({
            ...prev,
            [roomId]: [...(prev[roomId] || []), body],
          }));
        });

        // 접속자 수 구독
        onlineSubscriptionRef.current = stompClient.subscribe(`/topic/roomUsers/${roomId}`, (message: IMessage) => {
          setOnlineCount(Number(message.body));
        });

        // 방 참여
        stompClient.publish({
          destination: `/app/join/${roomId}`,
          body: JSON.stringify({ userName: localStorage.getItem('userName') || '익명' }),
        });
      },
      onStompError: (frame) => console.error('STOMP Error:', frame.body),
      onDisconnect: () => setIsConnected(false),
    });

    stompClient.activate();
  };

  // --- 메시지 전송 ---
  const sendMessage = (
    roomId: string,
    msg: Omit<ChatMessage, 'userId' | 'nickname' | 'userProfile'>
  ) => {
    const stompClient = stompClientRef.current;
    if (!stompClient || !stompClient.connected) return;

    stompClient.publish({
      destination: `/app/sendPost/${roomId}`,
      body: JSON.stringify({
        content: msg.content,
        type: msg.type, // 이제 msg.type은 'GENERAL' | 'MEGAPHONE' (대문자)입니다. // 수정됨✨
      }),
    });

    // 전송 직후 확성기 사용 횟수 즉시 갱신
    if (msg.type === 'MEGAPHONE') { // 수정됨✨ ('megaphone' -> 'MEGAPHONE')
      setMegaphoneRemaining((prev) => Math.max(prev - 1, 0));
    }
  };

  // --- 방 변경 시 처리 ---
  useEffect(() => {
    if (!selectedRoom) return;

    setIsConnected(false);
    fetchChatHistory(selectedRoom);
    fetchMegaphoneRemaining();
    connectWebSocket(selectedRoom);

    return () => {
      subscriptionRef.current?.unsubscribe();
      onlineSubscriptionRef.current?.unsubscribe();
      stompClientRef.current?.deactivate();
    };
  }, [selectedRoom]);

  return { roomMessages, onlineCount, isConnected, sendMessage, megaphoneRemaining };
};
