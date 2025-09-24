// 관리자 신고 도메인: 프론트 UI 모델 + 서버<->프론트 매핑 유틸

/* =========================
 * 1) UI용 기본 타입/라벨
 * ========================= */

export type ReportTargetType = 'USER' | 'POST' | 'REVIEW' | 'MESSAGE' | 'EVENT';

export const ReportTargetTypeLabels: Record<ReportTargetType, string> = {
  USER:    '회원 신고',
  POST:    '게시글 신고',
  REVIEW:  '후기 신고',
  MESSAGE: '메시지 신고',
  EVENT:   '이벤트 신고',
} as const;

// 상태(프론트 표기: 미처리/처리)
export type ReportStatus = 'pending' | 'processed';

export const ReportStatusLabels: Record<ReportStatus, string> = {
  pending:   '미처리',
  processed: '처리',
} as const;

// 조치 키 타입(프론트 표기)
export type ReportAction =
  | 'WARNING'
  | 'DISMISS'
  | 'SUSPEND_3D'
  | 'SUSPEND_PERM';

export const ReportActionLabels: Record<ReportAction, string> = {
  WARNING:      '경고',
  DISMISS:      '기각',
  SUSPEND_3D:   '3일 정지',
  SUSPEND_PERM: '영구 정지',
} as const;

// (선택) 대표 사유 코드
export type ReasonCode =
  | 'UNCOMFORTABLE'
  | 'SUSPECTED_FRAUD'
  | 'INAPPROPRIATE_CONTENT'
  | 'OTHER';

export const ReasonCodeLabels: Record<ReasonCode, string> = {
  UNCOMFORTABLE:         '불쾌한 행동 및 언행',
  SUSPECTED_FRAUD:       '사기 의심 거래',
  INAPPROPRIATE_CONTENT: '부적절한 게시글 또는 사진',
  OTHER:                 '기타',
} as const;

/* =========================
 * 2) UI 모델
 * ========================= */

export interface SearchCriteria {
  keyword?:     string;
  fromDate?:    string;
  toDate?:      string;
  targetTypes?: ReportTargetType[];
  statuses?:    ReportStatus[];
  actions?:     ReportAction[];
  page?:        number;  // 0-base
  size?:        number;
}

export interface AdminReport {
  reportId:        string;
  targetId:        string;
  targetType:      ReportTargetType;
  targetTypeLabel: string;

  targetName:      string;
  reporter:        string;

  reportType:      ReasonCode;
  reportTypeLabel: string;

  reason:          string;
  description?:    string;

  action?:         ReportAction;   // UI 표기용
  status:          ReportStatus;

  reportedAt:      string;
  handledAt?:      string;
}

/* =========================
 * 3) 서버 DTO/타입 (DB 라벨 반영)
 * ========================= */

export type ServerTargetType = 'user' | 'post' | 'review' | 'chat_message' | 'event';

// 서버 상태(enum) — DB에는 rejected가 없더라도, 응답 방어용으로 타입은 유지
export type ServerReportStatus = 'pending' | 'processing' | 'resolved' | 'rejected';

// DB enum 라벨 (reports.action_taken 의 report_action_enum)
export type ServerActionLabel = 'warning' | 'rejected' | 'suspend_3d' | 'permanent_ban';

export interface AdminReportListItemDTO {
  reportId: number;
  status: ServerReportStatus;
  targetType: ServerTargetType;
  targetId: number;

  reporterId: number;
  reporterNickname?: string | null;
  targetUserId?: number | null;
  targetNickname?: string | null;

  reasons?: string[];
  reasonsText?: string | null;

  description?: string | null;

  actionTaken?: ServerActionLabel | string | null;
  createdAt: string;
  processedAt?: string | null;
}

export interface AdminReportDetailDTO extends AdminReportListItemDTO {}

export interface AdminReportStatusUpdatePayload {
  status: ReportStatus;   // 'pending' | 'processed'
  action?: ReportAction;  // 'WARNING' | 'DISMISS' | 'SUSPEND_3D' | 'SUSPEND_PERM'
  actionText?: string;
}

export interface AdminReportStatusUpdateRequest {
  status: ServerReportStatus;       // 실제 전송: 'pending' | 'resolved' 만 사용
  actionTaken?: ServerActionLabel;  // 'warning' | 'rejected' | 'suspend_3d' | 'permanent_ban'
}

/* =========================
 * 4) 매핑(어댑터) 유틸
 * ========================= */

// 서버 상태 → 프론트 2단계 상태로 압축
export function serverStatusToFront(s: ServerReportStatus): ReportStatus {
  return (s === 'resolved' || s === 'rejected') ? 'processed' : 'pending';
}

