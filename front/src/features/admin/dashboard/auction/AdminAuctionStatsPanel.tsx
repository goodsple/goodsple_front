import * as S from './AdminAuctionStatsPanelStyle';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

type AuctionStatPoint = {
  date: string;
  bidderCount: number;
};

const mockAuctionStats: AuctionStatPoint[] = [
  { date: '01/03', bidderCount: 3 },
  { date: '01/07', bidderCount: 5 },
  { date: '01/10', bidderCount: 4 },
  { date: '01/14', bidderCount: 7 },
  { date: '01/18', bidderCount: 6 },
  { date: '01/22', bidderCount: 9 },
  { date: '01/26', bidderCount: 8 },
  { date: '01/30', bidderCount: 12 },
  { date: '02/02', bidderCount: 10 },
  { date: '02/05', bidderCount: 14 },
  { date: '02/08', bidderCount: 13 },
  { date: '02/11', bidderCount: 15 },
  { date: '02/14', bidderCount: 11 },
  { date: '02/17', bidderCount: 16 },
  { date: '02/20', bidderCount: 18 },
  { date: '02/23', bidderCount: 17 },
  { date: '02/26', bidderCount: 20 },
  { date: '03/01', bidderCount: 19 },
  { date: '03/05', bidderCount: 22 },
  { date: '03/08', bidderCount: 24 },
];

const AdminAuctionStatsPanel = () => {
  const maxY = mockAuctionStats.reduce(
    (acc, cur) => Math.max(acc, cur.bidderCount),
    0,
  );
  const yMax = Math.max(5, Math.ceil(maxY / 5) * 5);

  return (
    <S.Wrapper>
      <S.HeaderRow>
        <S.HeaderTopRow>
          <S.Title>라이브 경매</S.Title>
          <S.MetricBadge>
            참여자(입찰자) <strong>입찰자 수</strong>
          </S.MetricBadge>
        </S.HeaderTopRow>

        <S.SummaryRow>
          <span>
            최근 1회{' '}
            <strong>
              {mockAuctionStats[mockAuctionStats.length - 1]?.bidderCount ?? 0}
              명
            </strong>
          </span>
          <span>
            최고 <strong>{maxY}명</strong>
          </span>
        </S.SummaryRow>
      </S.HeaderRow>

      <S.TableNote>최근 20회 기준</S.TableNote>

      <S.ChartBox>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={mockAuctionStats}
            margin={{ top: 10, right: 20, left: -30, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              interval={0}
              angle={-45}
              textAnchor="end"
              tickMargin={12}
            />
            <YAxis allowDecimals={false} domain={[0, yMax]} />
            <Tooltip
              labelFormatter={(label) => `날짜: ${label}`}
              formatter={(value) => [`${value}`, '입찰자 수']}
            />
            <Line
              type="monotone"
              dataKey="bidderCount"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </S.ChartBox>
    </S.Wrapper>
  );
};

export default AdminAuctionStatsPanel;
