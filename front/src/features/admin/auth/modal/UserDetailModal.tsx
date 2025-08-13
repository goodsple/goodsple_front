import React, { useState, useEffect, useMemo } from 'react';
import * as S from './UserDetailModalStyle';
import type { AdminUserSummary,AdminUserDetail } from '../types/searchUser';
import cancelImg from '../../../../assets/images/cancel.png';
import ConfirmModal from '../../../../components/common/modal/ConfirmModal';
import { formatJoinDateKo } from '../lib/adapters';

type Role = AdminUserSummary['role'];
type Status = AdminUserSummary['status'];

type Props = {
  isOpen: boolean;
  user: AdminUserDetail | null;
  onClose: () => void;
  onSave: (payload: { userId: string; role: Role; status: Status }) => void;
};

const roleOptions: Role[] = ['USER', 'ADMIN'];
const statusOptions: Status[] = ['ACTIVE', 'SUSPENDED', 'WITHDRAWN'];

const UserDetailModal: React.FC<Props> = ({ isOpen, user, onClose, onSave }) => {
  const [role, setRole] = useState<Role>('USER');
  const [status, setStatus] = useState<Status>('ACTIVE');

  // 확인 모달
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState<React.ReactNode>('');

  // 결과 모달
  const [resultOpen, setResultOpen] = useState(false);
  const [resultMsg, setResultMsg] = useState('');

  const roleChanged = useMemo(() => user && user.role !== role, [user, role]);
  const statusChanged = useMemo(() => user && user.status !== status, [user, status]);

  useEffect(() => {
    if (!isOpen || !user) return;
    setRole(user.role);
    setStatus(user.status);
  }, [isOpen, user]);

  const isChanged = useMemo(() => {
    if (!user) return false;
    return user.role !== role || user.status !== status;
  }, [user, role, status]);

  if (!isOpen || !user) return null;

  const handleClickSave = () => {
    if (!isChanged) return;
  
    let msg = '';
  
    // 1) 상태 변경 메시지
    if (statusChanged) {
      if (status === 'WITHDRAWN') {
        msg += '상태를 [탈퇴]로 변경합니다.\n 이 상태에서는 로그인할 수 없습니다.';
      } else if (status === 'SUSPENDED') {
        msg += '상태를 [정지]로 변경합니다.\n 일정 기간 접근이 제한됩니다.';
      } else if (status === 'ACTIVE') {
        msg += '상태를 [활동 중]으로 변경합니다.';
      }
    }
  
    // 2) 역할(구분) 변경 메시지
    if (roleChanged) {
      const roleMsg =
        role === 'ADMIN'
          ? '해당 사용자에게 관리자 권한이 부여됩니다.'
          : '관리자 권한이 제거됩니다.';
    
      msg = msg ? `${msg}\n\n${roleMsg}` : roleMsg;
    }
  
    // 변경이 있는데 메시지가 만들어졌으면 확인 모달 오픈
    if (msg) {
      setConfirmMsg(
        <>
          {msg}
          <br />
          변경하시겠습니까?
        </>
      );
      setConfirmOpen(true);
      return;
    }
  
    // (이 케이스는 거의 없지만) 메시지 없이 저장
    onSave({ userId: user!.userId, role, status });
  };

  const handleConfirmSave = () => {
    setConfirmOpen(false);
    if (!user) return;
    onSave({ userId: user.userId, role, status });
  };

  const handleCancelConfirm = () => {
    setConfirmOpen(false);
  };

  const handleResultClose = () => {
    setResultOpen(false);
    onClose();  // 상세 모달도 닫고 싶으면 호출
  };

  return (
    <S.Overlay>
      <S.Dialog>
        <S.Header>
          <h3>회원 정보</h3>
          <S.CloseButton src={cancelImg} alt="닫기" onClick={onClose} />
        </S.Header>

        <S.Body>
          <S.Field>
            <S.Label>회원번호</S.Label>
            <S.Value>{user.userId}</S.Value>
          </S.Field>
          <S.Field>
            <S.Label>이메일</S.Label>
            <S.Value>{user.email}</S.Value>
          </S.Field>
          <S.Field>
            <S.Label>닉네임</S.Label>
            <S.Value>{user.nickname}</S.Value>
          </S.Field>
          <S.Field>
            <S.Label>가입일</S.Label>
            <S.Value>{formatJoinDateKo(user.joinDate)}</S.Value>
          </S.Field>
          <S.Field>
            <S.Label>작성 후기 수</S.Label>
            <S.Value>{user.reviewCount}</S.Value>
          </S.Field>
          <S.Field>
            <S.Label>회원 구분</S.Label>
            <S.Select value={role} onChange={e => setRole(e.target.value as Role)}>
              {roleOptions.map(r => (
                <option key={r} value={r}>{r === 'ADMIN' ? '관리자' : '회원'}</option>
              ))}
            </S.Select>
          </S.Field>
          <S.Field>
            <S.Label>거래 횟수</S.Label>
            <S.Value>{user.transactionCount}</S.Value>
          </S.Field>
          <S.Field>
            <S.Label>활동 상태</S.Label>
            <S.Select value={status} onChange={e => setStatus(e.target.value as any)}>
            {statusOptions.map(s => (
                <option key={s} value={s}>
                  {s === 'ACTIVE' ? '활동 중' : s === 'SUSPENDED' ? '정지' : '탈퇴'}
                </option>
            ))}
            </S.Select>
          </S.Field>
          <S.Field>
            <S.Label>신고 건수</S.Label>
            <S.Value>{user.reportCount}</S.Value>
          </S.Field>
          <S.Field>
            <S.Label>등급</S.Label>
            <S.Value>
              {user.level.label} ({user.level.score})
            </S.Value>
          </S.Field>
        </S.Body>

        <S.Footer>
            <S.SaveButton 
            disabled={!isChanged}
            onClick={handleClickSave}
            >
            저장
          </S.SaveButton>
          <ConfirmModal
            isOpen={confirmOpen}
            content={confirmMsg}
            showCancel={true}
            confirmText="저장"
            cancelText="취소"
            onConfirm={handleConfirmSave}
            onCancel={handleCancelConfirm}
        />
         <ConfirmModal
            isOpen={resultOpen}
            content={resultMsg}
            showCancel={false}
            confirmText="확인"
            onConfirm={handleResultClose}
        />
        </S.Footer>
      </S.Dialog>
    </S.Overlay>
  );
};

export default UserDetailModal;
