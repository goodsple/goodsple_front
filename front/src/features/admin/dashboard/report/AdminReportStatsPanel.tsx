import { useEffect, useState } from 'react';
import * as S from "./AdminReportStatsPanelStyle";
import { fetchReportStats } from '../api/dashboardApi';
import type { ReportMonthlyStat, ReportStatsSummary } from '../api/dashboardApi';

const EMPTY_SUMMARY: ReportStatsSummary = {
  todayReported: 0,
  todayResolved: 0,
  unresolvedTotal: 0,
};

const buildRecentMonths = (count: number): string[] => {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (count - 1 - i), 1);
    const yy = String(d.getFullYear()).slice(-2);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    return `${yy}.${mm}`;
  });
};

const fillMonthlyStats = (stats: ReportMonthlyStat[], count: number): ReportMonthlyStat[] => {
  if (stats.length >= count) return stats;
  const map = new Map(stats.map((s) => [s.month, s]));
  return buildRecentMonths(count).map((month) => ({
    month,
    reported: map.get(month)?.reported ?? 0,
    resolved: map.get(month)?.resolved ?? 0,
    resolveRate: map.get(month)?.resolveRate ?? 0,
    unresolved: map.get(month)?.unresolved ?? 0,
  }));
};

const AdminReportStatsPanel = () => {
  const [summary, setSummary] = useState<ReportStatsSummary>(EMPTY_SUMMARY);
  const months = 3;
  const [monthlyStats, setMonthlyStats] = useState<ReportMonthlyStat[]>(
    fillMonthlyStats([], months),
  );

  useEffect(() => {
    let mounted = true;
    fetchReportStats(months)
      .then((data) => {
        if (!mounted) return;
        setSummary(data.summary ?? EMPTY_SUMMARY);
        const raw = data.monthlyStats ?? [];
        setMonthlyStats(fillMonthlyStats(raw, months));
      })
      .catch((e) => {
        console.error('신고통계 조회 실패', e);
      });
    return () => {
      mounted = false;
    };
  }, [months]);

  const resolveRate =
    summary.todayReported === 0
      ? '-%'
      : `${Math.round((summary.todayResolved / summary.todayReported) * 100)}%`;

  return (
    <S.Wrapper>
      <S.HeaderRow>
        <S.HeaderTopRow>
          <S.Title>신고통계</S.Title>

          <S.UnresolvedBadge>
            미처리 신고 <strong>{summary.unresolvedTotal}건</strong>
          </S.UnresolvedBadge>
        </S.HeaderTopRow>

        <S.SummaryRow>
          <span>
            오늘 신고 접수 <strong>{summary.todayReported}건</strong>
          </span>
          <span>
            오늘 처리 완료 <strong>{summary.todayResolved}건</strong>
          </span>
          <span>
            오늘 처리율 <strong>{resolveRate}</strong>
          </span>
        </S.SummaryRow>
      </S.HeaderRow>

      <S.TableNote>최근 {months}개월 기준</S.TableNote>

      <S.Table>
        <thead>
          <tr>
            <th>월</th>
            <th>신고 접수</th>
            <th>처리 완료</th>
            <th>처리율</th>
            <th>미처리 누적</th>
          </tr>
        </thead>
        <tbody>
          {monthlyStats.map((row) => (
            <tr key={row.month}>
              <td>{row.month}</td>
              <td>{row.reported}</td>
              <td>{row.resolved}</td>
              <td>{row.resolveRate}%</td>
              <td>{row.unresolved}</td>
            </tr>
          ))}
        </tbody>
      </S.Table>
    </S.Wrapper>
  );
};

export default AdminReportStatsPanel;
