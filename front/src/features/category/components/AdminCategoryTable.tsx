import * as S from '../../admin/auth/components/UserTableStyle.ts';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../store/Store.ts';
import { useEffect, useState } from 'react';
import { fetchAllSecCate, fetchAllThiCate } from '../../../api/category/categoryAPICalls.ts';

function AdminCategoryTable() {

  const dispatch = useDispatch<AppDispatch>();
  const secondCates = useSelector((state : any) => state.category.allSecCate);
  const thirdCates = useSelector((state : any) => state.category.allThiCate);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(fetchAllSecCate());
    dispatch(fetchAllThiCate());
    console.log("실행됨");
  }, []);

  const firstCateNames = {
    1: 'K-pop',
    2: '영화/드라마',
    3: '애니메이션',
    4: '게임'
  };

  useEffect(() => {
    console.log("sec cates: ", secondCates);
    console.log("third cates: ", thirdCates);

    const allCategories = thirdCates.map((thirdCate : any) => {
      const secondCate = secondCates?.find((sec : any) => {
        return sec.secondCateId === thirdCate.secondCateId; // 조건이 맞을 때만 true
      });

      const firstCateName = secondCate && secondCate.firstCateId ?
        firstCateNames[secondCate.firstCateId as keyof typeof firstCateNames] : '';

      return {
        firstCateName: firstCateName,
        secondCateName: secondCate?.cateName || '' ,
        thirdCateId: thirdCate.thirdCateId,
        thirdCateName: thirdCate.cateName
      }
    });

    setCategories(allCategories);

  }, [thirdCates, secondCates]);

  useEffect(() => {
    console.log("카테고리: ", categories);
  }, [categories]);

  return (
    <S.Table>
      <thead>
      <tr>
        <th>번호</th>
        <th>1차</th>
        <th>2차</th>
        <th>3차</th>
        <th>관리</th>
      </tr>
      </thead>
      <tbody>
      {categories?.map((cate : any) => (
        <tr key={cate.thirdCateId}>
          <td>{cate.thirdCateId}</td>
          <td>{cate.firstCateName}</td>
          <td>{cate.secondCateName}</td>
          <td>{cate.thirdCateName}</td>
        </tr>
      ))}
      </tbody>
    </S.Table>
  );

}

export default AdminCategoryTable;