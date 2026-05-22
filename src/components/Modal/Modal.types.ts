import type React from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  size?: ModalSize;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface ModalHeaderProps extends React.ComponentPropsWithoutRef<'div'> {
  onClose?: () => void;
}

export type ModalBodyProps = React.ComponentPropsWithoutRef<'div'>;

export type ModalFooterProps = React.ComponentPropsWithoutRef<'div'>;
