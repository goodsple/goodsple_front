export interface KnowledgeItem {
  id: number;
  intent: string;
  question: string;
  answer: string;
  isFaq: boolean;
  isActive: boolean;
}

export const mockKnowledgeBaseData: KnowledgeItem[] = [
  { id: 1, intent: 'return_policy', question: '반품 정책이 어떻게 되나요?', answer: '단순 변심으로 인한 반품은 불가하며, 상품 불량의 경우에만 가능합니다.', isFaq: true, isActive: true },
  { id: 2, intent: 'delivery_fee', question: '배송비는 얼마인가요?', answer: '기본 배송비는 3,000원이며, 5만원 이상 구매 시 무료입니다.', isFaq: true, isActive: true },
  { id: 3, intent: 'greeting', question: '안녕', answer: '안녕하세요! 굿즈플 챗봇입니다. 무엇을 도와드릴까요?', isFaq: false, isActive: true },
  { id: 4, intent: 'payment_method', question: '결제는 어떻게 하나요?', answer: '신용카드, 무통장 입금, 계좌 이체를 통해 결제할 수 있습니다.', isFaq: true, isActive: false },
];