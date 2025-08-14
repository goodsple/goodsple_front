import type {
  SearchCriteria,
  AdminUserSummary,
  AdminUserDetail,
} from '../types/searchUser';

/** 백엔드 응답 타입(프론트 내부 전용) */
export type BackendUserSummary = {
  userId: number;
  loginId: string;
  nickname: string;
  role: 'user' | 'admin';
  suspensionStatus: 'active' | 'suspended' | 'withdrawn';
  reviewCount: number;
  tradeCount: number;
  reportCount: number;
  joinedAt: string; // ISO

  // 선택: 나중에 백엔드가 주면 사용
  levelLabel?: string | null;
  levelScore?: number | null;
};
export type BackendUserDetail = BackendUserSummary & { email: string };

export const PAGE_SIZE = 10;

/** UI 검색값 → 백엔드 쿼리파라미터(브래킷 배열 금지, CSV 직렬화) */
export function buildAdminUserQueryParams(
  searchCriteria: SearchCriteria,
  currentUiPage: number
) {
  const trimmed = (searchCriteria.keyword ?? '').trim();
  const query = trimmed.length ? trimmed : undefined;

  // 페이지네이션(0-based)
  const params: Record<string, any> = {
    page: Math.max(0, (currentUiPage ?? 1) - 1),
    size: PAGE_SIZE,
  };

  // 날짜
  if (searchCriteria.fromDate) {
    params.joinedFrom = searchCriteria.fromDate; // 서버가 읽는 키만 남겨도 됨
  }
  if (searchCriteria.toDate) {
    params.joinedTo = searchCriteria.toDate;
  }

  // === 검색어 분기 ===
  // 1) 회원번호로 검색: userId 숫자로만 전송, 다른 키(query/queryType 등) 제거
  if (searchCriteria.searchBy === 'userId') {
    // 회원번호 검색: queryType/userId만 숫자로 보냄 (userId 필드는 안 씀)
    if (query) {
      const n = Number(query.trim());
      if (Number.isFinite(n)) {
        params.queryType = 'userId';   // 백엔드 XML 분기 탄다
        params.query     = String(n);   // CAST(... AS BIGINT) 가능
      }
    }
  } else if (query) {
    // 닉네임 검색
    params.queryType = 'nickname';
    params.query     = query;
  }

  // 역할/상태: 서버가 ENUM 캐스팅 비교하므로 대문자만 보내는 게 깔끔
  const toUpperList = (xs?: string[]) =>
    xs && xs.length ? xs.map(v => v.toUpperCase()) : undefined;

  const rolesUP = toUpperList(searchCriteria.roles);
  if (rolesUP) params.roles = rolesUP;  // roles=ADMIN&roles=USER

  const statusesUP = toUpperList(searchCriteria.statuses);
  if (statusesUP) params.statuses = statusesUP; // statuses=ACTIVE&...

  // 디버그
  // eslint-disable-next-line no-console
  console.log('[admin/users] params ->', params);

  return params;
}



/** (선택) 등급 계산이 백엔드에서 오지 않을 때 임시 파생 로직
 *  - 백엔드가 levelLabel/levelScore를 주면 그 값을 사용
 *  - 없으면 placeholder("—", 0)
 */
const deriveLevel = (b: BackendUserSummary) => {
  if (typeof b.levelScore === 'number' || (b.levelLabel && b.levelLabel.trim())) {
    const score = typeof b.levelScore === 'number' ? b.levelScore : 0;
    const label = (b.levelLabel ?? '').trim() || '—';
    return { label, score };
  }
  return { label: '—', score: 0 };
};

/** 목록 행: 백엔드 → 화면 타입으로 매핑
 *  ⚠️ joinDate는 ISO 원본 유지(정렬 정확), 표시는 렌더링에서 포맷
 */
export function mapBackendSummaryToView(
  backend: BackendUserSummary
): AdminUserSummary {
  return {
    userId: String(backend.userId),
    nickname: backend.nickname,
    reviewCount: backend.reviewCount,
    transactionCount: backend.tradeCount,
    reportCount: backend.reportCount,
    level: deriveLevel(backend),
    role: backend.role.toUpperCase() as 'USER' | 'ADMIN',
    status: backend.suspensionStatus.toUpperCase() as 'ACTIVE' | 'SUSPENDED' | 'WITHDRAWN',
    joinDate: backend.joinedAt, // ISO 그대로
  };
}

/** 상세: 이메일만 추가 */
export function mapBackendDetailToView(
  backend: BackendUserDetail
): AdminUserDetail {
  return { ...mapBackendSummaryToView(backend), email: backend.email };
}

/** PATCH 바디: 화면값(대문자) → 백엔드로 전달
 *  백엔드가 소문자 기대하면 toLowerCase로 바꾸세요.
 */
export function buildUserUpdatePayload(input: {
  role?: 'USER' | 'ADMIN';
  status?: 'ACTIVE' | 'SUSPENDED' | 'WITHDRAWN';
}) {
  const payload: any = {};
  if (input.role)   payload.role   = input.role.toUpperCase();
  if (input.status) payload.status = input.status.toUpperCase();
  return payload;
}

/** 총 개수 → 총 페이지 */
export function toPageCount(total: number, size = PAGE_SIZE) {
  return Math.max(1, Math.ceil((total ?? 0) / size));
}

/* ========================== 유틸 & 포맷터 ========================== */

/** 숫자 변환 (NaN/undefined 안전) */
export const num = (v: unknown) => {
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : 0;
};

/** (정렬용이 아닌) YYYY.MM.DD, YYYY/MM/DD 등 느슨한 문자열을 안전 파싱 */
export const parseDateSafe = (s: string) => {
  if (!s) return 0;
  const t = s.trim();
  const norm = t.replace(/\./g, '-').replace(/\//g, '-');
  const [datePart] = norm.split(' ');
  const [y, m, d] = datePart.split('-').map((n) => parseInt(n, 10));
  if (!y || !m || !d) return 0;
  const ts = new Date(y, m - 1, d).getTime();
  return Number.isFinite(ts) ? ts : 0;
};

/** 화면표시용: ISO → 한국 로케일 날짜/시간 (예: 2025. 8. 12. 오후 6:33:57) */
export const formatJoinDateKo = (iso?: string) =>
  iso ? new Date(iso).toLocaleString('ko-KR') : '';

/** 화면표시용: "Level 1 (10)"; placeholder면 '—'만 */
export const formatLevelDisplay = (level: { label?: string | null; score?: number | null }) => {
  const label = (level?.label ?? '').trim();
  const score = typeof level?.score === 'number' ? level!.score : undefined;

  if (!label || label === '—') return '—';
  if (score === undefined || Number.isNaN(score)) return label;
  return `${label} (${score})`;
};
