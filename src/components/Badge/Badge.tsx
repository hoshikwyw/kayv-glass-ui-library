'use client';

import React from 'react';
import { cn } from '../../utils/cn';
import { badgeBase, variantStyles, sizeStyles, dotColorStyles, dotSizeStyles } from './Badge.styles';
import type { BadgeProps } from './Badge.types';

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      dot = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(badgeBase, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {dot && (
          <span
            className={cn('rounded-full flex-shrink-0', dotColorStyles[variant], dotSizeStyles[size])}
            aria-hidden
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
