import type React from 'react';

export type TabsVariant = 'pills' | 'underline' | 'line';

export interface TabsProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
  /** Value of the initially selected tab (uncontrolled). */
  defaultValue?: string;
  /** Controlled active tab value. */
  value?: string;
  /** Called when the active tab changes. */
  onChange?: (value: string) => void;
  /** Visual style of the tab list. Default: 'pills'. */
  variant?: TabsVariant;
}

export interface TabListProps extends React.ComponentPropsWithoutRef<'div'> {}

export interface TabProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'value'> {
  /** Unique identifier matched against Tabs value. */
  value: string;
}

export interface TabPanelsProps extends React.ComponentPropsWithoutRef<'div'> {}

export interface TabPanelProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Must match the corresponding Tab's value. */
  value: string;
}
