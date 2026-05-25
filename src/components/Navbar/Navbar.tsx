'use client';

import React from 'react';
import { cn } from '../../utils/cn';
import {
  navbarBase,
  positionStyles,
  brandBase,
  contentBase,
  justifyStyles,
  itemBase,
  itemActiveStyles,
  itemInactiveStyles,
} from './Navbar.styles';
import type {
  NavbarProps,
  NavbarBrandProps,
  NavbarContentProps,
  NavbarItemProps,
} from './Navbar.types';

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, position = 'sticky', children, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn(navbarBase, positionStyles[position], className)}
      {...props}
    >
      {children}
    </nav>
  )
);
Navbar.displayName = 'Navbar';

export const NavbarBrand = React.forwardRef<HTMLDivElement, NavbarBrandProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(brandBase, className)} {...props}>
      {children}
    </div>
  )
);
NavbarBrand.displayName = 'NavbarBrand';

export const NavbarContent = React.forwardRef<HTMLDivElement, NavbarContentProps>(
  ({ className, justify = 'start', children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(contentBase, justifyStyles[justify], className)}
      {...props}
    >
      {children}
    </div>
  )
);
NavbarContent.displayName = 'NavbarContent';

export const NavbarItem = React.forwardRef<HTMLAnchorElement, NavbarItemProps>(
  ({ className, isActive = false, children, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        itemBase,
        isActive ? itemActiveStyles : itemInactiveStyles,
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
);
NavbarItem.displayName = 'NavbarItem';
