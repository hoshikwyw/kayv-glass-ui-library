import type React from 'react';

export type ProgressSize = 'xs' | 'sm' | 'md' | 'lg';
export type ProgressVariant = 'primary' | 'success' | 'warning' | 'danger';

export interface ProgressProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Current value (0–max). Omit for indeterminate state. */
  value?: number;
  /** Maximum value. Default: 100. */
  max?: number;
  /** Visual thickness of the bar. Default: 'md'. */
  size?: ProgressSize;
  /** Color scheme. Default: 'primary'. */
  variant?: ProgressVariant;
  /** Adds a moving shimmer overlay on the filled portion. */
  animated?: boolean;
  /** Optional label shown above the bar. */
  label?: string;
  /** Shows the percentage to the right of the label. */
  showValue?: boolean;
}
