import { useCallback, useEffect, useState } from 'react';
import Pagination from '../../../../components/common/pagination/Pagination';
import KnowledgeModal from './../modals/KnowledgeModal';
import * as S from './AdminKnowledgeBasePageStyle';

import {
    createKnowledge,
    deleteKnowledge,
    getKnowledgeList,
    updateKnowledge,
    type KnowledgeItem
} from '../api/knowledgeApi';

const ITEMS_PER_PAGE = 10;

const AdminKnowledgeBasePage = () => {
    const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredKnowledge, setFilteredKnowledge] = useState<KnowledgeItem[]>([]);
    const [activeTab, setActiveTab] = useState<'FAQ' | 'QNA'>('QNA');
    const [intentFilter, setIntentFilter] = useState('');
    const [questionFilter, setQuestionFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null);

    const fetchKnowledgeData = useCallback(async () => {
        setIsLoading(true);
        try {
            let data: KnowledgeItem[] = [];

            if (activeTab === 'FAQ') {
                const allData: KnowledgeItem[] = await getKnowledgeList();
                data = allData.filter(item => item.knowledgeIsFaq);
            } else {
                data = await getKnowledgeList();
            }

            setKnowledgeBase(data);

        } catch (error) {
            console.error("지식 베이스 목록을 불러오는 데 실패했습니다:", error);
            alert("데이터를 불러오는 데 실패했습니다. 페이지를 새로고침 해주세요.");
        } finally {
            setIsLoading(false);
        }
    }, [activeTab]);


    useEffect(() => {
        fetchKnowledgeData();
    }, [fetchKnowledgeData]);

    useEffect(() => {
        let result = knowledgeBase;

        if (intentFilter) {
            result = result.filter(item => item.knowledgeIntent.toLowerCase().includes(intentFilter.toLowerCase()));
        }
        if (questionFilter) {
            result = result.filter(item => item.knowledgeQuestion.toLowerCase().includes(questionFilter.toLowerCase()));
        }
        setFilteredKnowledge(result);
        setCurrentPage(1);
    }, [activeTab, knowledgeBase, intentFilter, questionFilter]);

    const totalPages = Math.ceil(filteredKnowledge.length / ITEMS_PER_PAGE);
    const paginatedKnowledge = filteredKnowledge.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );
    
    const handleOpenModal = (mode: 'create' | 'edit', item: KnowledgeItem | null = null) => {
        setModalMode(mode);
        setSelectedItem(item);
        setIsModalOpen(true);
    };
    
    const handleSubmitKnowledge = async (data: { knowledgeIntent: string; knowledgeQuestion: string; knowledgeAnswer: string }) => {
        try {
            if (modalMode === 'create') {
                await createKnowledge(data);
                setCurrentPage(1); 
            } else if (selectedItem) {
                await updateKnowledge(selectedItem.knowledgeId, data);
            }
            setIsModalOpen(false);
            fetchKnowledgeData();
        } catch (error) {
            console.error("지식 저장에 실패했습니다:", error);
            alert("작업에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleToggleActive = async (item: KnowledgeItem) => {
        try {
            await updateKnowledge(item.knowledgeId, { knowledgeIsActive: !item.knowledgeIsActive });
            fetchKnowledgeData();
        } catch (error) {
            console.error("상태 변경에 실패했습니다:", error);
            alert("상태 변경에 실패했습니다.");
        }
    };

    const handleToggleFaq = async (item: KnowledgeItem) => {
        try {
            await updateKnowledge(item.knowledgeId, { knowledgeIsFaq: !item.knowledgeIsFaq });
            fetchKnowledgeData();
        } catch (error) {
            console.error("FAQ 상태 변경에 실패했습니다:", error);
            alert("FAQ 상태 변경에 실패했습니다.");
        }
    };

    const handleDeleteKnowledge = async (id: number) => {
        if (window.confirm("정말로 이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
            try {
                await deleteKnowledge(id);
                fetchKnowledgeData();
            } catch (error) {
                console.error("지식 삭제에 실패했습니다:", error);
                alert("삭제에 실패했습니다.");
            }
        }
    };

    if (isLoading) {
        return <div style={{ padding: '40px' }}>데이터를 불러오는 중입니다...</div>;
    }

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
                                <th>FAQ</th>
                                <th>의도(Intent)</th>
                                <th>대표 질문</th>
                                <th>챗봇 답변</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedKnowledge.map(item => (
                                <S.Tr key={item.knowledgeId} $isInactive={!item.knowledgeIsActive}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={item.knowledgeIsFaq}
                                            onChange={() => handleToggleFaq(item)}
                                        />
                                    </td>
                                    <td>{item.knowledgeIntent}</td>
                                    <td style={{textAlign: 'left'}}>{item.knowledgeQuestion}</td>
                                    <td style={{textAlign: 'left', maxWidth: '350px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.knowledgeAnswer}</td>
                                    <td>
                                        <S.ActionButton $variant="수정" onClick={() => handleOpenModal('edit', item)}>수정</S.ActionButton>
                                        <S.ActionButton 
                                            $variant={item.knowledgeIsActive ? "중지" : "재개"} 
                                            onClick={() => handleToggleActive(item)}
                                        >
                                            {item.knowledgeIsActive ? '중지' : '재개'}
                                        </S.ActionButton>
                                        <S.ActionButton $variant="삭제" onClick={() => handleDeleteKnowledge(item.knowledgeId)}>삭제</S.ActionButton>
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
                initialData={selectedItem}
                mode={modalMode}
            />
        </>
    );
};

export default AdminKnowledgeBasePage;