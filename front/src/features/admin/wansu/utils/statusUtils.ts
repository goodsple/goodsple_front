const AUCTION_STATUS_KO: { [key: string]: string } = {
  scheduled: '예정',
  active: '진행',
  ended: '종료',
  cancelled: '중지', 
};

const PAYMENT_STATUS_KO: { [key: string]: string } = {
  pending: '미결제',
  paid: '결제 완료',
  expired: '미결제(기한초과)',
};

/**
 * 백엔드에서 받은 상태 값을 한글로 변환합니다.
 * @param status 백엔드에서 받은 영어 상태 값 (경매 또는 결제)
 * @param type 'auction' 또는 'payment'
 * @returns 변환된 한글 상태 값 또는 원래 값
 */
export const translateStatusToKo = (status: string | null | undefined, type: 'auction' | 'payment'): string => {
  if (!status) return '-';

  const lowerCaseStatus = status.toLowerCase();

  if (type === 'auction') {
    return AUCTION_STATUS_KO[lowerCaseStatus] || status;
  }
  if (type === 'payment') {
    return PAYMENT_STATUS_KO[lowerCaseStatus] || status;
  }
  return status;
};
