import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import map from "../../assets/images/map.png";
import search from "../../assets/images/search.png";
import PopularKeywords from "./PopularKeywords.tsx";
import * as s from "./SearchBoxStyle"; // styled-components 모음


interface PopularKeyword {
  keyword: string;
}

const SearchBox: React.FC = () => {

  const [keywordsList, setKeywordsList] = useState(false);
  const [keyword, setKeyword] = useState(""); // 입력된 검색어 상태

  const [popularKeywords, setPopularKeywords] = useState<PopularKeyword[]>([]);
  const [scrollIndex, setScrollIndex] = useState(0); // 현재 보여줄 순위 인덱스
  const [isSearching, setIsSearching] = useState(false); // 검색 중복 방지 상태

  // 🔹 검색어 기록 여부
  const [recordedKeywords, setRecordedKeywords] = useState<Set<string>>(new Set());

  const navigate = useNavigate();

  const onClickKeywords = () => {
    setKeywordsList(!keywordsList);
  };

  // 검색 실행 함수
  // const handleSearch = async () => {
  //   if (!keyword.trim() || isSearching) return;

  //   setIsSearching(true); // 중복 방지

  //   console.log("handleSearch 호출:", keyword);

  //   try {
  //     // SearchBox에서는 기록/조회수 API 호출하지 않고 SearchResultsPage에서 처리
  //     // 단순 검색 결과 페이지로 이동
  //     navigate(`/search-results?keyword=${encodeURIComponent(keyword)}`);
  //   } catch (err) {
  //     console.error("검색 실행 실패:", err);
  //   } finally {
  //     setIsSearching(false);
  //   }
  // };
  const handleSearch = async () => {
    if (!keyword.trim() || isSearching) return;

    setIsSearching(true);

    try {
      // 🔥 여기서 실제 검색 API 먼저 호출
      await axios.get('/api/searchPosts/search', {
        params: { keyword }
      });

      // 성공하면 페이지 이동
      navigate(`/search-results?keyword=${encodeURIComponent(keyword)}`);

    } catch (err: any) {
      alert(err.response?.data?.message || "금칙어가 포함되었습니다.");
      return;
    } finally {
      setIsSearching(false);
    }
  };


  // 인기검색어 가져오기 (5초마다 갱신)
  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const res = await axios.get<PopularKeyword[]>("/api/popular/top?limit=10");
        const data = res.data;

        // 없는 경우 '-' 표시
        const filled = Array.from({ length: 10 }, (_, i) => data[i]?.keyword || "-").map(k => ({ keyword: k }));

        setPopularKeywords(filled);
      } catch (err) {
        console.error("인기검색어 불러오기 실패:", err);
      }
    };

    fetchKeywords();
    const interval = setInterval(fetchKeywords, 5000); // 5초마다 갱신
    return () => clearInterval(interval);
  }, []);

  // 자동 스크롤 (3초마다 다음 인기검색어로 이동)
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setScrollIndex(prev => (prev + 1) % 10); // 0~9 반복
    }, 2000); // 1초마다
    return () => clearInterval(scrollInterval);
  }, []);


  return (
    <s.SearchWrap>
      <s.SearchIcon src={map} alt="map-icon" />

      <s.SearchInputWrap>
        <s.SearchInput
          placeholder="굿즈 이름 또는 키워드를 검색해보세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
        />
        <s.SearchIcon2
          src={search}
          alt="search-icon"
          onClick={handleSearch}
        />
      </s.SearchInputWrap>

      <s.PopularKeywords onClick={onClickKeywords}>
        <PopularKeywords state={keywordsList} />
        <s.RealTimePopularKeywords1>🔥실시간 인기</s.RealTimePopularKeywords1>
        <s.KeywordTextWrapper>
          <s.RealTimePopularKeywords2>
            {scrollIndex + 1}. {popularKeywords[scrollIndex]?.keyword || " - "}
          </s.RealTimePopularKeywords2>
        </s.KeywordTextWrapper>
      </s.PopularKeywords>
    </s.SearchWrap>
  );
};

export default SearchBox;
