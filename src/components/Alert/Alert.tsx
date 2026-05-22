'use client';

import React from 'react';
import { cn } from '../../utils/cn';
import {
  alertBase,
  variantStyles,
  iconColorStyles,
  titleColorStyles,
  descColorStyles,
  dismissColorStyles,
} from './Alert.styles';
import type { AlertProps, AlertVariant } from './Alert.types';

// ── Icons ──────────────────────────────────────────────────────────────────────

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <circle cx="8" cy="8" r="7" fillOpacity=".15" />
    <path fillRule="evenodd" d="M11.03 5.97a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-1.5-1.5a.75.75 0 1 1 1.06-1.06l.97.97 2.97-2.97a.75.75 0 0 1 1.06 0z" />
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

const variantIcons: Record<AlertVariant, React.FC<{ className?: string }>> = {
  default: BellIcon,
  success: CheckIcon,
  warning: WarningIcon,
  danger:  DangerIcon,
  info:    InfoIcon,
};

// ── Alert ──────────────────────────────────────────────────────────────────────

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', title, onDismiss, children, ...props }, ref) => {
    const Icon = variantIcons[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertBase, variantStyles[variant], className)}
        {...props}
      >
        <Icon className={cn('mt-px h-4 w-4 shrink-0', iconColorStyles[variant])} />

        <div className="flex-1 min-w-0">
          {title && (
            <p className={cn(
              'text-sm font-semibold leading-snug',
              children && 'mb-1',
              titleColorStyles[variant],
            )}>
              {title}
            </p>
          )}
          {children && (
            <div className={cn('text-sm leading-relaxed', descColorStyles[variant])}>
              {children}
            </div>
          )}
        </div>

        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss"
            className={cn(
              'shrink-0 -mt-0.5 -mr-0.5 rounded-md p-0.5',
              'opacity-60 hover:opacity-100',
              'transition-opacity focus-visible:outline-none focus-visible:opacity-100',
              dismissColorStyles[variant],
            )}
          >
            <CloseIcon className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
