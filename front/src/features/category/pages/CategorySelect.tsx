

// 2차 + 3차는 잘 뜨는데 3차만 선택하면 안뜸
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

const MAX_TOTAL = 5;

const CategorySelect: React.FC<CategorySelectProps> = ({ firstCateId, onFilterChange }) => {
  const [secondCategories, setSecondCategories] = useState<SecondCate[]>([]);
  const [thirdBySecond, setThirdBySecond] = useState<Record<number, ThirdCate[]>>({});
  const [thirdCategories, setThirdCategories] = useState<ThirdCate[]>([]);

  const [selectedSecond, setSelectedSecond] = useState<number[]>([]);
  const [selectedThird, setSelectedThird] = useState<ThirdCate[]>([]);

  // 중복 제거 (이름 기준)
  const uniqueThirdByName = (arr: ThirdCate[]) => {
    const map = new Map<string, ThirdCate>();
    arr.forEach(item => map.set(item.name, item));
    return Array.from(map.values());
  };

  // 2차 + 3차 불러오기
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

  // firstCateId 변경 시 초기화
  useEffect(() => {
    setSelectedSecond([]);
    setSelectedThird([]);
  }, [firstCateId]);

  // 2차 선택
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
      if (selectedSecond.length + selectedThird.length >= MAX_TOTAL) {
        alert(`카테고리는 최대 ${MAX_TOTAL}개까지 선택 가능합니다.`);
        return;
      }
      newSecond = [...selectedSecond.filter(v => v !== 0), id]; // 전체 선택 해제
    }

    setSelectedSecond(newSecond);

    // 선택된 2차 기반으로 3차 필터링, 기존 selectedThird 체크 유지
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

    // 여기 수정됨: 선택된 모든 2차 기준으로 모든 3차 ID 전달
    // const thirdIdsToSend =
    //   newSecond.length === 0
    //     ? Object.values(thirdBySecond).flat().map(t => t.id)
    //     : newSecond
    //       .map(secId => thirdBySecond[secId] || [])
    //       .flat()
    //       .map(t => t.id);

    // handleSecondChange 마지막 부분
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


  // 3차 선택
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
    const thirdIdsToSend = newThird.map(t => t.id);

    let secondIdsToSend: number[] = [];

    if (selectedSecond.length > 0) {
      secondIdsToSend = selectedSecond;
    } else {
      try {
        const res = await axios.post<number[]>('/api/posts/second/by-third-ids', {
          thirdIds: thirdIdsToSend
        });
        secondIdsToSend = res.data;
      } catch (err) {
        console.error('3차 선택 시 2차 ID 조회 실패', err);
        secondIdsToSend = [];
      }
    }

    setSelectedThird(newThird);
    onFilterChange(secondIdsToSend, thirdIdsToSend);
  };





  // 3차 선택 (3차 선택만 하는게 안됨)
  // const handleThirdChange = (item: ThirdCate) => {
  //   setSelectedThird(prev => {
  //     const alreadySelected = prev.some(t => t.id === item.id);
  //     let newThird: ThirdCate[];
  //     if (alreadySelected) {
  //       newThird = prev.filter(t => t.id !== item.id);
  //     } else {
  //       if (selectedSecond.length + prev.length >= MAX_TOTAL) {
  //         alert(`카테고리는 최대 ${MAX_TOTAL}개까지 선택 가능합니다.`);
  //         return prev;
  //       }
  //       newThird = [...prev, item];
  //     }

  //     const thirdIdsToSend = newThird.map(t => t.id);

  //     // const selectedNames = newThird.map(t => t.name);

  //     // const thirdIdsToSend = Object.values(thirdBySecond)
  //     //   .flat()
  //     //   .filter(t => selectedNames.includes(t.name))
  //     //   .map(t => t.id);

  //     const secondIdsToSend = selectedSecond.length > 0
  //       ? selectedSecond
  //       : []; // 3차 카테고리 선택 시, 2차는 선택된 상태를 유지하거나 (없다면) 빈 배열을 전달

  //     // const secondIdsToSend = Object.values(thirdBySecond)
  //     //   .flat()
  //     //   .filter(t => selectedNames.includes(t.name))
  //     //   .map(t => t.secondId)
  //     //   .filter((v, i, arr) => arr.indexOf(v) === i); // 중복 제거

  //     onFilterChange(secondIdsToSend, thirdIdsToSend);

  //     return newThird;
  //   });
  // };

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


