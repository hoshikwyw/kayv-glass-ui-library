'use client';

import React, {
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import { cn } from '../../utils/cn';
import {
  triggerBase,
  triggerErrorStyles,
  triggerSizeStyles,
  iconPaddingLeft,
  dropdownBase,
  optionBase,
  optionFocusedStyles,
  optionSelectedStyles,
  optionDisabledStyles,
  chevronBase,
  labelBase,
  hintBase,
  errorTextBase,
} from './Select.styles';
import type { SelectOption, SelectProps } from './Select.types';

// ── Icons ──────────────────────────────────────────────────────────────────────

const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 6l5 5 5-5" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 1 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
  </svg>
);

// ── Select ─────────────────────────────────────────────────────────────────────

interface Coords { top: number; left: number; width: number }

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder = 'Select an option…',
      size = 'md',
      label,
      hint,
      error,
      leftIcon,
      disabled,
      className,
      id: externalId,
    },
    ref
  ) => {
    const autoId = useId();
    const id = externalId ?? autoId;
    const listboxId = `${id}-listbox`;
    const descId = `${id}-desc`;

    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const selectedValue = isControlled ? controlledValue : internalValue;

    const [open, setOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [coords, setCoords] = useState<Coords>({ top: 0, left: 0, width: 0 });

    // Internal ref for position calculation; forwarded ref exposed via useImperativeHandle
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

    useImperativeHandle(ref, () => triggerRef.current!);

    const hasError = Boolean(error);
    const hasDesc = Boolean(error ?? hint);
    const selectedOption = options.find(o => o.value === selectedValue);

    const enabledIndices = options
      .map((o, i) => ({ ...o, i }))
      .filter(o => !o.disabled)
      .map(o => o.i);

    const calcCoords = useCallback(() => {
      if (!triggerRef.current) return;
      const r = triggerRef.current.getBoundingClientRect();
      setCoords({ top: r.bottom + 6, left: r.left, width: r.width });
    }, []);

    const handleSelect = useCallback(
      (option: SelectOption) => {
        if (option.disabled) return;
        if (!isControlled) setInternalValue(option.value);
        onChange?.(option.value);
        setOpen(false);
        setFocusedIndex(-1);
      },
      [isControlled, onChange]
    );

    const openDropdown = useCallback(() => {
      calcCoords();
      const selectedIdx = options.findIndex(o => o.value === selectedValue);
      setFocusedIndex(selectedIdx >= 0 ? selectedIdx : (enabledIndices[0] ?? 0));
      setOpen(true);
    }, [calcCoords, options, selectedValue, enabledIndices]);

    const closeDropdown = useCallback(() => {
      setOpen(false);
      setFocusedIndex(-1);
    }, []);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;
        switch (e.key) {
          case 'Enter':
          case ' ': {
            e.preventDefault();
            if (!open) { openDropdown(); }
            else if (focusedIndex >= 0 && !options[focusedIndex]?.disabled) {
              const opt = options[focusedIndex];
              if (opt) handleSelect(opt);
            }
            break;
          }
          case 'Escape': { e.preventDefault(); closeDropdown(); break; }
          case 'ArrowDown': {
            e.preventDefault();
            if (!open) { openDropdown(); }
            else {
              const pos = enabledIndices.indexOf(focusedIndex);
              const next = enabledIndices[Math.min(pos + 1, enabledIndices.length - 1)];
              if (next !== undefined) setFocusedIndex(next);
            }
            break;
          }
          case 'ArrowUp': {
            e.preventDefault();
            if (open) {
              const pos = enabledIndices.indexOf(focusedIndex);
              const prev = enabledIndices[Math.max(pos - 1, 0)];
              if (prev !== undefined) setFocusedIndex(prev);
            }
            break;
          }
          case 'Tab': { if (open) closeDropdown(); break; }
        }
      },
      [disabled, open, focusedIndex, options, enabledIndices, openDropdown, closeDropdown, handleSelect]
    );

    // Scroll focused option into view
    useEffect(() => {
      if (focusedIndex >= 0) {
        optionRefs.current[focusedIndex]?.scrollIntoView({ block: 'nearest' });
      }
    }, [focusedIndex]);

    // Reposition on scroll / resize while open
    useEffect(() => {
      if (!open) return;
      window.addEventListener('scroll', calcCoords, true);
      window.addEventListener('resize', calcCoords);
      return () => {
        window.removeEventListener('scroll', calcCoords, true);
        window.removeEventListener('resize', calcCoords);
      };
    }, [open, calcCoords]);

    // Click-outside: check trigger and the portal dropdown separately
    useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        const target = e.target as Node;
        const insideTrigger = triggerRef.current?.contains(target) ?? false;
        const insideDropdown = dropdownRef.current?.contains(target) ?? false;
        if (!insideTrigger && !insideDropdown) closeDropdown();
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [open, closeDropdown]);

    // ── Portal dropdown ──────────────────────────────────────────────────────

    const dropdownEl = (
      <div
        ref={dropdownRef}
        id={listboxId}
        role="listbox"
        aria-label={label}
        style={{ top: coords.top, left: coords.left, width: coords.width }}
        className={cn(
          dropdownBase,
          open
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-[0.97] pointer-events-none',
        )}
      >
        {options.map((option, index) => {
          const isSelected = option.value === selectedValue;
          const isFocused = index === focusedIndex;
          return (
            <div
              key={option.value}
              ref={el => { optionRefs.current[index] = el; }}
              role="option"
              aria-selected={isSelected}
              aria-disabled={option.disabled ?? false}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => { if (!option.disabled) setFocusedIndex(index); }}
              className={cn(
                optionBase,
                isFocused && !option.disabled && optionFocusedStyles,
                isSelected && optionSelectedStyles,
                option.disabled && optionDisabledStyles,
              )}
            >
              <span className="flex-1 truncate">{option.label}</span>
              {isSelected && (
                <CheckIcon className="h-3.5 w-3.5 shrink-0 text-indigo-500 dark:text-indigo-400" />
              )}
            </div>
          );
        })}
      </div>
    );

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className={labelBase}>
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10 text-slate-400 dark:text-slate-500 flex items-center">
              {leftIcon}
            </span>
          )}

          <button
            ref={triggerRef}
            id={id}
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls={open ? listboxId : undefined}
            aria-invalid={hasError ? true : undefined}
            aria-describedby={hasDesc ? descId : undefined}
            disabled={disabled}
            onClick={() => (open ? closeDropdown() : openDropdown())}
            onKeyDown={handleKeyDown}
            className={cn(
              triggerBase,
              triggerSizeStyles[size],
              hasError && triggerErrorStyles,
              leftIcon && iconPaddingLeft[size],
              className,
            )}
          >
            <span className={cn('flex-1 text-left truncate', !selectedOption && 'text-slate-400 dark:text-slate-500')}>
              {selectedOption?.label ?? placeholder}
            </span>
            <ChevronDown className={cn(chevronBase, open && 'rotate-180')} />
          </button>
        </div>

        {hasDesc && (
          <p id={descId} className={hasError ? errorTextBase : hintBase}>
            {error ?? hint}
          </p>
        )}

        {typeof document !== 'undefined' && ReactDOM.createPortal(dropdownEl, document.body)}
      </div>
    );
  }
);

Select.displayName = 'Select';
