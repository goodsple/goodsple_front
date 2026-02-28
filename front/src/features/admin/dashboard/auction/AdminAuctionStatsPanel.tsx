// src/features/admin/dashborad/auction/AdminAuctionStatsPanel.tsx

import { useEffect, useMemo, useState } from 'react';
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
  date: string; // "MM/DD"
  bidderCount: number; // 고유 입찰자 수
};

type AdminAuctionStatsResponse = {
  auctionStats: AuctionStatPoint[];
};

const AdminAuctionStatsPanel = () => {
  const [stats, setStats] = useState<AuctionStatPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setErrorMsg('');

        // 같은 도메인에서 프록시/리버스프록시를 쓰는 전제(스웨거에서 잘 나온 경로 그대로)
        const res = await fetch('/api/admin/dashboard/auctions', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const json = (await res.json()) as AdminAuctionStatsResponse;

        // 서버에서 과거->최신 정렬 보장한다고 했지만, 방어적으로 한번만 정렬
        const list = Array.isArray(json?.auctionStats) ? json.auctionStats : [];
        const sorted = [...list].sort((a, b) => {
          // "MM/DD" 문자열이라 단순 비교로는 연도跨越에 취약하지만,
          // 현재는 최근 20회 고정이고 동일 연도 내 운영 가정이므로 충분.
          // 필요시 백엔드에서 ISO 날짜로 내려받아 정렬하도록 개선.
          return a.date.localeCompare(b.date);
        });

        if (mounted) setStats(sorted);
      } catch (e: unknown) {
        if (mounted) {
          if (e instanceof Error) setErrorMsg(e.message);
          else setErrorMsg('failed to load');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const { maxY, yMax, latest } = useMemo(() => {
    const max = stats.reduce((acc, cur) => Math.max(acc, cur.bidderCount), 0);
    const y = Math.max(5, Math.ceil(max / 5) * 5);
    const last = stats.length ? stats[stats.length - 1].bidderCount : 0;
    return { maxY: max, yMax: y, latest: last };
  }, [stats]);

  return (
    <S.Wrapper>
      {/* 상단 헤더 */}
      <S.HeaderRow>
        <S.HeaderTopRow>
          <S.Title>라이브 경매</S.Title>
          <S.MetricBadge>
            지표 <strong>입찰자 수</strong>
          </S.MetricBadge>
        </S.HeaderTopRow>

        <S.SummaryRow>
          <span>
            최근 1회 <strong>{latest}명</strong>
          </span>
          <span>
            최고 <strong>{maxY}명</strong>
          </span>
          {loading && (
            <span>
              상태 <strong>불러오는 중</strong>
            </span>
          )}
          {!loading && errorMsg && (
            <span>
              상태 <strong>조회 실패</strong>
            </span>
          )}
        </S.SummaryRow>
      </S.HeaderRow>

      <S.TableNote>최근 20회 기준</S.TableNote>

      <S.ChartBox>
        {!loading && !errorMsg && stats.length === 0 ? (
          <div style={{ fontSize: 13, color: '#777', paddingTop: 8 }}>
            표시할 경매 데이터가 없습니다.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={stats}
              // 날짜 라벨 잘림/위치 조정 (이전 수정 반영)
              margin={{ top: 10, right: 20, left: -30, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                interval={0}
                angle={-45}
                textAnchor="end"
                tickMargin={16}
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
        )}
      </S.ChartBox>
    </S.Wrapper>
  );
};

export default AdminAuctionStatsPanel;
