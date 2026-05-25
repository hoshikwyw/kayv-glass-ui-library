'use client';

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { cn } from '../../utils/cn';
import {
  wrapperBase,
  wrapperDisabledStyles,
  boxBase,
  boxSizeStyles,
  boxUncheckedStyles,
  boxUncheckedHoverStyles,
  boxCheckedStyles,
  focusRingStyles,
  iconSizeStyles,
  labelTextStyles,
  descriptionBase,
  boxTopOffsetStyles,
} from './Checkbox.styles';
import type { CheckboxProps } from './Checkbox.types';

// ── Icons ──────────────────────────────────────────────────────────────────────

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M2 6l3 3 5-5" />
  </svg>
);

const DashIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M2.5 6h7" />
  </svg>
);

// ── Checkbox ───────────────────────────────────────────────────────────────────

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      indeterminate,
      size = 'md',
      label,
      description,
      disabled,
      className,
      checked,
      defaultChecked,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    // Track visual checked state for both controlled and uncontrolled modes
    const isControlled = checked !== undefined;
    const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
    const isChecked = isControlled ? !!checked : internalChecked;
    const isActive = !!indeterminate || isChecked;

    // Sync indeterminate DOM property (not an HTML attribute)
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = !!indeterminate;
      }
    }, [indeterminate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalChecked(e.target.checked);
      onChange?.(e);
    };

    return (
      <label
        className={cn(
          wrapperBase,
          'group',
          disabled && wrapperDisabledStyles,
          !disabled && 'cursor-pointer',
          className,
        )}
      >
        {/* Hidden native input + custom visual box */}
        <span className={cn('relative flex-shrink-0', boxTopOffsetStyles[size])}>
          <input
            ref={inputRef}
            type="checkbox"
            disabled={disabled}
            checked={isControlled ? checked : undefined}
            defaultChecked={!isControlled ? defaultChecked : undefined}
            onChange={handleChange}
            className="peer sr-only"
            {...props}
          />

          {/* Visual checkbox */}
          <span
            className={cn(
              boxBase,
              boxSizeStyles[size],
              isActive ? boxCheckedStyles : cn(boxUncheckedStyles, !disabled && boxUncheckedHoverStyles),
              focusRingStyles,
            )}
          >
            {indeterminate ? (
              <DashIcon className={cn(iconSizeStyles[size], 'text-white')} />
            ) : isChecked ? (
              <CheckIcon className={cn(iconSizeStyles[size], 'text-white')} />
            ) : null}
          </span>
        </span>

        {/* Label + description */}
        {(label || description) && (
          <span className="flex flex-col min-w-0">
            {label && (
              <span className={labelTextStyles[size]}>{label}</span>
            )}
            {description && (
              <span className={descriptionBase}>{description}</span>
            )}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
