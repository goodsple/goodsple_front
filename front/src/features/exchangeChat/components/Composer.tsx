import { useState } from 'react';
import * as S from './ComposerStyle';

export default function Composer({ onSend, disabled }: { onSend: (text: string) => void; disabled?: boolean }) {
  const [text, setText] = useState('');

  const send = () => {
    const v = text.trim();
    if (!v || disabled) return;
    onSend(v);
    setText('');
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <S.Wrap>
      <S.Attach title="첨부" disabled={disabled}>+</S.Attach>
      <S.Input
        rows={1}
        placeholder="메시지를 입력하세요."
        value={text}
        disabled={disabled}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
      />
      {/* <S.Send onClick={send} disabled={disabled}>전송</S.Send> */}
    </S.Wrap>
  );
}
