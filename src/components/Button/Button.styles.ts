import type { ButtonSize, ButtonVariant } from './Button.types';

export const buttonBase =
  'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'disabled:pointer-events-none disabled:opacity-50 select-none';

export const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 ' +
    'focus-visible:ring-blue-500 shadow-sm',
  secondary:
    'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 ' +
    'focus-visible:ring-gray-400 border border-gray-200',
  ghost:
    'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 ' +
    'focus-visible:ring-gray-400',
};

export const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2.5',
};

export const spinnerSizeStyles: Record<ButtonSize, string> = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};
