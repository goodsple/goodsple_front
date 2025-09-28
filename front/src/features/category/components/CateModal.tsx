import * as S from '../../admin/auth/components/SearchControlsStyle.ts';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createSecCategory, createThiCategory, fetchAllSecCate, fetchAllThiCate, fetchSecCate } from '../../../api/category/categoryAPICalls.ts';
import type { AppDispatch } from '../../../store/Store.ts';

interface CateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CateModal({ isOpen, onClose }: CateModalProps) {
  if (!isOpen) return null;

  const dispatch = useDispatch<AppDispatch>();

  // ✅ Redux 전체 카테고리 상태 사용
  const allSecondCates = useSelector((state: any) => state.category.allSecCate);
  const allThirdCates = useSelector((state: any) => state.category.allThiCate);

  const [firstCate, setFirstCate] = useState(0);
  const [secondCate, setSecondCate] = useState(0);
  const [thirdCate, setThirdCate] = useState(0);

  const [newSecondCate, setNewSecondCate] = useState('');
  const [newThirdCate, setNewThirdCate] = useState('');
  const [subText, setSubText] = useState('');

  // 1차 선택 시 2차/3차 카테고리 fetch
  useEffect(() => {
    if (firstCate > 0) {
      dispatch(fetchSecCate(firstCate)); // 2차 카테고리 fetch
      setSecondCate(0);
      setThirdCate(0);
    }
  }, [firstCate]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstCate) return alert('1차 카테고리를 선택해주세요');
    if (secondCate === 0 && !newSecondCate) return alert('2차 카테고리를 입력해주세요');
    if (thirdCate === 0 && !newThirdCate) return alert('3차 카테고리를 입력해주세요');

    try {
      let finalSecondCateId = secondCate;

      if (secondCate === -1) {
        const payload = { cateName: newSecondCate, firstCateId: firstCate };
        const res: any = await dispatch(createSecCategory(payload) as any).unwrap();

        if (!res.secondCateId) {
          return alert('2차 카테고리 등록 실패: 서버에서 ID를 반환하지 않음');
        }

        finalSecondCateId = res.secondCateId;
      }

      const thirdPayload = {
        secondCateId: finalSecondCateId,
        cateName: newThirdCate,
        subText,
      };

      await dispatch(createThiCategory(thirdPayload) as any).unwrap();

      // ✅ 등록 후 Redux 상태 바로 갱신
      await dispatch(fetchAllSecCate() as any).unwrap();
      await dispatch(fetchAllThiCate() as any).unwrap();

      alert('카테고리가 등록되었습니다.');
      resetForm();
      onClose();
    } catch (error: any) {
      console.error(error);
      alert(`저장 실패: ${error.response?.data?.message || '알 수 없는 오류'}`);
    }
  };

  const resetForm = () => {
    setFirstCate(0);
    setSecondCate(0);
    setThirdCate(0);
    setNewSecondCate('');
    setNewThirdCate('');
    setSubText('');
  };

  return (
    <S.ModalBackground>
      <S.Modal onSubmit={handleSave}>
        <p>카테고리 등록</p>

        {/* 1차 */}
        <S.ModalRow>
          <p>1차 카테고리</p>
          <select value={firstCate} onChange={e => setFirstCate(Number(e.target.value))}>
            <option value={0}>선택</option>
            <option value={1}>K-pop</option>
            <option value={2}>영화/드라마</option>
            <option value={3}>애니메이션</option>
            <option value={4}>게임</option>
          </select>
        </S.ModalRow>

        {/* 2차 */}
        <S.ModalRow>
          <p>2차 카테고리</p>
          <select value={secondCate} onChange={e => setSecondCate(Number(e.target.value))}>
            <option value={0}>선택</option>
            <option value={-1}>★2차 등록</option>
            {allSecondCates
              .filter((c: any) => c.firstCateId === firstCate) // 선택한 1차에 맞는 2차만 표시
              .map((c: any) => (
                <option key={c.secondCateId} value={c.secondCateId}>{c.cateName}</option>
              ))}
          </select>
          {secondCate === -1 && (
            <input type="text" value={newSecondCate} onChange={e => setNewSecondCate(e.target.value)} placeholder="새 2차 카테고리 입력" />
          )}
        </S.ModalRow>

        {/* 3차 */}
        <S.ModalRow>
          <p>3차 카테고리</p>
          <select value={thirdCate} onChange={e => setThirdCate(Number(e.target.value))}>
            <option value={0}>선택</option>
            <option value={-1}>★3차 등록</option>
            {allThirdCates
              .filter((c: any) => {
                const secondMatch = allSecondCates.find((s: any) => s.secondCateId === c.secondCateId);
                return secondMatch?.firstCateId === firstCate; // 1차 선택 필터링
              })
              .map((tc: any) => (
                <option key={tc.thirdCateId} value={tc.thirdCateId}>{tc.cateName}</option>
              ))}
          </select>
          {thirdCate === -1 && (
            <input type="text" value={newThirdCate} onChange={e => setNewThirdCate(e.target.value)} placeholder="새 3차 카테고리 입력" />
          )}
        </S.ModalRow>

        {/* 서브 텍스트 */}
        <S.ModalRow>
          <p>서브 텍스트</p>
          <input type="text" value={subText} onChange={e => setSubText(e.target.value)} placeholder="서브 텍스트 입력" />
        </S.ModalRow>

        {/* 버튼 */}
        <S.ModalRow2>
          <button type="submit">저장하기</button>
          <button type="button" onClick={() => { resetForm(); onClose(); }}>취소</button>
        </S.ModalRow2>
      </S.Modal>
    </S.ModalBackground>
  );
}

