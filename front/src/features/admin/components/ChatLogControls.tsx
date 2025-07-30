import * as S from './ChatLogControlsStyle';

const ChatLogControls = () => {
  // TODO: 필터링 로직 구현
  return (
    <S.Wrapper>
      <S.ControlRow>
        <S.SearchGroup>
          <S.Label>사용자 ID</S.Label>
          <S.SearchInput type="text" />
        </S.SearchGroup>
        <S.SearchGroup>
          <S.Label>채팅 내용</S.Label>
          <S.SearchInput type="text" />
        </S.SearchGroup>
      </S.ControlRow>
      <S.ControlRow>
        <S.TabGroup>
          <S.TabButton $isActive={true}>FAQ</S.TabButton>
          <S.TabButton $isActive={false}>QNA</S.TabButton>
        </S.TabGroup>
      </S.ControlRow>
    </S.Wrapper>
  );
};

export default ChatLogControls;