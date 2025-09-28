import { useState } from "react";
import map from "../../../assets/images/map.png";
import search from "../../../assets/images/search.png";
import PopularKeywords from "./PopularKeywords.tsx";
import * as s from "./SearchBoxStyle"; // styled-components 모음

const SearchBox: React.FC = () => {
  const [keywordsList, setKeywordsList] = useState(false);

  const onClickKeywords = () => {
    setKeywordsList(!keywordsList);
  };

  return (
    <s.SearchWrap>
      <s.SearchIcon src={map} alt="map-icon" />

      <s.SearchInputWrap>
        <s.SearchInput placeholder="굿즈 이름 또는 키워드를 검색해보세요" />
        <s.SearchIcon2 src={search} alt="search-icon" />
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
