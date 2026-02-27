import { useEffect, useState } from 'react';
import type { CommunityMonthlyStat } from '../api/dashboardApi';
import { fetchCommunityStats } from '../api/dashboardApi';
import * as S from '../community/AdminCommunityPanelStyle';

const months = 3;

const AdminCommunityStatsPanel = () => {
  const [monthlyStats, setMonthlyStats] = useState<CommunityMonthlyStat[]>([]);

  useEffect(() => {
    let mounted = true;

    fetchCommunityStats(months)
      .then((data) => {
        if (!mounted) return;
        setMonthlyStats(data.monthlyStats ?? []);
      })
      .catch((e) => {
        console.error('커뮤니티 통계 조회 실패', e);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <S.Wrapper>
      <S.HeaderRow>
        <S.Title>커뮤니티 통계</S.Title>
      </S.HeaderRow>

      <S.TableNote>최근 {months}개월 기준 (방별 활성 유저 수)</S.TableNote>

      <S.Table>
        <thead>
          <tr>
            <th>월</th>
            <th>방</th>
            <th>활성 유저 수</th>
          </tr>
        </thead>
        <tbody>
          {monthlyStats.map((row, idx) => (
            <tr key={`${row.month}-${row.roomId}-${idx}`}>
              <td>{row.month}</td>
              <td>{row.roomId}</td>
              <td>{row.activeUsers}</td>
            </tr>
          ))}
        </tbody>
      </S.Table>
    </S.Wrapper>
  );
};

export default AdminCommunityStatsPanel;