export default CateModal;



// 파일 미업로드용 - 2차,3차 등록하면 목록에 안뜸 / 기존거 참고해서 등록하면 등록됨
// import * as S from '../../admin/auth/components/SearchControlsStyle.ts';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
// import { createSecCategory, createThiCategory, fetchAllSecCate, fetchAllThiCate, fetchSecCate } from '../../../api/category/categoryAPICalls.ts';
// import type { AppDispatch } from '../../../store/Store.ts';
// import axios from 'axios';

// interface CateModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// function CateModal({ isOpen, onClose }: CateModalProps) {
//   if (!isOpen) return null;

//   const dispatch = useDispatch<AppDispatch>();
//   const secondCates = useSelector((state: any) => state.category.secondCate);

//   const [firstCate, setFirstCate] = useState(0);
//   const [secondCate, setSecondCate] = useState(0);
//   const [thirdCate, setThirdCate] = useState(0);

//   const [newSecondCate, setNewSecondCate] = useState('');
//   const [newThirdCate, setNewThirdCate] = useState('');
//   const [subText, setSubText] = useState('');

//   // --- 3차 카테고리 상태 추가 ---
//   const [thirdCatesList, setThirdCatesList] = useState<any[]>([]);

//   // 1차 선택 시 2차/3차 카테고리 fetch
//   useEffect(() => {
//     if (firstCate > 0) {
//       // 2차 fetch
//       dispatch(fetchSecCate(firstCate));
//       setSecondCate(0);

//       // 3차 전체 fetch
//       const fetchThirdCates = async () => {
//         try {
//           const token = localStorage.getItem('accessToken');
//           const res = await axios.get(`/api/admin/category/third/all?firstCateId=${firstCate}`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setThirdCatesList(res.data);
//         } catch (err) {
//           console.error('3차 카테고리 조회 실패', err);
//         }
//       };

//       fetchThirdCates();
//       setThirdCate(0);
//     }
//   }, [firstCate]);

//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!firstCate) return alert('1차 카테고리를 선택해주세요');
//     if (secondCate === 0 && !newSecondCate) return alert('2차 카테고리를 입력해주세요');
//     if (thirdCate === 0 && !newThirdCate) return alert('3차 카테고리를 입력해주세요');

