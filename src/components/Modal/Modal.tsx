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
  panelSizeStyles,
  titleBase,
} from './Modal.styles';
import type { ModalBodyProps, ModalFooterProps, ModalHeaderProps, ModalProps } from './Modal.types';

// ── Icons ──────────────────────────────────────────────────────────────────────

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

// ── Context ───────────────────────────────────────────────────────────────────

interface ModalCtx { onClose: () => void; titleId: string }
const ModalContext = createContext<ModalCtx | null>(null);

// ── Modal ─────────────────────────────────────────────────────────────────────

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      size = 'md',
      closeOnBackdrop = true,
      closeOnEsc = true,
      children,
      className,
    },
    ref
  ) => {
    const titleId = useId();
    const dialogRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => dialogRef.current!);

    // Mount then animate in; animate out then unmount
    useEffect(() => {
      if (open) {
        setMounted(true);
        const raf = requestAnimationFrame(() => {
          requestAnimationFrame(() => setVisible(true));
        });
        return () => cancelAnimationFrame(raf);
      } else {
        setVisible(false);
        const t = setTimeout(() => setMounted(false), 200);
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
      if (!visible || !dialogRef.current) return;
      const el = dialogRef.current;
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

    return ReactDOM.createPortal(
      <div
        className={cn(
          backdropBase,
          'transition-opacity duration-200',
          visible ? 'opacity-100' : 'opacity-0',
        )}
        onClick={closeOnBackdrop ? (e) => { if (e.target === e.currentTarget) onClose(); } : undefined}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal
          aria-labelledby={titleId}
          className={cn(
            panelBase,
            panelSizeStyles[size],
            'transition-all duration-200',
            visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
            className,
          )}
        >
          <ModalContext.Provider value={{ onClose, titleId }}>
            {children}
          </ModalContext.Provider>
        </div>
      </div>,
      document.body
    );
  }
);

Modal.displayName = 'Modal';

// ── ModalHeader ───────────────────────────────────────────────────────────────

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, onClose, className, ...props }, ref) => {
    const ctx = useContext(ModalContext);
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

ModalHeader.displayName = 'ModalHeader';

// ── ModalBody ─────────────────────────────────────────────────────────────────

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn(bodyBase, className)} {...props}>
      {children}
    </div>
  )
);

ModalBody.displayName = 'ModalBody';

// ── ModalFooter ───────────────────────────────────────────────────────────────

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn(footerBase, className)} {...props}>
      {children}
    </div>
  )
);

ModalFooter.displayName = 'ModalFooter';
