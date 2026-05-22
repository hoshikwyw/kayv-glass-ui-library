import React from 'react';

export type CardVariant = 'default' | 'elevated' | 'bordered' | 'ghost';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  variant?: CardVariant;
  padding?: CardPadding;
}

export interface CardHeaderProps extends React.ComponentPropsWithoutRef<'div'> {
  title?: string;
  description?: string;
}

export interface CardContentProps extends React.ComponentPropsWithoutRef<'div'> {}

export interface CardFooterProps extends React.ComponentPropsWithoutRef<'div'> {}
