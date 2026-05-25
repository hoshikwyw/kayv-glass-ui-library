'use client';

import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import { cn } from '../../utils/cn';
import {
  backdropBase,
  bodyBase,
  closeButtonBase,
  footerBase,
  headerBase,
  panelBase,
  placementStyles,
  titleBase,
  widthStyles,
  heightStyles,
} from './Drawer.styles';
import type {
  DrawerBodyProps,
  DrawerFooterProps,
  DrawerHeaderProps,
  DrawerProps,
} from './Drawer.types';

// ── Icon ───────────────────────────────────────────────────────────────────────

const XIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    aria-hidden="true"
    className="h-full w-full"
  >
    <path d="M3 3l10 10M13 3L3 13" />
  </svg>
);

// ── Context ────────────────────────────────────────────────────────────────────

interface DrawerCtx { onClose: () => void; titleId: string }
const DrawerContext = createContext<DrawerCtx | null>(null);

// ── Drawer ─────────────────────────────────────────────────────────────────────

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      open,
      onClose,
      placement = 'right',
      size = 'md',
      closeOnBackdrop = true,
      closeOnEsc = true,
      children,
      className,
    },
    ref
  ) => {
    const titleId = useId();
    const panelRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => panelRef.current!);

    // Mount → animate in; animate out → unmount
    useEffect(() => {
      if (open) {
        setMounted(true);
        const raf = requestAnimationFrame(() => {
          requestAnimationFrame(() => setVisible(true));
        });
        return () => cancelAnimationFrame(raf);
      } else {
        setVisible(false);
        const t = setTimeout(() => setMounted(false), 300);
        return () => clearTimeout(t);
      }
    }, [open]);

    // Scroll lock
    useEffect(() => {
      if (!open) return;
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }, [open]);

    // ESC key
    useEffect(() => {
      if (!open || !closeOnEsc) return;
      const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    }, [open, closeOnEsc, onClose]);

    // Focus trap
    useEffect(() => {
      if (!visible || !panelRef.current) return;
      const el = panelRef.current;
      const sel =
        'button:not([disabled]),[href],input:not([disabled]),select:not([disabled]),' +
        'textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

      const getFocusable = () => Array.from(el.querySelectorAll<HTMLElement>(sel));
      getFocusable()[0]?.focus();

      const trap = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;
        const focusable = getFocusable();
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
        }
      };

      document.addEventListener('keydown', trap);
      return () => document.removeEventListener('keydown', trap);
    }, [visible]);

    if (!mounted || typeof document === 'undefined') return null;

    const { position, border, hiddenTranslate } = placementStyles[placement];
    const isHorizontal = placement === 'left' || placement === 'right';
    const sizeClass = isHorizontal ? widthStyles[size] : heightStyles[size];

    return ReactDOM.createPortal(
      <>
        {/* Backdrop */}
        <div
          aria-hidden="true"
          className={cn(backdropBase, visible ? 'opacity-100' : 'opacity-0')}
          onClick={closeOnBackdrop ? onClose : undefined}
        />

        {/* Panel */}
        <div
          ref={panelRef}
          role="dialog"
          aria-modal
          aria-labelledby={titleId}
          className={cn(
            panelBase,
            position,
            border,
            sizeClass,
            visible ? 'translate-x-0 translate-y-0' : hiddenTranslate,
            className,
          )}
        >
          <DrawerContext.Provider value={{ onClose, titleId }}>
            {children}
          </DrawerContext.Provider>
        </div>
      </>,
      document.body
    );
  }
);

Drawer.displayName = 'Drawer';

// ── DrawerHeader ───────────────────────────────────────────────────────────────

export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ children, onClose, className, ...props }, ref) => {
    const ctx = useContext(DrawerContext);
    const handleClose = onClose ?? ctx?.onClose;

    return (
      <div ref={ref} className={cn(headerBase, className)} {...props}>
        <h2 id={ctx?.titleId} className={titleBase}>
          {children}
        </h2>
        {handleClose && (
          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            className={closeButtonBase}
          >
            <XIcon />
          </button>
        )}
      </div>
    );
  }
);

DrawerHeader.displayName = 'DrawerHeader';

// ── DrawerBody ─────────────────────────────────────────────────────────────────

export const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(bodyBase, className)} {...props} />
  )
);

DrawerBody.displayName = 'DrawerBody';

// ── DrawerFooter ───────────────────────────────────────────────────────────────

export const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(footerBase, className)} {...props} />
  )
);

DrawerFooter.displayName = 'DrawerFooter';
