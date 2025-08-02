// src/features/admin/users/pages/AdminUserPage.tsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../api/axiosInstance';
import * as S from './AdminUserPageStyle';
import UserTable from '../components/UserTable';
import SearchControls from '../components/SearchControls';
import Pagination from '../../../../components/common/pagination/Pagination'; // 공통 컴포넌트
import type { AdminUser, SearchCriteria } from '../types/searchUser';
import { mockUsers } from '../mock/mockUsers';
import ConfirmModal from '../../../../components/common/modal/ConfirmModal';
import UserDetailModal from '../modal/UserDetailModal';

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const AdminUserPage: React.FC = () => {
  const [users, setUsers]     = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [criteria, setCriteria]     = useState<SearchCriteria>({
    searchBy: 'loginId',
    keyword: '',
    roles: [],
    statuses: [],
    fromDate: '',
    toDate: '',
  });
   // 모달 관리용 state
   const [isModalOpen, setIsModalOpen]       = useState(false);
   const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);

   const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
   const [isDetailOpen, setIsDetailOpen] = useState(false);

   const [isResultOpen, setIsResultOpen]     = useState(false);
   const [resultMessage, setResultMessage]   = useState('');

   // 목데이터 테스트용
    useEffect(() => {
    setUsers(mockUsers);
    }, []);

    // 초기 혹은 criteria/currentPage 변경 시 호출
    // useEffect(() => {
    //     fetchUsers();
    // }, [currentPage, criteria]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get<{
        items: AdminUser[];
        totalPages: number;
      }>('/admin/users', {
        params: {
            page: currentPage,
            size: 10,
            ...criteria,
        },
      });
      setUsers(res.data.items);
      setTotalPages(res.data.totalPages);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (c: SearchCriteria) => {
    setCriteria(c);
    setCurrentPage(1);  // 검색 조건 바뀌면 1페이지로
  };
 
    // 테이블 행 클릭 핸들러
    const handleRowClick = (user: AdminUser) => {
        setSelectedUser(user);
        setIsDetailOpen(true);
    };

    // 모달에서 '취소' 누르면 닫기
    const handleCancel = () => {
        setIsModalOpen(false);
        setUserIdToDelete(null);
    };

    // 삭제 절차: 모달 열기
    const confirmDelete = (userId: string) => {
        setUserIdToDelete(userId);
        setIsModalOpen(true);
    };

    // 모달에서 '확인' 누르면 실제 삭제
    const handleDelete = async () => {
        if (!userIdToDelete) return;
        await axiosInstance.delete(`/admin/users/${userIdToDelete}`);
        setIsModalOpen(false);
        setUserIdToDelete(null);
        fetchUsers();

        // 결과 모달
        setResultMessage('회원이 삭제되었습니다.');
        setIsResultOpen(true)
    };

    // 모달 저장
    const handleSave = async ({ userId, role, status }: { userId: string; role: AdminUser['role']; status: AdminUser['status'] }) => {
        await axiosInstance.put(`/admin/users/${userId}`, { role, status });
        setIsDetailOpen(false);
        fetchUsers();  // 목록 갱신
    };

    const handleResultConfirm = () => {
        setIsResultOpen(false);
    };


  return (
    <S.Container>
      <SearchControls onSearch={handleSearch} />

      <S.TableWrap>
        <UserTable
          users={users}
          loading={loading}
          onRowClick={handleRowClick}
          onDelete={confirmDelete}  
        />
      </S.TableWrap>

        <S.PaginationWrap>
            <Pagination
                 currentPage={currentPage}
                 totalPages={totalPages}
                 onPageChange={setCurrentPage}
            />
        </S.PaginationWrap>
        <UserDetailModal
        isOpen={isDetailOpen}
        user={selectedUser}
        onClose={() => setIsDetailOpen(false)}
        onSave={handleSave}
      />
        <ConfirmModal
        isOpen={isModalOpen}
        content={
            <span>
              정말 이 회원을 삭제하시겠습니까?<br/>
              삭제 시 회원 복구할 수 없습니다.
            </span>
        }
        showCancel={true}
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
