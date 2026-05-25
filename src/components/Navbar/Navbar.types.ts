import React from 'react';

export type NavbarPosition = 'sticky' | 'fixed' | 'static';
export type NavbarJustify = 'start' | 'center' | 'end';

export interface NavbarProps extends React.ComponentPropsWithoutRef<'nav'> {
  position?: NavbarPosition;
}

export interface NavbarBrandProps extends React.ComponentPropsWithoutRef<'div'> {}

export interface NavbarContentProps extends React.ComponentPropsWithoutRef<'div'> {
  justify?: NavbarJustify;
}

export interface NavbarItemProps extends React.ComponentPropsWithoutRef<'a'> {
  isActive?: boolean;
}

export interface NavbarMenuToggleProps extends React.ComponentPropsWithoutRef<'button'> {
  isOpen: boolean;
  onToggle: () => void;
}

export interface NavbarMenuProps extends React.ComponentPropsWithoutRef<'div'> {
  isOpen: boolean;
}
