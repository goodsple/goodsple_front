// admin/mock/knowledgeBaseData.ts (최종본)

export interface KnowledgeItem {
  id: number;
  intent: string;
  question: string;
  answer: string;
  isFaq: boolean;
  isActive: boolean;
}

const initialData: KnowledgeItem[] = [
  { id: 1, intent: 'return_policy', question: '반품 정책이 어떻게 되나요?', answer: '단순 변심으로 인한 반품은 불가하며, 상품 불량의 경우에만 가능합니다.', isFaq: true, isActive: true },
  { id: 2, intent: 'delivery_fee', question: '배송비는 얼마인가요?', answer: '기본 배송비는 3,000원이며, 5만원 이상 구매 시 무료입니다.', isFaq: true, isActive: true },
  { id: 3, intent: 'greeting', question: '안녕', answer: '안녕하세요! 굿즈플 챗봇입니다. 무엇을 도와드릴까요?', isFaq: false, isActive: true },
  { id: 4, intent: 'payment_method', question: '결제는 어떻게 하나요?', answer: '신용카드, 무통장 입금, 계좌 이체를 통해 결제할 수 있습니다.', isFaq: true, isActive: false },
];

// ✨ 동적으로 데이터를 생성하는 함수
const generateMoreKnowledge = (count: number, startId: number): KnowledgeItem[] => {
  const moreData: KnowledgeItem[] = [];
  const intents = ['shipping_inquiry', 'product_details', 'cancel_order', 'user_info', 'event_details'];
  const questions = [
    '해외 배송도 가능한가요?',
    '이 상품 재질이 궁금해요.',
    '주문을 취소하고 싶어요.',
    '내 정보를 수정하려면 어떻게 하나요?',
    '진행 중인 이벤트가 있나요?',
  ];
  const answers = [
    '현재 해외 배송은 지원하지 않고 있습니다. 양해 부탁드립니다.',
    '해당 상품은 100% 코튼으로 제작되었습니다.',
    '배송 시작 전인 경우에만 주문 취소가 가능합니다. 마이페이지를 확인해주세요.',
    '마이페이지 > 회원정보 수정에서 변경할 수 있습니다.',
    '네, 현재 여름맞이 특별 할인 이벤트를 진행 중입니다. 자세한 내용은 이벤트 페이지를 참고해주세요.',
  ];

  for (let i = 0; i < count; i++) {
    const newId = startId + i;
    moreData.push({
      id: newId,
      intent: `${intents[i % intents.length]}_${newId}`,
      question: `${questions[i % questions.length]} #${newId}`,
      answer: answers[i % answers.length],
      isFaq: i % 2 === 0, // FAQ와 QNA를 번갈아 생성
      isActive: i % 10 !== 0, // 10개 중 1개는 비활성 상태로 생성
    });
  }
  return moreData;
};


// ✨ 기존 데이터와 생성된 데이터를 합쳐서 최종 export (총 30개)
export const mockKnowledgeBaseData: KnowledgeItem[] = [
  ...initialData,
  ...generateMoreKnowledge(26, 5),
];