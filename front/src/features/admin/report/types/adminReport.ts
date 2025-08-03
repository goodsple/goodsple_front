export type ReportTargetType = 'POST' | 'REVIEW' | 'MESSAGE' | 'EVENT';

export const ReportTargetTypeLabels: Record<ReportTargetType, string> = {
  POST:    '게시글 신고',
  REVIEW:  '후기 신고',
  MESSAGE: '메시지 신고',
  EVENT:   '이벤트 신고',
};

export type ReportStatus     = 'PROCESSED' | 'PENDING';

export const ReportStatusLabels: Record<ReportStatus, string> = {
  PENDING:   '미처리',
  PROCESSED: '처리됨',
};

// 조치 키 타입
export type ReportAction =
  | 'WARNING'
  | 'DISMISS'
  | 'SUSPEND_3D'
  | 'SUSPEND_PERM';

// 한글 레이블 매핑
export const ReportActionLabels: Record<ReportAction, string> = {
  WARNING:     '경고',
  DISMISS:     '기각',
  SUSPEND_3D:  '3일 정지',
  SUSPEND_PERM:'영구 정지',
};

export interface SearchCriteria {
  keyword:       string;             // 검색어: 신고 대상 이름, 내용 등
  fromDate:      string;             // 신고일자 시작 (YYYY.MM.DD 또는 ISO)
  toDate:        string;             // 신고일자 끝
  targetTypes:   ReportTargetType[]; // 체크박스로 선택할 신고 유형들
  statuses:      ReportStatus[];     // 체크박스로 선택할 처리 상태들
}

export interface AdminReport {
  reportId:     string;             // 신고 ID
  targetId:     string;             // 실제 삭제/차단할 대상을 식별하는 ID
  targetType:   ReportTargetType;   // ‘POST’|‘REVIEW’|‘MESSAGE’|‘EVENT’
  targetTypeLabel: string;
  targetName:   string;             // 신고 대상 유저 닉네임 등)
  reporter:     string;             // 신고자 닉네임
  reportType: 'UNCOMFORTABLE' | 'SUSPECTED_FRAUD' | 'INAPPROPRIATE_CONTENT' | 'OTHER';
  reportTypeLabel: string;
  reason:       string;             // 신고 사유 (신고내용)
  action:       ReportAction;             // 조치 내용 (e.g. ‘경고’, ‘블라인드’)
  status:       ReportStatus;       // 처리 상태 (‘PROCESSED’|‘PENDING’)
  reportedAt:   string;             // 신고일시
  handledAt?:   string;             // 처리일시 (처리 전이면 undefined)
}
