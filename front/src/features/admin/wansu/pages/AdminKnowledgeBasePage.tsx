// admin/pages/AdminKnowledgeBasePage.tsx (최종본)

import { useEffect, useState } from 'react';
import Pagination from '../../../../components/common/pagination/Pagination';
import type { KnowledgeItem } from '../mock/knowledgeBaseData';
import { mockKnowledgeBaseData } from '../mock/knowledgeBaseData';
import KnowledgeModal from './../modals/KnowledgeModal';
import * as S from './AdminKnowledgeBasePageStyle';

const ITEMS_PER_PAGE = 10; // 한 페이지에 10개씩

const AdminKnowledgeBasePage = () => {
  const [knowledgeBase, setKnowledgeBase] = useState(mockKnowledgeBaseData);
  const [filteredKnowledge, setFilteredKnowledge] = useState<KnowledgeItem[]>([]);
  
  // ✨ 필터링과 페이지네이션을 위한 상태 추가
  const [activeTab, setActiveTab] = useState<'FAQ' | 'QNA'>('FAQ');
  const [intentFilter, setIntentFilter] = useState('');
  const [questionFilter, setQuestionFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null);

  useEffect(() => {
    let result = knowledgeBase;

    // 탭 필터
    if (activeTab === 'FAQ') {
      result = result.filter(item => item.isFaq);
    }
    // (QNA 탭은 모든 데이터를 보여주므로 별도 필터링 없음)

    // 의도(Intent) 검색 필터
    if (intentFilter) {
      result = result.filter(item => item.intent.toLowerCase().includes(intentFilter.toLowerCase()));
    }

    // 대표 질문 검색 필터
    if (questionFilter) {
      result = result.filter(item => item.question.toLowerCase().includes(questionFilter.toLowerCase()));
    }

    setFilteredKnowledge(result);
    setCurrentPage(1); // ✨ 필터 변경 시 1페이지로 리셋
  }, [activeTab, knowledgeBase, intentFilter, questionFilter]);

  // --- 페이지네이션 계산 ---
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
  
  const handleSubmitKnowledge = (data: Omit<KnowledgeItem, 'id' | 'isFaq' | 'isActive'>) => {
    if (modalMode === 'create') {
      console.log("새 지식 추가:", data);
      // TODO: 새 데이터 추가 로직 (예: setKnowledgeBase([...knowledgeBase, newData]))
    } else {
      console.log(`ID ${selectedItem?.id} 지식 수정:`, data);
      // TODO: 데이터 수정 로직 (예: setKnowledgeBase(knowledgeBase.map(...)))
    }
    setIsModalOpen(false);
  };

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
              {/* ✨ 페이지네이션 된 데이터를 map으로 렌더링 */}
              {paginatedKnowledge.map(item => (
                <S.Tr key={item.id} $isInactive={!item.isActive}>
                  <td><input type="checkbox" checked={item.isFaq} readOnly/></td>
                  <td>{item.intent}</td>
                  <td style={{textAlign: 'left'}}>{item.question}</td>
                  <td style={{textAlign: 'left', maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.answer}</td>
                  <td>
                    <S.ActionButton variant="수정" onClick={() => handleOpenModal('edit', item)}>수정</S.ActionButton>
                    <S.ActionButton variant="중지">{item.isActive ? '중지' : '재개'}</S.ActionButton>
                  </td>
                </S.Tr>
              ))}
            </tbody>
          </S.Table>

          {/* ✨ 페이지네이션 컴포넌트 추가 */}
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