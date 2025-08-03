import React from 'react';
import * as S from './ReportTableStyle';
import {   
  ReportTargetTypeLabels,
  ReportActionLabels,
  ReportStatusLabels,
  type AdminReport 
} from '../types/adminReport';

interface Props {
  reports: AdminReport[];
  loading: boolean;
  onProcess: (id: string) => void;
  onRowClick: (r: AdminReport) => void;
}

const ReportTable: React.FC<Props> = ({ reports, loading, onRowClick }) => {
  if (loading) return <div>로딩 중…</div>;
  if (!reports.length) return <div>조회된 신고가 없습니다.</div>;

function formatLocalDateTime(iso?: string) {
  if (!iso) return '-';
  const d = new Date(iso);
  const yyyy = d.getFullYear();
  const mm   = String(d.getMonth() + 1).padStart(2, '0');
  const dd   = String(d.getDate()).padStart(2, '0');
  const hh   = String(d.getHours()).padStart(2, '0');
  const min  = String(d.getMinutes()).padStart(2, '0');
  const ss   = String(d.getSeconds()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

  return (
    <S.Table>
      <thead>
        <tr>
          <th>신고 ID</th>
          <th>신고 대상</th>
          <th>신고 사유</th>
          <th>신고 유형</th>
          <th>처리 상태</th>
          <th>조치 내용</th>
          <th>신고일</th>
          <th>처리일</th>
          <th>관리</th>
        </tr>
      </thead>
      <tbody>
        {reports.map(r => (
          <tr key={r.reportId} onClick={() => onRowClick(r)}>
            <td>{r.reportId}</td>

            {/* 신고 대상: POST/REVIEW/... → "게시글 신고" 등 */}
            <td>{ReportTargetTypeLabels[r.targetType]}</td>

            {/* 신고 사유 */}
            <td className="ellipsis">{r.reason}</td>

            {/* 신고 유형: 동일하게 `targetTypeLabel` 이 있다면 그걸 써도 됩니다 */}
            <td>{r.targetTypeLabel}</td>

            {/* 처리 상태: PENDING/PROCESSED → “미처리”/“처리됨” */}
            <td>{ReportStatusLabels[r.status]}</td>

            {/* 조치 내용: WARNING 등 → “경고” 등 */}
            <td>{r.action ? ReportActionLabels[r.action] : '-'}</td>

            <td>{r.reportedAt}</td>
            <td>{formatLocalDateTime(r.handledAt)}</td>
            <td>
              {r.status === 'PENDING' && (
                <S.Button
                  onClick={e => {
                    e.stopPropagation();
                    onRowClick(r);
                  }}
                >
                  처리
                </S.Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </S.Table>
  );
};

export default ReportTable;
