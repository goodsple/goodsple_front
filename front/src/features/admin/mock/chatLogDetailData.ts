interface ConversationMessage {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export interface LogDetail {
  id: number;
  user: string;
  initialMessage: string;
  finalIntent: string;
  confidence: number;
  conversation: ConversationMessage[];
}

export const mockLogDetailData: LogDetail = {
  id: 1,
  user: 'user_123',
  initialMessage: '배송 언제쯤 오나요?',
  finalIntent: 'delivery_status',
  confidence: 0.98,
  conversation: [
    { sender: 'user', text: '배송 언제쯤 오나요?', timestamp: '10:30:15' },
    { sender: 'bot', text: '안녕하세요! 굿즈플 챗봇입니다. 주문하신 상품의 주문번호를 알려주시겠어요?', timestamp: '10:30:20' },
    { sender: 'user', text: '주문번호는 G12345678 입니다', timestamp: '10:30:45' },
    { sender: 'bot', text: '네, 확인 중입니다. 잠시만 기다려주세요...', timestamp: '10:30:50' },
    { sender: 'bot', text: '주문하신 상품은 현재 배송 중입니다. 평균 2~3일 소요됩니다. 추가로 궁금한 점이 있으신가요?', timestamp: '10:31:10' },
  ],
};