// RemoveProhibitedWordsModal.tsx
import React from 'react';
import * as s from './RemoveProhibitedWordsModalStyle';

interface Props {
  onClose: () => void;
  onDelete: () => void;
}

const RemoveProhibitedWordsModal: React.FC<Props> = ({ onClose, onDelete }) => {
  return (
    <s.ModalOverlay>
      <s.ModalBox>
        <s.Title>금칙어 삭제</s.Title>
        <s.Message>삭제하시겠습니까?</s.Message>
        <s.ButtonGroup>
          <s.CancelButton onClick={onClose}>취소</s.CancelButton>
          <s.ConfirmButton onClick={onDelete}>삭제</s.ConfirmButton>
        </s.ButtonGroup>
      </s.ModalBox>
    </s.ModalOverlay>
  );
};

export default RemoveProhibitedWordsModal;
