import { Client } from '@stomp/stompjs';
import type { IMessage, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client'; // npm i sockjs-client

type UnsubFn = () => void;

type PendingPublish = {
  destination: string;
  body: any;
  headers?: Record<string, string>;
};

export class ChatSocket {
  private client: Client;
  private pendingSubs: Array<() => void> = [];
  private pendingPublishes: PendingPublish[] = [];
  private isActivated = false;

  constructor(token: string, url?: string) {
    // 1) 트랜스포트 선택: env > 기본값
    //   - sockjs: 서버가 registry.addEndpoint("/ws-stomp").withSockJS() 인 경우
    //   - ws    : 서버가 순수 WebSocket(/ws-stomp, withSockJS 없음)인 경우
    const transport = (import.meta.env?.VITE_WS_TRANSPORT as 'sockjs' | 'ws') ?? 'sockjs';

    // 2) 엔드포인트 URL
    const resolved = (() => {
      if (url) return url;
      const envUrl = import.meta.env?.VITE_WS_URL as string | undefined;
      if (envUrl) return envUrl;
      const loc = window.location;
      if (transport === 'sockjs') {
        // SockJS는 http(s)로 열어야 함
        const scheme = loc.protocol === 'https:' ? 'https:' : 'http:';
        return `${scheme}//${loc.host}/ws-stomp`;
      } else {
        // 순수 WS는 ws(s)로
        const scheme = loc.protocol === 'https:' ? 'wss:' : 'ws:';
        return `${scheme}//${loc.host}/ws-stomp`;
      }
    })();

    // 3) STOMP 클라이언트 생성
    this.client = new Client({
      // SockJS일 땐 brokerURL 사용 금지, webSocketFactory 사용
      ...(transport === 'sockjs'
        ? { webSocketFactory: () => new SockJS(resolved) }
        : { brokerURL: resolved }),
      // 브라우저 WS 핸드셰이크에 Authorization 헤더는 못 붙음 → STOMP CONNECT 헤더로 전달
      connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
      reconnectDelay: 3000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      debug: (msg) => {
        // 필요 시 주석 해제
        // console.debug('[STOMP]', msg);
      },
    });

    // 4) 콜백/로그
    this.client.onConnect = () => {
      if (this.pendingSubs.length) this.pendingSubs.splice(0).forEach(run => run());
      if (this.pendingPublishes.length) {
        const jobs = this.pendingPublishes.splice(0);
        for (const job of jobs) {
          try {
            this.client.publish({
              destination: job.destination,
              body: typeof job.body === 'string' ? job.body : JSON.stringify(job.body),
              headers: job.headers ?? {},
            });
          } catch (e) {
            console.error('[STOMP publish flush failed]', e, job);
          }
        }
      }
    };
    this.client.onStompError = (frame) => {
      console.error('[STOMP ERROR]', frame.headers['message'], frame.body);
    };
    this.client.onWebSocketError = (e) => {
      console.error('[WS ERROR]', e);
    };
    this.client.onWebSocketClose = (e) => {
      console.warn('[WS CLOSE]', e.code, e.reason);
    };
  }

  activate() {
    if (this.isActivated) return;
    this.isActivated = true;
    this.client.activate();
  }
  deactivate() {
    this.isActivated = false;
    this.client.deactivate();
    this.pendingSubs = [];
    this.pendingPublishes = [];
  }

  private subscribeWhenReady(exec: () => StompSubscription): UnsubFn {
    if (this.client.connected) {
      const sub = exec();
      return () => sub.unsubscribe();
    }
    let sub: StompSubscription | null = null;
    const runner = () => { sub = exec(); };
    this.pendingSubs.push(runner);
    return () => {
      if (sub) sub.unsubscribe();
      else {
        const idx = this.pendingSubs.indexOf(runner);
        if (idx >= 0) this.pendingSubs.splice(idx, 1);
      }
    };
  }
  private publishWhenReady(destination: string, body: any, headers?: Record<string, string>) {
    if (this.client.connected) {
      this.client.publish({
        destination,
        body: typeof body === 'string' ? body : JSON.stringify(body),
        headers: headers ?? {},
      });
      return;
    }
    this.pendingPublishes.push({ destination, body, headers });
  }

  /** 방 토픽 구독: /topic/chat.{roomId} */
  subscribeRoom(roomId: string, cb: (payload: any) => void): UnsubFn {
    const dest = `/topic/chat.${roomId}`;
    return this.subscribeWhenReady(() =>
      this.client.subscribe(dest, (frame: IMessage) => {
        let body: any;
        try { body = JSON.parse(frame.body); } catch { body = frame.body; }
        cb(body);
      })
    );
  }
  /** 유저 토픽 구독: /topic/chat.user.{userId} (옵션) */
  subscribeUser(userId: number | string, cb: (payload: any) => void): UnsubFn {
    const dest = `/topic/chat.user.${userId}`;
    return this.subscribeWhenReady(() =>
      this.client.subscribe(dest, (frame: IMessage) => {
        let body: any;
        try { body = JSON.parse(frame.body); } catch { body = frame.body; }
        cb(body);
      })
    );
  }

  /** 메시지 송신 */
  sendMessage(roomId: string, text: string) {
    this.publishWhenReady('/app/chat/send', { roomId: Number(roomId), content: text });
  }
  /** 읽음 커서 송신 */
  sendRead(roomId: string, lastReadMessageId: number) {
    this.publishWhenReady('/app/chat/read', { roomId: Number(roomId), lastReadMessageId });
  }
}
