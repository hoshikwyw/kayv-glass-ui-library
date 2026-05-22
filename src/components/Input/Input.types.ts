import React from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'size'> {
  size?: InputSize;
  /** Renders a <label> element associated with the input via id. */
  label?: string;
  /** Helper text shown below the input when there is no error. */
  hint?: string;
  /** Error message shown below the input; also applies error styling. */
  error?: string;
  /** Node rendered inside the left edge of the input (icon, etc.). */
  leftIcon?: React.ReactNode;
  /** Node rendered inside the right edge of the input (icon, etc.). */
  rightIcon?: React.ReactNode;
}
