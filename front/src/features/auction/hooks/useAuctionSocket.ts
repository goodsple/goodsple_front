/**
 * 파일 경로: src/features/auction/hooks/useAuctionSocket.ts
 * 설명: 라이브 경매 페이지의 WebSocket 통신을 관리하는 커스텀 훅입니다.
 */
import { Client, type IMessage } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import type { AuctionStatusUpdateResponse, ChatMessageResponse } from '../types/auction';

// [추가] 시스템 메시지 타입을 정의합니다.
export interface SystemMessage {
  type: 'AUCTION_CANCELLED' | 'AUCTION_ENDED' | 'AUCTION_STOPPED'; // 필요한 타입 추가
  message: string;
  [key: string]: any; // winner 등 추가 정보 포함 가능
}

type SocketStatus = 'connecting' | 'connected' | 'disconnected';

interface UseAuctionSocketReturn {
  status: SocketStatus;
  auctionUpdate: AuctionStatusUpdateResponse | null;
  chatMessage: ChatMessageResponse | null;
  systemMessage: SystemMessage | null; // [추가] 시스템 메시지 상태
  sendBid: (amount: number) => void;
  sendChat: (message: string) => void;
}

export const useAuctionSocket = (auctionId: number): UseAuctionSocketReturn => {
  const [status, setStatus] = useState<SocketStatus>('disconnected');
  const [auctionUpdate, setAuctionUpdate] = useState<AuctionStatusUpdateResponse | null>(null);
  const [chatMessage, setChatMessage] = useState<ChatMessageResponse | null>(null);
  const [systemMessage, setSystemMessage] = useState<SystemMessage | null>(null); // [추가]
  
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!auctionId || stompClientRef.current) return;

    const client = new Client({
      // ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ 이 부분의 주소를 수정했습니다! ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'), // '/ws/auctions' -> '/ws'
      // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      debug: (str) => {
        console.log('[STOMP]', str);
      },
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      setStatus('connected');
      
      client.subscribe(`/topic/auctions/${auctionId}`, (message: IMessage) => {
        const body = JSON.parse(message.body);

        // [수정] 시스템 메시지 처리 로직 추가
        if (body.type === 'AUCTION_UPDATE') {
          setAuctionUpdate(body);
        } else if (body.type === 'CHAT_MESSAGE') {
          setChatMessage(body);
        } else if (['AUCTION_CANCELLED', 'AUCTION_ENDED'].includes(body.type)) {
          // '중지' 또는 '종료' 메시지를 받으면 systemMessage 상태를 업데이트
          setSystemMessage(body);
        }
      });
    };

    client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
      setStatus('disconnected');
    };
    
    client.activate();
    stompClientRef.current = client;
    setStatus('connecting');

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
        stompClientRef.current = null;
        setStatus('disconnected');
      }
    };
  }, [auctionId]);

  const sendBid = (amount: number) => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.publish({
        destination: `/app/auctions/${auctionId}/bid`,
        body: JSON.stringify({ amount }),
      });
    }
  };

  const sendChat = (message: string) => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.publish({
        destination: `/app/auctions/${auctionId}/chat`,
        body: JSON.stringify({ message }),
      });
    }
  };

  return { status, auctionUpdate, chatMessage, systemMessage, sendBid, sendChat }; // [수정] systemMessage 반환
};
