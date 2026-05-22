export type ToastVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  /** Duration in ms before auto-dismiss. Pass 0 to persist indefinitely. */
  duration?: number;
}

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration: number;
}

export interface ToasterProps {
  position?: ToastPosition;
}
