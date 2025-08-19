import React from 'react';
import * as S from './UserTableStyle';
import type { AdminUserSummary } from '../types/searchUser';
import { formatJoinDateKo, formatLevelDisplay } from '../lib/adapters';

interface Props {
  users: AdminUserSummary[];
  loading: boolean;
  onDelete:  (userId: string) => void;
  onRowClick?: (user: AdminUserSummary) => void; 
  sortKey?: 'levelScore' | 'joinDate' | null;
  sortOrder?: 'asc' | 'desc';
  onSort?: (key: 'levelScore' | 'joinDate') => void;
}

const UserTable: React.FC<Props> = ({ users, loading, onDelete, onRowClick, sortKey, sortOrder, onSort }) => {
  if (loading) return <div>로딩 중...</div>;
  if (users.length === 0) return <div>조회된 회원이 없습니다.</div>;

  // 화살표 텍스트
  const arrow = (key: 'levelScore' | 'joinDate') =>
  sortKey === key ? (sortOrder === 'asc' ? '▲' : '▼') : '';

  return (
    <S.Table>
      <thead>
        <tr>
          <th>회원번호</th>
          <th>닉네임</th>
          <th>작성 후기 수</th>
          <th>거래 횟수</th>
          <th>신고 건수</th>
          {/* 등급(점수) 정렬 가능 */}
          <S.SortableTh
            onClick={(e) => { e.stopPropagation(); onSort?.('levelScore'); }}
            title="등급 점수 정렬"
          >
            등급(점수) {arrow('levelScore')}
          </S.SortableTh>
          <th>회원 구분</th>
          <th>활동 상태</th>
          {/* 가입일 정렬 가능 */}
          <S.SortableTh
            onClick={(e) => { e.stopPropagation(); onSort?.('joinDate'); }}
            title="가입일 정렬"
          >
            가입일 {arrow('joinDate')}
          </S.SortableTh>

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
            <td>{formatLevelDisplay(u.level)}</td>
            <td>{u.role === 'ADMIN' ? '관리자' : '회원'}</td>
            <td>
              {u.status === 'ACTIVE' && '활동 중'}
              {u.status === 'SUSPENDED' && '정지'}
              {u.status === 'WITHDRAWN' && '탈퇴'}
            </td>
            <td>{formatJoinDateKo(u.joinDate)}</td>
            <td>
              <S.Button 
                disabled={u.status !== 'WITHDRAWN'}
                title={u.status !== 'WITHDRAWN' ? '탈퇴 상태에서만 삭제 가능' : ''}
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
