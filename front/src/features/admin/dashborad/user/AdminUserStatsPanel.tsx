import * as S from './AdminUserStatsPanelStyle';

const mockSummary = {
    totalUsers: 312,
    todayJoined: 10,
    todayWithdrawn: 2,
    todayNet: 8,
    todayVisitors: 43,
}

const mockMonthlyStats = [
    { month: "25.09", joined: 120, withdrawn: 15, net: 105, visitors: 890 },
    { month: "25.10", joined: 140, withdrawn: 20, net: 120, visitors: 950 },
    { month: "25.11", joined: 160, withdrawn: 18, net: 142, visitors: 1030 },
];

const AdminUserStatsPanel = () => {

    return (
        <S.Wrapper>
          {/* 상단: 제목 + 오늘 방문자 수 */}
          <S.HeaderRow>
            <S.HeaderTopRow>
              <S.Title>회원통계</S.Title>
              <S.TodayVisitors>
                오늘 방문자 수 <strong>{mockSummary.todayVisitors}명</strong>
              </S.TodayVisitors>
            </S.HeaderTopRow>
    
            {/* 그 아래 한 줄: 총 회원 / 오늘 가입 / 오늘 탈퇴 / 순증가 */}
            <S.SummaryRow>
              <span>
                총 회원 수 <strong>{mockSummary.totalUsers}명</strong>
              </span>
              <span>
                오늘 가입 <strong>{mockSummary.todayJoined}명</strong>
              </span>
              <span>
                오늘 탈퇴 <strong>{mockSummary.todayWithdrawn}명</strong>
              </span>
              <span>
                오늘 순증가{" "}
                <strong>
                  {mockSummary.todayNet > 0 ? `+${mockSummary.todayNet}` : mockSummary.todayNet}명
                </strong>
              </span>
            </S.SummaryRow>
          </S.HeaderRow>
    
          {/* 표 설명 텍스트: 오른쪽 정렬 */}
          <S.TableNote>최근 3개월 기준</S.TableNote>
    
          <S.Table>
            <thead>
              <tr>
                <th>월</th>
                <th>신규 가입</th>
                <th>탈퇴</th>
                <th>순증가</th>
                <th>방문자 수</th>
              </tr>
            </thead>
            <tbody>
              {mockMonthlyStats.map((row) => (
                <tr key={row.month}>
                  <td>{row.month}</td>
                  <td>{row.joined}</td>
                  <td>{row.withdrawn}</td>
                  <td>{row.net > 0 ? `+${row.net}` : row.net}</td>
                  <td>{row.visitors}</td>
                </tr>
              ))}
            </tbody>
          </S.Table>
        </S.Wrapper>
    );
}

export default AdminUserStatsPanel;