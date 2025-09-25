import { useState, type Dispatch, type SetStateAction } from 'react';
import * as S from './SearchControlsStyle';
import {
  type ReportStatus,
  type ReportTargetType,
  type ReportAction,
  ReportActionLabels,
} from '../types/adminReport';

interface Props {
  onSearch: (criteria: {
    keyword?: string;
    fromDate?: string;
    toDate?: string;
    targetTypes?: ReportTargetType[];
    statuses?: ReportStatus[];
    actions?: ReportAction[]; 
  }) => void;
}

export default function SearchControls({ onSearch }: Props) {
  const [keyword, setKeyword]     = useState('');
  const [fromDate, setFromDate]   = useState('');
  const [toDate, setToDate]       = useState('');
  const [types, setTypes]         = useState<ReportTargetType[]>([]);
  const [statuses, setStatuses]   = useState<ReportStatus[]>([]);
  const [actions, setActions]     = useState<ReportAction[]>([]); 

  const typeOptions: { label: string; value: ReportTargetType }[] = [
    { label: '게시글', value: 'POST'    },
    { label: '후기',   value: 'REVIEW'  },
    { label: '메시지', value: 'MESSAGE' },
    { label: '이벤트', value: 'EVENT'   },
  ];

  const actionOptions: { label: string; value: ReportAction }[] = [
    { label: ReportActionLabels.WARNING,      value: 'WARNING' },
    { label: ReportActionLabels.DISMISS,      value: 'DISMISS' },
    { label: ReportActionLabels.SUSPEND_3D,   value: 'SUSPEND_3D' },
    { label: ReportActionLabels.SUSPEND_PERM, value: 'SUSPEND_PERM' },
  ];

  const toggle = <T,>(
    arr: T[],
    val: T,
    fn: Dispatch<SetStateAction<T[]>>
  ) => fn(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);

  return (
    <S.Form onSubmit={(e) => { e.preventDefault(); onSearch({
      keyword, fromDate, toDate, targetTypes: types, statuses, actions,
    }); }}>
      <S.Row>
        <S.Group>
          <label>검색</label>
          <input
            type="text"
            placeholder="닉네임/사유/조치 검색" 
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
          <S.SearchButton
            type="button"
            onClick={() => onSearch({
              keyword, fromDate, toDate,
              targetTypes: types,
              statuses,
              actions, 
            })}
          >
            검색
          </S.SearchButton>
        </S.Group>

        <S.Group>
          <label>신고 유형</label>
          {typeOptions.map(({ label, value }) => (
            <label key={value}>
              <input
                type="checkbox"
                checked={types.includes(value)}
                onChange={() => toggle(types, value, setTypes)}
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
            { label: '처리',   value: 'processed' as ReportStatus },
            { label: '미처리', value: 'pending'   as ReportStatus },
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
