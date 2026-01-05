import { Client, type IMessage } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import type { AuctionStatusUpdateResponse, ChatMessageResponse } from '../types/auction';

export interface ErrorMessage {
  type: 'AUCTION_BAN_ERROR';
  message: string;
}


export interface SystemMessage {
  type: 'AUCTION_CANCELLED' | 'AUCTION_ENDED' | 'AUCTION_STOPPED'; 
  message: string;
  [key: string]: any; 
}

type SocketStatus = 'connecting' | 'connected' | 'disconnected';

interface UseAuctionSocketReturn {
  status: SocketStatus;
  auctionUpdate: AuctionStatusUpdateResponse | null;
  chatMessage: ChatMessageResponse | null;
  systemMessage: SystemMessage | null; 
  errorMessage: ErrorMessage | null; 
  sendBid: (amount: number) => void;
  sendChat: (message: string) => void;
}

export const useAuctionSocket = (auctionId: number): UseAuctionSocketReturn => {
  const [status, setStatus] = useState<SocketStatus>('disconnected');
  const [auctionUpdate, setAuctionUpdate] = useState<AuctionStatusUpdateResponse | null>(null);
  const [chatMessage, setChatMessage] = useState<ChatMessageResponse | null>(null);
  const [systemMessage, setSystemMessage] = useState<SystemMessage | null>(null); 
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null); 
  
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!auctionId || stompClientRef.current) return;

    const client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'), 
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
        } else if (['AUCTION_CANCELLED', 'AUCTION_ENDED'].includes(body.type)) {
          setSystemMessage(body);
        }
      });

      client.subscribe('/user/queue/errors', (message: IMessage) => {
        const body = JSON.parse(message.body);
        if (body.type === 'AUCTION_BAN_ERROR') {
          setErrorMessage(body);
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

  return { status, auctionUpdate, chatMessage, systemMessage, errorMessage, sendBid, sendChat }; 
};
