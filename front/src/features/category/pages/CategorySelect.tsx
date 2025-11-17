import { useEffect, useState } from 'react';
import * as S from './CategorySelect.styles';
import axios from 'axios';

const MAX_TOTAL = 5; // 2차 + 3차 합계 제한

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
}

const CategorySelect: React.FC<CategorySelectProps> = ({ firstCateId }) => {
  const [secondCategories, setSecondCategories] = useState<SecondCate[]>([]);
  const [thirdCategories, setThirdCategories] = useState<ThirdCate[]>([]);
  const [thirdBySecond, setThirdBySecond] = useState<Record<number, ThirdCate[]>>({});

  const [selectedSecond, setSelectedSecond] = useState<number[]>([]);
  const [selectedThird, setSelectedThird] = useState<ThirdCate[]>([]);

  // 🟢 중복 제거 함수 (이름 기준)
  const uniqueThirdByName = (arr: ThirdCate[]) => {
    const map = new Map<string, ThirdCate>();
    arr.forEach(item => {
      if (!map.has(item.name)) map.set(item.name, item);
    });
    return Array.from(map.values());
  };

  // 1️⃣ 2차 카테고리 로드
  useEffect(() => {
    const id = Number(firstCateId);
    if (isNaN(id)) return;

    axios
      .get<SecondCate[]>(`/api/user/categories/second/${id}`)
      .then((res) => {
        // 전체 제거
        const seconds = [...res.data];
        setSecondCategories(seconds);

        const secondIds = res.data.map(s => s.id);
        if (secondIds.length > 0) {
          axios
            .post<Record<number, ThirdCate[]>>('/api/user/categories/third/by-second', secondIds)
            .then((res) => {
              setThirdBySecond(res.data);

              // 전체 제거
              const allThirds = Object.values(res.data).flat();
              setThirdCategories(uniqueThirdByName(allThirds));
            })
            .catch(console.error);
        }
      })
      .catch(console.error);
  }, [firstCateId]);

  // 🔥 firstCateId 변경 시 선택값 초기화
  useEffect(() => {
    setSelectedSecond([]);
    setSelectedThird([]);
  }, [firstCateId]);

  // 2차 선택
  const handleSecondChange = (id: number) => {
    setSelectedSecond(prev => {
      const alreadySelected = prev.includes(id);
      const totalCount = prev.length + selectedThird.length;

      if (alreadySelected) {
        return prev.filter(v => v !== id);
      } else if (totalCount < MAX_TOTAL) {
        return [...prev, id];
      } else {
        alert(`카테고리는 최대 ${MAX_TOTAL}개까지 선택 가능합니다.`);
        return prev;
      }
    });
  };

  // 3차 선택
  const handleThirdChange = (item: ThirdCate) => {
    setSelectedThird(prev => {
      const alreadySelected = prev.some(v => v.id === item.id);
      const totalCount = selectedSecond.length + prev.length;

      if (alreadySelected) {
        return prev.filter(v => v.id !== item.id);
      } else if (totalCount < MAX_TOTAL) {
        return [...prev, item];
      } else {
        alert(`카테고리는 최대 ${MAX_TOTAL}개까지 선택 가능합니다.`);
        return prev;
      }
    });
  };

  // 이름 가져오기
  const getSecondName = (id: number) => secondCategories.find(s => s.id === id)?.name || '';

  return (
    <S.Wrapper>
      <S.Header>카테고리별</S.Header>
      <S.Columns>

        {/* 2차 영역 */}
        <S.Column hasDivider>
          <S.ColumnHeader>2차 카테고리</S.ColumnHeader>
          {secondCategories.map(item => (
            <S.CheckboxLabel key={item.id}>
              <input
                type="checkbox"
                checked={selectedSecond.includes(item.id)}
                onChange={() => handleSecondChange(item.id)}
              />
              {item.name}
            </S.CheckboxLabel>
          ))}
        </S.Column>

        {/* 3차 영역 */}
        <S.Column>
          <S.ColumnHeader>3차 카테고리</S.ColumnHeader>
          {thirdCategories.map(item => (
            <S.CheckboxLabel key={item.id}>
              <input
                type="checkbox"
                checked={selectedThird.some(v => v.id === item.id)}
                onChange={() => handleThirdChange(item)}
              />
              {item.name}
            </S.CheckboxLabel>
          ))}
        </S.Column>

      </S.Columns>

      {/* 선택된 목록 */}
      <S.SelectedWrapper>
        선택된 카테고리(최대 {MAX_TOTAL}개):
        {/* 선택된 2차 */}
        {selectedSecond.map(id => (
          <S.SelectedItem key={`second-${id}`}>
            {getSecondName(id)}
            <S.RemoveButton
              onClick={() =>
                setSelectedSecond(selectedSecond.filter(v => v !== id))
              }
            >
              ×
            </S.RemoveButton>
          </S.SelectedItem>
        ))}

        {/* 선택된 3차 */}
        {selectedThird.map(item => (
          <S.SelectedItem key={`third-${item.id}`}>
            {item.name}
            <S.RemoveButton
              onClick={() =>
                setSelectedThird(selectedThird.filter(v => v.id !== item.id))
              }
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




// import { useEffect, useState } from 'react';
// import * as S from './CategorySelect.styles';
// import axios from 'axios';

// const MAX_SECOND = 5;
// const MAX_THIRD = 10;

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
// }

// const CategorySelect: React.FC<CategorySelectProps> = ({ firstCateId }) => {
//   const [secondCategories, setSecondCategories] = useState<SecondCate[]>([]);
//   const [thirdCategories, setThirdCategories] = useState<ThirdCate[]>([]);
//   const [thirdBySecond, setThirdBySecond] = useState<Record<number, ThirdCate[]>>({});

//   const [selectedSecond, setSelectedSecond] = useState<number[]>([]);
//   const [selectedThird, setSelectedThird] = useState<number[]>([]);

//   // 🟢 이름 기준 중복 제거 함수
//   const uniqueThirdByName = (arr: ThirdCate[]) => {
//     const map = new Map<string, ThirdCate>();
//     arr.forEach(item => {
//       if (!map.has(item.name)) map.set(item.name, item);
//     });
//     return Array.from(map.values());
//   };

//   // 1️⃣ 2차 카테고리 불러오기
//   useEffect(() => {
//     const id = Number(firstCateId);
//     if (isNaN(id)) return;

//     axios
//       .get<SecondCate[]>(`/api/user/categories/second/${id}`)
//       .then((res) => {
//         const seconds = [{ id: 0, name: '전체' }, ...res.data];
//         setSecondCategories(seconds);

//         // 2️⃣ 2차 ID 배열로 3차 카테고리 불러오기
//         const secondIds = res.data.map(s => s.id);
//         if (secondIds.length > 0) {
//           axios
//             .post<Record<number, ThirdCate[]>>('/api/user/categories/third/by-second', secondIds)
//             .then((res) => {
//               setThirdBySecond(res.data);

//               // 초기 3차 카테고리 세팅 (전체 선택 시 2차 전체 기준)
//               const allThirds = Object.values(res.data).flat();
//               setThirdCategories(uniqueThirdByName(allThirds));
//             })
//             .catch(console.error);
//         }
//       })
//       .catch(console.error);
//   }, [firstCateId]);

//   // 2차 선택 시 3차 필터링
//   useEffect(() => {
//     let filtered: ThirdCate[] = [];

//     if (selectedThird.includes(0) || selectedSecond.includes(0) || selectedSecond.length === 0) {
//       // 3차 전체 선택 OR 2차 전체 OR 아무것도 선택 안됨
//       const allThirds = Object.values(thirdBySecond).flat();
//       filtered = [{ id: 0, name: '전체', secondId: 0 }, ...uniqueThirdByName(allThirds)];
//     } else {
//       // 선택된 2차만
//       const selectedThirds = selectedSecond
//         .filter(id => id !== 0)
//         .map(id => thirdBySecond[id] || [])
//         .flat();
//       filtered = [{ id: 0, name: '전체', secondId: 0 }, ...uniqueThirdByName(selectedThirds)];
//     }

//     setThirdCategories(filtered);
//   }, [selectedSecond, thirdBySecond, selectedThird]);

//   // 2차 선택
//   const handleSecondChange = (id: number) => {
//     if (id === 0) {
//       setSelectedSecond([0]);
//       setSelectedThird([]);
//       return;
//     }

//     setSelectedSecond(prev => {
//       const newSelection = prev.includes(id)
//         ? prev.filter(v => v !== id)
//         : prev.length < MAX_SECOND
//           ? [...prev.filter(v => v !== 0), id]
//           : prev;
//       return newSelection;
//     });
//   };

//   // 3차 선택
//   const handleThirdChange = (id: number) => {
//     setSelectedThird(prev =>
//       prev.includes(id)
//         ? prev.filter(v => v !== id)
//         : prev.length < MAX_THIRD
//           ? [...prev, id]
//           : prev
//     );
//   };

//   const getSecondName = (id: number) => secondCategories.find(s => s.id === id)?.name || '';
//   const getThirdName = (id: number) => thirdCategories.find(t => t.id === id)?.name || '';

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
//                 checked={selectedThird.includes(item.id)}
//                 onChange={() => handleThirdChange(item.id)}
//               />
//               {item.name}
//             </S.CheckboxLabel>
//           ))}
//         </S.Column>
//       </S.Columns>

//       <S.SelectedWrapper>
//         선택된 카테고리(최대 5개):
//         {selectedSecond.concat(selectedThird).map(id => (
//           <S.SelectedItem key={id}>
//             {getSecondName(id) || getThirdName(id)}
//             <S.RemoveButton
//               onClick={() => {
//                 if (selectedSecond.includes(id))
//                   setSelectedSecond(selectedSecond.filter(v => v !== id));
//                 else setSelectedThird(selectedThird.filter(v => v !== id));
//               }}
//             >
//               ×
//             </S.RemoveButton>
//           </S.SelectedItem>
//         ))}
//       </S.SelectedWrapper>
//     </S.Wrapper>
//   );
// };

// export default CategorySelect;


// import { useEffect, useState } from 'react';
// import * as S from './CategorySelect.styles';
// import axios from 'axios';

// const MAX_SECOND = 5;
// const MAX_THIRD = 10;

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
// }

// const CategorySelect: React.FC<CategorySelectProps> = ({ firstCateId }) => {
//   const [secondCategories, setSecondCategories] = useState<SecondCate[]>([]);
//   const [thirdCategories, setThirdCategories] = useState<ThirdCate[]>([]);
//   const [thirdBySecond, setThirdBySecond] = useState<Record<number, ThirdCate[]>>({});

//   const [selectedSecond, setSelectedSecond] = useState<number[]>([]);
//   const [selectedThird, setSelectedThird] = useState<number[]>([]);

//   // 1️⃣ 2차 카테고리 불러오기
//   useEffect(() => {
//     const id = Number(firstCateId);
//     if (isNaN(id)) return;

//     axios
//       .get<SecondCate[]>(`/api/user/categories/second/${id}`)
//       .then((res) => {
//         const seconds = [{ id: 0, name: '전체' }, ...res.data];
//         setSecondCategories(seconds);

//         // 2️⃣ 2차 ID 배열로 3차 카테고리 불러오기
//         const secondIds = res.data.map(s => s.id);
//         if (secondIds.length > 0) {
//           axios
//             .post<Record<number, ThirdCate[]>>('/api/user/categories/third/by-second', secondIds)
//             .then((res) => {
//               setThirdBySecond(res.data);

//               // 초기 3차 카테고리 세팅 (전체 선택 시 2차 전체 기준)
//               const allThirds = Object.values(res.data).flat();

//               // 중복 제거 (id 기준)
//               const uniqueThird = Array.from(new Map(allThirds.map(t => [t.id, t])).values());
//               setThirdCategories(uniqueThird);
//             })
//             .catch(console.error);
//         }
//       })
//       .catch(console.error);
//   }, [firstCateId]);

//   // 2차 선택 시 3차 필터링
// useEffect(() => {
//   if (selectedSecond.length === 0 || selectedSecond.includes(0)) {
//     // 전체 선택 시: 2차별 첫 번째 3차만 보여주거나, id 기준 고유하게 보여주기
//     const allThirds = Object.values(thirdBySecond).flat();
//     const uniqueThirds = Array.from(new Map(allThirds.map(t => [t.id, t])).values());
//     setThirdCategories(uniqueThirds);
//   } else {
//     // 선택된 2차에 속한 3차만
//     const selectedThirds = selectedSecond
//       .filter(id => id !== 0)
//       .map(id => thirdBySecond[id] || [])
//       .flat();
//     // id 기준 고유하게
//     const uniqueThirds = Array.from(new Map(selectedThirds.map(t => [t.id, t])).values());
//     setThirdCategories(uniqueThirds);
//   }
// }, [selectedSecond, thirdBySecond]);

//   // 2차 선택
//   const handleSecondChange = (id: number) => {
//     if (id === 0) {
//       setSelectedSecond([0]);
//       setSelectedThird([]);
//       return;
//     }

//     setSelectedSecond(prev => {
//       const newSelection = prev.includes(id)
//         ? prev.filter(v => v !== id)
//         : prev.length < MAX_SECOND
//         ? [...prev.filter(v => v !== 0), id]
//         : prev;
//       return newSelection;
//     });
//   };

//   // 3차 선택
//   const handleThirdChange = (id: number) => {
//     setSelectedThird(prev =>
//       prev.includes(id)
//         ? prev.filter(v => v !== id)
//         : prev.length < MAX_THIRD
//         ? [...prev, id]
//         : prev
//     );
//   };

//   const getSecondName = (id: number) => secondCategories.find(s => s.id === id)?.name || '';
//   const getThirdName = (id: number) => thirdCategories.find(t => t.id === id)?.name || '';

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
//                 checked={selectedThird.includes(item.id)}
//                 onChange={() => handleThirdChange(item.id)}
//               />
//               {item.name}
//             </S.CheckboxLabel>
//           ))}
//         </S.Column>
//       </S.Columns>

//       <S.SelectedWrapper>
//         선택된 카테고리(최대 5개):
//         {selectedSecond.concat(selectedThird).map(id => (
//           <S.SelectedItem key={id}>
//             {getSecondName(id) || getThirdName(id)}
//             <S.RemoveButton
//               onClick={() => {
//                 if (selectedSecond.includes(id))
//                   setSelectedSecond(selectedSecond.filter(v => v !== id));
//                 else setSelectedThird(selectedThird.filter(v => v !== id));
//               }}
//             >
//               ×
//             </S.RemoveButton>
//           </S.SelectedItem>
//         ))}
//       </S.SelectedWrapper>
//     </S.Wrapper>
//   );
// };

// export default CategorySelect;



// // CategorySelect.tsx
// import { useEffect, useState } from 'react';
// import * as S from './CategorySelect.styles';
// import axios from 'axios';

// const MAX_SECOND = 5;
// const MAX_THIRD = 10;

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
// }

// const CategorySelect: React.FC<CategorySelectProps> = ({ firstCateId }) => {
//   // 사용자는 1차 카테고리를 선택하지 않지만, 페이지별로 내부적으로 세팅됨
//   // const { firstCateId } = useParams<{ firstCateId: string }>();
//   console.log("firstCateId:", firstCateId); // undefined 나올 경우 라우트 경로 확인

//   // const firstIdNum = Number(firstCateId);

//   const [secondCategories, setSecondCategories] = useState<SecondCate[]>([]);
//   const [thirdCategories, setThirdCategories] = useState<ThirdCate[]>([]);
//   const [allThirdCategories, setAllThirdCategories] = useState<ThirdCate[]>([]); // 전체 3차 저장용

//   const [selectedSecond, setSelectedSecond] = useState<number[]>([]);
//   const [selectedThird, setSelectedThird] = useState<number[]>([]);

//   // 1️⃣ 페이지 로드시 2차 카테고리 불러오기
//   useEffect(() => {
//     const id = Number(firstCateId);
//     if (isNaN(id)) return; // NaN이면 호출 안함

//     axios
//       .get(`/api/user/categories/second/${id}`)
//       .then((res) => setSecondCategories([{ id: 0, name: "전체" }, ...res.data]))
//       .catch((err) => console.error(err));
//   }, [firstCateId]);

//   console.log("firstCateId:", firstCateId)
//   console.log("2차 카테고리:", secondCategories);

//   // 0️⃣ 페이지 로드시 전체 3차 카테고리 불러오기 (중복 제거)
//   useEffect(() => {
//     axios
//       .get<ThirdCate[]>(`/api/user/categories/third/all`)
//       .then((res) => {
//         console.log("전체 3차 카테고리:", res.data);
//         const uniqueThird = Array.from(new Map(res.data.map(t => [t.id, t])).values());
//         setThirdCategories(uniqueThird); // 초기 화면용
//         setAllThirdCategories(uniqueThird); // 나중에 필터링용
//       })
//       .catch(console.error);
//   }, []);

//   // 2️⃣ 2차 선택 시 3차 카테고리 불러오기
//   useEffect(() => {
//     if (selectedSecond.length === 0 || selectedSecond.includes(0)) {
//       // 전체 선택 시 전체 3차 보여주기
//       setThirdCategories(allThirdCategories);
//       return;
//     }

//     // 선택된 2차에 속하는 3차만 필터링
//     const filtered = allThirdCategories.filter((t) =>
//       selectedSecond.includes(t.secondId)
//     );
//     setThirdCategories(filtered);
//   }, [selectedSecond, allThirdCategories]);

//   //   Promise.all(
//   //     selectedSecond.map((secondId) =>
//   //       axios.get(`/api/user/categories/third/${secondId}`)
//   //     )
//   //   )
//   //     .then((responses) => {
//   //       const merged = responses.flatMap((r) => r.data);
//   //       setThirdCategories(merged);
//   //     })
//   //     .catch((err) => console.error(err));
//   // }, [selectedSecond]);
//   // console.log("3차 카테고리:", thirdCategories);


//   const handleSecondChange = (id: number) => {
//     if (id === 0) {
//       setSelectedSecond([0]);
//       setSelectedThird([]);
//       return;
//     }

//     setSelectedSecond((prev) => {
//       const newSelection = prev.includes(id)
//         ? prev.filter((v) => v !== id)
//         : prev.length < MAX_SECOND
//           ? [...prev.filter((v) => v !== 0), id]
//           : prev;
//       return newSelection;
//     });
//   };


//   const handleThirdChange = (id: number) => {
//     setSelectedThird((prev) =>
//       prev.includes(id)
//         ? prev.filter((v) => v !== id)
//         : prev.length < MAX_THIRD
//           ? [...prev, id]
//           : prev
//     );
//   };

//   const getSecondName = (id: number) =>
//     secondCategories.find((s) => s.id === id)?.name || '';

//   const getThirdName = (id: number) =>
//     thirdCategories.find((t) => t.id === id)?.name || '';

//   return (
//     <S.Wrapper>
//       <S.Header>카테고리별</S.Header>
//       <S.Columns>
//         {/* 2차 카테고리 */}
//         <S.Column hasDivider>
//           <S.ColumnHeader>2차 카테고리</S.ColumnHeader>
//           {secondCategories.map((item) => (
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

//         {/* 3차 카테고리 */}
//         <S.Column>
//           <S.ColumnHeader>3차 카테고리</S.ColumnHeader>
//           {thirdCategories.map((item) => (
//             <S.CheckboxLabel key={item.id}>
//               <input
//                 type="checkbox"
//                 checked={selectedThird.includes(item.id)}
//                 onChange={() => handleThirdChange(item.id)}
//               />
//               {item.name}
//             </S.CheckboxLabel>
//           ))}
//         </S.Column>
//       </S.Columns>

//       {/* 선택된 목록 */}
//       <S.SelectedWrapper>
//         선택된 카테고리(최대 5개):
//         {selectedSecond.concat(selectedThird).map((id) => (
//           <S.SelectedItem key={id}>
//             {getSecondName(id) || getThirdName(id)}
//             <S.RemoveButton
//               onClick={() => {
//                 if (selectedSecond.includes(id))
//                   setSelectedSecond(selectedSecond.filter((v) => v !== id));
//                 else setSelectedThird(selectedThird.filter((v) => v !== id));
//               }}
//             >
//               ×
//             </S.RemoveButton>
//           </S.SelectedItem>
//         ))}
//       </S.SelectedWrapper>

//       {/* <CategoryBoard /> */}
//     </S.Wrapper>
//   );
// };

// export default CategorySelect;




// 3차 카테고리까진 나오는데 모~든게 나옴
// CategorySelect.tsx
// import { useEffect, useState } from 'react';
// import * as S from './CategorySelect.styles';
// import axios from 'axios';

// const MAX_SECOND = 5;
// const MAX_THIRD = 10;

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
// }

// const CategorySelect: React.FC<CategorySelectProps> = ({ firstCateId }) => {
//   const [secondCategories, setSecondCategories] = useState<SecondCate[]>([]);
//   const [thirdCategories, setThirdCategories] = useState<ThirdCate[]>([]);
//   const [allThirdCategories, setAllThirdCategories] = useState<ThirdCate[]>([]); // 전체 3차 저장용

//   const [selectedSecond, setSelectedSecond] = useState<number[]>([]);
//   const [selectedThird, setSelectedThird] = useState<number[]>([]);

//   // 1️⃣ 페이지 로드시 2차 카테고리 불러오기
//   useEffect(() => {
//     const id = Number(firstCateId);
//     if (isNaN(id)) return;

//     axios
//       .get(`/api/user/categories/second/${id}`)
//       .then((res) => setSecondCategories([{ id: 0, name: '전체' }, ...res.data]))
//       .catch(console.error);
//   }, [firstCateId]);

//   // 페이지 로드시 전체 3차 카테고리 불러오기
//   // 3차 카테고리까진 나오는데 모~든게 나옴
//   // useEffect(() => {
//   //   axios
//   //     .get<ThirdCate[]>(`/api/user/categories/third/all`)
//   //     .then((res) => {
//   //       console.log('전체 3차 카테고리:', res.data);
//   //       // id 기준 중복 제거
//   //       const uniqueThird = Array.from(new Map(res.data.map((t) => [t.id, t])).values());
//   //       setThirdCategories(uniqueThird); // 초기 화면용
//   //       setAllThirdCategories(uniqueThird); // 나중 필터용
//   //     })
//   //     .catch(console.error);
//   // }, []);


//   useEffect(() => {
//     axios
//       .get<ThirdCate[]>(`/api/user/categories/third/all`)
//       .then((res) => {
//         const uniqueThird = Array.from(new Map(res.data.map((t) => [t.id, t])).values());
//         setAllThirdCategories(uniqueThird);

//         // 1차 카테고리 기준으로 2차 목록 이미 받아왔다면 그 ID 사용
//         const secondIds = secondCategories
//           .filter(s => s.id !== 0) // 전체 제외
//           .map(s => s.id);

//         const filteredByFirst = uniqueThird.filter(t => secondIds.includes(t.secondId));
//         setThirdCategories(filteredByFirst);
//       })
//       .catch(console.error);
//   }, [secondCategories]); // secondCategories가 세팅되면 실행



//   // 2차 선택 시 3차 카테고리 필터링
//   // 3차 카테고리까진 나오는데 모~든게 나옴
//   // useEffect(() => {
//   //   if (selectedSecond.length === 0 || selectedSecond.includes(0)) {
//   //     // 전체 선택 시 전체 3차 보여주기
//   //     setThirdCategories(allThirdCategories);
//   //   } else {
//   //     // 선택된 2차에 속한 3차만 필터링
//   //     const filtered = allThirdCategories.filter((t) => selectedSecond.includes(t.secondId));
//   //     setThirdCategories(filtered);
//   //   }
//   // }, [selectedSecond, allThirdCategories]);


//   // useEffect(() => {
//   //   if (selectedSecond.length === 0 || selectedSecond.includes(0)) {
//   //     // 전체 선택 시 1차 기준 필터링
//   //     const secondIds = secondCategories.filter(s => s.id !== 0).map(s => s.id);
//   //     setThirdCategories(allThirdCategories.filter(t => secondIds.includes(t.secondId)));
//   //   } else {
//   //     // 선택된 2차에 속한 3차만 필터링
//   //     const filtered = allThirdCategories.filter((t) => selectedSecond.includes(t.secondId));
//   //     setThirdCategories(filtered);
//   //   }
//   // }, [selectedSecond, allThirdCategories, secondCategories]);



//   useEffect(() => {
//   let filtered: ThirdCate[] = [];

//   if (selectedSecond.length === 0 || selectedSecond.includes(0)) {
//     // 전체 선택 시 1차 기준 필터링
//     const secondIds = secondCategories.filter(s => s.id !== 0).map(s => s.id);
//     filtered = allThirdCategories.filter(t => secondIds.includes(t.secondId));
//   } else {
//     // 선택된 2차에 속한 3차만 필터링
//     filtered = allThirdCategories.filter(t => selectedSecond.includes(t.secondId));
//   }

//   // id 기준 중복 제거
//   const uniqueThird = Array.from(new Map(filtered.map(t => [t.id, t])).values());

//   setThirdCategories(uniqueThird);
// }, [selectedSecond, allThirdCategories, secondCategories]);



//   // 2차 선택
//   const handleSecondChange = (id: number) => {
//     if (id === 0) {
//       setSelectedSecond([0]);
//       setSelectedThird([]);
//       return;
//     }

//     setSelectedSecond((prev) => {
//       const newSelection = prev.includes(id)
//         ? prev.filter((v) => v !== id)
//         : prev.length < MAX_SECOND
//           ? [...prev.filter((v) => v !== 0), id]
//           : prev;
//       return newSelection;
//     });
//   };

//   // 3차 선택
//   const handleThirdChange = (id: number) => {
//     setSelectedThird((prev) =>
//       prev.includes(id)
//         ? prev.filter((v) => v !== id)
//         : prev.length < MAX_THIRD
//           ? [...prev, id]
//           : prev
//     );
//   };

//   const getSecondName = (id: number) => secondCategories.find((s) => s.id === id)?.name || '';
//   const getThirdName = (id: number) => thirdCategories.find((t) => t.id === id)?.name || '';

//   return (
//     <S.Wrapper>
//       <S.Header>카테고리별</S.Header>
//       <S.Columns>
//         {/* 2차 카테고리 */}
//         <S.Column hasDivider>
//           <S.ColumnHeader>2차 카테고리</S.ColumnHeader>
//           {secondCategories.map((item) => (
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

//         {/* 3차 카테고리 */}
//         <S.Column>
//           <S.ColumnHeader>3차 카테고리</S.ColumnHeader>
//           {thirdCategories.map((item) => (
//             <S.CheckboxLabel key={item.id}>
//               <input
//                 type="checkbox"
//                 checked={selectedThird.includes(item.id)}
//                 onChange={() => handleThirdChange(item.id)}
//               />
//               {item.name}
//             </S.CheckboxLabel>
//           ))}
//         </S.Column>
//       </S.Columns>

//       {/* 선택된 목록 */}
//       <S.SelectedWrapper>
//         선택된 카테고리(최대 5개):
//         {selectedSecond.concat(selectedThird).map((id) => (
//           <S.SelectedItem key={id}>
//             {getSecondName(id) || getThirdName(id)}
//             <S.RemoveButton
//               onClick={() => {
//                 if (selectedSecond.includes(id))
//                   setSelectedSecond(selectedSecond.filter((v) => v !== id));
//                 else setSelectedThird(selectedThird.filter((v) => v !== id));
//               }}
//             >
//               ×
//             </S.RemoveButton>
//           </S.SelectedItem>
//         ))}
//       </S.SelectedWrapper>
//     </S.Wrapper>
//   );
// };

// export default CategorySelect;






