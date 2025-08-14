// src/features/admin/auth/components/SearchControls.tsx
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import * as S from "./SearchControlsStyle";
import type { SearchCriteria } from "../types/searchUser";

interface Props {
  onSearch: (criteria: SearchCriteria) => void;
}

const SearchControls: React.FC<Props> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");
  const [searchBy, setSearchBy] = useState<"nickname" | "userId">("nickname");

  // ✅ IME(한글) 조합 상태
  const [isComposing, setIsComposing] = useState(false);

  // 역할
  const [roleMember, setRoleMember] = useState(false);
  const [roleAdmin,  setRoleAdmin]  = useState(false);

  // 상태
  const [statusActive,     setStatusActive]     = useState(false);
  const [statusSuspended,  setStatusSuspended]  = useState(false);
  const [statusWithdrawn,  setStatusWithdrawn]  = useState(false);

  // 가입일
  const [fromDate, setFromDate] = useState("");
  const [toDate,   setToDate]   = useState("");

  // 날짜 보정: from > to면 자동 교환
  const normalizedDates = useMemo(() => {
    if (fromDate && toDate && fromDate > toDate) {
      return { from: toDate, to: fromDate };
    }
    return { from: fromDate, to: toDate };
  }, [fromDate, toDate]);

  // 최초 마운트 이후에만 자동 검색
  const didMountRef = useRef(false);

  // ✅ 공통 필터(roles/statuses/dates/searchBy)만 모은 객체
  const commonFilters = useMemo(() => {
    const roles: SearchCriteria["roles"] = [];
    if (roleMember) roles.push("USER");
    if (roleAdmin)  roles.push("ADMIN");

    const statuses: SearchCriteria["statuses"] = [];
    if (statusActive)     statuses.push("ACTIVE");
    if (statusSuspended)  statuses.push("SUSPENDED");
    if (statusWithdrawn)  statuses.push("WITHDRAWN");

    return {
      searchBy,
      roles,
      statuses,
      fromDate: normalizedDates.from,
      toDate:   normalizedDates.to,
    };
  }, [
    roleMember, roleAdmin,
    statusActive, statusSuspended, statusWithdrawn,
    searchBy, normalizedDates
  ]);

  // userId 모드일 때 숫자만 유지
  const normalizeKeyword = useCallback((raw: string) => {
    return searchBy === "userId" ? raw.replace(/\D+/g, "") : raw;
  }, [searchBy]);

  // 수동 제출용(버튼/Enter)
  const submitNow = useCallback(() => {
    // 조합 중에는 제출 금지 (끝글자 중복/미완성 방지)
    if (isComposing) return;

    // 최종 키워드 정규화
    const k = normalizeKeyword(keyword).trim();

    const criteria: SearchCriteria = {
      ...commonFilters,
      keyword: k,
    };
    onSearch(criteria);
  }, [isComposing, normalizeKeyword, keyword, commonFilters, onSearch]);

  // 자동 검색: 역할/상태/날짜/검색기준 변경 시 (키워드는 제외)
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    // 조합 중에는 트리거하지 않음
    if (isComposing) return;

    const t = setTimeout(() => {
      onSearch({
        ...commonFilters,
        keyword: "", // 자동검색에선 키워드 제외
      });
    }, 250);
    return () => clearTimeout(t);
  }, [commonFilters, isComposing, onSearch]);

  // 폼 submit (수동 검색)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitNow();
  };

  // 초기화
  const handleReset = () => {
    setKeyword("");
    setSearchBy("nickname");
    setRoleMember(false);
    setRoleAdmin(false);
    setStatusActive(false);
    setStatusSuspended(false);
    setStatusWithdrawn(false);
    setFromDate("");
    setToDate("");

    onSearch({
      searchBy: "nickname",
      keyword: "",
      roles: [],
      statuses: [],
      fromDate: "",
      toDate: "",
    });
  };

  return (
    <S.Form onSubmit={handleSubmit}>
      {/* 첫 줄: 조건 검색 + 회원구분 */}
      <S.Row>
        <S.Group>
          <label>조건 검색</label>
          <select
            value={searchBy}
            onChange={e => setSearchBy(e.target.value as "nickname" | "userId")}
          >
            <option value="nickname">닉네임</option>
            <option value="userId">회원번호</option>
          </select>

          <input
            type="text"
            placeholder={searchBy === "userId" ? "회원번호 입력(숫자)" : "검색어를 입력하세요"}
            value={keyword}
            // 조합 시작/끝: 플래그만 토글 (값은 건드리지 않음)
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            // 입력 표시는 항상 onChange에서 한 번만
            onChange={(e) => {
              const v = normalizeKeyword(e.target.value);
              setKeyword(v);
            }}
            // 엔터 제출은 조합 중엔 막기
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (!isComposing) {
                  (document.activeElement as HTMLElement)?.blur?.();
                  submitNow();
                }
              }
            }}
            inputMode={searchBy === "userId" ? "numeric" : "text"}
            pattern={searchBy === "userId" ? "[0-9]*" : undefined}
          />

          <S.SearchButton type="submit">검색</S.SearchButton>
          <S.ResetButton type="button" onClick={handleReset}>초기화</S.ResetButton>
        </S.Group>

        <S.Group>
          <label>회원구분</label>
          <label>
            <input
              type="checkbox"
              checked={roleMember}
              onChange={(e) => setRoleMember(e.target.checked)}
            /> 회원
          </label>
          <label>
            <input
              type="checkbox"
              checked={roleAdmin}
              onChange={(e) => setRoleAdmin(e.target.checked)}
            /> 관리자
          </label>
        </S.Group>
      </S.Row>

      {/* 둘째 줄: 가입일 + 활동상태 */}
      <S.Row>
        <S.Group>
          <label>회원 가입일</label>
          <input
            type="date"
            value={fromDate}
            max={toDate || undefined}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <span>~</span>
          <input
            type="date"
            value={toDate}
            min={fromDate || undefined}
            onChange={(e) => setToDate(e.target.value)}
          />
        </S.Group>

        <S.Group>
          <label>활동상태</label>
          <label>
            <input
              type="checkbox"
              checked={statusActive}
              onChange={(e) => setStatusActive(e.target.checked)}
            /> 활동 중
          </label>
          <label>
            <input
              type="checkbox"
              checked={statusSuspended}
              onChange={(e) => setStatusSuspended(e.target.checked)}
            /> 정지
          </label>
          <label>
            <input
              type="checkbox"
              checked={statusWithdrawn}
              onChange={(e) => setStatusWithdrawn(e.target.checked)}
            /> 탈퇴
          </label>
        </S.Group>
      </S.Row>
    </S.Form>
  );
};

export default SearchControls;
