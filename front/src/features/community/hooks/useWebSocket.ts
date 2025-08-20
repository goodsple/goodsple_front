import type { IMessage, StompSubscription } from '@stomp/stompjs';
import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import axiosInstance from '../../../api/axiosInstance';

export type MessageType = 'normal' | 'announcement';

export interface ChatMessage {
  userId: number;
  roomId: string;
  text: string;
  type: MessageType;
  userName: string;
  userProfile: string;
}

export const useWebSocket = (selectedRoom: string | null, myUserId: number) => {
  const [roomMessages, setRoomMessages] = useState<{ [room: string]: ChatMessage[] }>({});
  const [onlineCount, setOnlineCount] = useState<number>(0);
  const [isConnected, setIsConnected] = useState(false);

  const stompClientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<StompSubscription | null>(null);
  const onlineSubscriptionRef = useRef<StompSubscription | null>(null);

  // --- 채팅 기록 불러오기 ---
  const fetchChatHistory = async (roomId: string) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    try {
      const res = await axiosInstance.get<ChatMessage[]>(`/chat/history/${roomId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoomMessages((prev) => ({ ...prev, [roomId]: res.data }));
    } catch (err) {
      console.error('채팅 기록 불러오기 실패:', err);
    }
  };

  // --- WebSocket 연결 ---
  const connectWebSocket = (roomId: string) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    if (stompClientRef.current) {
      subscriptionRef.current?.unsubscribe();
      onlineSubscriptionRef.current?.unsubscribe();
      stompClientRef.current?.deactivate();
    }

    const socket = new SockJS('/ws');
    const stompClient = new Client({
      webSocketFactory: () => socket as any,
      reconnectDelay: 5000,
      connectHeaders: { Authorization: `Bearer ${token}` },
      onConnect: () => {
        stompClientRef.current = stompClient;
        setIsConnected(true);

        subscriptionRef.current = stompClient.subscribe(`/topic/${roomId}`, (message: IMessage) => {
          const body = JSON.parse(message.body) as ChatMessage;
          setRoomMessages((prev) => ({
            ...prev,
            [roomId]: [...(prev[roomId] || []), body],
          }));
        });

        onlineSubscriptionRef.current = stompClient.subscribe(`/topic/roomUsers/${roomId}`, (message: IMessage) => {
          setOnlineCount(Number(message.body));
        });

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
    msg: Omit<ChatMessage, 'userId' | 'userName' | 'userProfile'>
  ) => {
    const stompClient = stompClientRef.current;
    if (!stompClient || !stompClient.connected) return;

    stompClient.publish({
      destination: `/app/sendMessage/${roomId}`,
      body: JSON.stringify(msg),
    });
  };

  // --- 방 변경 처리 ---
  useEffect(() => {
    if (selectedRoom) {
      setIsConnected(false);
      fetchChatHistory(selectedRoom);
      connectWebSocket(selectedRoom);
    }

    return () => {
      subscriptionRef.current?.unsubscribe();
      onlineSubscriptionRef.current?.unsubscribe();
      stompClientRef.current?.deactivate();
    };
  }, [selectedRoom]);

  return { roomMessages, onlineCount, isConnected, sendMessage };
};
