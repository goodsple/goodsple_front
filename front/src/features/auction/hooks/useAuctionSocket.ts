/**
 * 파일 경로: src/features/auction/hooks/useAuctionSocket.ts
 * 설명: 라이브 경매 페이지의 WebSocket 통신을 관리하는 커스텀 훅입니다.
 */
import { Client, type IMessage } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import type { AuctionStatusUpdateResponse, ChatMessageResponse } from '../types/auction';

type SocketStatus = 'connecting' | 'connected' | 'disconnected';

interface UseAuctionSocketReturn {
  status: SocketStatus;
  auctionUpdate: AuctionStatusUpdateResponse | null;
  chatMessage: ChatMessageResponse | null;
  sendBid: (amount: number) => void;
  sendChat: (message: string) => void;
}

export const useAuctionSocket = (auctionId: number): UseAuctionSocketReturn => {
  const [status, setStatus] = useState<SocketStatus>('disconnected');
  const [auctionUpdate, setAuctionUpdate] = useState<AuctionStatusUpdateResponse | null>(null);
  const [chatMessage, setChatMessage] = useState<ChatMessageResponse | null>(null);
  
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

        if (body.type === 'AUCTION_UPDATE') {
          setAuctionUpdate(body);
        } else if (body.type === 'CHAT_MESSAGE') {
          setChatMessage(body);
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

  return { status, auctionUpdate, chatMessage, sendBid, sendChat };
};
