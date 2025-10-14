import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../store/Store.ts';
import { fetchAllSecCate, fetchAllThiCate } from '../../../api/category/categoryAPICalls.ts';
import * as B from '../../admin/notice/AdminNoticeList.styles.ts';
import * as S from './AdminCategoryTree.styles.ts';

interface ThirdCate {
  thirdCateId: number;
  cateName: string;
  secondCateId: number;
  subText?: string;
}

interface SecondCate {
  secondCateId: number;
  cateName: string;
  firstCateId: number;
  children?: ThirdCate[];
  subText?: string;
}

interface FirstCate {
  firstCateId: number;
  cateName: string;
  children?: SecondCate[];
  subText?: string;
}

function AdminCategoryTree() {
  const dispatch = useDispatch<AppDispatch>();
  const secondCates: SecondCate[] = useSelector((state: any) => state.category.allSecCate);
  const thirdCates: ThirdCate[] = useSelector((state: any) => state.category.allThiCate);

  const [treeData, setTreeData] = useState<FirstCate[]>([]);

  const firstCateNames = {
    1: 'K-pop',
    2: '영화/드라마',
    3: '애니메이션',
    4: '게임'
  };

  useEffect(() => {
    dispatch(fetchAllSecCate());
    dispatch(fetchAllThiCate());
  }, []);

  useEffect(() => {
    // 1차 카테고리 배열 생성
    const firstCateArray: FirstCate[] = Object.entries(firstCateNames).map(([id, name]) => ({
      firstCateId: Number(id),
      cateName: name,
      children: []
    }));

    // 2차 카테고리 연결
    secondCates.forEach(sec => {
      const firstCate = firstCateArray.find(fc => fc.firstCateId === sec.firstCateId);
      if (firstCate) {
        firstCate.children!.push({ ...sec, children: [] });
      }
    });

    // 3차 카테고리 연결
    thirdCates.forEach(third => {
      const secondCate = secondCates.find(sec => sec.secondCateId === third.secondCateId);
      const firstCate = firstCateArray.find(fc => fc.firstCateId === secondCate?.firstCateId);
      const parentSecondCate = firstCate?.children?.find(sc => sc.secondCateId === third.secondCateId);
      if (parentSecondCate) {
        parentSecondCate.children!.push(third);
      }
    });

    setTreeData(firstCateArray);
  }, [secondCates, thirdCates]);

  const handleEdit = (id: number, level: 'first' | 'second' | 'third') => {
    alert(`${level} 카테고리 수정 클릭: ${id}`);
  };

  const handleDelete = (id: number, level: 'first' | 'second' | 'third') => {
    const confirmed = window.confirm(`${id}번 ${level} 카테고리를 삭제하시겠습니까?`);
    if (confirmed) {
      alert(`삭제 로직 실행: ${id}`);
    }
  };

  const handleSubTextChange = (id: number, level: 'first' | 'second' | 'third', value: string) => {
    setTreeData(prev =>
      prev.map(first => {
        if (level === 'first' && first.firstCateId === id) return { ...first, subText: value };
        return {
          ...first,
          children: first.children?.map(second => {
            if (level === 'second' && second.secondCateId === id) return { ...second, subText: value };
            return {
              ...second,
              children: second.children?.map(third => {
                if (level === 'third' && third.thirdCateId === id) return { ...third, subText: value };
                return third;
              })
            };
          })
        };
      })
    );
  };

  const renderTree = () =>
    treeData.map(first => (
      <li key={first.firstCateId}>
        <strong>{first.cateName}</strong>
        <input
          type="text"
          placeholder="메모 입력"
          value={first.subText || ''}
          onChange={e => handleSubTextChange(first.firstCateId, 'first', e.target.value)}
        />
        <B.ActionButton onClick={() => handleEdit(first.firstCateId, 'first')}>수정</B.ActionButton>
        <B.ActionButton onClick={() => handleDelete(first.firstCateId, 'first')}>삭제</B.ActionButton>

        {first.children && first.children.length > 0 && (
          <ul>
            {first.children.map(second => (
              <li key={second.secondCateId}>
                {second.cateName}
                <input
                  type="text"
                  placeholder="메모 입력"
                  value={second.subText || ''}
                  onChange={e => handleSubTextChange(second.secondCateId, 'second', e.target.value)}
                />
                <B.ActionButton onClick={() => handleEdit(second.secondCateId, 'second')}>수정</B.ActionButton>
                <B.ActionButton onClick={() => handleDelete(second.secondCateId, 'second')}>삭제</B.ActionButton>

                {second.children && second.children.length > 0 && (
                  <ul>
                    {second.children.map(third => (
                      <li key={third.thirdCateId}>
                        {third.cateName}
                        <input
                          type="text"
                          placeholder="메모 입력"
                          value={third.subText || ''}
                          onChange={e => handleSubTextChange(third.thirdCateId, 'third', e.target.value)}
                        />
                        <B.ActionButton onClick={() => handleEdit(third.thirdCateId, 'third')}>수정</B.ActionButton>
                        <B.ActionButton onClick={() => handleDelete(third.thirdCateId, 'third')}>삭제</B.ActionButton>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </li>
    ));

  return (
    <S.TreeWrapper>
      <h3>카테고리 전체보기</h3>
      <ul>{renderTree()}</ul>
    </S.TreeWrapper>
  );
}

export default AdminCategoryTree;
