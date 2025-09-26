import { useEffect, useRef, useState } from 'react';
import * as S from './ChatLayoutStyle';

export default function CenterScrollbar({ scrollEl }: { scrollEl: HTMLElement | null }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ top: 0, height: 40 });

  // 왼쪽 리스트 스크롤 변화 → 썸 위치/크기 갱신
  useEffect(() => {
    if (!scrollEl) return;

    const update = () => {
      const sh = scrollEl.scrollHeight;
      const ch = scrollEl.clientHeight;
      const st = scrollEl.scrollTop;
      const trackH = trackRef.current?.clientHeight ?? 1;

      if (sh <= ch) {
        setThumb({ top: 0, height: trackH });
        return;
      }

      const h = Math.max(28, (ch / sh) * trackH);
      const maxY = trackH - h;
      const top = Math.min(maxY, (st / (sh - ch)) * maxY);
      setThumb({ top, height: h });
    };

    update();
    scrollEl.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(scrollEl);

    return () => {
      scrollEl.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, [scrollEl]);

  // 드래그로 스크롤 제어 (Pointer Events로 타입 안전하게)
  useEffect(() => {
    if (!scrollEl || !trackRef.current) return;

    const thumbEl = trackRef.current.querySelector<HTMLDivElement>('[data-thumb]');
    if (!thumbEl) return;

    let startY = 0;
    let startTop = 0;
    let trackH = 0;
    let thumbH = 0;

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();
      // 포인터 캡처 (드래그 안정화)
      thumbEl.setPointerCapture(e.pointerId);

      startY = e.clientY;
      startTop = thumb.top;
      trackH = trackRef.current?.clientHeight ?? 1;
      thumbH = thumb.height;

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    };

    const onPointerMove = (e: PointerEvent) => {
      const dy = e.clientY - startY;
      const maxY = Math.max(0, trackH - thumbH);
      const newTop = Math.max(0, Math.min(maxY, startTop + dy));

      const sh = scrollEl.scrollHeight;
      const ch = scrollEl.clientHeight;
      if (sh > ch && maxY > 0) {
        scrollEl.scrollTop = (newTop / maxY) * (sh - ch);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      thumbEl.releasePointerCapture?.(e.pointerId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    thumbEl.addEventListener('pointerdown', onPointerDown);

    return () => {
      thumbEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [scrollEl, thumb]);

  // 트랙 클릭 시 페이지 점프
  const onTrackPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current || !scrollEl) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;

    if (clickY < thumb.top) scrollEl.scrollTop -= scrollEl.clientHeight;
    else if (clickY > thumb.top + thumb.height) scrollEl.scrollTop += scrollEl.clientHeight;
  };

  return (
    <S.Divider>
      <S.Track ref={trackRef} onPointerDown={onTrackPointerDown}>
        <S.Thumb data-thumb style={{ top: thumb.top, height: thumb.height }} />
      </S.Track>
    </S.Divider>
  );
}
