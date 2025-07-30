import * as S from './AdminControlsStyle';

interface Props {
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

const AdminControls: React.FC<Props> = ({ 
  statusFilter, onStatusFilterChange, searchTerm, onSearchTermChange 
}) => {
  const statuses = ['전체', '예정', '진행중', '종료', '중지'];

  return (
    <S.Wrapper>
      <S.SearchGroup>
        <S.SearchSelect>
          <option>상품명</option>
        </S.SearchSelect>
        <S.SearchInput 
          type="text" 
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
        <S.SearchButton>🔍</S.SearchButton>
      </S.SearchGroup>
      <S.FilterGroup>
        <span>등록 날짜</span>
        <S.DateInput type="date" />
        <span>-</span>
        <S.DateInput type="date" />
      </S.FilterGroup>
      <S.StatusFilterGroup>
        {statuses.map(status => (
          <S.StatusButton 
            key={status}
            onClick={() => onStatusFilterChange(status)}
            className={statusFilter === status ? 'active' : ''}
          >
            {status}
          </S.StatusButton>
        ))}
      </S.StatusFilterGroup>
      <S.RegisterButton>경매 등록</S.RegisterButton>
    </S.Wrapper>
  );
};

export default AdminControls;