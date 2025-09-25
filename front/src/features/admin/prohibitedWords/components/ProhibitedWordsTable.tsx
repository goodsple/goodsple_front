import React from 'react';
import * as s from './ProhibitedWordsTableStyle';

export interface ProhibitedWord {
  wordId: number;
  word: string;
  wordIsActive: boolean;
  wordCreatedAt: string; // ISO 문자열, e.g., "2025-09-18T12:34:56Z"
}

interface Props {
  data: ProhibitedWord[];
  selectedIds: number[];
  onSelect: (id: number) => void;
  onSelectAll: (checked: boolean) => void;
  onToggleActive: (id: number, isActive: boolean) => void;
}

const ProhibitedWordsTable: React.FC<Props> = ({
  data,
  selectedIds,
  onSelect,
  onSelectAll,
  onToggleActive,
}) => {
  const rowCount = 10;
  const emptyRows = rowCount - data.length;

  // 현재 페이지 모든 항목이 선택되었는지 체크
  const isAllChecked = data.length > 0 && data.every((d) => selectedIds.includes(d.wordId));

  return (
    <s.Table>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={isAllChecked}
              onChange={(e) => onSelectAll(e.target.checked)}
            />
          </th>
          <th>번호</th>
          <th>등록일</th>
          <th>상태</th>
          <th>금칙어</th>
        </tr>
      </thead>
      <tbody>
        {data.map((word) => (
          <tr key={word.wordId}>
            <td>
              <input
                type="checkbox"
                checked={selectedIds.includes(word.wordId)}
                onChange={() => onSelect(word.wordId)}
              />
            </td>
            <td>{word.wordId}</td>
            <td>{new Date(word.wordCreatedAt).toLocaleDateString()}</td>
            <td>
              <s.Status 
                  active={word.wordIsActive}
                  onClick={() => onToggleActive(word.wordId, word.wordIsActive)}
              >
                {word.wordIsActive ? '활성화' : '비활성화'}
              </s.Status>
            </td>
            <td>{word.word}</td>
          </tr>
        ))}

        {/* 빈 행 채우기 (항목이 10개 미만일 때) */}
        {Array.from({ length: emptyRows }).map((_, index) => (
          <tr key={`empty-${index}`}>
            {[...Array(5)].map((_, i) => (
              <td key={i}>&nbsp;</td>
            ))}
          </tr>
        ))}
      </tbody>
    </s.Table>
  );
};

export default ProhibitedWordsTable;
