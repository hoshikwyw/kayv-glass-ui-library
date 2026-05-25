'use client';

import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import {
  trackBase,
  trackSizeStyles,
  fillBase,
  fillVariantStyles,
  labelBase,
  valueBase,
} from './Progress.styles';
import type { ProgressProps } from './Progress.types';

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      size = 'md',
      variant = 'primary',
      animated = false,
      label,
      showValue = false,
      className,
      ...props
    },
    ref
  ) => {
    const indeterminate = value === undefined;
    const pct = indeterminate
      ? 0
      : Math.min(100, Math.max(0, (value / max) * 100));
    const displayPct = Math.round(pct);

    const showHeader = label || (showValue && !indeterminate);

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {showHeader && (
          <div className={labelBase}>
            <span>{label ?? ''}</span>
            {showValue && !indeterminate && (
              <span className={valueBase}>{displayPct}%</span>
            )}
          </div>
        )}

        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={indeterminate ? undefined : value}
          aria-valuetext={indeterminate ? 'Loading…' : `${displayPct}%`}
          aria-label={label}
          className={cn(trackBase, trackSizeStyles[size])}
        >
          <div
            className={cn(
              fillBase,
              fillVariantStyles[variant],
              indeterminate && 'animate-progress-indeterminate w-[35%]',
            )}
            style={indeterminate ? undefined : { width: `${pct}%` }}
          >
            {animated && !indeterminate && (
              <span className="absolute inset-0 -skew-x-12
                bg-gradient-to-r from-transparent via-white/30 to-transparent
                animate-progress-shimmer" />
            )}
          </div>
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';
