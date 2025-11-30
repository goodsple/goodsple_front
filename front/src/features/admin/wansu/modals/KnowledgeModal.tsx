import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { KnowledgeItem } from '../api/knowledgeApi';
import * as S from './KnowledgeModalStyle';

type SubmitData = Omit<KnowledgeItem, 'knowledgeId' | 'knowledgeIsFaq' | 'knowledgeIsActive' | 'knowledgeCreatedAt' | 'knowledgeUpdatedAt'>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SubmitData) => void;
  initialData?: KnowledgeItem | null;
  mode: 'create' | 'edit';
}

const KnowledgeModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, initialData, mode }) => {
  const [formData, setFormData] = useState({ knowledgeIntent: '', knowledgeQuestion: '', knowledgeAnswer: '' });

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        knowledgeIntent: initialData.knowledgeIntent,
        knowledgeQuestion: initialData.knowledgeQuestion,
        knowledgeAnswer: initialData.knowledgeAnswer,
      });
    } else {
      setFormData({ knowledgeIntent: '', knowledgeQuestion: '', knowledgeAnswer: '' });
    }
  }, [isOpen, initialData, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return createPortal(
    <S.Backdrop onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.Title>{mode === 'create' ? '새로운 지식 추가' : '지식 수정'}</S.Title>
        <S.Form onSubmit={handleSubmit}>
          <S.FormGroup>
            <S.Label htmlFor="knowledgeIntent">의도 (Intent)</S.Label>
            <S.Input type="text" id="knowledgeIntent" name="knowledgeIntent" value={formData.knowledgeIntent} onChange={handleChange} placeholder="예: delivery_fee" required />
            <S.HelpText>영문 소문자와 언더스코어(_)만 사용해주세요.</S.HelpText>
          </S.FormGroup>
          <S.FormGroup>
            <S.Label htmlFor="knowledgeQuestion">대표 질문</S.Label>
            <S.Input type="text" id="knowledgeQuestion" name="knowledgeQuestion" value={formData.knowledgeQuestion} onChange={handleChange} placeholder="예: 배송비는 얼마인가요?" required />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label htmlFor="knowledgeAnswer">챗봇 답변</S.Label>
            <S.Textarea id="knowledgeAnswer" name="knowledgeAnswer" value={formData.knowledgeAnswer} onChange={handleChange} required />
          </S.FormGroup>
          <S.ButtonArea>
            <S.CancelButton type="button" onClick={onClose}>취소</S.CancelButton>
            <S.SubmitButton type="submit">{mode === 'create' ? '저장하기' : '수정 완료'}</S.SubmitButton>
          </S.ButtonArea>
        </S.Form>
      </S.ModalContainer>
    </S.Backdrop>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default KnowledgeModal;