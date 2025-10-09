import { Client } from '@stomp/stompjs';
import type { IMessage, StompSubscription } from '@stomp/stompjs';

type UnsubFn = () => void;

export class ChatSocket {
  private client: Client;
  private pendingSubs: Array<() => void> = [];
  private isActivated = false;

  constructor(
    token: string,
    url = import.meta.env.VITE_WS_URL ?? 'ws://localhost:8080/ws-stomp'
  ) {
    this.client = new Client({
      brokerURL: url,
      connectHeaders: { Authorization: `Bearer ${token}` },
      reconnectDelay: 3000,
    });

    this.client.onConnect = () => {
      // 연결 전에 요청된 구독들 실행
      if (this.pendingSubs.length) {
        this.pendingSubs.splice(0).forEach(run => run());
      }
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

  /** 유저 토픽 구독(필요 시): /topic/chat.user.{userId} */
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
    this.client.publish({
      destination: '/app/chat/send',
      body: JSON.stringify({ roomId, content: text }),
    });
  }

  /** 읽음 커서 송신 */
  sendRead(roomId: string, lastReadMessageId: number) {
    this.client.publish({
      destination: '/app/chat/read',
      body: JSON.stringify({ roomId, lastReadMessageId }),
    });
  }
}
