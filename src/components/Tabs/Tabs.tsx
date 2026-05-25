'use client';

import React, {
  createContext,
  forwardRef,
  useContext,
  useId,
  useState,
} from 'react';
import { cn } from '../../utils/cn';
import {
  listVariantStyles,
  tabBase,
  tabActiveStyles,
  tabInactiveStyles,
  panelBase,
} from './Tabs.styles';
import type {
  TabListProps,
  TabPanelProps,
  TabPanelsProps,
  TabProps,
  TabsProps,
  TabsVariant,
} from './Tabs.types';

// ── Context ────────────────────────────────────────────────────────────────────

interface TabsCtx {
  activeTab: string;
  setActiveTab: (value: string) => void;
  variant: TabsVariant;
  uid: string;
}

const TabsContext = createContext<TabsCtx | null>(null);

function useTabsCtx() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tab compound components must be used within <Tabs>');
  return ctx;
}

// ── Tabs (root) ────────────────────────────────────────────────────────────────

export function Tabs({
  defaultValue = '',
  value,
  onChange,
  variant = 'pills',
  className,
  children,
  ...props
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const uid = useId();

  const isControlled = value !== undefined;
  const activeTab = isControlled ? value : internalValue;

  const setActiveTab = (next: string) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, variant, uid }}>
      <div className={cn('w-full', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// ── TabList ────────────────────────────────────────────────────────────────────

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ className, ...props }, ref) => {
    const { variant } = useTabsCtx();
    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation="horizontal"
        className={cn(
          'overflow-x-auto',
          variant === 'pills' && 'w-fit max-w-full',
          variant !== 'pills' && 'w-full',
          className,
        )}
      >
        <div className={cn(listVariantStyles[variant], variant === 'pills' && 'min-w-max')}>
          {props.children}
        </div>
      </div>
    );
  }
);
TabList.displayName = 'TabList';

// ── Tab ────────────────────────────────────────────────────────────────────────

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ value, disabled, className, children, ...props }, ref) => {
    const { activeTab, setActiveTab, variant, uid } = useTabsCtx();
    const isActive = activeTab === value;
    const tabId = `${uid}-tab-${value}`;
    const panelId = `${uid}-panel-${value}`;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      // Find the inner flex container (parent of all tabs)
      const tablist = e.currentTarget.closest('[role="tablist"]');
      if (!tablist) return;
      const tabs = Array.from(
        tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])')
      );
      const idx = tabs.indexOf(e.currentTarget);
      let next: HTMLButtonElement | undefined;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        next = tabs[(idx + 1) % tabs.length];
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        next = tabs[(idx - 1 + tabs.length) % tabs.length];
      } else if (e.key === 'Home') {
        e.preventDefault();
        next = tabs[0];
      } else if (e.key === 'End') {
        e.preventDefault();
        next = tabs[tabs.length - 1];
      }

      if (next) {
        next.focus();
        const nextValue = next.dataset.value;
        if (nextValue) setActiveTab(nextValue);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={tabId}
        aria-selected={isActive}
        aria-controls={panelId}
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        data-value={value}
        data-state={isActive ? 'active' : 'inactive'}
        onClick={() => setActiveTab(value)}
        onKeyDown={handleKeyDown}
        className={cn(
          tabBase,
          isActive ? tabActiveStyles[variant] : tabInactiveStyles[variant],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Tab.displayName = 'Tab';

// ── TabPanels ──────────────────────────────────────────────────────────────────

export const TabPanels = forwardRef<HTMLDivElement, TabPanelsProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('w-full', className)} {...props} />
  )
);
TabPanels.displayName = 'TabPanels';

// ── TabPanel ───────────────────────────────────────────────────────────────────

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ value, className, children, ...props }, ref) => {
    const { activeTab, uid } = useTabsCtx();
    const isActive = activeTab === value;
    const tabId = `${uid}-tab-${value}`;
    const panelId = `${uid}-panel-${value}`;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={panelId}
        aria-labelledby={tabId}
        tabIndex={0}
        hidden={!isActive}
        className={cn(panelBase, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabPanel.displayName = 'TabPanel';
