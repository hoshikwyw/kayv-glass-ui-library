export type FileInputSize = 'sm' | 'md' | 'lg';
export type FileInputVariant = 'dropzone' | 'button';

export interface FileValidationError {
  file: File;
  reason: string;
}

export interface FileInputProps {
  // Selection
  accept?: string;
  multiple?: boolean;
  maxSize?: number;       // bytes
  maxFiles?: number;
  // Controlled / uncontrolled
  value?: File[];
  defaultValue?: File[];
  onChange?: (files: File[]) => void;
  onError?: (errors: FileValidationError[]) => void;
  // Labels
  label?: string;
  hint?: string;
  error?: string;
  // Config
  variant?: FileInputVariant;
  size?: FileInputSize;
  disabled?: boolean;
  id?: string;
  className?: string;
}
