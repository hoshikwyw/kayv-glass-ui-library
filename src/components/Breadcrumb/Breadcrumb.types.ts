import type React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<'nav'> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
}
