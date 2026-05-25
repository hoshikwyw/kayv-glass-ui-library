import type React from 'react';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'size' | 'type'> {
  /** Show a dash instead of a checkmark — for partial/mixed selection. */
  indeterminate?: boolean;
  /** Visual size of the checkbox. Default: 'md'. */
  size?: CheckboxSize;
  /** Label text rendered beside the checkbox. */
  label?: string;
  /** Helper text rendered below the label. */
  description?: string;
}
