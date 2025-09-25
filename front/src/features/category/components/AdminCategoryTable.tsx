import * as B from '../../admin/notice/AdminNoticeList.styles.ts';
import * as S from '../../admin/../category/components/AdminCategoryTable.styles.ts';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../store/Store.ts';
import { useEffect, useMemo, useState } from 'react';
import { fetchAllSecCate, fetchAllThiCate } from '../../../api/category/categoryAPICalls.ts';
import Pagination from '../../../components/common/pagination/Pagination.tsx';

function AdminCategoryTable() {
  const dispatch = useDispatch<AppDispatch>();
  const secondCates = useSelector((state: any) => state.category.allSecCate);
  const thirdCates = useSelector((state: any) => state.category.allThiCate);

  const [categories, setCategories] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const firstCateNames = {
    1: 'K-pop',
    2: '영화/드라마',
    3: '애니메이션',
    4: '게임'
  };

  // 초기 데이터 fetch
  useEffect(() => {
    dispatch(fetchAllSecCate());
    dispatch(fetchAllThiCate());
  }, []);


  // secondCates / thirdCates가 바뀌면 categories 계산
  useEffect(() => {
    const allCategories = thirdCates.map((thirdCate: any) => {
      const secondCate = secondCates?.find((sec: any) => sec.secondCateId === thirdCate.secondCateId);
      const firstCateName = secondCate && secondCate.firstCateId
        ? firstCateNames[secondCate.firstCateId as keyof typeof firstCateNames]
        : '';

      // const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);
      // const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

      // useEffect(() => {
      //   setCurrentPage(1); // 카테고리 갱신될 때 페이지를 1로 초기화
      // }, [secondCates, thirdCates]);

      // const currentItems = categories.slice(
      //   (currentPage - 1) * ITEMS_PER_PAGE,
      //   currentPage * ITEMS_PER_PAGE
      // );


      return {
        firstCateName,
        secondCateName: secondCate?.cateName || '',
        thirdCateId: thirdCate.thirdCateId,
        thirdCateName: thirdCate.cateName
      };
    });
    setCategories(allCategories);
    setCurrentPage(1); // 카테고리 갱신될 때 페이지를 1로 초기화
  }, [secondCates, thirdCates]);


  // 현재 페이지 아이템과 전체 페이지 수 계산
  const totalPages = useMemo(() => Math.ceil(categories.length / ITEMS_PER_PAGE), [categories]);
  console.log(categories.length, totalPages);
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return categories.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [categories, currentPage]);


  const handleEdit = (thirdCateId: number) => {
    alert(`수정 클릭: ${thirdCateId}`);
  };

  const handleDelete = (thirdCateId: number) => {
    const confirmed = window.confirm(`${thirdCateId}번 카테고리를 삭제하시겠습니까?`);
    if (confirmed) {
      alert(`삭제 로직 실행: ${thirdCateId}`);
    }
  };

  return (
    <>
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
          {currentItems.map((cate: any) => (
            <tr key={cate.thirdCateId}>
              <td>{cate.thirdCateId}</td>
              <td>{cate.firstCateName}</td>
              <td>{cate.secondCateName}</td>
              <td>{cate.thirdCateName}</td>
              <td>
                <B.ActionButton onClick={() => handleEdit(cate.thirdCateId)}>수정</B.ActionButton>
                <B.ActionButton onClick={() => handleDelete(cate.thirdCateId)}>삭제</B.ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </S.Table>

      {/* 페이지네이션 */}
      <S.PaginationWrapper>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </S.PaginationWrapper>
    </>
  );
}

export default AdminCategoryTable;