//     try {
//       if (secondCate === 0 || secondCate === -1) {
//         // 2차 카테고리 등록
//         await dispatch(createSecCategory({ cateName: newSecondCate, firstCateId: firstCate }) as any).unwrap();
//       } else {
//         // 3차 카테고리 등록
//         const payload = {
//           secondCateId: secondCate,
//           cateName: newThirdCate,
//           subText: subText,
//         };
//         await dispatch(createThiCategory(payload) as any).unwrap();
//       }

//       alert('카테고리가 등록되었습니다.');
//       resetForm();
//       onClose();

//       // --- 등록 후 목록 갱신 ---
//       await dispatch(fetchAllSecCate() as any).unwrap();
//       await dispatch(fetchAllThiCate() as any).unwrap();

//     } catch (error: any) {
//       console.error(error);
//       alert(`저장 실패: ${error.response?.data?.message || '알 수 없는 오류'}`);
//     }
//   };


//   const resetForm = () => {
//     setFirstCate(0);
//     setSecondCate(0);
//     setThirdCate(0);
//     setNewSecondCate('');
//     setNewThirdCate('');
//     setSubText('');
//     // 파일 업로드 관련 주석 처리
//     // setMainImage(null);
//     // setSubImage(null);
//   };

//   return (
//     <S.ModalBackground>
//       <S.Modal onSubmit={handleSave}>
//         <p>카테고리 등록</p>

//         {/* 1차 카테고리 */}
//         <S.ModalRow>
//           <p>1차 카테고리</p>
//           <select value={firstCate} onChange={e => setFirstCate(Number(e.target.value))}>
//             <option value={0}>선택</option>
//             <option value={1}>K-pop</option>
//             <option value={2}>영화/드라마</option>
//             <option value={3}>애니메이션</option>
//             <option value={4}>게임</option>
//           </select>
//         </S.ModalRow>

//         {/* 2차 카테고리 */}
//         <S.ModalRow>
//           <p>2차 카테고리</p>
//           <select value={secondCate} onChange={e => setSecondCate(Number(e.target.value))}>
//             <option value={0}>선택</option>
//             <option value={-1}>★2차 등록</option>
//             {secondCates?.map((c: any) => (
//               <option key={c.secondCateId} value={c.secondCateId}>{c.cateName}</option>
//             ))}
//           </select>
//           {secondCate === -1 && (
//             <input type="text" value={newSecondCate} onChange={e => setNewSecondCate(e.target.value)} placeholder="새 2차 카테고리 입력" />
//           )}
//         </S.ModalRow>

//         {/* 3차 카테고리 */}
//         <S.ModalRow>
//           <p>3차 카테고리</p>
//           <select value={thirdCate} onChange={e => setThirdCate(Number(e.target.value))}>
//             <option value={0}>선택</option>
//             <option value={-1}>★3차 등록</option>
//             {thirdCatesList.map(tc => (
//               <option key={tc.thirdCateId} value={tc.thirdCateId}>
//                 {tc.cateName}
//               </option>
//             ))}
//           </select>
//           {thirdCate === -1 && (
//             <input
//               type="text"
//               value={newThirdCate}
//               onChange={e => setNewThirdCate(e.target.value)}
//               placeholder="새 3차 카테고리 입력"
//             />
//           )}
//         </S.ModalRow>

//         {/* 서브 텍스트 */}
//         <S.ModalRow>
//           <p>서브 텍스트</p>
//           <input type="text" value={subText} onChange={e => setSubText(e.target.value)} placeholder="서브 텍스트 입력" />
//         </S.ModalRow>

//         {/* 버튼 */}
//         <S.ModalRow2>
//           <button type="submit">저장하기</button>
//           <button type="button" onClick={() => { resetForm(); onClose(); }}>취소</button>
//         </S.ModalRow2>
//       </S.Modal>
//     </S.ModalBackground>
//   );
// }

// export default CateModal;








