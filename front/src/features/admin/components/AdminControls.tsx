import * as S from './AdminControlsStyle';

interface Props {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

const AdminControls: React.FC<Props> = ({ searchTerm, onSearchTermChange }) => {
  return (
    <S.Wrapper>
      <S.ControlRow>
        <S.Label>상품명</S.Label>
        <S.SearchInputWrapper>
          <S.SearchInput 
            type="text" 
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
          />
          <S.SearchIcon>🔍</S.SearchIcon>
        </S.SearchInputWrapper>
      </S.ControlRow>
      <S.ControlRow>
        <S.Label>등록 날짜</S.Label>
        <S.DateFilterGroup>
          <S.DateInput type="date" />
          <span>~</span>
          <S.DateInput type="date" />
        </S.DateFilterGroup>
      </S.ControlRow>
    </S.Wrapper>
  );
};

export default AdminControls;