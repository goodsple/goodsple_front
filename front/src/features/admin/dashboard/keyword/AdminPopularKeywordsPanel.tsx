import { useEffect, useState } from 'react';
import * as S from '../keyword/AdminPopularKeywordsPanelStyle';
import { fetchPopularKeywordStats } from '../api/dashboardApi';
import type {
    PopularKeywordItem,
    PopularKeywordSummary,
} from '../api/dashboardApi';


const EMPTY_SUMMARY: PopularKeywordSummary = {
    totalSearchCount: 0,
    visibleKeywordCount: 0,
    blockedKeywordCount: 0,
    totalSearchDiff: 0,
};

const AdminPopularKeywordsPanel = () => {
    const [summary, setSummary] =
        useState<PopularKeywordSummary>(EMPTY_SUMMARY);

    const [keywords, setKeywords] =
        useState<PopularKeywordItem[]>([]);

    useEffect(() => {
        fetchPopularKeywordStats()
            .then((data) => {
                setSummary(data.summary ?? EMPTY_SUMMARY);
                setKeywords((data.topKeywords ?? []).slice(0, 10));
            })
            .catch((e) => {
                console.error('인기검색어 조회 실패', e);
            });
    }, []);

    const top10Total = keywords.reduce(
        (sum, k) => sum + k.searchCount,
        0,
    );

    const top10Ratio =
        summary.totalSearchCount > 0
            ? Math.round(
                (top10Total / summary.totalSearchCount) * 100,
            )
            : 0;

    const renderDiff = (value?: number | null, isNew?: boolean) => {
        if (isNew) return <S.New>NEW</S.New>;

        if (value === null || value === undefined)
            return <S.Flat>-</S.Flat>;

        if (value === 0)
            return <S.Flat>-</S.Flat>;

        if (value > 0)
            return <S.Up>▲ {value}</S.Up>;

        return <S.Down>▼ {Math.abs(value)}</S.Down>;
    };

    const renderItem = (item: PopularKeywordItem) => {
        const isTop3 = item.rank <= 3;

        return (
            <S.Item key={item.rank}>
                <S.Left>
                    <S.Rank $highlight={isTop3}>{item.rank}</S.Rank>
                    <S.Keyword>{item.keyword}</S.Keyword>
                </S.Left>

                <S.Right>
                    <S.Count>{item.searchCount}</S.Count>
                    <S.Change>{renderDiff(item.rankChange, item.isNew)}</S.Change>
                </S.Right>
            </S.Item>
        );
    };

    const left = keywords.slice(0, 5);
    const right = keywords.slice(5, 10);
    console.log("keywords:", keywords);

    return (
        <S.Wrapper>
            <S.Title>
                실시간 검색어<S.DateText>
                </S.DateText>
            </S.Title>

            <S.SummaryGrid>
                <S.StatBox>
                    <S.StatLabel>오늘 검색수</S.StatLabel>
                    <S.StatValue>
                        {summary.totalSearchCount.toLocaleString()}
                        {renderDiff(summary.totalSearchDiff)}
                    </S.StatValue>
                </S.StatBox>

                <S.StatBox>
                    <S.StatLabel>Top10 점유율</S.StatLabel>
                    <S.StatValue>{top10Ratio}%</S.StatValue>
                </S.StatBox>

                <S.StatBox>
                    <S.StatLabel>노출 키워드(전체)</S.StatLabel>
                    <S.StatValue>
                        {summary.visibleKeywordCount}
                    </S.StatValue>
                </S.StatBox>

                <S.StatBox>
                    <S.StatLabel>차단 키워드(전체)</S.StatLabel>
                    <S.StatValue>
                        {summary.blockedKeywordCount}
                    </S.StatValue>
                </S.StatBox>
            </S.SummaryGrid>

            <S.Grid>
                <S.Column>{left.map(renderItem)}</S.Column>
                <S.Column>{right.map(renderItem)}</S.Column>
            </S.Grid>
        </S.Wrapper>
    );
};

export default AdminPopularKeywordsPanel;