// import * as S from '../../admin/auth/components/SearchControlsStyle.ts';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
// import type { AppDispatch } from '../../../store/Store.ts';
// import axios from 'axios';

// interface CateModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// function CateModal({ isOpen, onClose }: CateModalProps) {
//   if (!isOpen) return null;

//   const dispatch = useDispatch<AppDispatch>();
//   const secondCates = useSelector((state: any) => state.category.secondCate);

//   const [firstCate, setFirstCate] = useState(0);
//   const [secondCate, setSecondCate] = useState(0);
//   const [thirdCate, setThirdCate] = useState(0);

//   const [secondCatesList, setSecondCatesList] = useState<any[]>([]);
//   const [thirdCatesList, setThirdCatesList] = useState<any[]>([]);

//   const [newSecondCate, setNewSecondCate] = useState('');
//   const [newThirdCate, setNewThirdCate] = useState('');
//   const [subText, setSubText] = useState('');

//   const [mainImage, setMainImage] = useState<File | null>(null);
//   const [subImage, setSubImage] = useState<File | null>(null);

//   const getAccessToken = () => localStorage.getItem('accessToken');

//   // --- 2차 카테고리 fetch ---
//   useEffect(() => {
//     if (firstCate > 0) {
//       const token = getAccessToken();
//       axios
//         .get(`/api/admin/category/second/${firstCate}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then(res => {
//           setSecondCatesList(res.data);
//           dispatch({ type: 'category/setSecondCate', payload: res.data });
//         })
//         .catch(err => console.error('2차 카테고리 조회 실패', err));
//     } else {
//       setSecondCatesList([]);
//     }

//     setSecondCate(0);
//     setThirdCate(0);
//     setThirdCatesList([]);
//     setNewSecondCate('');
//     setNewThirdCate('');
//   }, [firstCate]);

//   // --- 3차 카테고리 fetch ---
// useEffect(() => {
//   if (firstCate > 0) {
//     const token = getAccessToken();
//     // firstCate에 해당하는 모든 3차 카테고리 가져오기
//     axios
//       .get(`/api/admin/category/third/all?firstCateId=${firstCate}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then(res => setThirdCatesList(res.data))
//       .catch(err => console.error('3차 카테고리 조회 실패', err));
//   } else {
//     setThirdCatesList([]);
//   }
//   setThirdCate(0);
//   setNewThirdCate('');
// }, [firstCate]);


//   const resetForm = () => {
//     setFirstCate(0);
//     setSecondCate(0);
//     setThirdCate(0);
//     setSecondCatesList([]);
//     setThirdCatesList([]);
//     setNewSecondCate('');
//     setNewThirdCate('');
//     setSubText('');
//     setMainImage(null);
//     setSubImage(null);
//   };

//   const saveCate = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // 2차 새 등록 시 finalSecondCateId = 0, 새 이름은 newSecondCate
//     const finalSecondCateId = secondCate === -1 ? 0 : secondCate;
//     const finalThirdCateName =
//       thirdCate === -1
//         ? newThirdCate
//         : thirdCatesList.find(tc => tc.thirdCateId === thirdCate)?.cateName || newThirdCate;

//     if (!firstCate || (!secondCate && !newSecondCate) || !finalThirdCateName) {
//       alert('1차, 2차, 3차 카테고리를 모두 입력해주세요');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('firstCateId', String(firstCate));
//     formData.append('secondCateId', String(finalSecondCateId));
//     if (secondCate === -1) formData.append('secondCateName', newSecondCate); // 새 2차 이름 추가
//     formData.append('cateName', finalThirdCateName);
//     formData.append('subText', subText);
//     if (mainImage) formData.append('mainImage', mainImage);
//     if (subImage) formData.append('subImage', subImage);

