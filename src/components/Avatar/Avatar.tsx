'use client';

import React, { createContext, forwardRef, useContext, useState } from 'react';
import { cn } from '../../utils/cn';
import {
  avatarBase,
  avatarInner,
  avatarSizeStyles,
  avatarVariantStyles,
  imageBase,
  fallbackColorStyles,
  statusBase,
  statusSizeStyles,
  statusColorStyles,
  groupOverlapStyles,
  overflowBadgeBase,
} from './Avatar.styles';
import type { AvatarGroupProps, AvatarProps, AvatarSize } from './Avatar.types';

// ── Icons ──────────────────────────────────────────────────────────────────────

const UserIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-[55%] w-[55%] text-slate-400 dark:text-slate-500"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
      clipRule="evenodd"
    />
  </svg>
);

// ── Context (used by AvatarGroup to pass size down) ───────────────────────────

const AvatarGroupContext = createContext<{ size: AvatarSize } | null>(null);

// ── Avatar ─────────────────────────────────────────────────────────────────────

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      src,
      alt = '',
      fallback,
      size = 'md',
      variant = 'circle',
      status,
      className,
      ...props
    },
    ref
  ) => {
    const [imgError, setImgError] = useState(false);
    const ctx = useContext(AvatarGroupContext);
    const resolvedSize = ctx?.size ?? size;

    const showImage = Boolean(src) && !imgError;
    const initials = fallback ? fallback.slice(0, 2).toUpperCase() : null;

    return (
      <span
        ref={ref}
        role="img"
        aria-label={alt || fallback || 'avatar'}
        className={cn(
          avatarBase,
          avatarSizeStyles[resolvedSize],
          avatarVariantStyles[variant],
          className,
        )}
        {...props}
      >
        <span className={avatarInner}>
          {showImage ? (
            <img
              src={src}
              alt={alt}
              className={imageBase}
              onError={() => setImgError(true)}
            />
          ) : initials ? (
            <span aria-hidden="true" className={fallbackColorStyles}>
              {initials}
            </span>
          ) : (
            <UserIcon />
          )}
        </span>

        {status && (
          <span
            aria-label={status}
            className={cn(
              statusBase,
              statusSizeStyles[resolvedSize],
              statusColorStyles[status],
            )}
          />
        )}
      </span>
    );
  }
);

Avatar.displayName = 'Avatar';

// ── AvatarGroup ────────────────────────────────────────────────────────────────

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ max, size = 'md', children, className, ...props }, ref) => {
    const all = React.Children.toArray(children);
    const visible = max !== undefined ? all.slice(0, max) : all;
    const overflow = max !== undefined && all.length > max ? all.length - max : 0;

    return (
      <AvatarGroupContext.Provider value={{ size }}>
        <div ref={ref} className={cn('flex items-center', className)} {...props}>
          {visible.map((child, i) => (
            <span
              key={i}
              className={cn(
                'inline-flex shrink-0 rounded-full ring-2 ring-white dark:ring-slate-900',
                i > 0 && groupOverlapStyles[size],
              )}
              style={{ zIndex: visible.length - i }}
            >
              {child}
            </span>
          ))}
          {overflow > 0 && (
            <span
              role="img"
              aria-label={`+${overflow} more`}
              className={cn(
                overflowBadgeBase,
                avatarSizeStyles[size],
                visible.length > 0 && groupOverlapStyles[size],
              )}
              style={{ zIndex: 0 }}
            >
              <span aria-hidden="true">+{overflow}</span>
            </span>
          )}
        </div>
      </AvatarGroupContext.Provider>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';
