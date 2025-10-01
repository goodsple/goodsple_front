import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance.ts";
import * as s from "./SearchResultPageStyle";

interface SearchPost {
  exchangePostId: number;
  exchangePostTitle: string;
  postLocationName: string;
  postHopeRegion: string;
  postTradeType: string; // DIRECT, DELIVERY, BOTH
  exchangePostCreatedAt: string;
  postTradeStatus: string; // AVAILABLE, ONGOING, COMPLETED
  userId: number;
  postImageUrl: string;
}

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [statusFilter, setStatusFilter] = useState<"ALL" | "AVAILABLE" | "ONGOING" | "COMPLETED">("ALL"); // 수정됨
  const [results, setResults] = useState<SearchPost[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      if (!keyword.trim()) return;

      try {
        const res = await axiosInstance.get("/searchPosts/search", {
          params: { keyword },
        });
        setResults(res.data);
      } catch (err) {
        console.error("검색 실패:", err);
      }
    };

    fetchResults();
  }, [keyword]);

  const handleCardClick = (id: number) => {
    navigate(`/exchange-posts/${id}`);
  };

  // 거래 상태 필터 적용
  const filteredResults = results.filter(post =>
    statusFilter === "ALL" ? true : post.postTradeStatus === statusFilter
  );

  return (
    <s.Container>
      <s.Title>🔎 "{keyword}" 검색 결과</s.Title>

      <s.FilterButtons>
        <s.FilterBtn active={statusFilter === "ALL"} onClick={() => setStatusFilter("ALL")}>
          전체
        </s.FilterBtn>
        <s.FilterBtn active={statusFilter === "AVAILABLE"} onClick={() => setStatusFilter("AVAILABLE")}>
          거래 가능
        </s.FilterBtn>
        <s.FilterBtn active={statusFilter === "ONGOING"} onClick={() => setStatusFilter("ONGOING")}>
          거래 중
        </s.FilterBtn>
        <s.FilterBtn active={statusFilter === "COMPLETED"} onClick={() => setStatusFilter("COMPLETED")}>
          거래 완료
        </s.FilterBtn>
      </s.FilterButtons>

      <s.Grid>
        {filteredResults.length === 0 ? (
          <s.NoResult>검색 결과가 없습니다.</s.NoResult>
        ) : (
          filteredResults.map((post) => (
            <s.Card
              key={post.exchangePostId}
              onClick={() => handleCardClick(post.exchangePostId)}
            >
              <s.ImageBox>
                <img
                  src={post.postImageUrl || "/images/sample-goods.png"}
                  alt={post.exchangePostTitle}
                />
              </s.ImageBox>
              <s.Info>
                <s.TitleText>{post.exchangePostTitle}</s.TitleText>
                <s.Meta>
                  직거래 희망지역: {post.postHopeRegion || "미지정"}
                </s.Meta>
                <s.Meta>
                  방법:{" "}
                  {post.postTradeType === "DIRECT"
                    ? "직거래"
                    : post.postTradeType === "DELIVERY"
                    ? "배송"
                    : "직거래/배송"}
                </s.Meta>
                <s.Meta>
                  상태:{" "}
                  <s.StatusBox status={post.postTradeStatus}>
                    {post.postTradeStatus === "AVAILABLE"
                      ? "거래 가능"
                      : post.postTradeStatus === "ONGOING"
                      ? "거래 중"
                      : "거래 완료"}
                  </s.StatusBox>
                </s.Meta>
                <s.Date>
                  {new Date(post.exchangePostCreatedAt).toLocaleDateString()}
                </s.Date>
              </s.Info>
            </s.Card>
          ))
        )}
      </s.Grid>
    </s.Container>
  );
};

export default SearchResultsPage;
