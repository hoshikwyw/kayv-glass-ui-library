'use client';

import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import {
  footerBase,
  brandBase,
  linksBase,
  linksHeadingBase,
  itemBase,
  dividerBase,
  bottomBase,
} from './Footer.styles';
import type {
  FooterProps,
  FooterBrandProps,
  FooterLinksProps,
  FooterItemProps,
  FooterDividerProps,
  FooterBottomProps,
} from './Footer.types';

// ── Icon ───────────────────────────────────────────────────────────────────────

const ExternalIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-3 w-3 shrink-0"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

// ── Footer ─────────────────────────────────────────────────────────────────────

export const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ className, ...props }, ref) => (
    <footer ref={ref} className={cn(footerBase, className)} {...props} />
  )
);
Footer.displayName = 'Footer';

// ── FooterBrand ────────────────────────────────────────────────────────────────

export const FooterBrand = forwardRef<HTMLDivElement, FooterBrandProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(brandBase, className)} {...props} />
  )
);
FooterBrand.displayName = 'FooterBrand';

// ── FooterLinks ────────────────────────────────────────────────────────────────

export const FooterLinks = forwardRef<HTMLDivElement, FooterLinksProps>(
  ({ heading, className, children, ...props }, ref) => (
    <div ref={ref} className={cn(linksBase, className)} {...props}>
      {heading && <p className={linksHeadingBase}>{heading}</p>}
      {children}
    </div>
  )
);
FooterLinks.displayName = 'FooterLinks';

// ── FooterItem ─────────────────────────────────────────────────────────────────

export const FooterItem = forwardRef<HTMLAnchorElement, FooterItemProps>(
  ({ isExternal, className, children, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(itemBase, className)}
      {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...props}
    >
      {children}
      {isExternal && <ExternalIcon />}
    </a>
  )
);
FooterItem.displayName = 'FooterItem';

// ── FooterDivider ──────────────────────────────────────────────────────────────

export const FooterDivider = forwardRef<HTMLHRElement, FooterDividerProps>(
  ({ className, ...props }, ref) => (
    <hr ref={ref} className={cn(dividerBase, className)} {...props} />
  )
);
FooterDivider.displayName = 'FooterDivider';

// ── FooterBottom ───────────────────────────────────────────────────────────────

export const FooterBottom = forwardRef<HTMLDivElement, FooterBottomProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(bottomBase, className)} {...props} />
  )
);
FooterBottom.displayName = 'FooterBottom';
