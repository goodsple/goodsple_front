import { useEffect, useState } from 'react';
import CSS from './UserMainComponents.module.css';
import axios from 'axios';
interface PopularKeyword {
  keywordId: number;
  keyword: string;
  searchCount: number;
}

function PopularKeywords({ state }: { state: boolean }) {
  const [keywords, setKeywords] = useState<PopularKeyword[]>([]);

  useEffect(() => {
    if (state) {
      axios
        .get<PopularKeyword[]>('/api/searchPosts/popular?limit=10')
        .then(res => setKeywords(res.data))
        .catch(err => console.error(err));
    }
  }, [state]);

  if (!state) return null;

    // 인기검색어가 10개 미만일 경우 '-' 채우기
  const displayKeywords = Array.from({ length: 10 }, (_, i) => {
    return keywords[i]?.keyword || '-';
  });


  return (
    <div className={CSS.popularKeywordsWrap}>
      {displayKeywords.map((keyword, index) => (
        <div className={CSS.rank} key={index}>
          <div className={CSS.numBox}>{index + 1}</div>
          <p className={CSS.keyword}>{keyword}</p>
        </div>
      ))}
    </div>
  );
}

export default PopularKeywords;