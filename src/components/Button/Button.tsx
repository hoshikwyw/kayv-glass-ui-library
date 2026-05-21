import React from 'react';
import { cn } from '../../utils/cn';
import { buttonBase, variantStyles, sizeStyles, spinnerSizeStyles } from './Button.styles';
import type { ButtonProps } from './Button.types';

const Spinner = ({ className }: { className?: string }) => (
  <svg
    className={cn('animate-spin', className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-20"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="3"
    />
    <path
      className="opacity-80"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonBase,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {/* Absolute spinner — preserves button dimensions when isLoading */}
        {isLoading && (
          <span
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden
          >
            <Spinner className={spinnerSizeStyles[size]} />
          </span>
        )}
        {/* Children hidden (not removed) so button width never jumps */}
        <span className={isLoading ? 'opacity-0' : undefined}>
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';
