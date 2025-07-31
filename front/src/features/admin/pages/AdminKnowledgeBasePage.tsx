import { useEffect, useState } from 'react';
import type { KnowledgeItem } from '../mock/knowledgeBaseData';
import { mockKnowledgeBaseData } from '../mock/knowledgeBaseData';
import KnowledgeModal from '../modals/KnowledgeModal';
import * as S from './AdminKnowledgeBasePageStyle';

const AdminKnowledgeBasePage = () => {
  const [knowledgeBase, setKnowledgeBase] = useState(mockKnowledgeBaseData);
  const [filteredKnowledge, setFilteredKnowledge] = useState<KnowledgeItem[]>([]);
  const [activeTab, setActiveTab] = useState<'FAQ' | 'QNA'>('FAQ');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null);

  useEffect(() => {
    let result = [];
    if (activeTab === 'FAQ') {
      result = knowledgeBase.filter(item => item.isFaq);
    } else {
      result = knowledgeBase;
    }
    setFilteredKnowledge(result);
  }, [activeTab, knowledgeBase]);
  
  const handleOpenModal = (mode: 'create' | 'edit', item: KnowledgeItem | null = null) => {
    setModalMode(mode);
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  
  const handleSubmitKnowledge = (data: Omit<KnowledgeItem, 'id' | 'isFaq' | 'isActive'>) => {
    if (modalMode === 'create') {
      console.log("새 지식 추가:", data);
    } else {
      console.log(`ID ${selectedItem?.id} 지식 수정:`, data);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <S.PageContainer>
        <S.ContentCard>
          {/* ✨ 이 부분이 없어졌던 입력창(컨트롤) 영역입니다. */}
          <S.ControlsWrapper>
            <S.ControlRow>
              <S.Label>의도</S.Label>
              <S.SearchInput type="text" placeholder="intent 검색" />
            </S.ControlRow>
            <S.ControlRow>
              <S.Label>대표 질문</S.Label>
              <S.SearchInput type="text" placeholder="질문 내용 검색" />
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
              {filteredKnowledge.map(item => (
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