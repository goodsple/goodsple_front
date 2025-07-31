import { useEffect, useState } from 'react';
import { mockKnowledgeBaseData } from '../mock/knowledgeBaseData';
import * as S from './AdminKnowledgeBasePageStyle';

const AdminKnowledgeBasePage = () => {
  const [knowledgeBase, setKnowledgeBase] = useState(mockKnowledgeBaseData);
  const [filteredKnowledge, setFilteredKnowledge] = useState(knowledgeBase);
  const [activeTab, setActiveTab] = useState<'FAQ' | 'QNA'>('FAQ');

  useEffect(() => {
    const result = knowledgeBase.filter(item => 
      activeTab === 'FAQ' ? item.isFaq : !item.isFaq
    );
    setFilteredKnowledge(result);
  }, [activeTab, knowledgeBase]);

  // TODO: 체크박스 및 중지/재개 핸들러 구현

  return (
    <S.PageContainer>
      <S.ContentCard>
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
          <S.AddButton>지식 추가</S.AddButton>
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
              <tr key={item.id}>
                <td><input type="checkbox" checked={item.isFaq} /></td>
                <td>{item.intent}</td>
                <td style={{textAlign: 'left'}}>{item.question}</td>
                <td style={{textAlign: 'left', maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.answer}</td>
                <td>
                  <S.ActionButton variant="수정">수정</S.ActionButton>
                  <S.ActionButton variant="중지">{item.isActive ? '중지' : '재개'}</S.ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </S.Table>
        {/* TODO: 페이지네이션 컴포넌트 추가 */}
      </S.ContentCard>
    </S.PageContainer>
  );
};

export default AdminKnowledgeBasePage;