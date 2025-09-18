import React, { useState } from 'react';
import axiosInstance from '../../../../api/axiosInstance';
import * as s from './AddProhibitedWordsModalStyle';

interface Props {
  onClose: () => void;
  onAddSuccess?: () => void; 
}

const AddProhibitedWordsModal: React.FC<Props> = ({ onClose, onAddSuccess }) => {
  const [word, setWord] = useState('');
  const [loading, setLoading] = useState(false);

  // 금칙어 추가
  const handleAdd = async () => {
    const trimmedWord = word.trim();

    if (!trimmedWord) {
      alert('금칙어를 입력해주세요.');
      return;
    }

    if (trimmedWord.length > 20) {
      alert('금칙어는 20자 이하만 가능합니다.');
      return;
    }

    setLoading(true);

    try {
      // 토큰을 로컬 스토리지에서 가져오기
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert('로그인 후 이용 가능합니다.');
        return;
      }

      // 토큰을 포함시켜 요청
      await axiosInstance.post(
        '/admin/prohibited-words',
        { word: trimmedWord },
        { headers: { Authorization: `Bearer ${token}` } } // Authorization 헤더 추가
      );

      if (onAddSuccess) onAddSuccess();
      setWord('');
      onClose();
    } catch (err) {
      console.error('금칙어 추가 실패', err);
      alert('금칙어 추가에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <s.ModalOverlay>
      <s.ModalBox>
        <s.Title>금칙어 추가</s.Title>
        <s.InputLabel>금칙어</s.InputLabel>
        <s.InputField
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="금칙어를 입력하세요"
          disabled={loading}
        />
        <s.ButtonGroup>
          <s.CancelButton onClick={onClose} disabled={loading}>
            취소
          </s.CancelButton>
          <s.ConfirmButton onClick={handleAdd} disabled={loading}>
            {loading ? '추가 중...' : '추가'}
          </s.ConfirmButton>
        </s.ButtonGroup>
      </s.ModalBox>
    </s.ModalOverlay>
  );
};

export default AddProhibitedWordsModal;
