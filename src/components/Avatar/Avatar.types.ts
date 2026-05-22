import type React from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarVariant = 'circle' | 'rounded';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

export interface AvatarProps extends React.ComponentPropsWithoutRef<'span'> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  status?: AvatarStatus;
}

export interface AvatarGroupProps extends React.ComponentPropsWithoutRef<'div'> {
  max?: number;
  size?: AvatarSize;
  children: React.ReactNode;
}