//     try {
//       const token = getAccessToken();
//       await axios.post('/api/admin/category/third', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           // 'Content-Type': 'multipart/form-data',
//         },
//       });
//       alert('카테고리가 등록되었습니다.');
//       resetForm();
//       onClose();
//     } catch (error: any) {
//       console.error('등록 실패', error);
//       alert(`등록 실패: ${error.response?.data?.message || '알 수 없는 오류'}`);
//     }
//   };

//   return (
//     <S.ModalBackground>
//       <S.Modal onSubmit={saveCate}>
//         <p>카테고리 등록</p>

//         {/* 1차 카테고리 */}
//         <S.ModalRow>
//           <p>1차 카테고리</p>
//           <select value={firstCate} onChange={e => setFirstCate(Number(e.target.value))}>
//             <option value={0}>선택</option>
//             <option value={1}>K-pop</option>
//             <option value={2}>영화/드라마</option>
//             <option value={3}>애니메이션</option>
//             <option value={4}>게임</option>
//           </select>
//         </S.ModalRow>

//         {/* 2차 카테고리 */}
//         <S.ModalRow>
//           <p>2차 카테고리</p>
//           <select value={secondCate} onChange={e => setSecondCate(Number(e.target.value))}>
//             <option value={0}>선택</option>
//             {secondCatesList.map(sec => (
//               <option key={sec.secondCateId} value={sec.secondCateId}>
//                 {sec.cateName}
//               </option>
//             ))}
//             <option value={-1}>2차 등록</option>
//           </select>
//           {secondCate === -1 && (
//             <input
//               type="text"
//               value={newSecondCate}
//               onChange={e => setNewSecondCate(e.target.value)}
//               placeholder="새 2차 카테고리 입력"
//             />
//           )}
//         </S.ModalRow>

//         {/* 3차 카테고리 */}
//         <S.ModalRow>
//           <p>3차 카테고리</p>
//           <select value={thirdCate} onChange={e => setThirdCate(Number(e.target.value))}>
//             <option value={0}>선택</option>
//             {thirdCatesList.length > 0
//               ? thirdCatesList.map(tc => (
//                 <option key={tc.thirdCateId} value={tc.thirdCateId}>
//                   {tc.cateName}
//                 </option>
//               ))
//               : secondCate !== -1 && <option disabled>등록된 3차 카테고리가 없습니다.</option>}
//             <option value={-1}>3차 등록</option>
//           </select>
//           {thirdCate === -1 && (
//             <input
//               type="text"
//               value={newThirdCate}
//               onChange={e => setNewThirdCate(e.target.value)}
//               placeholder="새 3차 카테고리 입력"
//             />
//           )}
//         </S.ModalRow>

//         {/* 서브텍스트 */}
//         {(thirdCate || thirdCate === -1) && (
//           <S.ModalRow>
//             <p>서브텍스트</p>
//             <input
//               type="text"
//               value={subText}
//               onChange={e => setSubText(e.target.value)}
//               placeholder="서브텍스트 입력"
//             />
//           </S.ModalRow>
//         )}

//         {/* 메인 이미지 */}
//         <S.ModalRow>
//           <p>메인 이미지</p>
//           <input
//             type="file"
//             id="mainImageUpload"
//             accept="image/*"
//             style={{ display: 'none' }}
//             onChange={e => setMainImage(e.target.files ? e.target.files[0] : null)}
//           />
//           <button type="button" onClick={() => document.getElementById('mainImageUpload')?.click()}>
//             이미지 등록
//           </button>
//           {mainImage && <span style={{ marginLeft: '10px' }}>{mainImage.name}</span>}
//         </S.ModalRow>

//         {/* 서브 이미지 */}
//         <S.ModalRow>
//           <p>서브 이미지</p>
//           <input
//             type="file"
//             id="subImageUpload"
//             accept="image/*"
//             style={{ display: 'none' }}
//             onChange={e => setSubImage(e.target.files ? e.target.files[0] : null)}
//           />
//           <button type="button" onClick={() => document.getElementById('subImageUpload')?.click()}>
//             이미지 등록
//           </button>
//           {subImage && <span style={{ marginLeft: '10px' }}>{subImage.name}</span>}
//         </S.ModalRow>

