import { useEffect, useState } from 'react';
import type { KnowledgeItem } from '../mock/knowledgeBaseData';
import { mockKnowledgeBaseData } from '../mock/knowledgeBaseData';
import KnowledgeModal from '../modals/KnowledgeModal'; // ✨ 모달 임포트
import * as S from './AdminKnowledgeBasePageStyle';

const AdminKnowledgeBasePage = () => {
  const [knowledgeBase, setKnowledgeBase] = useState(mockKnowledgeBaseData);
  const [filteredKnowledge, setFilteredKnowledge] = useState<KnowledgeItem[]>([]);
  const [activeTab, setActiveTab] = useState<'FAQ' | 'QNA'>('FAQ');
  
  // ✨ 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null);

  useEffect(() => {
    let result = activeTab === 'FAQ'
      ? knowledgeBase.filter(item => item.isFaq)
      : knowledgeBase; // QNA 탭은 모든 항목 표시
    setFilteredKnowledge(result);
  }, [activeTab, knowledgeBase]);
  
  // ✨ 모달을 여는 핸들러
  const handleOpenModal = (mode: 'create' | 'edit', item: KnowledgeItem | null = null) => {
    setModalMode(mode);
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  
  // ✨ 폼 제출 핸들러 (실제로는 API 호출 후 데이터 갱신)
  const handleSubmitKnowledge = (data: Omit<KnowledgeItem, 'id' | 'isFaq' | 'isActive'>) => {
    if (modalMode === 'create') {
      console.log("새 지식 추가:", data);
      // TODO: 새 지식을 knowledgeBase 상태에 추가하는 로직
    } else {
      console.log(`ID ${selectedItem?.id} 지식 수정:`, data);
      // TODO: selectedItem.id를 이용해 knowledgeBase 상태에서 해당 항목을 수정하는 로직
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <S.PageContainer>
        <S.ContentCard>
          {/* ... 컨트롤 영역 ... */}
          <S.TabGroup>
            <S.StatusFilterGroup>
              <S.StatusTab $isActive={activeTab === 'FAQ'} onClick={() => setActiveTab('FAQ')}>FAQ</S.StatusTab>
              <S.StatusTab $isActive={activeTab === 'QNA'} onClick={() => setActiveTab('QNA')}>QNA</S.StatusTab>
            </S.StatusFilterGroup>
            {/* ✨ '지식 추가' 버튼에 모달 열기 핸들러 연결 */}
            <S.AddButton onClick={() => handleOpenModal('create')}>지식 추가</S.AddButton>
          </S.TabGroup>

          <S.Table>
            {/* ... thead ... */}
            <tbody>
              {filteredKnowledge.map(item => (
                <S.Tr key={item.id} $isInactive={!item.isActive}>
                  <td><input type="checkbox" checked={item.isFaq} readOnly/></td>
                  <td>{item.intent}</td>
                  <td style={{textAlign: 'left'}}>{item.question}</td>
                  <td style={{textAlign: 'left', maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.answer}</td>
                  <td>
                    {/* ✨ '수정' 버튼에 모달 열기 핸들러 연결 */}
                    <S.ActionButton variant="수정" onClick={() => handleOpenModal('edit', item)}>수정</S.ActionButton>
                    <S.ActionButton variant="중지">{item.isActive ? '중지' : '재개'}</S.ActionButton>
                  </td>
                </S.Tr>
              ))}
            </tbody>
          </S.Table>
        </S.ContentCard>
      </S.PageContainer>
      
      {/* ✨ 모달 렌더링 */}
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