// import { useEffect, useState } from 'react';
// import * as S from './CategorySelect.styles';
// import axios from 'axios';

// interface SecondCate {
//   id: number;
//   name: string;
// }

// interface ThirdCate {
//   id: number;
//   name: string;
//   secondId: number;
// }

// interface CategorySelectProps {
//   firstCateId: number;
//   onFilterChange: (secondIds: number[], thirdIds: number[]) => void;
// }

// const MAX_TOTAL = 5;

// const CategorySelect: React.FC<CategorySelectProps> = ({ firstCateId, onFilterChange }) => {
//   const [secondCategories, setSecondCategories] = useState<SecondCate[]>([]);
//   const [thirdBySecond, setThirdBySecond] = useState<Record<number, ThirdCate[]>>({});
//   const [thirdCategories, setThirdCategories] = useState<ThirdCate[]>([]);

//   const [selectedSecond, setSelectedSecond] = useState<number[]>([]);
//   const [selectedThird, setSelectedThird] = useState<ThirdCate[]>([]);

//   // 중복 제거
//   const uniqueThirdByName = (arr: ThirdCate[]) => {
//     const map = new Map<string, ThirdCate>();
//     arr.forEach(item => map.set(item.name, item));
//     return Array.from(map.values());
//   };

//   // 2차 + 3차 불러오기
//   useEffect(() => {
//     const id = Number(firstCateId);
//     if (isNaN(id)) return;

//     axios.get<SecondCate[]>(`/api/user/categories/second/${id}`)
//       .then(res => {
//         const seconds = [{ id: 0, name: '전체' }, ...res.data];
//         setSecondCategories(seconds);

//         const secondIds = res.data.map(s => s.id);
//         if (secondIds.length > 0) {
//           axios.post<Record<number, ThirdCate[]>>('/api/user/categories/third/by-second', secondIds)
//             .then(res => {
//               setThirdBySecond(res.data);
//               setThirdCategories(uniqueThirdByName(Object.values(res.data).flat()));
//             }).catch(console.error);
//         }
//       }).catch(console.error);
//   }, [firstCateId]);

//   // firstCateId 변경 시 초기화
//   useEffect(() => {
//     setSelectedSecond([]);
//     setSelectedThird([]);
//   }, [firstCateId]);

//   // 2차 선택
//   const handleSecondChange = (id: number) => {
//     let newSecond: number[];

//     if (id === 0) {
//       // 전체 선택
//       setSelectedSecond([]); // UI에서 '전체'로 표시되게 유지
//       setSelectedThird([]); // 전체 선택 시 3차 초기화

//       // 👉✨ 전체 2차 ID 생성
//       const allSecondIds = secondCategories
//         .filter(s => s.id !== 0)
//         .map(s => s.id);

//       // 🔧 전체 3차 ID 생성
//       const allThirdIds = Object.values(thirdBySecond).flat().map(t => t.id); // 👉✨ 수정

//       onFilterChange(allSecondIds, allThirdIds); // 👉✨

//       // 3차 전체 보여주기
//       setThirdCategories(uniqueThirdByName(Object.values(thirdBySecond).flat()));

//       return;
//     }

//     if (selectedSecond.includes(id)) {
//       // 이미 선택된 2차 해제
//       newSecond = selectedSecond.filter(v => v !== id);
//     } else {
//       if (selectedSecond.length + selectedThird.length >= MAX_TOTAL) {
//         alert(`카테고리는 최대 ${MAX_TOTAL}개까지 선택 가능합니다.`);
//         return;
//       }
//       newSecond = [...selectedSecond.filter(v => v !== 0), id]; // 전체 선택 해제
//     }


//     setSelectedSecond(newSecond);

