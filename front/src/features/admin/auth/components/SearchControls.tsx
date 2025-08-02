import { useState } from "react";
import * as S from './SearchControlsStyle';
import type { SearchCriteria } from "../types/searchUser";

interface Props {
    onSearch: (criteria: SearchCriteria) => void;
}

const SearchControls: React.FC<Props> = ({ onSearch }) => {
    const [keyword, setKeyword] = useState('');
    const [searchBy, setSearchBy] = useState<'loginId' | 'nickname'>('loginId');
    const [roleMember, setRoleMember] = useState(false);
    const [roleAdmin, setRoleAdmin] = useState(false);
    const [statusActive, setStatusActive] = useState(false);
    const [statusSuspended, setStatusSuspended] = useState(false);
    const [statusWithdrawn, setStatusWithdrawn] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

       // 1) Union 타입 배열로 선언
        const roles: SearchCriteria['roles'] = [];
        if (roleMember) roles.push('USER');
        if (roleAdmin)  roles.push('ADMIN');

        const statuses: SearchCriteria['statuses'] = [];
        if (statusActive)    statuses.push('ACTIVE');
        if (statusSuspended) statuses.push('SUSPENDED');
        if (statusWithdrawn) statuses.push('WITHDRAWN');
      
         // 2) onSearch 호출
        onSearch({
            searchBy,
            keyword,
            roles,
            statuses,
            fromDate,
            toDate,
        });
    };
  
    return (
        <S.Form onSubmit={handleSubmit}>
        {/* 첫 번째 줄: 조건 검색 + 회원가입일 + 회원구분 */}
        <S.Row>
          <S.Group>
            <label>조건 검색</label>
            <select value={searchBy} onChange={e => setSearchBy(e.target.value as any)}>
              <option value="loginId">회원ID</option>
              <option value="nickname">닉네임</option>
            </select>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
            />
            <S.SearchButton type="submit">검색</S.SearchButton>
          </S.Group>
  
          <S.Group>
          <label>회원구분</label>
          <label>
            <input
              type="checkbox"
              checked={roleMember}
              onChange={e => setRoleMember(e.target.checked)}
            /> 회원
          </label>
          <label>
            <input
              type="checkbox"
              checked={roleAdmin}
              onChange={e => setRoleAdmin(e.target.checked)}
            /> 관리자
          </label>
        </S.Group>
        </S.Row>
  
        <S.Row>
        <S.Group>
          <label>회원 가입일</label>
          <input
            type="date"
            value={fromDate}
            onChange={e => setFromDate(e.target.value)}
          />
          <span>~</span>
          <input
            type="date"
            value={toDate}
            onChange={e => setToDate(e.target.value)}
          />
        </S.Group>

        <S.Group>
          <label>활동상태</label>
          <label>
            <input
              type="checkbox"
              checked={statusActive}
              onChange={e => setStatusActive(e.target.checked)}
            /> 활동 중
          </label>
          <label>
            <input
              type="checkbox"
              checked={statusSuspended}
              onChange={e => setStatusSuspended(e.target.checked)}
            /> 정지
          </label>
          <label>
            <input
              type="checkbox"
              checked={statusWithdrawn}
              onChange={e => setStatusWithdrawn(e.target.checked)}
            /> 탈퇴
          </label>
        </S.Group>
      </S.Row>
    </S.Form>
    );
}
export default SearchControls;