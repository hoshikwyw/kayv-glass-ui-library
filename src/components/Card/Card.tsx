'use client';

import React from 'react';
import { cn } from '../../utils/cn';
import { cardBase, variantStyles, paddingStyles, imageBase, imageAspectStyles, imageOverlayBase } from './Card.styles';
import type {
  CardProps,
  CardHeaderProps,
  CardContentProps,
  CardFooterProps,
  CardImageProps,
} from './Card.types';

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardBase, variantStyles[variant], paddingStyles[padding], className)}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, description, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-1 mb-4', className)} {...props}>
      {title && (
        <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-snug">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      )}
      {children}
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-sm text-slate-600 dark:text-slate-300 leading-relaxed', className)}
      {...props}
    >
      {children}
    </div>
  )
);
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-3 mt-4 pt-4',
        'border-t border-slate-100/60 dark:border-white/5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
CardFooter.displayName = 'CardFooter';

export const CardImage = React.forwardRef<HTMLDivElement, CardImageProps>(
  ({ className, src, alt = '', aspect = 'video', overlay = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(imageBase, imageAspectStyles[aspect], className)}
      {...props}
    >
      {src && (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {overlay && <div className={imageOverlayBase} />}
      {children}
    </div>
  )
);
CardImage.displayName = 'CardImage';
