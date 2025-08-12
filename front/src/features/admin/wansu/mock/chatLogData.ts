export interface ChatLog {
  id: number;
  userId: string;
  question: string;
  predictedIntent: string;
  confidence: number;
  timestamp: string;
  type: 'FAQ' | 'QNA';
}

export const mockChatLogData: ChatLog[] = [
  { id: 101, userId: 'abcdc123', question: '배송 언제쯤 오나요?', predictedIntent: 'delivery_status', confidence: 98, timestamp: '2025-07-02 10:30', type: 'QNA' },
  { id: 102, userId: 'xyz456', question: '환불 규정이 궁금해요', predictedIntent: 'refund_policy', confidence: 95, timestamp: '2025-07-02 09:15', type: 'QNA' },
  { id: 103, userId: 'user789', question: '비밀번호를 잊어버렸어요', predictedIntent: 'find_password', confidence: 99, timestamp: '2025-07-01 18:45', type: 'FAQ' },
];