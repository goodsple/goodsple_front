import React, { useState } from 'react';
import axiosInstance from '../../../../api/axiosInstance';
import * as s from './RemoveProhibitedWordsModalStyle';

interface Props {
  onClose: () => void;
  selectedIds: number[]; // 삭제할 금칙어 ID 배열
  onDeleteSuccess?: () => void; 
}

const RemoveProhibitedWordsModal: React.FC<Props> = ({ onClose, selectedIds, onDeleteSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      alert('삭제할 금칙어가 없습니다.');
      return;
    }

    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }

    setLoading(true);
    try {
      // 인증 헤더 추가
      await axiosInstance.delete('/admin/prohibited-words', {
        headers: { Authorization: `Bearer ${token}` },
        data: selectedIds, // DELETE 요청 시 data로 전달
      });

      if (onDeleteSuccess) onDeleteSuccess();
      onClose();
    } catch (err) {
      console.error('금칙어 삭제 실패', err);
      alert('금칙어 삭제에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <s.ModalOverlay>
      <s.ModalBox>
        <s.Title>금칙어 삭제</s.Title>
        <s.Message>선택한 금칙어를 삭제하시겠습니까?</s.Message>
        <s.ButtonGroup>
          <s.CancelButton onClick={onClose} disabled={loading}>
            취소
          </s.CancelButton>
          <s.ConfirmButton onClick={handleDelete} disabled={loading}>
            {loading ? '삭제 중...' : '삭제'}
          </s.ConfirmButton>
        </s.ButtonGroup>
      </s.ModalBox>
    </s.ModalOverlay>
  );
};

export default RemoveProhibitedWordsModal;
