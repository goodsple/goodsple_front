// src/features/admin/users/components/UserTable.tsx
import React from 'react';
import * as S from './UserTableStyle';
import type { AdminUser } from '../types/searchUser';

interface Props {
  users: AdminUser[];
  loading: boolean;
  onDelete:  (userId: string) => void;
  onRowClick?: (user: AdminUser) => void; 
}

const UserTable: React.FC<Props> = ({ users, loading, onDelete, onRowClick }) => {
  if (loading) return <div>로딩 중...</div>;
  if (users.length === 0) return <div>조회된 회원이 없습니다.</div>;

  return (
    <S.Table>
      <thead>
        <tr>
          <th>회원ID</th>
          <th>닉네임</th>
          <th>작성 후기 수</th>
          <th>거래 횟수</th>
          <th>신고 건수</th>
          <th>등급(점수)</th>
          <th>회원 구분</th>
          <th>활동 상태</th>
          <th>가입일</th>
          <th>관리</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.userId} onClick={() => onRowClick?.(u)}>
            <td>{u.userId}</td>
            <td>{u.nickname}</td>
            <td>{u.reviewCount}</td>
            <td>{u.transactionCount}</td>
            <td>{u.reportCount}</td>
            <td>{u.level.label} ({u.level.score})</td>
            <td>{u.role === 'ADMIN' ? '관리자' : '회원'}</td>
            <td>
              {u.status === 'ACTIVE' && '활동 중'}
              {u.status === 'SUSPENDED' && '정지'}
              {u.status === 'WITHDRAWN' && '탈퇴'}
            </td>
            <td>{u.joinDate}</td>
            <td>
              <S.Button 
                danger 
                onClick={e => {  e.stopPropagation();  onDelete(u.userId);}}>
                삭제
              </S.Button>
            </td>
          </tr>
        ))}
      </tbody>
    </S.Table>
  );
};

export default UserTable;
