import { useEffect, useState } from 'react';
import * as S from './AdminUserStatsPanelStyle';
import { fetchUserStats } from '../api/dashboardApi';
import type { UserMonthlyStat, UserStatsSummary } from '../api/dashboardApi';

const EMPTY_SUMMARY: UserStatsSummary = {
  totalUsers: 0,
  todayJoined: 0,
  todayWithdrawn: 0,
  todayNet: 0,
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

const fillMonthlyStats = (stats: UserMonthlyStat[], count: number): UserMonthlyStat[] => {
  if (stats.length >= count) return stats;
  const map = new Map(stats.map((s) => [s.month, s]));
  return buildRecentMonths(count).map((month) => ({
    month,
    joined: map.get(month)?.joined ?? 0,
    withdrawn: map.get(month)?.withdrawn ?? 0,
    net: map.get(month)?.net ?? 0,
  }));
};

const AdminUserStatsPanel = () => {
  const [summary, setSummary] = useState<UserStatsSummary>(EMPTY_SUMMARY);
  const months = 3;
  const [monthlyStats, setMonthlyStats] = useState<UserMonthlyStat[]>(
    fillMonthlyStats([], months),
  );

  useEffect(() => {
    let mounted = true;
    fetchUserStats(months)
      .then((data) => {
        if (!mounted) return;
        setSummary(data.summary ?? EMPTY_SUMMARY);
        const raw = data.monthlyStats ?? [];
        setMonthlyStats(fillMonthlyStats(raw, months));
      })
      .catch((e) => {
        console.error('회원통계 조회 실패', e);
      });
    return () => {
      mounted = false;
    };
  }, [months]);

  return (
    <S.Wrapper>
      <S.HeaderRow>
        <S.HeaderTopRow>
          <S.Title>회원통계</S.Title>
        </S.HeaderTopRow>

        <S.SummaryRow>
          <span>
            총 회원 수 <strong>{summary.totalUsers}명</strong>
          </span>
          <span>
            오늘 가입 <strong>{summary.todayJoined}명</strong>
          </span>
          <span>
            오늘 탈퇴 <strong>{summary.todayWithdrawn}명</strong>
          </span>
          <span>
            오늘 순증가{' '}
            <strong>
              {summary.todayNet > 0 ? `+${summary.todayNet}` : summary.todayNet}명
            </strong>
          </span>
        </S.SummaryRow>
      </S.HeaderRow>

      <S.TableNote>최근 {months}개월 기준</S.TableNote>

      <S.Table>
        <thead>
          <tr>
            <th>월</th>
            <th>신규 가입</th>
            <th>탈퇴</th>
            <th>순증가</th>
          </tr>
        </thead>
        <tbody>
          {monthlyStats.map((row) => (
            <tr key={row.month}>
              <td>{row.month}</td>
              <td>{row.joined}</td>
              <td>{row.withdrawn}</td>
              <td>{row.net > 0 ? `+${row.net}` : row.net}</td>
            </tr>
          ))}
        </tbody>
      </S.Table>
    </S.Wrapper>
  );
};

export default AdminUserStatsPanel;
