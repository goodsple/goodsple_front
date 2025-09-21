// 기존 코드 주석 처리
// import * as S from '../../admin/auth/components/SearchControlsStyle.ts';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
// import { createSecCategory, createThiCategory, fetchSecCate } from '../../../api/category/categoryAPICalls.ts';
// import type { AppDispatch } from '../../../store/Store.ts';

// interface CateModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// function CateModal({ isOpen, onClose }: CateModalProps) {
//   if (!isOpen) return null;

//   const [firstCate, setFirstCate] = useState(0);
//   const [secondCate, setSecondCate] = useState(0);
//   const [formData, setFormData] = useState({
//     cateName: '',
//     firstCateId: 0,
//     secondCateId: 0,
//     mainImage: '',
//     subImage: '',
//     subText: ''
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };


//   const dispatch = useDispatch<AppDispatch>();
//   const secondCates = useSelector((state : any) => state.category.secondCate);
//   const entireState = useSelector((state: any) => state);

//   useEffect(() => {
//     if (firstCate === 0)
//       return;

//     dispatch(fetchSecCate(firstCate));
//     setFormData(prev => ( {
//       ...prev,
//       firstCateId: firstCate
//     }));
//   }, [firstCate]);


//   useEffect(() => {
//     if (secondCates === 0)
//       return;

//     setFormData(prev => ( {
//       ...prev,
//       secondCateId: secondCate
//     }));

//   }, [secondCate]);

//   useEffect(() => {

//   }, [formData]);

//   useEffect(() => { // 디버깅용
//     console.log("🔍 전체 Redux 상태:", entireState);
//     console.log("🔍 category 상태:", entireState.category);
//     console.log("🔍 secondCates:", secondCates);
//   }, [secondCates, entireState]);

//   const saveCate = async (e: React.FormEvent) => {
//     e.preventDefault();

//     console.log("현재 form 상태", formData);

//     if (!formData.cateName) {
//       alert('카테고리 이름을 입력해주세요');
//       return;
//     }

//     if (firstCate === 0) {
//       alert('상위 카테고리를 선택해주세요');
//       return;
//     }

//     if (secondCate === 0)
//     {
//       dispatch(createSecCategory(formData) as any)
//         .unwrap()
//         .then((result) => {
//           alert('저장되었습니다.');
//           setFormData({
//             cateName: '',
//             firstCateId: 0,
//             secondCateId: 0,
//             mainImage: '',
//             subImage: '',
//             subText: ''
//           });
//           setFirstCate(0);
//           setSecondCate(0);
//           onClose();
//         })
//         .catch((error) => {
//           alert('저장이 실패하였습니다.');
//         });
//     }
//     else {
//       dispatch(createThiCategory(formData) as any)
//         .unwrap()
//         .then((result) => {
//           alert('저장되었습니다.');
//           alert('저장되었습니다.');
//           setFormData({
//             cateName: '',
//             firstCateId: 0,
//             secondCateId: 0,
//             mainImage: '',
//             subImage: '',
//             subText: ''
//           });
//           setFirstCate(0);
//           setSecondCate(0);
//           onClose();
//         })
//         .catch((error) => {
//           alert('저장이 실패하였습니다.');
//         });
//     }
//   }

//   return (
//     <S.ModalBackground>
//       <S.Modal onSubmit={saveCate}>
//         <p>카테고리 등록</p>
//         <S.ModalRow>
//           <p>카테고리 이름</p>
//           <input type={'text'} name={'cateName'} value={formData.cateName} placeholder={'카테고리 이름은 최대 20자를 넘지 않도록 작성'} onChange={handleInputChange} maxLength={20}/>
//         </S.ModalRow>
//         <S.ModalRow>
//           <p>상위 카테고리</p>
//           <select name={"firstCateId"} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {setFirstCate(Number(event.target.value))}}>
//             <option value={0}>선택</option>
//             <option value={1}>K-pop</option>
//             <option value={2}>영화/드라마</option>
//             <option value={3}>애니메이션</option>
//             <option value={4}>게임</option>
//           </select>
//           <select name={"secondCateId"} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {setSecondCate(Number(event.target.value))}}>
//             <option value={0}>등록</option>
//             {secondCates?.map((cate : any) => (
//               <option key={cate.secondCateId} value={cate.secondCateId}>
//                 {cate.cateName}
//               </option>
//             ))}
//           </select>
//         </S.ModalRow>
//         <S.ModalRow>
//           <p>메인 이미지</p>
//           <button>이미지 등록</button>
//         </S.ModalRow>
//         <S.ModalRow>
//           <p>서브 이미지</p>
//           <button>이미지 등록</button>
//         </S.ModalRow>
//         <S.ModalRow>
//           <p>서브 텍스트</p>
//           <input type={'text'} name={'subText'} value={formData.subText} placeholder={'텍스트는 최대 20자를 넘지 않도록 작성'} onChange={handleInputChange} maxLength={20}/>
//         </S.ModalRow>
//         <S.ModalRow2>
//           <button type='submit'>저장하기</button>
//           <button type='button' onClick={onClose}>취소</button>
//         </S.ModalRow2>
//       </S.Modal>
//     </S.ModalBackground>
//   );
// }

// export default CateModal;


