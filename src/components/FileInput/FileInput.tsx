'use client';

import { forwardRef, useId, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import {
  browseSpanBase,
  buttonVariantDisabledStyles,
  buttonVariantEmptyStyles,
  buttonVariantFileStyles,
  buttonVariantStatusBase,
  buttonVariantTriggerBase,
  buttonVariantTriggerErrorStyles,
  buttonVariantTriggerSizeStyles,
  buttonVariantWrapperBase,
  dropzoneBase,
  dropzoneDragStyles,
  dropzoneDisabledStyles,
  dropzoneErrorStyles,
  dropzoneHintBase,
  dropzoneSizeStyles,
  dropzoneTitleBase,
  errorTextBase,
  fileIconBase,
  fileItemBase,
  fileListBase,
  fileNameBase,
  fileRemoveBase,
  fileSizeBase,
  hintBase,
  labelBase,
  uploadIconBase,
} from './FileInput.styles';
import type { FileInputProps, FileValidationError } from './FileInput.types';

// ── Icons ──────────────────────────────────────────────────────────────────────

const UploadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" className={uploadIconBase} aria-hidden="true">
    <path d="M12 16V4m0 0L8 8m4-4 4 4" />
    <path d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1" />
  </svg>
);

const FileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
    strokeLinecap="round" strokeLinejoin="round" className={fileIconBase} aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const XSmallIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75"
    strokeLinecap="round" className="h-3 w-3" aria-hidden="true">
    <path d="M3 3l10 10M13 3L3 13" />
  </svg>
);

const UploadIconSm = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
    strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true">
    <path d="M12 16V4m0 0L8 8m4-4 4 4" />
    <path d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1" />
  </svg>
);

// ── Utilities ─────────────────────────────────────────────────────────────────

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

function matchesAccept(file: File, accept: string): boolean {
  return accept.split(',').map(s => s.trim()).some(token => {
    if (token.startsWith('.')) return file.name.toLowerCase().endsWith(token.toLowerCase());
    if (token.endsWith('/*')) return file.type.startsWith(token.slice(0, -2) + '/');
    return file.type === token;
  });
}

function validateAndFilter(
  incoming: File[],
  current: File[],
  opts: { accept: string | undefined; maxSize: number | undefined; maxFiles: number | undefined; multiple: boolean }
): { valid: File[]; errors: FileValidationError[] } {
  const { accept, maxSize, maxFiles, multiple } = opts;
  const errors: FileValidationError[] = [];
  const valid: File[] = [];

  for (const file of incoming) {
    if (accept && !matchesAccept(file, accept)) {
      errors.push({ file, reason: `File type not accepted (${accept})` });
      continue;
    }
    if (maxSize && file.size > maxSize) {
      errors.push({ file, reason: `Exceeds max size of ${formatSize(maxSize)}` });
      continue;
    }
    valid.push(file);
  }

  // For single file mode, only keep the last valid file
  if (!multiple) return { valid: valid.slice(-1), errors };

  // Combine with current, respecting maxFiles
  const combined = [...current, ...valid];
  if (maxFiles && combined.length > maxFiles) {
    const excess = combined.length - maxFiles;
    const rejected = valid.slice(-excess);
    rejected.forEach(f => errors.push({ file: f, reason: `Max ${maxFiles} files allowed` }));
    return { valid: combined.slice(0, maxFiles), errors };
  }
  return { valid: combined, errors };
}