//     // 3차 목록은 선택된 2차에 맞게 필터링
//     const newThirds = newSecond.length === 0
//       ? Object.values(thirdBySecond).flat()
//       : newSecond.map(i => thirdBySecond[i] || []).flat();
//     setThirdCategories(uniqueThirdByName(newThirds));

//     // 선택된 3차 필터링
//     setSelectedThird(prev =>
//       prev.filter(t => newSecond.length === 0 || newSecond.includes(t.secondId)));

//     setSelectedSecond(newSecond);

//     // 선택된 second + 선택된 third 전달
//     const thirdIdsToSend = selectedThird.length > 0
//       ? selectedThird.map(t => t.id)
//       : newSecond.length === 0
//         ? Object.values(thirdBySecond).flat().map(t => t.id) // 전체 2차, 3차 선택 없음 → 전체 3차
//         : newSecond.map(secId => thirdBySecond[secId] || []).flat().map(t => t.id); // 특정 2차, 3차 선택 없음 → 선택 2차 관련 3차 전체


//     // 기본 선택 시에는 newSecond 그대로 전달
//     onFilterChange(
//       newSecond.length === 0
//         ? secondCategories.filter(s => s.id !== 0).map(s => s.id)
//         : newSecond,
//       thirdIdsToSend
//     );
//   };

//   // onFilterChange(newSecond.length === 0 ? [] : newSecond, selectedThird.map(t => t.id));

//   // 3차 선택
//   const handleThirdChange = (item: ThirdCate) => {
//     setSelectedThird(prev => {
//       const alreadySelected = prev.some(t => t.id === item.id);

//       let newThird: ThirdCate[];
//       if (alreadySelected) {
//         newThird = prev.filter(t => t.id !== item.id);
//       } else {
//         if (selectedSecond.length + prev.length >= MAX_TOTAL) {
//           alert(`카테고리는 최대 ${MAX_TOTAL}개까지 선택 가능합니다.`);
//           return prev;
//         }
//         newThird = [...prev, item];
//       }


//       // 선택한 3차 이름 배열 (필터링용)
//       const selectedNames = newThird.map(t => t.name);


//       // 선택한 3차 이름과 연결된 모든 3차 가져오기
//       const thirdIdsToSend = Object.values(thirdBySecond)
//         .flat()
//         .filter(t => selectedNames.includes(t.name))
//         .map(t => t.id);

//       // 선택한 3차 이름과 연결된 2차 ID 가져오기
//       const secondIdsToSend = Object.values(thirdBySecond)
//         .flat()
//         .filter(t => selectedNames.includes(t.name))
//         .map(t => t.secondId)
//         .filter((v, i, arr) => arr.indexOf(v) === i); // 중복 제거

//       onFilterChange(secondIdsToSend, thirdIdsToSend);

//       return newThird;
//     });
//   };

//   const getSecondName = (id: number) => secondCategories.find(s => s.id === id)?.name || '';

//   return (
//     <S.Wrapper>
//       <S.Header>카테고리별</S.Header>
//       <S.Columns>

//         <S.Column hasDivider>
//           <S.ColumnHeader>2차 카테고리</S.ColumnHeader>
//           {secondCategories.map(item => (
//             <S.CheckboxLabel key={item.id}>
//               <input
//                 type="checkbox"
//                 // 기존 체크 여부 + 선택된 third도 포함
//                 checked={item.id === 0 ? selectedSecond.length === 0 : selectedSecond.includes(item.id)}
//                 onChange={() => handleSecondChange(item.id)}
//               />
//               {item.name}
//             </S.CheckboxLabel>
//           ))}
//         </S.Column>

//         <S.Column>
//           <S.ColumnHeader>3차 카테고리</S.ColumnHeader>
//           {thirdCategories.map(item => (
//             <S.CheckboxLabel key={item.id}>
//               <input
//                 type="checkbox"
//                 // 기존 체크 여부 + 선택된 third도 포함
//                 checked={selectedThird.some(t => t.id === item.id)}
//                 onChange={() => handleThirdChange(item)}
//                 disabled={thirdCategories.length === 0}
//               />
//               {item.name}
//             </S.CheckboxLabel>
//           ))}
//         </S.Column>

