import React from 'react';
import * as s from './ProhibitedWordsTableStyle';

export interface ProhibitedWord {
  id: number;
  date: string;
  isActive: boolean;
  word: string;
}

interface Props {
  data: ProhibitedWord[];
  selectedIds: number[];
  onSelect: (id: number) => void;
  onSelectAll: (checked: boolean) => void;
}

const ProhibitedWordsTable: React.FC<Props> = ({
  data,
  selectedIds,
  onSelect,
  onSelectAll,
}) => {
  const rowCount = 10;
  const emptyRows = rowCount - data.length;

  const isAllChecked = data.length > 0 && data.every((d) => selectedIds.includes(d.id));

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
          <tr key={word.id}>
            <td>
              <input
                type="checkbox"
                checked={selectedIds.includes(word.id)}
                onChange={() => onSelect(word.id)}
              />
            </td>
            <td>{word.id}</td>
            <td>{word.date}</td>
            <td>
              <s.Status active={word.isActive}>
                {word.isActive ? '활성화' : '비활성화'}
              </s.Status>
            </td>
            <td>{word.word}</td>
          </tr>
        ))}

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
