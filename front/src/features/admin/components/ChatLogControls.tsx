import * as S from './ChatLogControlsStyle';

interface Props {
  activeTab: 'FAQ' | 'QNA';
  onTabChange: (tab: 'FAQ' | 'QNA') => void;
  // TODO: 검색어 상태와 핸들러 추가
}

const ChatLogControls: React.FC<Props> = ({ activeTab, onTabChange }) => {
  return (
    <S.Wrapper>
      <S.FilterSection>
        <S.ControlRow>
          <S.Label>사용자 ID</S.Label>
          <S.SearchInput type="text" placeholder="아이디로 검색"/>
        </S.ControlRow>
        <S.ControlRow>
          <S.Label>채팅 내용</S.Label>
          <S.SearchInput type="text" placeholder="내용으로 검색"/>
        </S.ControlRow>
      </S.FilterSection>

      <S.TabGroup>
        <S.TabButton 
          $isActive={activeTab === 'FAQ'}
          onClick={() => onTabChange('FAQ')}
        >
          FAQ
        </S.TabButton>
        <S.TabButton 
          $isActive={activeTab === 'QNA'}
          onClick={() => onTabChange('QNA')}
        >
          QNA
        </S.TabButton>
      </S.TabGroup>
    </S.Wrapper>
  );
};

export default ChatLogControls;