//       </S.Columns>

//       <S.SelectedWrapper>
//         선택된 카테고리(최대 {MAX_TOTAL}개):
//         {selectedSecond.map(id => (
//           <S.SelectedItem key={`second-${id}`}>
//             {getSecondName(id)}
//             <S.RemoveButton onClick={() => handleSecondChange(id)}>×</S.RemoveButton>
//           </S.SelectedItem>
//         ))}
//         {selectedThird.map(item => (
//           <S.SelectedItem key={`third-${item.id}`}>
//             {item.name}
//             <S.RemoveButton onClick={() => handleThirdChange(item)}>×</S.RemoveButton>
//           </S.SelectedItem>
//         ))}
//       </S.SelectedWrapper>
//     </S.Wrapper>
//   );
// };

// export default CategorySelect;


// 글목록 잘뜨고, 2차 선택안하면 3차 클릭못함, 2차 카테고리에 전체 박스 추가
// import { useEffect, useState } from 'react';
// import * as S from './CategorySelect.styles';
// import axios from 'axios';

// interface SecondCate {
//   id: number;
//   name: string;
// }

// interface ThirdCate {
//   id: number;
//   name: string;
//   secondId: number;
// }

// // props로 firstCateId와 필터 변경 콜백 받기
// interface CategorySelectProps {
//   firstCateId: number;
//   onFilterChange: (secondIds: number[], thirdIds: number[]) => void;
// }

// const CategorySelect: React.FC<CategorySelectProps> = ({ firstCateId, onFilterChange }) => {
//   const [secondCategories, setSecondCategories] = useState<SecondCate[]>([]);
//   const [thirdCategories, setThirdCategories] = useState<ThirdCate[]>([]);
//   const [thirdBySecond, setThirdBySecond] = useState<Record<number, ThirdCate[]>>({});

//   const [selectedSecond, setSelectedSecond] = useState<number[]>([]);
//   const [selectedThird, setSelectedThird] = useState<ThirdCate[]>([]);

//   // 2차 + 3차 카테고리 최대 선택 개수
//   const MAX_TOTAL = 5;

//   // 이름 기준 중복 제거 함수
//   const uniqueThirdByName = (arr: ThirdCate[]) => {
//     const map = new Map<string, ThirdCate>();
//     arr.forEach(item => { if (!map.has(item.name)) map.set(item.name, item); });
//     return Array.from(map.values());
//   };

//   // 2차 카테고리 불러오기
//   useEffect(() => {
//     const id = Number(firstCateId);
//     if (isNaN(id)) return;

//     axios.get<SecondCate[]>(`/api/user/categories/second/${id}`).then(res => {
//       const seconds = [{ id: 0, name: '전체' }, ...res.data]; // 2차 전체 추가
//       setSecondCategories(seconds);

//       // 2차 ID 배열로 3차 카테고리 불러오기
//       const secondIds = res.data.map(s => s.id);
//       if (secondIds.length > 0) {
//         axios.post<Record<number, ThirdCate[]>>('/api/user/categories/third/by-second', secondIds)
//           .then(res => {
//             setThirdBySecond(res.data);
//             const allThirds = Object.values(res.data).flat();
//             setThirdCategories(uniqueThirdByName(allThirds));
//           })
//           .catch(console.error);
//       }
//     }).catch(console.error);
//   }, [firstCateId]);

//   // firstCateId 변경 시 초기화
//   useEffect(() => {
//     setSelectedSecond([]);
//     setSelectedThird([]);
//   }, [firstCateId]);

//   // 2차 선택 3차 필터링
//   const handleSecondChange = (id: number) => {
//     setSelectedSecond(prev => {
//       let newSelection: number[];

