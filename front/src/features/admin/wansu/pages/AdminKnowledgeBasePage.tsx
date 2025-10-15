// src/features/admin/wansu/pages/AdminKnowledgeBasePage.tsx (API 연동 최종본)

import { useCallback, useEffect, useState } from 'react';
import Pagination from '../../../../components/common/pagination/Pagination';
import KnowledgeModal from './../modals/KnowledgeModal';
import * as S from './AdminKnowledgeBasePageStyle';

// 1. Mock 데이터 대신, 우리가 만든 API 함수와 타입을 가져옵니다.
import {
  createKnowledge,
  getKnowledgeList,
  updateKnowledge,
  type KnowledgeItem
} from '../api/knowledgeApi';

const ITEMS_PER_PAGE = 10;

const AdminKnowledgeBasePage = () => {
    // 2. 가짜 데이터(mock) 대신, API로부터 받아올 실제 데이터를 저장할 상태를 만듭니다.
    const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeItem[]>([]);
    const [isLoading, setIsLoading] = useState(true); // 데이터를 불러오는 동안 로딩 상태를 표시하기 위한 상태

    // --- 필터링, 페이지네이션, 모달 관련 상태는 기존과 동일합니다. ---
    const [filteredKnowledge, setFilteredKnowledge] = useState<KnowledgeItem[]>([]);
    const [activeTab, setActiveTab] = useState<'FAQ' | 'QNA'>('FAQ');
    const [intentFilter, setIntentFilter] = useState('');
    const [questionFilter, setQuestionFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null);

    // 3. 서버에서 데이터를 불러오는 함수를 새로 만듭니다.
    const fetchKnowledgeData = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getKnowledgeList(); // API 호출
            setKnowledgeBase(data);
        } catch (error) {
            console.error("지식 베이스 목록을 불러오는 데 실패했습니다:", error);
            alert("데이터를 불러오는 데 실패했습니다. 페이지를 새로고침 해주세요.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 4. 컴포넌트가 처음 화면에 나타날 때, 위에서 만든 함수를 호출해 데이터를 불러옵니다.
    useEffect(() => {
        fetchKnowledgeData();
    }, [fetchKnowledgeData]);

    // --- 필터링 로직은 기존과 동일합니다. (이제 실제 데이터에 적용됩니다.) ---
    useEffect(() => {
        let result = knowledgeBase;

        if (activeTab === 'FAQ') {
            result = result.filter(item => item.knowledgeIsFaq);
        }

        if (intentFilter) {
            result = result.filter(item => item.knowledgeIntent.toLowerCase().includes(intentFilter.toLowerCase()));
        }

        if (questionFilter) {
            result = result.filter(item => item.knowledgeQuestion.toLowerCase().includes(questionFilter.toLowerCase()));
        }

        setFilteredKnowledge(result);
        setCurrentPage(1);
    }, [activeTab, knowledgeBase, intentFilter, questionFilter]);

    // --- 페이지네이션 계산 로직은 기존과 동일합니다. ---
    const totalPages = Math.ceil(filteredKnowledge.length / ITEMS_PER_PAGE);
    const paginatedKnowledge = filteredKnowledge.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );
    
    // --- 모달을 여는 함수는 기존과 동일합니다. ---
    const handleOpenModal = (mode: 'create' | 'edit', item: KnowledgeItem | null = null) => {
        setModalMode(mode);
        setSelectedItem(item);
        setIsModalOpen(true);
    };
    
    // 5. 모달의 '저장/수정' 버튼 클릭 시 console.log 대신, 실제 API를 호출하도록 수정합니다.
    const handleSubmitKnowledge = async (data: { knowledgeIntent: string; knowledgeQuestion: string; knowledgeAnswer: string }) => {
        try {
            if (modalMode === 'create') {
                await createKnowledge(data); // '추가' API 호출
            } else if (selectedItem) {
                await updateKnowledge(selectedItem.knowledgeId, data); // '수정' API 호출
            }
            setIsModalOpen(false);
            fetchKnowledgeData(); // 작업 성공 후, 목록을 새로고침하여 변경사항을 바로 확인합니다.
        } catch (error) {
            console.error("지식 저장에 실패했습니다:", error);
            alert("작업에 실패했습니다. 다시 시도해주세요.");
        }
    };

    // 6. '중지/재개' 버튼을 위한 API 호출 함수를 새로 만듭니다.
    const handleToggleActive = async (item: KnowledgeItem) => {
        try {
            await updateKnowledge(item.knowledgeId, { knowledgeIsActive: !item.knowledgeIsActive });
            fetchKnowledgeData(); // 성공 후 목록 새로고침
        } catch (error) {
            console.error("상태 변경에 실패했습니다:", error);
            alert("상태 변경에 실패했습니다.");
        }
    };

    // 로딩 중일 때 보여줄 화면
    if (isLoading) {
        return <div style={{ padding: '40px' }}>데이터를 불러오는 중입니다...</div>;
    }

    // --- 화면을 그리는 JSX 부분 ---
    return (
        <>
            <S.PageContainer>
                <S.ContentCard>
                    <S.ControlsWrapper>
                        <S.ControlRow>
                            <S.Label>의도</S.Label>
                            <S.SearchInput 
                                type="text" 
                                placeholder="intent 검색"
                                value={intentFilter}
                                onChange={(e) => setIntentFilter(e.target.value)}
                            />
                        </S.ControlRow>
                        <S.ControlRow>
                            <S.Label>대표 질문</S.Label>
                            <S.SearchInput 
                                type="text" 
                                placeholder="질문 내용 검색"
                                value={questionFilter}
                                onChange={(e) => setQuestionFilter(e.target.value)}
                            />
                        </S.ControlRow>
                    </S.ControlsWrapper>

                    <S.TabGroup>
                        <S.StatusFilterGroup>
                            <S.StatusTab $isActive={activeTab === 'FAQ'} onClick={() => setActiveTab('FAQ')}>FAQ</S.StatusTab>
                            <S.StatusTab $isActive={activeTab === 'QNA'} onClick={() => setActiveTab('QNA')}>QNA</S.StatusTab>
                        </S.StatusFilterGroup>
                        <S.AddButton onClick={() => handleOpenModal('create')}>지식 추가</S.AddButton>
                    </S.TabGroup>

                    <S.Table>
                        <thead>
                            <tr>
                                <th><input type="checkbox" /></th>
                                <th>의도(Intent)</th>
                                <th>대표 질문</th>
                                <th>챗봇 답변</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedKnowledge.map(item => (
                                <S.Tr key={item.knowledgeId} $isInactive={!item.knowledgeIsActive}>
                                    <td><input type="checkbox" checked={item.knowledgeIsFaq} readOnly/></td>
                                    <td>{item.knowledgeIntent}</td>
                                    <td style={{textAlign: 'left'}}>{item.knowledgeQuestion}</td>
                                    <td style={{textAlign: 'left', maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.knowledgeAnswer}</td>
                                    <td>
                                        <S.ActionButton variant="수정" onClick={() => handleOpenModal('edit', item)}>수정</S.ActionButton>
                                        <S.ActionButton 
                                            variant={item.knowledgeIsActive ? "중지" : "재개"} 
                                            onClick={() => handleToggleActive(item)}
                                        >
                                            {item.knowledgeIsActive ? '중지' : '재개'}
                                        </S.ActionButton>
                                    </td>
                                </S.Tr>
                            ))}
                        </tbody>
                    </S.Table>

                    {totalPages > 1 && (
                        <S.PaginationWrapper>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </S.PaginationWrapper>
                    )}
                </S.ContentCard>
            </S.PageContainer>
            
            <KnowledgeModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    onSubmit={handleSubmitKnowledge}
    initialData={selectedItem} // <-- 이렇게 간단하게 바꿔주세요!
    mode={modalMode}
/>
        </>
    );
};

export default AdminKnowledgeBasePage;