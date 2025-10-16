export interface SearchCriteria {
    searchBy: 'nickname' | 'userId';
    keyword: string;
    roles: ('USER' | 'ADMIN')[];
    statuses: ('ACTIVE' | 'SUSPENDED' | 'WITHDRAWN')[];
    fromDate: string;  // YYYY-MM-DD
    toDate:   string;
}

export interface AdminUserSummary {
    userId: string;           // 회원ID
    nickname: string;         // 닉네임
    email?: string;
    reviewCount: number;      // 작성 후기 수
    transactionCount: number; // 거래 횟수
    reportCount: number;      // 신고 건수
    level: {                  // 등급(점수)
      label: string;          // e.g. "Lv.2"
      score: number;          // e.g. 60
    };
    role: 'USER' | 'ADMIN';   // 회원 구분
    status: 'ACTIVE' | 'SUSPENDED' | 'WITHDRAWN'; // 활동 상태
    joinDate: string;         // 가입일 (ISO 8601 또는 포맷된 문자열)
}
// 상세는 email 필수
export type AdminUserDetail = AdminUserSummary & { email: string };
