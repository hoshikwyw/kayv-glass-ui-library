'use client';

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type React from 'react';
import { cn } from '../../utils/cn';
import {
  bottomNavBase,
  bottomNavIconWrap,
  bottomNavIconWrapActive,
  bottomNavItemActive,
  bottomNavItemBase,
  bottomNavLabel,
  brandBase,
  sidebarBase,
  sidebarDivider,
  sidebarItemActive,
  sidebarItemBase,
  sidebarItemDisabled,
  sidebarSectionLabel,
  sidebarScroll,
} from './MenuBar.styles';
import type {
  MenuBarBrandProps,
  MenuBarDividerProps,
  MenuBarItemProps,
  MenuBarProps,
  MenuBarSectionProps,
} from './MenuBar.types';

// ── Bottom nav entry ──────────────────────────────────────────────────────────

interface NavEntry {
  value: string;
  icon: React.ReactNode;
  label: React.ReactNode;
}

// ── Context ───────────────────────────────────────────────────────────────────

interface MenuBarCtx {
  activeValue: string;
  onSelect: (value: string) => void;
  registerItem: (value: string, icon: React.ReactNode, label: React.ReactNode) => void;
  unregisterItem: (value: string) => void;
}

const MenuBarContext = createContext<MenuBarCtx | null>(null);

function useMenuBarCtx() {
  const ctx = useContext(MenuBarContext);
  if (!ctx) throw new Error('MenuBar compound components must be used within <MenuBar>');
  return ctx;
}

// ── MenuBar (root) ────────────────────────────────────────────────────────────

export function MenuBar({
  value,
  defaultValue = '',
  onValueChange,
  children,
  className,
  bottomNavClassName,
  display = 'responsive',
}: MenuBarProps) {
  const [internal, setInternal] = useState(defaultValue);
  const activeValue = value ?? internal;

  const onSelect = (v: string) => {
    if (value === undefined) setInternal(v);
    onValueChange?.(v);
  };

  // ── Registration ────────────────────────────────────────────────────────────
  // Each MenuBarItem calls registerItem in useLayoutEffect, so the bottom nav
  // is populated before the first paint regardless of how items are nested.

  const [bottomNavEntries, setBottomNavEntries] = useState<NavEntry[]>([]);

  const registerItem = useCallback(
    (val: string, icon: React.ReactNode, label: React.ReactNode) => {
      setBottomNavEntries(prev => {
        const idx = prev.findIndex(e => e.value === val);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { value: val, icon, label };
          return next;
        }
        return [...prev, { value: val, icon, label }];
      });
    },
    [],
  );

  const unregisterItem = useCallback((val: string) => {
    setBottomNavEntries(prev => prev.filter(e => e.value !== val));
  }, []);

  return (
    <MenuBarContext.Provider value={{ activeValue, onSelect, registerItem, unregisterItem }}>
      {/* ── Sidebar ────────────────────────────────────────────────────────── */}
      <aside className={cn(
        sidebarBase,
        display === 'sidebar'   && '!flex',
        display === 'bottomnav' && '!hidden',
        className,
      )}>
        {children}
      </aside>

      {/* ── Bottom nav ─────────────────────────────────────────────────────── */}
      <nav className={cn(
        bottomNavBase,
        display === 'bottomnav' && '!flex',
        display === 'sidebar'   && '!hidden',
        bottomNavClassName,
      )} aria-label="Main navigation">
        {bottomNavEntries.map(entry => {
          const isActive = entry.value === activeValue;
          return (
            <button
              key={entry.value}
              type="button"
              onClick={() => onSelect(entry.value)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(bottomNavItemBase, isActive && bottomNavItemActive)}
            >
              <span className={cn(bottomNavIconWrap, isActive && bottomNavIconWrapActive)}>
                {entry.icon}
              </span>
              <span className={bottomNavLabel}>
                {entry.label}
              </span>
            </button>
          );
        })}
      </nav>
    </MenuBarContext.Provider>
  );
}
MenuBar.displayName = 'MenuBar';

// ── MenuBarBrand ──────────────────────────────────────────────────────────────

export const MenuBarBrand = forwardRef<HTMLDivElement, MenuBarBrandProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn(brandBase, className)} {...props}>
      {children}
    </div>
  )
);
MenuBarBrand.displayName = 'MenuBarBrand';

// ── MenuBarItem ───────────────────────────────────────────────────────────────

export const MenuBarItem = forwardRef<HTMLButtonElement, MenuBarItemProps>(
  ({ value, icon, children, disabled, bottomNav = true, className, onClick, ...props }, ref) => {
    const { activeValue, onSelect, registerItem, unregisterItem } = useMenuBarCtx();
    const isActive = activeValue === value;

    // Keep refs to latest icon/label so the effect always registers current values
    const iconRef  = useRef<React.ReactNode>(icon);
    const labelRef = useRef<React.ReactNode>(children);
    iconRef.current  = icon;
    labelRef.current = children;

    useLayoutEffect(() => {
      if (bottomNav !== false && !disabled) {
        registerItem(value, iconRef.current, labelRef.current);
      } else {
        unregisterItem(value);
      }
      return () => unregisterItem(value);
    // registerItem / unregisterItem are stable (useCallback with [] deps)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, bottomNav, disabled, registerItem, unregisterItem]);

    const handleClick = () => {
      if (disabled) return;
      onSelect(value);
      onClick?.();
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-current={isActive ? 'page' : undefined}
        aria-disabled={disabled}
        onClick={handleClick}
        className={cn(
          sidebarItemBase,
          isActive && sidebarItemActive,
          disabled && sidebarItemDisabled,
          className,
        )}
        {...props}
      >
        <span className="h-[18px] w-[18px] shrink-0 flex items-center justify-center">
          {icon}
        </span>
        <span className="truncate">{children}</span>
      </button>
    );
  }
);
MenuBarItem.displayName = 'MenuBarItem';

// ── MenuBarSection ────────────────────────────────────────────────────────────

export function MenuBarSection({ label, children, className }: MenuBarSectionProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      {label && <p className={sidebarSectionLabel}>{label}</p>}
      {children}
    </div>
  );
}
MenuBarSection.displayName = 'MenuBarSection';

// ── MenuBarDivider ────────────────────────────────────────────────────────────

export const MenuBarDivider = forwardRef<HTMLDivElement, MenuBarDividerProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(sidebarDivider, className)} role="separator" {...props} />
  )
);
MenuBarDivider.displayName = 'MenuBarDivider';

// ── MenuBarNav (scrollable body) ──────────────────────────────────────────────

export const MenuBarNav = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn(sidebarScroll, className)} {...props}>
      {children}
    </div>
  )
);
MenuBarNav.displayName = 'MenuBarNav';
