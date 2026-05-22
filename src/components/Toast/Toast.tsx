'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '../../utils/cn';
import {
  positionStyles,
  variantStyles,
  iconColorStyles,
  titleColorStyles,
  descColorStyles,
} from './Toast.styles';
import type { ToastItem, ToastOptions, ToasterProps, ToastVariant } from './Toast.types';

// ── Module-level event bus ─────────────────────────────────────────────────────
// Allows toast() to be called from anywhere without a wrapping Provider.

type Action =
  | { type: 'add'; payload: ToastItem }
  | { type: 'dismiss'; payload: string };

type Listener = (action: Action) => void;
const listeners = new Set<Listener>();

function dispatch(action: Action) {
  listeners.forEach(l => l(action));
}

function genId(): string {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);
}

// ── Public toast() API ─────────────────────────────────────────────────────────

function createToast(opts: ToastOptions): void {
  dispatch({
    type: 'add',
    payload: {
      id: genId(),
      variant: opts.variant ?? 'default',
      duration: opts.duration ?? 4000,
      title: opts.title,
      ...(opts.description !== undefined && { description: opts.description }),
    },
  });
}

createToast.success = (title: string, opts?: Omit<ToastOptions, 'title' | 'variant'>) =>
  createToast({ ...opts, title, variant: 'success' });

createToast.warning = (title: string, opts?: Omit<ToastOptions, 'title' | 'variant'>) =>
  createToast({ ...opts, title, variant: 'warning' });

createToast.danger = (title: string, opts?: Omit<ToastOptions, 'title' | 'variant'>) =>
  createToast({ ...opts, title, variant: 'danger' });

createToast.info = (title: string, opts?: Omit<ToastOptions, 'title' | 'variant'>) =>
  createToast({ ...opts, title, variant: 'info' });

createToast.dismiss = (id: string) => dispatch({ type: 'dismiss', payload: id });

export const toast = createToast;

// ── Icons ──────────────────────────────────────────────────────────────────────

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <circle cx="8" cy="8" r="7" fillOpacity=".15" />
    <path
      fillRule="evenodd"
      d="M11.03 5.97a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-1.5-1.5a.75.75 0 1 1 1.06-1.06l.97.97 2.97-2.97a.75.75 0 0 1 1.06 0z"
    />
  </svg>
);

const WarningIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575L6.457 1.047zM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-.25-5.25a.75.75 0 0 0-1.5 0v2.5a.75.75 0 0 0 1.5 0v-2.5z" />
  </svg>
);

const DangerIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <circle cx="8" cy="8" r="7" fillOpacity=".15" />
    <path d="M6.22 5.72a.75.75 0 0 1 1.06 0L8 6.44l.72-.72a.75.75 0 1 1 1.06 1.06L9.06 7.5l.72.72a.75.75 0 1 1-1.06 1.06L8 8.56l-.72.72a.75.75 0 0 1-1.06-1.06L6.94 7.5l-.72-.72a.75.75 0 0 1 0-1.06z" />
  </svg>
);

const InfoIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <circle cx="8" cy="8" r="7" fillOpacity=".15" />
    <path d="M8 4.5a.875.875 0 1 0 0 1.75A.875.875 0 0 0 8 4.5zM7.25 8a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-1.5 0V8z" />
  </svg>
);

const BellIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 16a2 2 0 0 0 1.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 0 0 8 16zm6.779-8.521A5.502 5.502 0 0 0 8.5 2.25V1.75a.5.5 0 0 0-1 0v.5A5.502 5.502 0 0 0 1.221 7.479 3.5 3.5 0 0 0 .5 10h15a3.5 3.5 0 0 0-.721-2.521z" />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06z" />
  </svg>
);

const variantIcons: Record<ToastVariant, React.FC<{ className?: string }>> = {
  default: BellIcon,
  success: CheckIcon,
  warning: WarningIcon,
  danger:  DangerIcon,
  info:    InfoIcon,
};

// ── Individual toast card ──────────────────────────────────────────────────────

interface ToastCardProps extends ToastItem {
  onRemove: () => void;
}

function ToastCard({ title, description, variant, duration, onRemove }: ToastCardProps) {
  const [visible, setVisible] = useState(false);
  const dismissedRef = useRef(false);
  const onRemoveRef = useRef(onRemove);
  onRemoveRef.current = onRemove;

  const Icon = variantIcons[variant];

  // Enter: double-RAF to let the initial invisible frame paint before transitioning
  useEffect(() => {
    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(r2);
    });
    return () => cancelAnimationFrame(r1);
  }, []);

  // Auto-dismiss timer — runs once on mount
  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(close, duration);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function close() {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setVisible(false);
    setTimeout(() => onRemoveRef.current(), 300);
  }

  return (
    <div
      className={cn(
        'pointer-events-auto flex w-80 items-start gap-3 rounded-2xl p-4',
        'border backdrop-blur-xl shadow-lg',
        'transition-all duration-300 ease-out',
        variantStyles[variant],
        visible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-3 scale-95',
      )}
      role="alert"
      aria-live="polite"
    >
      <Icon className={cn('mt-px h-4 w-4 shrink-0', iconColorStyles[variant])} />

      <div className="flex-1 min-w-0">
        <p className={cn('text-sm font-semibold leading-snug', titleColorStyles[variant])}>
          {title}
        </p>
        {description && (
          <p className={cn('mt-0.5 text-xs leading-relaxed', descColorStyles[variant])}>
            {description}
          </p>
        )}
      </div>

      <button
        onClick={close}
        aria-label="Dismiss"
        className={cn(
          'shrink-0 mt-px rounded-md p-0.5 -mr-0.5',
          'opacity-40 hover:opacity-70',
          'transition-opacity focus-visible:outline-none focus-visible:opacity-70',
          titleColorStyles[variant],
        )}
      >
        <CloseIcon className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

// ── Toaster ────────────────────────────────────────────────────────────────────

export function Toaster({ position = 'bottom-right' }: ToasterProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  useEffect(() => {
    const listener: Listener = (action) => {
      if (action.type === 'add') {
        setToasts(prev => [...prev, action.payload]);
      } else if (action.type === 'dismiss') {
        setToasts(prev => prev.filter(t => t.id !== action.payload));
      }
    };
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);

  return (
    <div
      className={cn(
        'fixed z-50 flex flex-col gap-2 pointer-events-none',
        positionStyles[position],
      )}
    >
      {toasts.map(t => (
        <ToastCard key={t.id} {...t} onRemove={() => remove(t.id)} />
      ))}
    </div>
  );
}
