export interface ChatLog {
  id: number;
  userId: string;
  question: string;
  predictedIntent: string;
  confidence: number;
  timestamp: string;
  type: 'FAQ' | 'QNA';
}

const initialLogData: ChatLog[] = [
  { id: 101, userId: 'abcdc123', question: '배송 언제쯤 오나요?', predictedIntent: 'delivery_status', confidence: 98, timestamp: '2025-07-02 10:30', type: 'QNA' },
  { id: 102, userId: 'xyz456', question: '환불 규정이 궁금해요', predictedIntent: 'refund_policy', confidence: 95, timestamp: '2025-07-02 09:15', type: 'QNA' },
  { id: 103, userId: 'user789', question: '비밀번호를 잊어버렸어요', predictedIntent: 'find_password', confidence: 99, timestamp: '2025-07-01 18:45', type: 'FAQ' },
];

const generateMoreLogs = (count: number, startId: number): ChatLog[] => {
  const moreLogs: ChatLog[] = [];
  const intents = ['payment_issue', 'shipping_address_change', 'account_verification', 'product_inquiry'];
  const questions = [
    '결제가 안돼요',
    '배송지 변경 가능한가요?',
    '본인 인증은 어떻게 하나요?',
    '이 상품 재고 있나요?',
  ];

  for (let i = 0; i < count; i++) {
    const newId = startId + i;
    const type = i % 3 === 0 ? 'FAQ' : 'QNA'; 
    
    moreLogs.push({
      id: newId,
      userId: `user_${Math.floor(Math.random() * 10000)}`,
      question: questions[i % questions.length],
      predictedIntent: intents[i % intents.length],
      confidence: Math.floor(Math.random() * 30) + 70, 
      timestamp: `2025-07-${String(i % 10 + 3).padStart(2, '0')} ${String(i % 24).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}`,
      type: type,
    });
  }
  return moreLogs;
};

export const mockChatLogData: ChatLog[] = [
  ...initialLogData,
  ...generateMoreLogs(37, 104),
];