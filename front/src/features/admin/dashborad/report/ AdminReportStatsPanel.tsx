import * as S from "./AdminReportStatsPanelStyle";

const mockSummary = {
  todayReported: 7,      // 오늘 들어온 신고
  todayResolved: 5,      // 오늘 처리 완료
  unresolvedTotal: 12,   // 현재 미처리 누적
};

const mockMonthlyStats = [
  { month: "25.09", reported: 32, resolved: 28, resolveRate: 87, unresolved: 4 },
  { month: "25.10", reported: 40, resolved: 35, resolveRate: 88, unresolved: 5 },
  { month: "25.11", reported: 52, resolved: 45, resolveRate: 86, unresolved: 7 },
];

const AdminReportStatsPanel = () => {
  return (
    <S.Wrapper>
      {/* 상단 헤더 */}
      <S.HeaderRow>
        <S.HeaderTopRow>
          <S.Title>신고통계</S.Title>

          <S.UnresolvedBadge>
            미처리 신고 <strong>{mockSummary.unresolvedTotal}건</strong>
          </S.UnresolvedBadge>
        </S.HeaderTopRow>

        <S.SummaryRow>
          <span>
            오늘 신고 접수 <strong>{mockSummary.todayReported}건</strong>
          </span>
          <span>
            오늘 처리 완료 <strong>{mockSummary.todayResolved}건</strong>
          </span>
          <span>
            오늘 처리율{" "}
            <strong>
              {mockSummary.todayReported === 0
                ? "-%"
                : `${Math.round(
                    (mockSummary.todayResolved / mockSummary.todayReported) * 100
                  )}%`}
            </strong>
          </span>
        </S.SummaryRow>
      </S.HeaderRow>

      <S.TableNote>최근 3개월 기준</S.TableNote>

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
          {mockMonthlyStats.map((row) => (
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