// 프론트 상태 → 서버 상태
// ✅ processed는 항상 'resolved'로 보냄 (DB status에는 rejected 없음)
export function frontStatusToServer(
  s: ReportStatus,
  _action?: ReportAction
): ServerReportStatus {
  return s === 'processed' ? 'resolved' : 'pending';
}

// 서버 타겟 → 프론트 타겟
export function serverTargetToFront(t: ServerTargetType): ReportTargetType {
  switch (t) {
    case 'user':         return 'USER';
    case 'post':         return 'POST';
    case 'review':       return 'REVIEW';
    case 'chat_message': return 'MESSAGE';
    case 'event':        return 'EVENT';
    default:             return 'POST';
  }
}

// 프론트 타겟 → 서버 타겟
export function frontTargetToServer(t: ReportTargetType): ServerTargetType {
  switch (t) {
    case 'USER':    return 'user';
    case 'POST':    return 'post';
    case 'REVIEW':  return 'review';
    case 'MESSAGE': return 'chat_message';
    case 'EVENT':   return 'event';
  }
}

// 사유 텍스트 → 대표 사유 코드
export function reasonTextToCode(text: string): ReasonCode {
  const norm = (text ?? '').trim();
  const entry = (Object.entries(ReasonCodeLabels) as [ReasonCode, string][])
    .find(([, label]) => label.trim() === norm || norm.includes(label.trim()));
  return entry ? entry[0] : 'OTHER';
}

/* ====== 액션 양방향 매핑 (UI <-> DB 라벨) ====== */

// UI 액션 → DB 라벨
export function frontActionToServerLabel(a?: ReportAction): ServerActionLabel | undefined {
  if (!a) return undefined;
  switch (a) {
    case 'WARNING':      return 'warning';
    case 'DISMISS':      return 'rejected';
    case 'SUSPEND_3D':   return 'suspend_3d';
    case 'SUSPEND_PERM': return 'permanent_ban';
  }
}

// DB 라벨/문자열 → UI 액션 (표시용)
export function serverActionLabelToFront(a?: string | null): ReportAction | undefined {
  if (!a) return undefined;
  const v = a.trim().toLowerCase();
  switch (v) {
    case 'warning':        return 'WARNING';
    case 'rejected':       return 'DISMISS';
    case 'suspend_3d':     return 'SUSPEND_3D';
    case 'permanent_ban':  return 'SUSPEND_PERM';
    default: {
      const up = a.toUpperCase();
      if (up.includes('PERM') || up.includes('영구')) return 'SUSPEND_PERM';
      if (up.includes('3D') || up.includes('3일'))   return 'SUSPEND_3D';
      if (up.includes('DISMISS') || up.includes('기각')) return 'DISMISS';
      if (up.includes('WARNING') || up.includes('경고')) return 'WARNING';
      return undefined;
    }
  }
}

/* ====== 상태/조치 → 서버 요청 DTO ====== */

export function buildStatusUpdateRequest(
  status: ReportStatus,
  action?: ReportAction,
): AdminReportStatusUpdateRequest {
  const statusForServer = frontStatusToServer(status, action); // 'resolved' | 'pending'
  const actionTaken = frontActionToServerLabel(action);        // 'warning' | 'rejected' | ...
  return { status: statusForServer, actionTaken };
}

/* =========================
 * 5) DTO → UI 모델 매핑
 * ========================= */

export function mapListItemToAdminReport(d: AdminReportListItemDTO): AdminReport {
  const targetTypeFront = serverTargetToFront(d.targetType);

  const reasonsJoined =
    (Array.isArray(d.reasons) && d.reasons.length > 0)
      ? d.reasons.join(', ')
      : (d.reasonsText ?? '');

  const primaryReasonText =
    (Array.isArray(d.reasons) && d.reasons.length > 0)
      ? d.reasons[0]
      : (d.reasonsText ? d.reasonsText.split(',')[0]?.trim() : '기타');

  const reasonCode = reasonTextToCode(primaryReasonText);

  const action = serverActionLabelToFront(d.actionTaken || undefined);

  return {
    reportId:        String(d.reportId),
    targetId:        String(d.targetId),
    targetType:      targetTypeFront,
    targetTypeLabel: ReportTargetTypeLabels[targetTypeFront],

    targetName:      d.targetNickname ?? `#${d.targetUserId ?? '-'}`,
    reporter:        d.reporterNickname ?? `#${d.reporterId}`,

    reportType:      reasonCode,
    reportTypeLabel: ReasonCodeLabels[reasonCode],

    description:     d.description ?? undefined,
    reason:          reasonsJoined,

    action,
    status:          serverStatusToFront(d.status),

    reportedAt:      d.createdAt,
    handledAt:       d.processedAt ?? undefined,
  };
}
