import { useEffect, useState } from 'react';
import * as S from './CategorySelect.styles';
import axios from 'axios';

interface SecondCate {
  id: number;
  name: string;
}

interface ThirdCate {
  id: number;
  name: string;
  secondId: number;
}

interface CategorySelectProps {
  firstCateId: number;
  onFilterChange: (secondIds: number[], thirdIds: number[]) => void;
}

const MAX_TOTAL = 5;  // 최대 선택 가능한 카테고리 개수

const CategorySelect: React.FC<CategorySelectProps> = ({ firstCateId, onFilterChange }) => {
  const [secondCategories, setSecondCategories] = useState<SecondCate[]>([]); // 2차 카테고리 목록 (0번: 전체 포함)
  const [thirdBySecond, setThirdBySecond] = useState<Record<number, ThirdCate[]>>({}); // 2차 ID별 3차 카테고리 매핑
  const [thirdCategories, setThirdCategories] = useState<ThirdCate[]>([]);  // 3차 카테고리 목록

  const [selectedSecond, setSelectedSecond] = useState<number[]>([]);   // 선택된 2차 카테고리 ID 목록
  const [selectedThird, setSelectedThird] = useState<ThirdCate[]>([]);  // 선택된 3차 카테고리 목록

  // 3차 카테고리 중복 제거 (이름 기준)
  // 동일 이름의 3차(EXO 등)가 여러 2차에 속할 수 있으므로
  // UI에서는 같은 이름의 3차를 하나로 보여주기 위함
  // 서버 필터링은 ID 기준, UI 표시는 이름 기준으로 분리
  const uniqueThirdByName = (arr: ThirdCate[]) => {
    const map = new Map<string, ThirdCate>();
    arr.forEach(item => map.set(item.name, item));
    return Array.from(map.values());
  };

  // 2차 + 3차 불러오기
  // firstCateId 기준으로 2차 카테고리 불러오고
  // 해당 2차 카테고리에 속한 3차 카테고리들도 함께 불러옴
  // 3차는 이름 기준으로 중복 제거 후 UI에 반영
  useEffect(() => {
    const id = Number(firstCateId);
    if (isNaN(id)) return;

    axios.get<SecondCate[]>(`/api/user/categories/second/${id}`)
      .then(res => {
        const seconds = [{ id: 0, name: '전체' }, ...res.data];
        setSecondCategories(seconds);

        const secondIds = res.data.map(s => s.id);
        if (secondIds.length > 0) {
          axios.post<Record<number, ThirdCate[]>>('/api/user/categories/third/by-second', secondIds)
            .then(res => {
              setThirdBySecond(res.data);
              setThirdCategories(uniqueThirdByName(Object.values(res.data).flat()));
            }).catch(console.error);
        }
      }).catch(console.error);
  }, [firstCateId]);

  // 1차 카테고리 변경 시 2차 3차 초기화
  // 카테고리 간 선택 상태가 꼬이는 것을 방지
  useEffect(() => {
    setSelectedSecond([]);
    setSelectedThird([]);
  }, [firstCateId]);


  // 2차 카테고리 선택
  // 전체 선택 시 2차 전체, 3차 전체 선택 처리
  // 특정 2차 선택 시 해당 2차에 속한 3차만 노출
  // 3차가 선택되지 않은 상태에서 2차만 선택 시 해당 2차에 연결된 모든 3차 ID 포함
  // 기존에 선택된 3차는 이름 기준으로 유지
  const handleSecondChange = (id: number) => {
    let newSecond: number[];

    if (id === 0) {
      const allSecondIds = secondCategories.filter(s => s.id !== 0).map(s => s.id);
      const allThirdIds = Object.values(thirdBySecond).flat().map(t => t.id);

      // 전체 선택
      setSelectedSecond([]); // UI에서 '전체'로 표시
      setSelectedThird([]); // 전체 선택 시 3차 초기화


      onFilterChange(allSecondIds, allThirdIds);
      setThirdCategories(uniqueThirdByName(Object.values(thirdBySecond).flat()));

      return;
    }


    if (selectedSecond.includes(id)) {
      newSecond = selectedSecond.filter(v => v !== id);
    } else {
      if (selectedSecond.length + selectedThird.length >= MAX_TOTAL) {  // 2차 + 3차 합산 체크
        alert(`카테고리는 최대 ${MAX_TOTAL}개까지 선택 가능합니다.`);
        return;
      }
      newSecond = [...selectedSecond.filter(v => v !== 0), id]; // 전체 선택 해제
    }

    setSelectedSecond(newSecond);

    // 선택된 2차 기반으로 3차 필터링, 기존 selectedThird 체크 유지
    // 2차 선택이 없으면 전체 3차 노출
    const filteredThirds = newSecond.length === 0
      ? Object.values(thirdBySecond).flat() // 전체
      : newSecond.map(secId => thirdBySecond[secId] || []).flat();

    // 중복 제거 + 기존 선택 유지
    const mergedThirds = uniqueThirdByName([...filteredThirds, ...selectedThird]);
    setThirdCategories(mergedThirds); // UI 반영

    // 선택된 3차는 이름 기준으로 유지
    setSelectedThird(prev =>
      prev.filter(t => mergedThirds.some(mt => mt.name === t.name))
    );

    // 서버로 보낼 2차 ID 배열
    // 2차 선택이 없으면 전체 2차 선택으로 간주
    // 선택된 경우에만 해당 2차 ID 전송
    const secondIdsToSend = newSecond.length === 0
      ? secondCategories.filter(s => s.id !== 0).map(s => s.id)
      : newSecond;

    // 2차 선택만 되어있고 3차 선택이 없으면, 2차에 연결된 모든 3차 ID를 포함
    let thirdIdsToSend: number[] = [];
    if (selectedThird.length > 0) {
      // 이미 선택된 3차가 있다면 그대로 사용
      thirdIdsToSend = selectedThird.map(t => t.id);
    } else if (newSecond.length > 0) {
      // 3차 선택이 없으면 2차에 연결된 모든 3차 포함
      thirdIdsToSend = newSecond.map(secId => thirdBySecond[secId] || [])
        .flat()
        .map(t => t.id);
    }

    onFilterChange(secondIdsToSend, thirdIdsToSend);
  };

  // 3차 카테고리 선택
  // 3차 선택 시 기존 2차 선택 유지
  // 2차가 선택되어있지 않으면, 선택된 3차의 기준으로만 필터링
  const handleThirdChange = async (item: ThirdCate) => {
    const alreadySelected = selectedThird.some(t => t.id === item.id);
    let newThird = alreadySelected
      ? selectedThird.filter(t => t.id !== item.id)
      : [...selectedThird, item];

    if (selectedSecond.length + newThird.length > MAX_TOTAL) {
      alert(`카테고리는 최대 ${MAX_TOTAL}개까지 선택 가능합니다.`);
      return;
    }

    newThird = uniqueThirdByName(newThird);

    // 선택된 3차 ID 배열
    const thirdIdsToSend = newThird.map(t => t.id);

    // 기존 2차 선택이 있으면 유지하고,
    // 2차 선택이 없으면 3차 기준으로만 필터링
    const secondIdsToSend =
      selectedSecond.length > 0 ? selectedSecond : [];

    setSelectedThird(newThird);
    onFilterChange(secondIdsToSend, thirdIdsToSend);
  };

  // 선택된 2차 이름 반환
  const getSecondName = (id: number) => secondCategories.find(s => s.id === id)?.name || '';

  return (
    <S.Wrapper>
      <S.Header>카테고리별</S.Header>
      <S.Columns>
        <S.Column hasDivider>
          <S.ColumnHeader>2차 카테고리</S.ColumnHeader>
          {secondCategories.map(item => (
            <S.CheckboxLabel key={item.id}>
              <input
                type="checkbox"
                checked={item.id === 0 ? selectedSecond.length === 0 : selectedSecond.includes(item.id)}
                onChange={() => handleSecondChange(item.id)}
              />
              {item.name}
            </S.CheckboxLabel>
          ))}
        </S.Column>

        <S.Column>
          <S.ColumnHeader>3차 카테고리</S.ColumnHeader>
          {thirdCategories.map(item => (
            <S.CheckboxLabel key={item.id}>
              <input
                type="checkbox"
                checked={selectedThird.some(t => t.id === item.id)} // 체크 유지
                onChange={() => handleThirdChange(item)}
                disabled={thirdCategories.length === 0}
              />
              {item.name}
            </S.CheckboxLabel>
          ))}
        </S.Column>
      </S.Columns>

      <S.SelectedWrapper>
        선택된 카테고리(최대 {MAX_TOTAL}개):
        {selectedSecond.map(id => (
          <S.SelectedItem key={`second-${id}`}>
            {getSecondName(id)}
            <S.RemoveButton onClick={() => handleSecondChange(id)}>×</S.RemoveButton>
          </S.SelectedItem>
        ))}
        {selectedThird.map(item => (
          <S.SelectedItem key={`third-${item.id}`}>
            {item.name}
            <S.RemoveButton onClick={() => handleThirdChange(item)}>×</S.RemoveButton>
          </S.SelectedItem>
        ))}
      </S.SelectedWrapper>
    </S.Wrapper>
  );
};

export default CategorySelect;