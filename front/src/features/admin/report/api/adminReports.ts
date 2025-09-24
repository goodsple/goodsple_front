// api/adminReports.ts
import axios from '../../../../api/axiosInstance';
import {
  type AdminReport,
  type AdminReportListItemDTO,
  type AdminReportDetailDTO,
  type SearchCriteria,
  type AdminReportStatusUpdatePayload,
  buildStatusUpdateRequest,
  mapListItemToAdminReport,
  // 파라미터 변환용
  frontTargetToServer,
  frontStatusToServer,
} from '../types/adminReport';

// 서버 응답 형태
type ListResp = {
  items: AdminReportListItemDTO[];
  total: number;
  page: number;
  size: number;
};

// 목록 조회 (프론트 → 서버 파라미터 변환 포함)
export async function fetchAdminReports(criteria: SearchCriteria) {
  const params: any = {
    page: criteria.page ?? 0,
    size: criteria.size ?? 10,
  };

  if (criteria.keyword) params.keyword = criteria.keyword;
  if (criteria.fromDate) params.createdFrom = criteria.fromDate;
  if (criteria.toDate) params.createdTo = criteria.toDate;
  if (criteria.targetTypes?.length) {
    params.targetTypes = criteria.targetTypes.map(frontTargetToServer);
  }
  if (criteria.statuses?.length) {
    // 'pending' | 'processed' -> 'pending' | 'resolved' 로 압축 전송
    params.statuses = Array.from(new Set(criteria.statuses.map(s => frontStatusToServer(s))));
  }

  const res = await axios.get<ListResp>('/admin/reports', { params });
  const uiItems: AdminReport[] = res.data.items.map(mapListItemToAdminReport);
  return { items: uiItems, total: res.data.total, page: res.data.page, size: res.data.size };
}

// 상세 조회
export async function fetchAdminReportDetail(reportId: string) {
  const res = await axios.get<AdminReportDetailDTO>(`/admin/reports/${reportId}`);
  return res.data;
}

// 상태 변경(처리/미처리 + 조치)
// buildStatusUpdateRequest는 (status, action) 2개만 받는다.
export async function updateAdminReportStatus(
  reportId: string,
  payload: AdminReportStatusUpdatePayload
) {
  const body = buildStatusUpdateRequest(payload.status, payload.action);
  await axios.put(`/admin/reports/${reportId}/status`, body); // PUT으로 통일
}
