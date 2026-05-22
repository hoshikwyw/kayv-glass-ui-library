'use client';

import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import { caretBase, caretPlacementStyles, tooltipBase } from './Tooltip.styles';
import type { TooltipPlacement, TooltipProps } from './Tooltip.types';

// ── Position helper ────────────────────────────────────────────────────────────

const GAP = 8;

function calcCoords(rect: DOMRect, placement: TooltipPlacement) {
  switch (placement) {
    case 'top':
      return {
        top: rect.top - GAP,
        left: rect.left + rect.width / 2,
        transform: 'translateX(-50%) translateY(-100%)',
      };
    case 'bottom':
      return {
        top: rect.bottom + GAP,
        left: rect.left + rect.width / 2,
        transform: 'translateX(-50%)',
      };
    case 'left':
      return {
        top: rect.top + rect.height / 2,
        left: rect.left - GAP,
        transform: 'translateX(-100%) translateY(-50%)',
      };
    case 'right':
      return {
        top: rect.top + rect.height / 2,
        left: rect.right + GAP,
        transform: 'translateY(-50%)',
      };
  }
}

// ── Component ──────────────────────────────────────────────────────────────────

export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(
  (
    {
      content,
      children,
      placement = 'top',
      delay = 150,
      trigger = 'hover',
      disabled = false,
      className,
    },
    ref
  ) => {
    const wrapperRef = useRef<HTMLSpanElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0, transform: '' });

    const setRef = (el: HTMLSpanElement | null) => {
      (wrapperRef as React.MutableRefObject<HTMLSpanElement | null>).current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) ref.current = el;
    };

    const open = useCallback(() => {
      if (disabled || !content) return;
      const rect = wrapperRef.current?.getBoundingClientRect();
      if (rect) setCoords(calcCoords(rect, placement));
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    }, [disabled, content, placement]);

    const close = useCallback(() => {
      setVisible(false);
      setTimeout(() => setMounted(false), 150);
    }, []);

    // ── Hover trigger ──────────────────────────────────────────────────────────
    const handleMouseEnter = () => {
      if (trigger !== 'hover') return;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(open, delay);
    };

    const handleMouseLeave = () => {
      if (trigger !== 'hover') return;
      if (timerRef.current) clearTimeout(timerRef.current);
      close();
    };

    // ── Click trigger ──────────────────────────────────────────────────────────
    const handleClick = (e: React.MouseEvent) => {
      if (trigger !== 'click') return;
      e.stopPropagation();
      if (visible) close();
      else open();
    };

    useEffect(() => {
      if (trigger !== 'click' || !visible) return;
      const onDown = (e: MouseEvent) => {
        if (!wrapperRef.current?.contains(e.target as Node)) close();
      };
      document.addEventListener('mousedown', onDown);
      return () => document.removeEventListener('mousedown', onDown);
    }, [trigger, visible, close]);

    // Cleanup timer on unmount
    useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

    return (
      <span
        ref={setRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="inline-flex"
      >
        {children}

        {mounted && createPortal(
          <div
            role="tooltip"
            style={{
              position: 'fixed',
              top: coords.top,
              left: coords.left,
              transform: coords.transform,
              zIndex: 9999,
            }}
            className={cn(
              tooltipBase,
              'transition-all duration-150 origin-center',
              visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
              className,
            )}
          >
            <span
              aria-hidden="true"
              className={cn('absolute', caretBase, caretPlacementStyles[placement])}
            />
            {content}
          </div>,
          document.body
        )}
      </span>
    );
  }
);

Tooltip.displayName = 'Tooltip';
