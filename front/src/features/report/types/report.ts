// 신고 대상 타입
export type TargetType = 'USER' | 'POST' | 'REVIEW' | 'CHAT_MESSAGE';

// DB enum 라벨 (소문자 가정)
export type DbTargetType = 'user' | 'post' | 'review' | 'chat_message';

export const toDbTargetType = (t: TargetType): DbTargetType => {
  const map: Record<TargetType, DbTargetType> = {
    USER: 'user',
    POST: 'post',                // ← DB가 'exchange_post'라면 여기만 'exchange_post'로 바꾸면 됨
    REVIEW: 'review',
    CHAT_MESSAGE: 'chat_message',
  };
  return map[t];
};

// 모달 열기 시 넘겨줄 파라미터
export interface OpenReportParams {
  targetType: TargetType;
  targetId: number;
  reportTargetUserId?: number | null;
}

// 백엔드로 보낼 페이로드(= 변환 후 라벨 사용)
export interface ReportPayload {
    reportTargetUserId?: number | null;
    targetType: DbTargetType;     
    targetId: number;
    reportDescription?: string;
}

// 신고 사유 마스터
export interface ReportReason {
  reportReasonId: number;
  reportReasonText: string;
}

// 신고 등록 요청 페이로드
export interface ReportPayload {
  reportTargetUserId?: number | null;
  targetType: DbTargetType;
  targetId: number;
  reportDescription?: string;
}

// 신고 응답 요약 (백엔드에서 조회 시 사용)
export interface ReportSummary {
  reportId: number;
  reporterId: number;
  reporterNickname?: string;
  targetType: TargetType;
  targetId: number;
  targetUserId?: number | null;
  targetNickname?: string;
  status: string;
  createdAt: string;
  reasonIds: number[];
  reasonTexts: string[];
}

// 에러 타입 (이미 정의된 부분)
export type ReportErrorType = {
  reason: string;
  detail: string;
};
