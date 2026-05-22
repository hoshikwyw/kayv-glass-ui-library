'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useId,
  useState,
} from 'react';
import { cn } from '../../utils/cn';
import {
  accordionRoot,
  triggerBase,
  contentOuter,
  contentInner,
  contentBody,
} from './Accordion.styles';
import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionProps,
  AccordionTriggerProps,
} from './Accordion.types';

// ── Contexts ───────────────────────────────────────────────────────────────────

interface AccordionCtx {
  type: 'single' | 'multiple';
  openItems: Set<string>;
  toggle: (value: string) => void;
  collapsible: boolean;
}

interface AccordionItemCtx {
  value: string;
  isOpen: boolean;
  disabled: boolean;
  triggerId: string;
  panelId: string;
}

const AccordionContext = createContext<AccordionCtx | null>(null);
const AccordionItemContext = createContext<AccordionItemCtx | null>(null);

function useAccordionCtx() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('Accordion compound components must be used within <Accordion>');
  return ctx;
}

function useAccordionItemCtx() {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) throw new Error('AccordionTrigger/AccordionContent must be used within <AccordionItem>');
  return ctx;
}

// ── Chevron icon ───────────────────────────────────────────────────────────────

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

// ── Accordion (root) ───────────────────────────────────────────────────────────

export function Accordion({
  type = 'single',
  defaultValue,
  collapsible = true,
  className,
  children,
  ...props
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    if (defaultValue === undefined) return new Set();
    return new Set(Array.isArray(defaultValue) ? defaultValue : [defaultValue]);
  });

  const toggle = useCallback(
    (value: string) => {
      setOpenItems(prev => {
        const next = new Set(prev);
        if (next.has(value)) {
          if (type === 'single' && !collapsible) return prev;
          next.delete(value);
        } else {
          if (type === 'single') next.clear();
          next.add(value);
        }
        return next;
      });
    },
    [type, collapsible]
  );

  return (
    <AccordionContext.Provider value={{ type, openItems, toggle, collapsible }}>
      <div className={cn(accordionRoot, className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

// ── AccordionItem ──────────────────────────────────────────────────────────────

export function AccordionItem({
  value,
  disabled = false,
  className,
  children,
  ...props
}: AccordionItemProps) {
  const { openItems } = useAccordionCtx();
  const isOpen = openItems.has(value);
  const uid = useId();
  const triggerId = `accordion-trigger-${uid}`;
  const panelId = `accordion-panel-${uid}`;

  return (
    <AccordionItemContext.Provider value={{ value, isOpen, disabled, triggerId, panelId }}>
      <div
        className={cn(className)}
        data-state={isOpen ? 'open' : 'closed'}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

// ── AccordionTrigger ───────────────────────────────────────────────────────────

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { toggle } = useAccordionCtx();
    const { value, isOpen, disabled, triggerId, panelId } = useAccordionItemCtx();

    return (
      <button
        ref={ref}
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        disabled={disabled}
        onClick={() => toggle(value)}
        className={cn(triggerBase, className)}
        {...props}
      >
        <span className="flex-1">{children}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500',
            'transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>
    );
  }
);
AccordionTrigger.displayName = 'AccordionTrigger';

// ── AccordionContent ───────────────────────────────────────────────────────────

export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const { isOpen, panelId, triggerId } = useAccordionItemCtx();

    return (
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={cn(contentOuter, isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
      >
        <div className={contentInner}>
          <div ref={ref} className={cn(contentBody, className)} {...props}>
            {children}
          </div>
        </div>
      </div>
    );
  }
);
AccordionContent.displayName = 'AccordionContent';
