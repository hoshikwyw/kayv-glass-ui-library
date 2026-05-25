import type React from 'react';

export interface MenuBarProps {
  /** Currently active item value (controlled). */
  value?: string;
  /** Default active item value (uncontrolled). */
  defaultValue?: string;
  /** Called when the active item changes. */
  onValueChange?: (value: string) => void;
  /** Extra classes on the sidebar panel. */
  className?: string;
  /** Extra classes on the bottom navigation bar. */
  bottomNavClassName?: string;
  /**
   * Override the responsive auto-switching behaviour.
   * - `'responsive'` (default) — sidebar on lg+, bottom nav below lg.
   * - `'sidebar'` — always render the sidebar, never the bottom nav.
   * - `'bottomnav'` — always render the bottom nav, never the sidebar.
   */
  display?: 'responsive' | 'sidebar' | 'bottomnav';
  children: React.ReactNode;
}

export interface MenuBarBrandProps {
  children: React.ReactNode;
  className?: string;
}

export interface MenuBarItemProps {
  /** Unique identifier for this nav item. */
  value: string;
  /** Icon shown in both the sidebar and the bottom nav. */
  icon: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  /** Set to false to exclude this item from the mobile bottom nav. Default: true. */
  bottomNav?: boolean;
  className?: string;
  onClick?: () => void;
}

export interface MenuBarSectionProps {
  /** Optional section heading shown only in the sidebar. */
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export interface MenuBarDividerProps {
  className?: string;
}
