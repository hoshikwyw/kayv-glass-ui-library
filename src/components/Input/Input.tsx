'use client';

import React, { useId } from 'react';
import { cn } from '../../utils/cn';
import {
  inputBase,
  errorStyles,
  sizeStyles,
  iconPaddingLeft,
  iconPaddingRight,
  labelBase,
  hintBase,
  errorTextBase,
} from './Input.styles';
import type { InputProps } from './Input.types';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size = 'md',
      label,
      hint,
      error,
      leftIcon,
      rightIcon,
      id: externalId,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const id = externalId ?? autoId;
    const descId = `${id}-desc`;
    const hasError = Boolean(error);
    const hasDesc = Boolean(error ?? hint);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className={labelBase}>
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-500 flex items-center">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            aria-invalid={hasError ? true : undefined}
            aria-describedby={hasDesc ? descId : undefined}
            className={cn(
              inputBase,
              sizeStyles[size],
              hasError && errorStyles,
              leftIcon && iconPaddingLeft[size],
              rightIcon && iconPaddingRight[size],
              className,
            )}
            {...props}
          />

          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-500 flex items-center">
              {rightIcon}
            </span>
          )}
        </div>

        {hasDesc && (
          <p id={descId} className={hasError ? errorTextBase : hintBase}>
            {error ?? hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
