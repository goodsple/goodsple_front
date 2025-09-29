// CategorySelect.tsx
import { useState } from 'react';
import * as S from './CategorySelect.styles';

const MAX_SECOND = 5;
const MAX_THIRD = 10;

const firstCate = ["K-POP", "영화/드라마", "애니메이션", "게임", "기타"];
const secondCateMap: Record<string, string[]> = {
  "K-POP": ["전체", "앨범", "배지/피버튼", "포토카드", "의류", "피규어/인형", "포스터", "책", "문구류", "키링", "응원봉", "기타"],
  "영화/드라마": ["전체", "포스터", "굿즈", "DVD", "기타"],
  "애니메이션": ["전체", "피규어", "키링", "기타"],
  "게임": ["전체", "굿즈", "기타"],
  "기타": ["전체", "기타"]
};
const thirdCateMap: Record<string, string[]> = {
  "전체": ["전체", "아이브", "엑스", "여자아이들", "블랙핑크", "피프티피프티", "기타", "에스파", "뉴진스", "소녀시대", "프로미스나인", "르세라핌", "아일릿"],
  "뉴진스": ["전체", "하이틴", "굿즈"],
  // 필요시 추가
};

const CategorySelect: React.FC = () => {
  const [selectedFirst, setSelectedFirst] = useState<string>("K-POP");
  const [selectedSecond, setSelectedSecond] = useState<string[]>([]);
  const [selectedThird, setSelectedThird] = useState<string[]>([]);

  const handleSecondChange = (value: string) => {
    let updated = [...selectedSecond];
    if (updated.includes(value)) {
      updated = updated.filter((v) => v !== value);
    } else if (updated.length < MAX_SECOND) {
      updated.push(value);
    }
    setSelectedSecond(updated);
  };

  const handleThirdChange = (value: string) => {
    let updated = [...selectedThird];
    if (updated.includes(value)) {
      updated = updated.filter((v) => v !== value);
    } else if (updated.length < MAX_THIRD) {
      updated.push(value);
    }
    setSelectedThird(updated);
  };

  // 3차 옵션 계산 (선택된 2차와 독립적으로 유지)
  const thirdOptions = Array.from(
    new Set(
      selectedSecond.flatMap((s) => thirdCateMap[s] || []).concat(thirdCateMap["전체"])
    )
  );

  return (
    <S.Wrapper>
      <S.Header>카테고리별</S.Header>
      <S.Columns>
        {/* 2차 선택 */}
        <S.Column hasDivider>
          <S.ColumnHeader>2차 카테고리</S.ColumnHeader>
          {secondCateMap[selectedFirst].map((item) => (
            <S.CheckboxLabel key={item}>
              <input
                type="checkbox"
                checked={selectedSecond.includes(item)}
                onChange={() => handleSecondChange(item)}
              />{" "}
              {item}
            </S.CheckboxLabel>
          ))}
        </S.Column>

        {/* 3차 선택 */}
        <S.Column>
          <S.ColumnHeader>3차 카테고리</S.ColumnHeader>
          {thirdOptions.map((item) => (
            <S.CheckboxLabel key={item}>
              <input
                type="checkbox"
                checked={selectedThird.includes(item)}
                onChange={() => handleThirdChange(item)}
              />{" "}
              {item}
            </S.CheckboxLabel>
          ))}
        </S.Column>
      </S.Columns>

      <S.SelectedWrapper>
        선택된 카테고리:
        {selectedSecond.concat(selectedThird).map((item) => (
          <S.SelectedItem key={item}>
            {item}
            <S.RemoveButton
              onClick={() => {
                if (selectedSecond.includes(item)) {
                  setSelectedSecond(selectedSecond.filter((v) => v !== item));
                } else {
                  setSelectedThird(selectedThird.filter((v) => v !== item));
                }
              }}
            >
              ×
            </S.RemoveButton>
          </S.SelectedItem>
        ))}
      </S.SelectedWrapper>
    </S.Wrapper>
  );
};

export default CategorySelect;
