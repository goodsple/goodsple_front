import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../api/axiosInstance';
import * as S from './AdminUserPageStyle';

import UserTable from '../components/UserTable';
import SearchControls from '../components/SearchControls';
import Pagination from '../../../../components/common/pagination/Pagination';
import type { AdminUserDetail, AdminUserSummary, SearchCriteria } from '../types/searchUser';
import ConfirmModal from '../../../../components/common/modal/ConfirmModal';
import UserDetailModal from '../modal/UserDetailModal';

import {
  PAGE_SIZE,
  buildAdminUserQueryParams,
  mapBackendSummaryToView,
  mapBackendDetailToView,
  buildUserUpdatePayload,
  toPageCount,
  type BackendUserSummary,
  type BackendUserDetail,
} from '../lib/adapters';
import { decodeJwtRole } from '../../../../utils/jwt';

const AdminUserPage: React.FC = () => {
  const [users, setUsers]     = useState<AdminUserSummary[]>([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages]   = useState(1);

  const navigate = useNavigate();

  const [criteria, setCriteria] = useState<SearchCriteria>({
    searchBy: 'loginId',
    keyword: '',
    roles: [],
    statuses: [],
    fromDate: '',
    toDate: '',
  });

  // 삭제/상세/결과 모달
  const [isModalOpen, setIsModalOpen]         = useState(false);
  const [userIdToDelete, setUserIdToDelete]   = useState<string | null>(null);
  const [selectedUser, setSelectedUser]       = useState<AdminUserDetail | null>(null);
  const [isDetailOpen, setIsDetailOpen]       = useState(false);
  const [isResultOpen, setIsResultOpen]       = useState(false);
  const [resultMessage, setResultMessage]     = useState('');
  const [closeDetailAfterResult, setCloseDetailAfterResult] = useState(false);

  // 정렬
  const [sortKey, setSortKey]       = useState<'levelScore' | 'joinDate' | null>(null);
  const [sortOrder, setSortOrder]   = useState<'asc' | 'desc'>('asc');

  // ⭐ 최신 요청 id & AbortController (이전 요청 취소)
  const latestReqIdRef = useRef(0);
  const abortRef       = useRef<AbortController | null>(null);

  // 목록 로드 (최신요청만 반영 + 유연 파싱)
  const fetchUsers = async () => {
    const myId = ++latestReqIdRef.current;

    // 직전 요청 취소(선택이지만 권장)
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    setLoading(true);
    try {
      const params = buildAdminUserQueryParams(criteria, currentPage);
      console.log('[AdminUserPage/auth] FETCH - criteria=', criteria, 'page=', currentPage, 'params=', params);

      const [listRes, countRes] = await Promise.all([
        axiosInstance.get<BackendUserSummary[] | any>('/admin/users',       { params, signal: ac.signal }),
        axiosInstance.get<number | any>            ('/admin/users/count', { params, signal: ac.signal }),
      ]);

      // 더 최신 요청이 있으면 이 응답은 무시
      if (myId !== latestReqIdRef.current) return;

      // 배열 / Page(content|items|data) 모두 지원
      const listPayload = listRes.data;
      const rawRows =
        Array.isArray(listPayload) ? listPayload
        : Array.isArray(listPayload?.content) ? listPayload.content
        : Array.isArray(listPayload?.items)   ? listPayload.items
        : Array.isArray(listPayload?.data)    ? listPayload.data
        : [];

      // 디버그(원하는 개수로 줄었는지)
      console.log('[AdminUserPage/auth] rows(raw)=', rawRows.length, rawRows?.[0]);

      setUsers(rawRows.map(mapBackendSummaryToView));

      let totalCount: number =
        typeof countRes.data === 'number'
          ? countRes.data
          : (countRes.data?.total ??
             countRes.data?.totalCount ??
             countRes.data?.count ??
             listPayload?.totalElements ??
             listPayload?.total ??
             rawRows.length);

      if (!Number.isFinite(totalCount)) totalCount = rawRows.length;
      setTotalPages(toPageCount(totalCount, PAGE_SIZE));
    } catch (err: any) {
      if (err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED') return;
      if (myId !== latestReqIdRef.current) return;
      console.error('[AdminUser] fetchUsers error:', err);
      setUsers([]);
      setTotalPages(1);
    } finally {
      if (myId === latestReqIdRef.current) setLoading(false);
    }
  };

  // 언마운트 시 진행 중 요청 취소
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  // 초기 진입 + 검색/페이지 변경 시
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const role  = decodeJwtRole(token);
    if (!token)       { navigate('/login', { replace: true }); return; }
    if (role !== 'ADMIN') { navigate('/', { replace: true }); return; }
    fetchUsers();
  }, [currentPage, criteria]);

  // 정렬
  const handleSort = (key: 'levelScore' | 'joinDate') => {
    if (sortKey === key) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortOrder('asc'); }
  };
  const sortedUsers = useMemo(() => {
    if (!sortKey) return users;
    const list = [...users];
    if (sortKey === 'joinDate') {
      list.sort((a, b) => {
        const aTime = new Date(a.joinDate).getTime();
        const bTime = new Date(b.joinDate).getTime();
        return sortOrder === 'asc' ? aTime - bTime : bTime - aTime;
      });
    } else {
      list.sort((a, b) =>
        sortOrder === 'asc' ? a.level.score - b.level.score : b.level.score - a.level.score
      );
    }
    return list;
  }, [users, sortKey, sortOrder]);

  // 검색 제출
  const handleSearch = useCallback((next: SearchCriteria) => {
    setCriteria(next);
    setCurrentPage(1);
  }, []);

  // 상세/삭제/저장
  const handleRowClick = async (row: AdminUserSummary) => {
    try {
      const res = await axiosInstance.get<BackendUserDetail>(`/admin/users/${row.userId}`);
      setSelectedUser(mapBackendDetailToView(res.data));
      setIsDetailOpen(true);
    } catch {
      setSelectedUser(null);
      setIsDetailOpen(false);
      setResultMessage('상세 정보를 불러오지 못했습니다.');
      setIsResultOpen(true);
    }
  };

  const confirmDelete = (userId: string) => {
    setUserIdToDelete(userId);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setUserIdToDelete(null);
  };

  const handleDelete = async () => {
    if (!userIdToDelete) return;
    const target = users.find(u => u.userId === userIdToDelete);
    if (!target || target.status !== 'WITHDRAWN') {
      setIsModalOpen(false);
      setResultMessage('탈퇴 상태에서만 삭제할 수 있습니다.');
      setIsResultOpen(true);
      return;
    }
    try {
      await axiosInstance.delete(`/admin/users/${userIdToDelete}`);
      setIsModalOpen(false);
      setUserIdToDelete(null);
      await fetchUsers(); // ✅ 중복 호출하지 말 것
      setResultMessage('회원이 삭제되었습니다.');
      setIsResultOpen(true);
    } catch (e:any) {
      setIsModalOpen(false);
      setUserIdToDelete(null);
      setResultMessage(e?.response?.data?.message || '삭제 중 오류가 발생했습니다.');
      setIsResultOpen(true);
    }
  };

  const handleSave = async ({ userId, role, status }: {
    userId: string; role: AdminUserSummary['role']; status: AdminUserSummary['status'];
  }) => {
    try {
      await axiosInstance.patch(`/admin/users/${userId}`, buildUserUpdatePayload({ role, status }));
      await fetchUsers();
      setResultMessage('변경 사항이 저장되었습니다.');
      setCloseDetailAfterResult(true);
      setIsResultOpen(true);
    } catch (e:any) {
      setResultMessage(e?.response?.data?.message || '변경 중 오류가 발생했습니다.');
      setCloseDetailAfterResult(false);
      setIsResultOpen(true);
    }
  };

  const handleResultConfirm = () => {
    setIsResultOpen(false);
    if (closeDetailAfterResult) {
      setIsDetailOpen(false);
      setSelectedUser(null);
      setCloseDetailAfterResult(false);
    }
  };

  return (
    <S.Container>
      <SearchControls onSearch={handleSearch} />

      <S.TableWrap>
        {/* 🔎 부모 → 자식으로 내려가는 실제 데이터 로그 */}
        {console.log('[PARENT] users.len=', users.length, 'sorted.len=', sortedUsers.length, 'ids=', sortedUsers.map(u => u.userId))}
        <UserTable
          users={sortedUsers}
          loading={loading}
          onRowClick={handleRowClick}
          onDelete={confirmDelete}
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      </S.TableWrap>

      <S.PaginationWrap>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </S.PaginationWrap>

      {isDetailOpen && (
        <UserDetailModal
          key={selectedUser?.userId ?? 'empty'}
          isOpen={isDetailOpen}
          user={selectedUser}
          onClose={() => setIsDetailOpen(false)}
          onSave={handleSave}
        />
      )}

      <ConfirmModal
        isOpen={isModalOpen}
        content={
          <span>
            정말 이 회원을 삭제하시겠습니까?<br/>
            삭제 시 회원 복구할 수 없습니다.
          </span>
        }
        showCancel
        confirmText="삭제"
        cancelText="취소"
        onConfirm={handleDelete}
        onCancel={handleCancel}
      />

      <ConfirmModal
        isOpen={isResultOpen}
        content={resultMessage}
        showCancel={false}
        confirmText="확인"
        onConfirm={handleResultConfirm}
      />
    </S.Container>
  );
};

export default AdminUserPage;