//         {/* 버튼 */}
//         <S.ModalRow2>
//           <button type="submit">저장하기</button>
//           <button type="button" onClick={() => { resetForm(); onClose(); }}>취소</button>
//         </S.ModalRow2>
//       </S.Modal>
//     </S.ModalBackground>
//   );
// }

// export default CateModal;




// 이미지 등록 버전
// import * as S from '../../admin/auth/components/SearchControlsStyle.ts';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
// import { createSecCategory, createThiCategory, fetchSecCate } from '../../../api/category/categoryAPICalls.ts';
// import type { AppDispatch } from '../../../store/Store.ts';
// import axios from 'axios';

// interface CateModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// function CateModal({ isOpen, onClose }: CateModalProps) {
//   if (!isOpen) return null;

//   const dispatch = useDispatch<AppDispatch>();
//   const secondCates = useSelector((state: any) => state.category.secondCate);

//   const [firstCate, setFirstCate] = useState(0);
//   const [secondCate, setSecondCate] = useState(0);
//   const [thirdCate, setThirdCate] = useState(0);

//   const [newSecondCate, setNewSecondCate] = useState('');
//   const [newThirdCate, setNewThirdCate] = useState('');
//   const [subText, setSubText] = useState('');

//   // const [mainImage, setMainImage] = useState<File | null>(null);
//   // const [subImage, setSubImage] = useState<File | null>(null);

//   // --- 3차 카테고리 상태 추가 ---
//   const [thirdCatesList, setThirdCatesList] = useState<any[]>([]);

//   // 1차 선택 시 2차/3차 카테고리 fetch
//   useEffect(() => {
//     if (firstCate > 0) {
//       // 2차 fetch
//       dispatch(fetchSecCate(firstCate));
//       setSecondCate(0);

//       // 3차 전체 fetch
//       const fetchThirdCates = async () => {
//         try {
//           const token = localStorage.getItem('accessToken');
//           const res = await axios.get(`/api/admin/category/third/all?firstCateId=${firstCate}`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setThirdCatesList(res.data);
//         } catch (err) {
//           console.error('3차 카테고리 조회 실패', err);
//         }
//       };

//       fetchThirdCates();
//       setThirdCate(0);
//     }
//   }, [firstCate]);

//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!firstCate) return alert('1차 카테고리를 선택해주세요');

//     const finalSecondCateId = secondCate === -1 ? 0 : secondCate;
//     const finalThirdCateName = thirdCate === -1 ? newThirdCate : '';

//     if (secondCate === 0 && !newSecondCate) return alert('2차 카테고리를 입력해주세요');
//     if (thirdCate === 0 && !finalThirdCateName) return alert('3차 카테고리를 입력해주세요');

//     const formData = new FormData();
//     formData.append('firstCateId', String(firstCate));
//     formData.append('secondCateId', String(finalSecondCateId));
//     if (secondCate === -1) formData.append('secondCateName', newSecondCate);
//     if (thirdCate === -1) formData.append('cateName', newThirdCate);
//     formData.append('subText', subText);
//     // if (mainImage) formData.append('mainImage', mainImage);
//     // if (subImage) formData.append('subImage', subImage);

//     try {
//       if (!secondCate || secondCate === -1) {
//         await dispatch(createSecCategory(formData) as any).unwrap();
//       } else {
//         // 3차 등록
//         await dispatch(createThiCategory(formData) as any).unwrap(); // 이제 JWT 포함
//       }
//       alert('카테고리가 등록되었습니다.');
//       resetForm();
//       onClose();
//     } catch (error: any) {
//       console.error(error);
//       alert(`저장 실패: ${error.response?.data?.message || '알 수 없는 오류'}`);
//     }
//   };

//   const resetForm = () => {
//     setFirstCate(0);
//     setSecondCate(0);
//     setThirdCate(0);
//     setNewSecondCate('');
//     setNewThirdCate('');
//     setSubText('');
//     setMainImage(null);
//     setSubImage(null);
//   };

