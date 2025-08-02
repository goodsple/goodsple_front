import React, { useState, useEffect } from 'react';
import * as S from './UserDetailModalStyle';
import type { AdminUser } from '../types/searchUser';
import cancelImg from '../../../../assets/images/cancel.png';
import ConfirmModal from '../../../../components/common/modal/ConfirmModal';

type Props = {
  isOpen: boolean;
  user: AdminUser | null;
  onClose: () => void;
  onSave: (updated: { userId: string; role: AdminUser['role']; status: AdminUser['status'] }) => void;
};

const UserDetailModal: React.FC<Props> = ({ isOpen, user, onClose, onSave }) => {
  const [role, setRole]     = useState<AdminUser['role']>('USER');
  const [status, setStatus] = useState<AdminUser['status']>('ACTIVE');
  const [showConfirm, setShowConfirm] = useState(false);
  const [showResult, setShowResult]     = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  useEffect(() => {
    if (user) {
      setRole(user.role);
      setStatus(user.status);
      setShowConfirm(false);
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleClickSave = () => {
    setShowConfirm(true);
  };

  const handleConfirmSave = () => {
    setShowConfirm(false);
    onSave({ userId: user.userId, role, status });

    // 저장 결과 모달
    setResultMessage('변경 사항이 저장되었습니다.');
    setShowResult(true);
  };

  const handleCancelSave = () => {
    setShowConfirm(false);
  };

  const handleResultClose = () => {
    setShowResult(false);
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
            <S.Label>회원 ID</S.Label>
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
            <S.Value>{user.joinDate}</S.Value>
          </S.Field>
          <S.Field>
            <S.Label>작성 후기 수</S.Label>
            <S.Value>{user.reviewCount}</S.Value>
          </S.Field>
          <S.Field>
            <S.Label>회원 구분</S.Label>
            <S.Select value={role} onChange={e => setRole(e.target.value as any)}>
              <option value="USER">회원</option>
              <option value="ADMIN">관리자</option>
            </S.Select>
          </S.Field>
          <S.Field>
            <S.Label>거래 횟수</S.Label>
            <S.Value>{user.transactionCount}</S.Value>
          </S.Field>
          <S.Field>
            <S.Label>활동 상태</S.Label>
            <S.Select value={status} onChange={e => setStatus(e.target.value as any)}>
              <option value="ACTIVE">활동 중</option>
              <option value="SUSPENDED">정지</option>
              <option value="WITHDRAWN">탈퇴</option>
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
           disabled={role === user.role && status === user.status}
           onClick={handleClickSave}
            >
            저장
          </S.SaveButton>
          <ConfirmModal
            isOpen={showConfirm}
            content="변경된 내용을 저장하시겠습니까?"
            showCancel={true}
            confirmText="저장"
            cancelText="취소"
            onConfirm={handleConfirmSave}
            onCancel={handleCancelSave}
        />
         <ConfirmModal
            isOpen={showResult}
            content={resultMessage}
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
