import { useState } from 'react';
import * as S from './ComposerStyle';

export default function Composer({ onSend, disabled }: { onSend: (text: string) => void; disabled?: boolean }) {
  const [text, setText] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const send = () => {
    const v = text.trim();
    if (!v || disabled) return;
    onSend(v);
    setText('');
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // 한글/중문 등 조합 입력 중이면 전송 금지
      if ((e.nativeEvent as any).isComposing || isComposing) return;
      e.preventDefault();
      send();
    }
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
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
      />
    </S.Wrap>
  );
}
