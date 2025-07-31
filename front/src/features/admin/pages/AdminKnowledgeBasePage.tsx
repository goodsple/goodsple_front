import { useEffect, useState } from 'react';
import type { KnowledgeItem } from '../mock/knowledgeBaseData';
import { mockKnowledgeBaseData } from '../mock/knowledgeBaseData';
import * as S from './AdminKnowledgeBasePageStyle';

const AdminKnowledgeBasePage = () => {
  const [knowledgeBase] = useState(mockKnowledgeBaseData);
  const [filteredKnowledge, setFilteredKnowledge] = useState<KnowledgeItem[]>([]);
  const [activeTab, setActiveTab] = useState<'FAQ' | 'QNA'>('FAQ');

  useEffect(() => {
    let result = [];
    if (activeTab === 'FAQ') {
      // FAQ 탭: isFaq가 true인 항목만 표시
      result = knowledgeBase.filter(item => item.isFaq);
    } else {
      // QNA 탭: 모든 항목 표시
      result = knowledgeBase;
    }
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
              <S.Tr key={item.id} $isInactive={!item.isActive}>
                <td><input type="checkbox" checked={item.isFaq} readOnly/></td>
                <td>{item.intent}</td>
                <td style={{textAlign: 'left'}}>{item.question}</td>
                <td style={{textAlign: 'left', maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.answer}</td>
                <td>
                  <S.ActionButton variant="수정">수정</S.ActionButton>
                  <S.ActionButton variant="중지">{item.isActive ? '중지' : '재개'}</S.ActionButton>
                </td>
              </S.Tr>
            ))}
          </tbody>
        </S.Table>
        {/* TODO: 페이지네이션 컴포넌트 추가 */}
      </S.ContentCard>
    </S.PageContainer>
  );
};

export default AdminKnowledgeBasePage;