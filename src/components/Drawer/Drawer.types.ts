import type React from 'react';

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  placement?: DrawerPlacement;
  size?: DrawerSize;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface DrawerHeaderProps extends React.ComponentPropsWithoutRef<'div'> {
  onClose?: () => void;
}

export type DrawerBodyProps = React.ComponentPropsWithoutRef<'div'>;

export type DrawerFooterProps = React.ComponentPropsWithoutRef<'div'>;