//   return (
//     <S.ModalBackground>
//       <S.Modal onSubmit={handleSave}>
//         <p>카테고리 등록</p>

//         {/* 1차 카테고리 */}
//         <S.ModalRow>
//           <p>1차 카테고리</p>
//           <select value={firstCate} onChange={e => setFirstCate(Number(e.target.value))}>
//             <option value={0}>선택</option>
//             <option value={1}>K-pop</option>
//             <option value={2}>영화/드라마</option>
//             <option value={3}>애니메이션</option>
//             <option value={4}>게임</option>
//           </select>
//         </S.ModalRow>

//         {/* 2차 카테고리 */}
//         <S.ModalRow>
//           <p>2차 카테고리</p>
//           <select value={secondCate} onChange={e => setSecondCate(Number(e.target.value))}>
//             <option value={0}>선택</option>
//             {secondCates?.map((c: any) => (
//               <option key={c.secondCateId} value={c.secondCateId}>{c.cateName}</option>
//             ))}
//             <option value={-1}>2차 등록</option>
//           </select>
//           {secondCate === -1 && (
//             <input type="text" value={newSecondCate} onChange={e => setNewSecondCate(e.target.value)} placeholder="새 2차 카테고리 입력" />
//           )}
//         </S.ModalRow>

//         {/* 3차 카테고리 */}
//         <S.ModalRow>
//           <p>3차 카테고리</p>
//           <select value={thirdCate} onChange={e => setThirdCate(Number(e.target.value))}>
//             <option value={0}>선택</option>
//             {thirdCatesList.map(tc => (
//               <option key={tc.thirdCateId} value={tc.thirdCateId}>
//                 {tc.cateName}
//               </option>
//             ))}
//             <option value={-1}>3차 등록</option>
//           </select>
//           {thirdCate === -1 && (
//             <input
//               type="text"
//               value={newThirdCate}
//               onChange={e => setNewThirdCate(e.target.value)}
//               placeholder="새 3차 카테고리 입력"
//             />
//           )}
//         </S.ModalRow>

//         {/* 서브 텍스트 */}
//         <S.ModalRow>
//           <p>서브 텍스트</p>
//           <input type="text" value={subText} onChange={e => setSubText(e.target.value)} placeholder="서브 텍스트 입력" />
//         </S.ModalRow>

//         {/* <S.ModalRow>
//           <p>메인 이미지</p>
//           <input
//             type="file"
//             id="mainImageUpload"
//             accept="image/*"
//             style={{ display: 'none' }}
//             onChange={e => setMainImage(e.target.files ? e.target.files[0] : null)}
//           />
//           <S.UploadButton type="button" onClick={() => document.getElementById('mainImageUpload')?.click()}>
//             이미지 등록
//           </S.UploadButton>
//           {mainImage && <span style={{ marginLeft: '10px' }}>{mainImage.name}</span>}
//         </S.ModalRow> */}

//         {/* 서브 이미지 */}
//         {/* <S.ModalRow>
//           <p>서브 이미지</p>
//           <input
//             type="file"
//             id="subImageUpload"
//             accept="image/*"
//             style={{ display: 'none' }}
//             onChange={e => setSubImage(e.target.files ? e.target.files[0] : null)}
//           />
//           <S.UploadButton type="button" onClick={() => document.getElementById('subImageUpload')?.click()}>
//             이미지 등록
//           </S.UploadButton>
//           {subImage && <span style={{ marginLeft: '10px' }}>{subImage.name}</span>}
//         </S.ModalRow> */}

//         {/* 버튼 */}
//         <S.ModalRow2>
//           <button type="submit">저장하기</button>
//           <button type="button" onClick={() => { resetForm(); onClose(); }}>취소</button>
//         </S.ModalRow2>
//       </S.Modal>
//     </S.ModalBackground>
//   );
// }

// export default CateModal;



