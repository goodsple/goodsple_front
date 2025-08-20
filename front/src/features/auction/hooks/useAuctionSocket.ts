/**
 * 파일 경로: src/features/auction/hooks/useAuctionSocket.ts (새로 만드세요)
 * 설명: 라이브 경매 페이지의 WebSocket 통신을 관리하는 커스텀 훅입니다.
 */
import { Client, type IMessage } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import type { AuctionStatusUpdateResponse, ChatMessageResponse } from '../types/auction'; // 타입 정의 필요

// WebSocket 연결 상태를 나타내는 타입
type SocketStatus = 'connecting' | 'connected' | 'disconnected';

// 커스텀 훅의 반환 타입을 정의
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
  
  // Stomp 클라이언트 인스턴스를 ref로 관리하여 리렌더링 시에도 유지
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!auctionId || stompClientRef.current) return;

    // 1. Stomp 클라이언트 생성
    const client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws/auctions'), // 백엔드 엔드포인트
      connectHeaders: {
        // WebSocket 연결 시 JWT 토큰을 헤더에 담아 인증합니다.
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      debug: (str) => {
        console.log('[STOMP]', str);
      },
      reconnectDelay: 5000, // 5초마다 재연결 시도
    });

    // 2. 연결 성공 시 콜백
    client.onConnect = () => {
      setStatus('connected');
      
      // 서버로부터 오는 메시지를 구독합니다.
      client.subscribe(`/topic/auctions/${auctionId}`, (message: IMessage) => {
        const body = JSON.parse(message.body);

        // 메시지 타입에 따라 상태를 업데이트합니다.
        if (body.type === 'AUCTION_UPDATE') {
          setAuctionUpdate(body);
        } else if (body.type === 'CHAT_MESSAGE') {
          setChatMessage(body);
        }
      });
    };

    // 3. 연결 에러 시 콜백
    client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
      setStatus('disconnected');
    };
    
    // 4. 클라이언트 활성화 (연결 시작)
    client.activate();
    stompClientRef.current = client;
    setStatus('connecting');

    // 5. 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
        stompClientRef.current = null;
        setStatus('disconnected');
      }
    };
  }, [auctionId]);

  // 서버로 입찰 메시지를 보내는 함수
  const sendBid = (amount: number) => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.publish({
        destination: `/app/auctions/${auctionId}/bid`,
        body: JSON.stringify({ amount }),
      });
    }
  };

  // 서버로 채팅 메시지를 보내는 함수
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