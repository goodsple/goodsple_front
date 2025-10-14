//  ============== ver4 왼쪽 트리 입력창 + 오른쪽 패널 동기화 ================
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../store/Store.ts';
import { addCategoryAPI, fetchAllFirstCate, fetchAllSecCate, fetchAllThiCate, updateFirstCategory, updateSecCategory, updateThiCategory } from '../../../api/category/categoryAPICalls.ts';
import * as S from '../../admin/../category/components/AdminCategoryTree.styles.ts';
import axios from 'axios';

interface ThirdCate {
  thirdCateId: number;
  cateName: string;
  secondCateId: number;
  subText?: string;
  visibility?: string;
}

interface SecondCate {
  secondCateId: number;
  cateName: string;
  firstCateId: number;
  subText?: string;
  visibility?: string;
  children?: ThirdCate[];
}

interface FirstCate {
  firstCateId: number;
  cateName: string;
  visibility?: string;
  subText?: string;
  children?: SecondCate[];
}


function AdminCategoryTree() {
  const dispatch = useDispatch<AppDispatch>();
  const firstCates: FirstCate[] = useSelector((state: any) => state.category.firstCate);
  const secondCates: SecondCate[] = useSelector((state: any) => state.category.allSecCate);
  const thirdCates: ThirdCate[] = useSelector((state: any) => state.category.allThiCate);

  const [treeData, setTreeData] = useState<FirstCate[]>([]);
  // const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
  const [selectedCategory, setSelectedCategory] = useState<{ level: number; id: number | null }>({ level: 0, id: null });
  const [inputValue, setInputValue] = useState('');
  const [subText, setSubText] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [newChildName, setNewChildName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isModified, setIsModified] = useState(false);

  // 기존 데이터 백업 (수정 취소용)
  const [originalData, setOriginalData] = useState({ name: '', subText: '', visibility: 'public' });


  const [expandedFirst, setExpandedFirst] = useState<{ [key: number]: boolean }>({});
  const [expandedSecond, setExpandedSecond] = useState<{ [key: number]: boolean }>({});

  const toggleExpandFirst = (id: number) => {
    setExpandedFirst(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleExpandSecond = (id: number) => {
    setExpandedSecond(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // 최초 렌더링 시 데이터 불러오기
  useEffect(() => {
    dispatch(fetchAllFirstCate());
    dispatch(fetchAllSecCate());
    dispatch(fetchAllThiCate());
  }, [dispatch]);

  useEffect(() => {
    if (!firstCates.length) return;

    const firstCateArray: FirstCate[] = firstCates.map(fc => ({ ...fc, children: [] }));

    (secondCates || []).forEach(sec => {
      const firstCate = firstCateArray.find(fc => fc.firstCateId === sec.firstCateId);
      if (firstCate) firstCate.children!.push({ ...sec, children: [] });
    });

    (thirdCates || []).forEach(third => {
      const secondCate = secondCates.find(sec => sec.secondCateId === third.secondCateId);
      const firstCate = firstCateArray.find(fc => fc.firstCateId === secondCate?.firstCateId);
      const parentSecondCate = firstCate?.children?.find(sc => sc.secondCateId === third.secondCateId);
      if (parentSecondCate) parentSecondCate.children!.push(third);
    });

    setTreeData(firstCateArray);
  }, [firstCates, secondCates, thirdCates]);

  // 트리 메뉴 확장/축소
  // const toggleExpand = (id: number) =>
  //   setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  const handleClickCategory = (
    level: number,
    id: number,
    name?: string,
    subTextValue?: string,
    vis?: 'public' | 'private'
  ) => {
    setSelectedCategory({ level, id: Number(id) });
    setInputValue(name || '');
    setSubText(subTextValue || '');
    setVisibility(vis || 'public');
    setNewChildName('');
    setIsAdding(false); // 새 카테고리 입력 모드 초기화
    setIsModified(false); // 기존 카테고리 클릭 시 수정 버튼 비활성화
    setOriginalData({ name: name || '', subText: subTextValue || '', visibility: vis || 'public' }); // 원본 저장
  };

  // --- 변경 감지 함수
  useEffect(() => {
    const modified =
      inputValue !== originalData.name ||
      subText !== originalData.subText ||
      visibility !== originalData.visibility;
    setIsModified(modified);
  }, [inputValue, subText, visibility, originalData]);


  // 저장
  // const handleSave = async () => {

  //   if (!selectedCategory.id || !inputValue.trim()) {
  //     alert('카테고리 정보가 올바르지 않습니다.');
  //     return;
  //   }

  //   if (!selectedCategory.id) return;

  //   let success = false;

  //   if (selectedCategory.level === 2) {
  //     // 2차 카테고리
  //     success = await updateSecCategory(selectedCategory.id, { cateName: inputValue, subText, visibility });
  //   } else if (selectedCategory.level === 3) {
  //     // 3차 카테고리
  //     success = await updateThiCategory(selectedCategory.id, { cateName: inputValue, subText, visibility });
  //   }

  //   if (success) {
  //     alert('저장 완료!');
  //     // 트리 업데이트


  //     // treeData 업데이트
  //     setTreeData(prevTree => prevTree.map(fc => {
  //       if (selectedCategory.level === 2 && fc.children) {
  //         fc.children = fc.children.map(sc =>
  //           sc.secondCateId === selectedCategory.id
  //             ? { ...sc, cateName: inputValue, subText } : sc);
  //       }
  //       if (selectedCategory.level === 3 && fc.children) {
  //         fc.children = fc.children.map(sc => ({
  //           ...sc,
  //           children: sc.children?.map(tc =>
  //             tc.thirdCateId === selectedCategory.id
  //               ? { ...tc, cateName: inputValue, subText } : tc)
  //         }));
  //       }
  //       return fc;
  //     }));
  //   } else {
  //     alert('저장 실패');
  //   }
  // };

  // 추가
  const handleAddChild = async () => {
    if (!selectedCategory.id || newChildName.trim() === '') return;


    const newId = await addCategoryAPI({
      parentId: selectedCategory.id,
      level: selectedCategory.level + 1,
      name: newChildName,
      subText,        // 메모 추가
      visibility,     // 공개/비공개 추가
    });

    if (!newId) {
      alert('카테고리 추가 실패');
      return;
    }

    // 2. treeData 업데이트
    const newTreeData = treeData.map(fc => {
      if (selectedCategory.level === 1 && fc.firstCateId === selectedCategory.id) {
        // 1차 클릭 → 2차 추가
        const newSecond: SecondCate = {
          secondCateId: newId,
          cateName: newChildName,
          firstCateId: fc.firstCateId,
          children: [],
        };
        return { ...fc, children: [...(fc.children || []), newSecond] };
      }
      if (selectedCategory.level === 2 && fc.children) {
        // 2차 클릭 → 3차 추가
        const newFc = { ...fc };
        newFc.children = (newFc.children || []).map(sc => {
          if (sc.secondCateId === selectedCategory.id) {
            const newThird: ThirdCate = {
              thirdCateId: newId,
              cateName: newChildName,
              secondCateId: sc.secondCateId,
              subText,        // 메모 포함
              visibility,     // 공개/비공개 포함
            };
            return { ...sc, children: [...(sc.children || []), newThird] };
          }
          return sc;
        });
        return newFc;
      }
      return fc;
    });
    setTreeData(newTreeData);
    setIsAdding(false);
    setNewChildName('');
    alert('카테고리 추가 완료!');
  };


  // 수정
  // 입력값 변경 시
  const handleInputChange = (value: string) => {
    setInputValue(value);

    // 선택된 카테고리가 있으면 treeData 업데이트
    if (!isAdding && selectedCategory.id) {
      setTreeData(prevTree =>
        prevTree.map(fc => {
          if (selectedCategory.level === 2 && fc.children) {
            fc.children = fc.children.map(sc =>
              sc.secondCateId === selectedCategory.id
                ? { ...sc, cateName: value }
                : sc
            );
          }
          if (selectedCategory.level === 3 && fc.children) {
            fc.children = fc.children.map(sc => ({
              ...sc,
              children: sc.children?.map(tc =>
                tc.thirdCateId === selectedCategory.id
                  ? { ...tc, cateName: value }
                  : tc
              ),
            }));
          }
          return fc;
        })
      );
    }
  };

  const handleSubTextChange = (value: string) => setSubText(value);
  const handleVisibilityChange = (value: 'public' | 'private') => setVisibility(value);

  // 수정 버튼 클릭
  const handleUpdate = async () => {
    if (!selectedCategory.id) return;
    if (!window.confirm('정말 수정하시겠습니까?')) return;

    let success = false;

    if (selectedCategory.level === 1) {
      // 1차는 subText만 업데이트
      success = await updateFirstCategory(selectedCategory.id, { subText });
    } else if (selectedCategory.level === 2) {
      success = await updateSecCategory(selectedCategory.id, { cateName: inputValue, subText, visibility });
    } else if (selectedCategory.level === 3) {
      success = await updateThiCategory(selectedCategory.id, { cateName: inputValue, subText, visibility });
    }

    if (selectedCategory.level === 2) {
      success = await updateSecCategory(selectedCategory.id,
        { cateName: inputValue, subText, visibility });
    } else if (selectedCategory.level === 3) {
      success = await updateThiCategory(selectedCategory.id,
        { cateName: inputValue, subText, visibility });
    }

    if (success) {
      alert('수정 완료!');
      setIsModified(false);
      setOriginalData({ name: inputValue, subText, visibility });

      // treeData 업데이트 (id 절대 변경 X)
      setTreeData(prevTree =>
        prevTree.map(fc => {
          if (selectedCategory.level === 1 && fc.firstCateId === selectedCategory.id) {
            return { ...fc, subText }; // 이름은 안바꿈
          }
          if (fc.children) {
            fc.children = fc.children.map(sc => {
              if (selectedCategory.level === 2 && sc.secondCateId === selectedCategory.id) {
                return { ...sc, cateName: inputValue, subText, visibility };
              }
              if (sc.children) {
                sc.children = sc.children.map(tc => {
                  if (selectedCategory.level === 3 && tc.thirdCateId === selectedCategory.id) {
                    return { ...tc, cateName: inputValue, subText, visibility };
                  }
                  return tc;
                });
              }
              return sc;
            });
          }
          return fc;
        })
      );
    } else {
      alert('수정 실패');
    }
  };


  // 삭제
  const handleDelete = async () => {
    if (!selectedCategory.id) return;

    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      if (selectedCategory.level === 2) {
        // 2차 카테고리 삭제
        await axios.delete(`http://localhost:8080/api/admin/category/second/${selectedCategory.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          }
        });
        // 트리에서 제거
        setTreeData(prevTree =>
          prevTree.map(fc => ({
            ...fc,
            children: fc.children?.filter(sc => sc.secondCateId !== selectedCategory.id)
          }))
        );
      } else if (selectedCategory.level === 3) {
        // 3차 카테고리 삭제
        await axios.delete(`http://localhost:8080/api/admin/category/third/${selectedCategory.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          }
        });
        // 트리에서 제거
        setTreeData(prevTree =>
          prevTree.map(fc => ({
            ...fc,
            children: fc.children?.map(sc => ({
              ...sc,
              children: sc.children?.filter(tc => tc.thirdCateId !== selectedCategory.id)
            }))
          }))
        );
      } else if (selectedCategory.level === 1) {
        // 1차 카테고리 삭제
        await axios.delete(`http://localhost:8080/api/admin/category/first/${selectedCategory.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          }
        });
        setTreeData(prevTree => prevTree.filter(fc => fc.firstCateId !== selectedCategory.id));
      }

      // 선택 초기화
      setSelectedCategory({ level: 0, id: null });
      setInputValue('');
      setSubText('');
      setVisibility('public');

      alert('삭제 완료!');
    } catch (error) {
      console.error(error);
      alert('삭제 실패');
    }
  };

  // 정렬
  const handleMove = (direction: 'up' | 'down' | 'top' | 'bottom') => {
    if (!selectedCategory.id) return;

    const newData = [...treeData];

    if (selectedCategory.level === 1) {
      // 1차 정렬
      const index = newData.findIndex(fc => fc.firstCateId === selectedCategory.id);
      if (index === -1) return;
      const [item] = newData.splice(index, 1);
      switch (direction) {
        case 'up': newData.splice(Math.max(index - 1, 0), 0, item); break;
        case 'down': newData.splice(Math.min(index + 1, newData.length), 0, item); break;
        case 'top': newData.unshift(item); break;
        case 'bottom': newData.push(item); break;
      }
    } else if (selectedCategory.level === 2) {
      // 2차 정렬
      newData.forEach(fc => {
        if (fc.children) {
          const index = fc.children.findIndex(sc => sc.secondCateId === selectedCategory.id);
          if (index !== -1) {
            const [item] = fc.children.splice(index, 1);
            switch (direction) {
              case 'up': fc.children.splice(Math.max(index - 1, 0), 0, item); break;
              case 'down': fc.children.splice(Math.min(index + 1, fc.children.length), 0, item); break;
              case 'top': fc.children.unshift(item); break;
              case 'bottom': fc.children.push(item); break;
            }
          }
        }
      });
    } else if (selectedCategory.level === 3) {
      // 3차 정렬
      newData.forEach(fc => {
        fc.children?.forEach(sc => {
          if (sc.children) {
            const index = sc.children.findIndex(tc => tc.thirdCateId === selectedCategory.id);
            if (index !== -1) {
              const [item] = sc.children.splice(index, 1);
              switch (direction) {
                case 'up': sc.children.splice(Math.max(index - 1, 0), 0, item); break;
                case 'down': sc.children.splice(Math.min(index + 1, sc.children.length), 0, item); break;
                case 'top': sc.children.unshift(item); break;
                case 'bottom': sc.children.push(item); break;
              }
            }
          }
        });
      });
    }

    setTreeData(newData);
  };

  // 트리 렌더링
  const renderTree = () =>
    treeData.map(first => (
      <li key={first.firstCateId}>
        {/* 1차 */}
        <span onClick={() => toggleExpandFirst(first.firstCateId)}>
          {expandedFirst[first.firstCateId] ? '▼' : '▶'}
        </span>
        <span
          onClick={() =>
            handleClickCategory(
              1,
              first.firstCateId,
              first.cateName,
              first.subText,
              first.visibility as 'public' | 'private' || 'public'
            )
          }
        >
          {first.cateName}
        </span>

        {/* 1차가 열렸을 때만 2차 표시 */}
        {expandedFirst[first.firstCateId] && (
          <ul>
            {first.children?.map(second => (
              <li key={second.secondCateId}>
                {/* 2차 */}
                <span onClick={() => toggleExpandSecond(second.secondCateId)}>
                  {expandedSecond[second.secondCateId] ? '▼' : '▶'}
                </span>
                <span
                  onClick={() =>
                    handleClickCategory(2, second.secondCateId, second.cateName, second.subText, 'public')
                  }
                >
                  {second.cateName}
                </span>

                {/* 2차가 열렸을 때만 3차 표시 */}
                {expandedSecond[second.secondCateId] && (second.children?.length ?? 0) > 0 && (
                  <ul>
                    {second.children!.map(third => (
                      <li key={third.thirdCateId}>
                        <span
                          onClick={() =>
                            handleClickCategory(3, third.thirdCateId, third.cateName, third.subText, 'public')
                          }
                        >
                          {third.cateName}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* 3차 추가 입력창 */}
                {isAdding && selectedCategory.level === 2 &&
                  selectedCategory.id === second.secondCateId && (
                    <S.InputGroup>
                      <S.TextInput
                        value={newChildName}
                        onChange={e => {
                          setNewChildName(e.target.value);
                          setInputValue(e.target.value);
                        }}
                        placeholder="새 3차 카테고리 입력"
                      />
                      <S.Button onClick={handleAddChild} disabled={!newChildName}>
                        추가
                      </S.Button>
                    </S.InputGroup>
                  )}
              </li>
            ))}

            {/* 2차 추가 입력창 */}
            {isAdding && selectedCategory.level === 1 &&
              selectedCategory.id === first.firstCateId && (
                <li>
                  <S.InputGroup>
                    <S.TextInput
                      value={newChildName}
                      onChange={e => {
                        setNewChildName(e.target.value);
                        setInputValue(e.target.value);
                      }}
                      placeholder="새 2차 카테고리 입력"
                    />
                    <S.Button onClick={handleAddChild} disabled={!newChildName}>
                      추가
                    </S.Button>
                  </S.InputGroup>
                </li>
              )}
          </ul>
        )}
      </li>
    ));



  return (
    <S.TreeWrapper>
      <S.TreeContainer>
        <S.TreeSection>
          <h3>카테고리 전체보기</h3>
          <ul>{renderTree()}</ul>
        </S.TreeSection>

        {selectedCategory.level > 0 && (
          <S.PanelSection>
            <S.PanelHeader>
              {selectedCategory.level < 3 && (
                <S.Button
                  onClick={() => {
                    setIsAdding(true); // 추가 모드 진입
                    // 입력값 초기화 X → 기존 선택 상태와 입력값 유지
                    setInputValue('');
                    setSubText('');
                    setVisibility('public');
                    setNewChildName('');
                    setIsModified(true); // 수정/추가 버튼 활성화
                  }}
                >
                  카테고리 추가
                </S.Button>
              )}
              {selectedCategory.id &&
                <S.Button
                  onClick={handleDelete}
                  disabled={selectedCategory.level === 1} // 1차 카테고리 선택 시 삭제버튼 비활성
                  >
                  카테고리 삭제
                </S.Button>
              }
            </S.PanelHeader>

            <h4>{isAdding ? selectedCategory.level + 1 : selectedCategory.level}차 카테고리 정보</h4>

            <S.InputGroup>
              <S.Label>카테고리명:</S.Label>
              <S.TextInput
                value={isAdding ? newChildName : inputValue}
                onChange={e => {
                  const val = e.target.value;
                  if (isAdding) {
                    setNewChildName(val);
                  } else {
                    handleInputChange(val);
                    setIsModified(true);
                  }
                }}
                disabled={selectedCategory.level === 1} // 1차 카테고리일 때 입력 불가
              />
            </S.InputGroup>

            {/* 저장 버튼 */}
            {/* <S.Button onClick={handleSave}
                disabled={
                  (isAdding && !newChildName.trim()) || // 추가 모드일 때 입력값 없으면 비활성
                  (!isAdding && (!isModified || !inputValue.trim())) // 수정 모드일 때 변경 없으면 비활성
                }
              >
                저장
              </S.Button> */}
            {/* </S.InputGroup> */}

            <S.InputGroup>
              <S.Label>메모:</S.Label>
              <S.TextInput
                value={subText}
                onChange={e => {
                  handleSubTextChange(e.target.value);
                  setIsModified(true); // 메모 변경 시도 수정 버튼 활성화
                }}
                disabled={selectedCategory.level === 0} // 선택 안되면 비활성
              />
            </S.InputGroup>

            {selectedCategory.level > 1 && (
              <S.InputGroup>
                <S.Label>공개설정:</S.Label>
                <S.RadioGroup>
                  <S.RadioLabel>
                    <S.RadioInput
                      type="radio"
                      name="visibility"
                      checked={visibility === 'public'}
                      onChange={() => {
                        handleVisibilityChange('public');
                        setIsModified(true);
                      }}
                    />
                    공개
                  </S.RadioLabel>
                  <S.RadioLabel>
                    <S.RadioInput
                      type="radio"
                      name="visibility"
                      checked={visibility === 'private'}
                      onChange={() => {
                        handleVisibilityChange('private');
                        setIsModified(true);
                      }}
                    />
                    비공개
                  </S.RadioLabel>
                </S.RadioGroup>
              </S.InputGroup>
            )}

            {selectedCategory.level >= 1 && selectedCategory.level <= 3 && (
              <S.InputGroup>
                <S.Label>카테고리 정렬:</S.Label>
                <S.MoveButtons>
                  <S.Button onClick={() => handleMove('top')}>맨위</S.Button>
                  <S.Button onClick={() => handleMove('up')}>위</S.Button>
                  <S.Button onClick={() => handleMove('down')}>아래</S.Button>
                  <S.Button onClick={() => handleMove('bottom')}>맨아래</S.Button>
                </S.MoveButtons>
              </S.InputGroup>
            )}

            <S.UpdateButtonWrapper>
              <S.Button
                onClick={async () => {
                  if (isAdding) {
                    await handleAddChild(); // 새 카테고리 추가
                    setIsAdding(false);
                    setNewChildName('');
                  } else {
                    await handleUpdate(); // 기존 카테고리 수정
                  }
                  setIsModified(false);
                }}
                disabled={
                  isAdding ? !newChildName.trim() : (!isModified || !inputValue.trim())
                }              >
                {isAdding ? '추가' : '수정'}
              </S.Button>
            </S.UpdateButtonWrapper>

            {/* 우측 패널 새2차/3차 카테고리 입력란 */}
            {/* {selectedCategory.level > 0 && selectedCategory.level < 3 && (
            <S.InputGroup>
              <S.Label>새 {selectedCategory.level + 1}차 카테고리:</S.Label>
              <S.TextInput
                value={newChildName}
                onChange={e => setNewChildName(e.target.value)}
                placeholder={`여기에 ${selectedCategory.level + 1}차 카테고리 입력`}
              />
              <S.Button onClick={handleAddChild} disabled={!newChildName}>추가</S.Button>
            </S.InputGroup>
          )} */}

          </S.PanelSection>
        )}
      </S.TreeContainer>

    </S.TreeWrapper>
  );
}
export default AdminCategoryTree;


