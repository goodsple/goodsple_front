import { useState } from "react";
import * as S from './SearchControlsStyle';
import type { SearchCriteria } from "../types/adminReview";


type Props = {
  onSearch: (criteria: SearchCriteria) => void;
};

const SearchControls: React.FC<Props> = ({ onSearch }) => {
  const [keyword, setKeyword]       = useState('');
  const [statusNormal, setNormal]   = useState(false);
  const [statusBlind, setBlind]     = useState(false);
  const [fromDate, setFromDate]     = useState('');
  const [toDate, setToDate]         = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const statuses: SearchCriteria['statuses'] = [];
    if (statusNormal) statuses.push('NORMAL');
    if (statusBlind)  statuses.push('BLIND');

    onSearch({ keyword, statuses, fromDate, toDate });
  };
  
  return (
    <S.Form onSubmit={handleSubmit}>
      <S.Row>
        <S.Group>
          <label>검색</label>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
          <S.SearchButton type="submit">검색</S.SearchButton>
        </S.Group>

        <S.Group>
          <label>후기 상태</label>
          <label>
            <input
              type="checkbox"
              checked={statusNormal}
              onChange={e => setNormal(e.target.checked)}
            /> 정상
          </label>
          <label>
            <input
              type="checkbox"
              checked={statusBlind}
              onChange={e => setBlind(e.target.checked)}
            /> 블라인드
          </label>
        </S.Group>
      </S.Row>

      <S.Row>
        <S.Group>
          <label>후기일자</label>
          <input
            type="date"
            value={fromDate}
            onChange={e => setFromDate(e.target.value)}
          />
          <span>~</span>
          <input
            type="date"
            value={toDate}
            onChange={e => setToDate(e.target.value)}
          />
        </S.Group>
      </S.Row>
    </S.Form>
  );
};

export default SearchControls;