import React from 'react';
import * as S from './ReportTableStyle';
import {
  ReportTargetTypeLabels,
  ReportActionLabels,
  ReportStatusLabels,
  type AdminReport,
} from '../types/adminReport';

interface Props {
  reports: AdminReport[];
  loading: boolean;
  onProcess: (id: string) => void;
  onRowClick: (r: AdminReport) => void;
}

const ReportTable: React.FC<Props> = ({ reports, loading, onProcess, onRowClick }) => {
  if (loading) return <div>로딩 중…</div>;
  if (!reports.length) return <div>조회된 신고가 없습니다.</div>;

  // 공통: ISO → yyyy-MM-dd HH:mm:ss
  function formatLocalDateTime(iso?: string) {
    if (!iso) return '-';
    const d = new Date(iso);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
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
        {reports.map((r) => {
          // 혹시 대문자 상태가 들어와도 안전하게 처리
          const statusKey =
            (r.status as any) === 'PENDING'
              ? 'pending'
              : (r.status as any) === 'PROCESSED'
              ? 'processed'
              : r.status as 'pending' | 'processed';

          // 처리여부는 status OR handledAt 중 하나라도 참이면 처리로 간주
          const isProcessed = statusKey === 'processed' || !!r.handledAt;

           // 화면 표시용 상태키(처리일이 있으면 '처리'로 보여줌)
          const displayStatusKey: 'pending' | 'processed' = isProcessed ? 'processed' : 'pending';

          return (
            <tr key={r.reportId} onClick={() => onRowClick(r)}>
              <td>{r.reportId}</td>
              <td>{r.targetName}</td>

              {/* 신고 사유: 여러 개면 콤마로 합쳐진 문자열 */}
              <td className="ellipsis" title={r.reportTypeLabel}>
                {r.reportTypeLabel}
              </td>

              {/* 신고 유형: 타입 라벨 (게시글 신고/유저 신고/…) */}
              <td>{ReportTargetTypeLabels[r.targetType]}</td>

              {/* 처리 상태 */}
              <td>{ReportStatusLabels[statusKey]}</td>

              {/* 조치 내용: 없으면 '-' */}
              <td>{r.action ? ReportActionLabels[r.action] : '-'}</td>

              {/* 날짜 포맷 통일 */}
              <td>{formatLocalDateTime(r.reportedAt)}</td>
              <td>{formatLocalDateTime(r.handledAt)}</td>

              <td>
                <S.Button
                  type="button"
                  disabled={isProcessed}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isProcessed) onProcess(r.reportId); // ← 버튼은 '처리' 플로우로
                  }}
                  title={isProcessed ? '이미 처리되었습니다' : undefined}
                >
                  처리
                </S.Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </S.Table>
  );
};

export default ReportTable;
