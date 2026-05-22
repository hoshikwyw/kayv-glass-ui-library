import React from 'react';

export type AlertVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

export interface AlertProps extends React.ComponentPropsWithoutRef<'div'> {
  variant?: AlertVariant;
  /** Bold label rendered above the description. */
  title?: string;
  /** Called when the dismiss button is clicked. Omit to hide the button. */
  onDismiss?: () => void;
}
