import { useState, type Dispatch, type SetStateAction } from 'react';
import * as S from './SearchControlsStyle';
import type { ReportStatus, ReportTargetType, SearchCriteria } from '../types/adminReport';

interface Props {
  onSearch: (criteria: SearchCriteria) => void;
}

export default function SearchControls({ onSearch }: Props) {
  const [keyword, setKeyword]     = useState('');
  const [fromDate, setFromDate]   = useState('');
  const [toDate, setToDate]       = useState('');
  const [types, setTypes]         = useState<ReportTargetType[]>([]);
  const [statuses, setStatuses]   = useState<ReportStatus[]>([]);

  const typeOptions: { label: string; value: ReportTargetType }[] = [
    { label: '게시글', value: 'POST'    },
    { label: '후기',   value: 'REVIEW'  },
    { label: '메시지', value: 'MESSAGE' },
    { label: '이벤트', value: 'EVENT'   },
  ];

    // fn 타입을 Dispatch<SetStateAction<T[]>> 로 변경
    const toggle = <T,>(
      arr: T[],                          // 1. 현재 배열 상태
      val: T,                            // 2. 토글할 단일 값
      fn: Dispatch<SetStateAction<T[]>>  // 3. React 상태 업데이트 함수(setState)
    ) => {
      fn(
        arr.includes(val)                // 1) 만약 배열에 이미 들어있다면
          ? arr.filter(x => x !== val)   //    → 해당 값을 제거한 새 배열을 만들고
          : [...arr, val]                // 2) 아니라면 → 새 값을 추가한 새 배열을 만들어요
      );
    };

  return (
    <S.Form>
      <S.Row>
        <S.Group>
          <label>검색</label>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
          <S.SearchButton 
            type="submit"
            onClick={() => 
            onSearch({ keyword, fromDate, toDate, targetTypes: types, statuses })
          }>
            검색
          </S.SearchButton>
        </S.Group>

        <S.Group>
        <label>신고 유형</label>
        {typeOptions.map(({ label, value }) => (
          <label key={value}>
            <input
              type="checkbox"
              checked={types.includes(value)}                  // value는 ReportTargetType
              onChange={() => toggle(types, value, setTypes)}  // toggle<T> 의 val: T
            />
            {label}
          </label>
        ))}
      </S.Group>
      </S.Row>

      <S.Row>
        <S.Group>
          <label>신고일자</label>
          <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
          <span>~</span>
          <input type="date" value={toDate}   onChange={e => setToDate(e.target.value)} />
        </S.Group>
        
        <S.Group>
          <label>처리상태</label>
          {([
            { label: '처리',   value: 'PROCESSED' as ReportStatus },
            { label: '미처리', value: 'PENDING'   as ReportStatus },
          ]).map(({ label, value }) => (
            <label key={value}>
              <input
                type="checkbox"
                checked={statuses.includes(value)}
                onChange={() => toggle(statuses, value, setStatuses)}
              />
              {label}
            </label>
          ))}
        </S.Group>
      </S.Row>
    </S.Form>
  );
}