//       if (id === 0) {
//         const alreadySelected = prev.includes(0);
//         if (alreadySelected) {
//           // 전체 선택 해제
//           newSelection = [];
//           setSelectedThird([]);
//           // 3차 전체로 복원
//           setThirdCategories(uniqueThirdByName(Object.values(thirdBySecond).flat()));
//           onFilterChange([], []);
//         } else {
//           // 전체 선택
//           newSelection = [0];
//           setSelectedThird([]);
//           setThirdCategories(uniqueThirdByName(Object.values(thirdBySecond).flat()));
//           onFilterChange([], []);
//         }
//       } else {
//         const alreadySelected = prev.includes(id);
//         const totalCount = prev.length + selectedThird.length;

//         // 새로운 2차 선택 상태 계산
//         if (alreadySelected) newSelection = prev.filter(v => v !== id);
//         else if (totalCount < MAX_TOTAL) newSelection = [...prev.filter(v => v !== 0), id];
//         else { alert(`카테고리는 최대 ${MAX_TOTAL}개까지 선택 가능합니다.`); return prev; }

//         let filteredThird: ThirdCate[] = [];
//         if (newSelection.length === 0) filteredThird = Object.values(thirdBySecond).flat();
//         else filteredThird = newSelection.map(i => thirdBySecond[i] || []).flat();
//         setThirdCategories(uniqueThirdByName(filteredThird));

//         // 선택된 2차에 속한 3차만 유지
//         onFilterChange(newSelection, selectedThird.map(t => t.id));
//       }

//       return newSelection;
//     });
//   };

//   // 3차 선택
//   const handleThirdChange = (item: ThirdCate) => {

//     setSelectedThird(prev => {
//       const alreadySelected = prev.some(v => v.id === item.id);
//       const totalCount = selectedSecond.length + prev.length;
//       let newThird: ThirdCate[];
//       if (alreadySelected) newThird = prev.filter(v => v.id !== item.id);
//       else if (totalCount < MAX_TOTAL) newThird = [...prev, item];
//       else { alert(`카테고리는 최대 ${MAX_TOTAL}개까지 선택 가능합니다.`); return prev; }

//       onFilterChange(selectedSecond.includes(0) ? [] : selectedSecond, newThird.map(t => t.id));
//       return newThird;
//     });
//   };


//   // 2차 이름 조회
//   const getSecondName = (id: number) => secondCategories.find(s => s.id === id)?.name || '';

//   return (
//     <S.Wrapper>
//       <S.Header>카테고리별</S.Header>
//       <S.Columns>

//         <S.Column hasDivider>
//           <S.ColumnHeader>2차 카테고리</S.ColumnHeader>
//           {secondCategories.map(item => (
//             <S.CheckboxLabel key={item.id}>
//               <input
//                 type="checkbox"
//                 checked={selectedSecond.includes(item.id)}
//                 onChange={() => handleSecondChange(item.id)}
//               />
//               {item.name}
//             </S.CheckboxLabel>
//           ))}
//         </S.Column>

//         <S.Column>
//           <S.ColumnHeader>3차 카테고리</S.ColumnHeader>
//           {thirdCategories.map(item => (
//             <S.CheckboxLabel key={item.id}>
//               <input
//                 type="checkbox"
//                 checked={selectedThird.some(v => v.id === item.id)}
//                 onChange={() => handleThirdChange(item)}
//                 disabled={selectedSecond.length === 0}
//               />
//               {item.name}
//             </S.CheckboxLabel>
//           ))}
//         </S.Column>

//       </S.Columns>

//       <S.SelectedWrapper>
//         선택된 카테고리(최대 {MAX_TOTAL}개):
//         {selectedSecond.map(id => (
//           <S.SelectedItem key={`second-${id}`}>
//             {getSecondName(id)}
//             <S.RemoveButton onClick={() => handleSecondChange(id)}>×</S.RemoveButton>
//           </S.SelectedItem>
//         ))}
//         {selectedThird.map(item => (
//           <S.SelectedItem key={`third-${item.id}`}>
//             {item.name}
//             <S.RemoveButton onClick={() => handleThirdChange(item)}>×</S.RemoveButton>
//           </S.SelectedItem>
//         ))}
//       </S.SelectedWrapper>
//     </S.Wrapper>
//   );
// };

// export default CategorySelect;