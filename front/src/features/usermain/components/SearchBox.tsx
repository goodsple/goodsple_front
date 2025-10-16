import { useState } from "react";
import { useNavigate } from "react-router-dom";
import map from "../../../assets/images/map.png";
import search from "../../../assets/images/search.png";
import PopularKeywords from "./PopularKeywords.tsx";
import * as s from "./SearchBoxStyle"; // styled-components 모음

const SearchBox: React.FC = () => {
  const [keywordsList, setKeywordsList] = useState(false);
  const [keyword, setKeyword] = useState(""); // 입력된 검색어 상태
  const navigate = useNavigate();

  const onClickKeywords = () => {
      setKeywordsList(!keywordsList);
  };

  // 검색 실행 함수
  const handleSearch = () => {
      if (!keyword.trim()) return;
      navigate(`/search-results?keyword=${encodeURIComponent(keyword)}`);
  };

  return (
    <s.SearchWrap>
      <s.SearchIcon src={map} alt="map-icon" />

      <s.SearchInputWrap>
        <s.SearchInput
          placeholder="굿즈 이름 또는 키워드를 검색해보세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
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
        <s.RealTimePopularKeywords2>1. 방탄 뷔 포카</s.RealTimePopularKeywords2>
      </s.PopularKeywords>
    </s.SearchWrap>
  );
};

export default SearchBox;
