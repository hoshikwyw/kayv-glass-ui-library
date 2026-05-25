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
  menuBase,
  menuInner,
  toggleBase,
  toggleBarBase,
} from './Navbar.styles';
import type {
  NavbarProps,
  NavbarBrandProps,
  NavbarContentProps,
  NavbarItemProps,
  NavbarMenuToggleProps,
  NavbarMenuProps,
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

export const NavbarMenuToggle = React.forwardRef<HTMLButtonElement, NavbarMenuToggleProps>(
  ({ className, isOpen, onToggle, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      onClick={onToggle}
      className={cn(toggleBase, className)}
      {...props}
    >
      <span className={cn(toggleBarBase, isOpen && 'translate-y-[7px] rotate-45')} />
      <span className={cn(toggleBarBase, isOpen && 'opacity-0 scale-x-0')} />
      <span className={cn(toggleBarBase, isOpen && '-translate-y-[7px] -rotate-45')} />
    </button>
  )
);
NavbarMenuToggle.displayName = 'NavbarMenuToggle';

export const NavbarMenu = React.forwardRef<HTMLDivElement, NavbarMenuProps>(
  ({ className, isOpen, children, ...props }, ref) => (
    <div
      ref={ref}
      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      className={cn(menuBase, className)}
      aria-hidden={!isOpen}
      {...props}
    >
      <div className={cn('overflow-hidden transition-opacity duration-200', isOpen ? 'opacity-100' : 'opacity-0')}>
        <div className={cn(menuInner, !isOpen && 'pointer-events-none')}>
          {children}
        </div>
      </div>
    </div>
  )
);
NavbarMenu.displayName = 'NavbarMenu';