// ── Component ─────────────────────────────────────────────────────────────────

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      accept,
      multiple = false,
      maxSize,
      maxFiles,
      value,
      defaultValue,
      onChange,
      onError,
      label,
      hint,
      error,
      variant = 'dropzone',
      size = 'md',
      disabled = false,
      id: externalId,
      className,
    },
    ref
  ) => {
    const autoId = useId();
    const id = externalId ?? autoId;
    const descId = `${id}-desc`;
    const inputRef = useRef<HTMLInputElement>(null);

    // Expose inner input via forwarded ref
    const setRef = (el: HTMLInputElement | null) => {
      (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) ref.current = el;
    };

    // Controlled / uncontrolled
    const isControlled = value !== undefined;
    const [internalFiles, setInternalFiles] = useState<File[]>(defaultValue ?? []);
    const files = isControlled ? value : internalFiles;

    const updateFiles = (next: File[]) => {
      if (!isControlled) setInternalFiles(next);
      onChange?.(next);
    };

    // Drag state (counter avoids flicker when cursor moves over children)
    const dragCounter = useRef(0);
    const [isDragging, setIsDragging] = useState(false);

    const processFiles = (incoming: FileList | null) => {
      if (!incoming || incoming.length === 0) return;
      const { valid, errors } = validateAndFilter(
        Array.from(incoming),
        multiple ? files : [],
        { accept, maxSize, maxFiles, multiple }  // all typed as T | undefined, opts accepts that
      );
      if (errors.length) onError?.(errors);
      updateFiles(valid);
    };

    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      dragCounter.current++;
      if (!disabled) setIsDragging(true);
    };
    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); };
    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      dragCounter.current--;
      if (dragCounter.current === 0) setIsDragging(false);
    };
    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      dragCounter.current = 0;
      setIsDragging(false);
      if (!disabled) processFiles(e.dataTransfer.files);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      processFiles(e.target.files);
      // Reset input so the same file can be re-selected
      e.target.value = '';
    };

    const handleClick = () => {
      if (!disabled) inputRef.current?.click();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); }
    };

    const removeFile = (index: number) => {
      updateFiles(files.filter((_, i) => i !== index));
    };

    const hasError = Boolean(error);
    const hasDesc = Boolean(error ?? hint);

    // Build hint line about constraints
    const constraintHint = [
      accept && `${accept}`,
      maxSize && `Max ${formatSize(maxSize)}`,
      maxFiles && multiple && `Up to ${maxFiles} files`,
    ].filter(Boolean).join(' · ');

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <label htmlFor={id} className={labelBase}>
            {label}
          </label>
        )}

        {/* ── Button variant ───────────────────────────────────────────────── */}
        {variant === 'button' && (
          <>
            <input
              ref={setRef}
              type="file"
              id={id}
              accept={accept}
              multiple={multiple}
              disabled={disabled}
              onChange={handleInputChange}
              className="sr-only"
              tabIndex={-1}
            />
            <div className={buttonVariantWrapperBase}>
              <button
                type="button"
                onClick={handleClick}
                disabled={disabled}
                aria-describedby={hasDesc ? descId : undefined}
                aria-invalid={hasError ? true : undefined}
                className={cn(
                  buttonVariantTriggerBase,
                  buttonVariantTriggerSizeStyles[size],
                  hasError && buttonVariantTriggerErrorStyles,
                  disabled && buttonVariantDisabledStyles,
                )}
              >
                <UploadIconSm />
                Choose File{multiple ? 's' : ''}
              </button>

              {files.length === 0 ? (
                <span className={cn(buttonVariantStatusBase, buttonVariantEmptyStyles)}>
                  No file chosen
                </span>
              ) : (
                <div className="flex items-center gap-2 min-w-0">
                  <span className={cn(buttonVariantStatusBase, buttonVariantFileStyles)} title={
                    files.length === 1 ? files[0].name : `${files.length} files`
                  }>
                    {files.length === 1 ? files[0].name : `${files.length} files selected`}
                  </span>
                  {!disabled && (
                    <button
                      type="button"
                      aria-label="Clear selection"
                      onClick={() => updateFiles([])}
                      className={fileRemoveBase}
                    >
                      <XSmallIcon />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* File list for multiple */}
            {multiple && files.length > 1 && (
              <ul className={fileListBase} aria-label="Selected files">
                {files.map((file, i) => (
                  <li key={`${file.name}-${file.size}-${i}`} className={fileItemBase}>
                    <FileIcon />
                    <span className={fileNameBase} title={file.name}>{file.name}</span>
                    <span className={fileSizeBase}>{formatSize(file.size)}</span>
                    {!disabled && (
                      <button
                        type="button"
                        aria-label={`Remove ${file.name}`}
                        onClick={() => removeFile(i)}
                        className={fileRemoveBase}
                      >
                        <XSmallIcon />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {/* ── Dropzone variant ─────────────────────────────────────────────── */}
        {variant === 'dropzone' && (
          <>
            <div
              role="button"
              tabIndex={disabled ? -1 : 0}
              aria-label={`File upload${multiple ? ' — multiple files allowed' : ''}`}
              aria-disabled={disabled}
              aria-invalid={hasError ? true : undefined}
              aria-describedby={hasDesc ? descId : undefined}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                dropzoneBase,
                dropzoneSizeStyles[size],
                isDragging && dropzoneDragStyles,
                hasError && !isDragging && dropzoneErrorStyles,
                disabled && dropzoneDisabledStyles,
              )}
            >
              <input
                ref={setRef}
                type="file"
                id={id}
                accept={accept}
                multiple={multiple}
                disabled={disabled}
                onChange={handleInputChange}
                className="sr-only"
                tabIndex={-1}
              />

              <UploadIcon />

              <div className="flex flex-col gap-1">
                <p className={dropzoneTitleBase}>
                  Drag & drop {multiple ? 'files' : 'a file'} here
                </p>
                <p className={dropzoneHintBase}>
                  or <span className={browseSpanBase}>browse files</span>
                </p>
              </div>

              {constraintHint && (
                <p className={cn(dropzoneHintBase, 'text-[10px]')}>{constraintHint}</p>
              )}
            </div>

            {/* File list */}
            {files.length > 0 && (
              <ul className={fileListBase} aria-label="Selected files">
                {files.map((file, i) => (
                  <li key={`${file.name}-${file.size}-${i}`} className={fileItemBase}>
                    <FileIcon />
                    <span className={fileNameBase} title={file.name}>{file.name}</span>
                    <span className={fileSizeBase}>{formatSize(file.size)}</span>
                    {!disabled && (
                      <button
                        type="button"
                        aria-label={`Remove ${file.name}`}
                        onClick={e => { e.stopPropagation(); removeFile(i); }}
                        className={fileRemoveBase}
                      >
                        <XSmallIcon />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {/* ── Hint / error ────────────────────────────────────────────────── */}
        {hasDesc && (
          <p id={descId} className={hasError ? errorTextBase : hintBase}>
            {error ?? hint}
          </p>
        )}
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';
