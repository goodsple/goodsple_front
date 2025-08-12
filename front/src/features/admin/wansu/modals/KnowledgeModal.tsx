import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { KnowledgeItem } from '../../wansu/mock/knowledgeBaseData';
import * as S from './KnowledgeModalStyle';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<KnowledgeItem, 'id' | 'isFaq' | 'isActive'>) => void;
  initialData?: KnowledgeItem | null;
  mode: 'create' | 'edit';
}

const KnowledgeModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, initialData, mode }) => {
  const [formData, setFormData] = useState({ intent: '', question: '', answer: '' });

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        intent: initialData.intent,
        question: initialData.question,
        answer: initialData.answer,
      });
    } else {
      setFormData({ intent: '', question: '', answer: '' });
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
            <S.Label htmlFor="intent">의도 (Intent)</S.Label>
            <S.Input type="text" id="intent" name="intent" value={formData.intent} onChange={handleChange} placeholder="예: delivery_fee" required />
            <S.HelpText>영문 소문자와 언더스코어(_)만 사용해주세요.</S.HelpText>
          </S.FormGroup>
          <S.FormGroup>
            <S.Label htmlFor="question">대표 질문</S.Label>
            <S.Input type="text" id="question" name="question" value={formData.question} onChange={handleChange} placeholder="예: 배송비는 얼마인가요?" required />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label htmlFor="answer">챗봇 답변</S.Label>
            <S.Textarea id="answer" name="answer" value={formData.answer} onChange={handleChange} required />
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