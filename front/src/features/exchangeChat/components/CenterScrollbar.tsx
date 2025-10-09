import { useEffect, useRef, useState } from 'react';
import * as S from './ChatLayoutStyle';

type Props = {
  /** 메시지 리스트 스크롤 컨테이너 ref (null 포함) */
  scrollRef: React.RefObject<HTMLElement | null>;
  /** 방 변경/새 메시지 등으로 재바인딩 트리거 */
  bindKey?: unknown;
};

export default function CenterScrollbar({ scrollRef, bindKey }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ top: 0, height: 44 });

  // 캡/여백(픽셀) – 썸이 오버랩되지 않도록 상하 여유를 둠
  const CAP_H = 12;      // 삼각형 높이(시각적으로 9px 정도지만 여유 포함)
  const GAP   = 6;       // 캡과 레일 사이 여백

  // 레일 지오메트리(트랙 높이 기준)
  const getRailGeom = (trackH: number) => {
    const top = CAP_H + GAP;
    const height = Math.max(0, trackH - (CAP_H + GAP) * 2);
    return { top, height };
  };

  // 스크롤 위치 → 썸(top, height) 반영
  const updateFrom = (el: HTMLElement) => {
    const trackH = trackRef.current?.clientHeight ?? 1;
    const { top: railTop, height: railH } = getRailGeom(trackH);

    const sh = el.scrollHeight;
    const ch = el.clientHeight;
    const st = el.scrollTop;

    if (sh <= ch || railH <= 0) {
      // 내용이 짧거나 레일이 0이면 썸을 레일 전체로
      setThumb({ top: railTop, height: Math.max(36, railH) });
      return;
    }
    const MIN_THUMB = 28;      // 최소 높이
    const SCALE     = 0.6; 

    const hRaw = (ch / sh) * railH;
    const h    = Math.max(MIN_THUMB, hRaw * SCALE);    // 썸 최소 높이
    const maxY = railH - h;
    const rel  = st / (sh - ch);                   // 0~1
    setThumb({ top: railTop + rel * maxY, height: h });
  };

  // 스크롤/리사이즈 바인딩
  useEffect(() => {
    let alive = true;
    let rafId = 0;
    let unbind: (() => void) | null = null;

    const bind = () => {
      const el = scrollRef.current ?? null;
      const track = trackRef.current ?? null;
      if (!alive) return;
      if (!el || !track) { rafId = requestAnimationFrame(bind); return; }

      const onScroll = () => updateFrom(el);
      const onResize = () => updateFrom(el);

      updateFrom(el);
      el.addEventListener('scroll', onScroll, { passive: true });

      const ro  = new ResizeObserver(onResize);
      ro.observe(el);

      const tro = new ResizeObserver(() => updateFrom(el));
      tro.observe(track);

      unbind = () => {
        el.removeEventListener('scroll', onScroll);
        ro.disconnect();
        tro.disconnect();
      };
    };

    bind();
    return () => {
      alive = false;
      if (rafId) cancelAnimationFrame(rafId);
      unbind?.();
    };
  }, [scrollRef, bindKey]);

  // 드래그로 스크롤
  useEffect(() => {
    const el = scrollRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    const thumbEl = track.querySelector<HTMLDivElement>('[data-thumb]');
    if (!thumbEl) return;

    let startY = 0, startTop = 0, railTop = 0, railH = 0, thumbH = 0;

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();
      thumbEl.setPointerCapture?.(e.pointerId);

      startY   = e.clientY;
      startTop = thumb.top;

      const trackH = track.clientHeight;
      ({ top: railTop, height: railH } = getRailGeom(trackH));
      thumbH = thumb.height;

      const onMove = (e: PointerEvent) => {
        const dy  = e.clientY - startY;
        const y   = Math.max(railTop, Math.min(railTop + railH - thumbH, startTop + dy));
        const rel = railH > thumbH ? (y - railTop) / (railH - thumbH) : 0;

        const sh  = el.scrollHeight, ch = el.clientHeight;
        el.scrollTop = rel * (sh - ch);
      };

      const onUp = (e: PointerEvent) => {
        thumbEl.releasePointerCapture?.(e.pointerId);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
      };

      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    };

    thumbEl.addEventListener('pointerdown', onPointerDown);
    return () => thumbEl.removeEventListener('pointerdown', onPointerDown);
  }, [scrollRef, thumb]);

  // 트랙 클릭 → 한 페이지 점프
  const onTrackPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    const rect = track.getBoundingClientRect();
    const clickY = e.clientY - rect.top;

    if (clickY < thumb.top) el.scrollTop -= el.clientHeight;
    else if (clickY > thumb.top + thumb.height) el.scrollTop += el.clientHeight;
  };

  // ▲/▼ 캡 클릭 → 한 페이지 점프
  const pageUp   = () => { const el = scrollRef.current; if (el) el.scrollTop -= el.clientHeight; };
  const pageDown = () => { const el = scrollRef.current; if (el) el.scrollTop += el.clientHeight; };

  return (
    <S.Divider>
      <S.Track ref={trackRef} onPointerDown={onTrackPointerDown}>
        <S.Rail />
        <S.CapUp   onClick={pageUp} />
        <S.CapDown onClick={pageDown} />
        <S.Thumb data-thumb style={{ top: thumb.top, height: thumb.height }} />
      </S.Track>
    </S.Divider>
  );
}
