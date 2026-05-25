import React from 'react';

export interface FooterProps extends React.ComponentPropsWithoutRef<'footer'> {}

export interface FooterBrandProps extends React.ComponentPropsWithoutRef<'div'> {}

export interface FooterLinksProps extends React.ComponentPropsWithoutRef<'div'> {
  heading?: string;
}

export interface FooterItemProps extends React.ComponentPropsWithoutRef<'a'> {
  isExternal?: boolean;
}

export interface FooterDividerProps extends React.ComponentPropsWithoutRef<'hr'> {}

export interface FooterBottomProps extends React.ComponentPropsWithoutRef<'div'> {}
