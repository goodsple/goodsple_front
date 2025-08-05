// AddProhibitedWordsModal.tsx
import React, { useState } from 'react';
import * as s from './AddProhibitedWordsModalStyle';

interface Props {
  onClose: () => void;
  onAdd: (word: string) => void;
}

const AddProhibitedWordsModal: React.FC<Props> = ({ onClose, onAdd }) => {
  const [word, setWord] = useState('');

  const handleAdd = () => {
    if (word.trim()) {
      onAdd(word.trim());
      onClose();
    }
  };

  return (
    <s.ModalOverlay>
      <s.ModalBox>
        <s.Title>금칙어 추가</s.Title>
        <s.InputLabel>금칙어</s.InputLabel>
        <s.InputField
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="금칙어를 입력하세요"
        />
        <s.ButtonGroup>
          <s.CancelButton onClick={onClose}>취소</s.CancelButton>
          <s.ConfirmButton onClick={handleAdd}>추가</s.ConfirmButton>
        </s.ButtonGroup>
      </s.ModalBox>
    </s.ModalOverlay>
  );
};

export default AddProhibitedWordsModal;
