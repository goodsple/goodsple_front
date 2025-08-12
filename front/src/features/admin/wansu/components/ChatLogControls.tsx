import * as S from './ChatLogControlsStyle';

const ChatLogControls = () => {
  // TODO: 검색어 상태와 핸들러 추가
  return (
    <S.Wrapper>
      <S.ControlRow>
        <S.Label>사용자 ID</S.Label>
        <S.SearchInput type="text" placeholder="아이디로 검색"/>
      </S.ControlRow>
      <S.ControlRow>
        <S.Label>채팅 내용</S.Label>
        <S.SearchInput type="text" placeholder="내용으로 검색"/>
      </S.ControlRow>
    </S.Wrapper>
  );
};

export default ChatLogControls;