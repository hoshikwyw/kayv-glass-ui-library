'use client';

import { useId } from 'react';
import { cn } from '../../utils/cn';
import {
  dotPatternBase,
  gridPatternBase,
  gridSquareBase,
  gradientWrapFixed,
  gradientWrapAbsolute,
  gradientBlobA,
  gradientBlobB,
  gradientBlobC,
} from './Background.styles';
import type {
  DotPatternProps,
  GridPatternProps,
  GradientBackgroundProps,
} from './Background.types';

// ── DotPattern ────────────────────────────────────────────────────────────────

/**
 * SVG dot-grid that tiles to fill its container.
 * Place inside a `relative overflow-hidden` parent.
 * Apply a mask via className to create radial/linear fade effects:
 *   className="[mask-image:radial-gradient(350px_circle_at_center,white,transparent)]"
 */
export function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  ...props
}: DotPatternProps) {
  const rawId = useId();
  const id = `dp-${rawId.replace(/:/g, '')}`;

  return (
    <svg
      aria-hidden="true"
      className={cn(dotPatternBase, className)}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}

// ── GridPattern ───────────────────────────────────────────────────────────────

/**
 * SVG grid-line pattern that tiles to fill its container.
 * Pass `squares` as [col, row] pairs to highlight specific cells.
 * Place inside a `relative overflow-hidden` parent.
 */
export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  squares,
  lineStrokeDasharray = 0,
  className,
  ...props
}: GridPatternProps) {
  const rawId = useId();
  const id = `gp-${rawId.replace(/:/g, '')}`;

  return (
    <svg
      aria-hidden="true"
      className={cn(gridPatternBase, className)}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={lineStrokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      {squares && squares.length > 0 && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([col, row]) => (
            <rect
              key={`${col}-${row}`}
              strokeWidth={0}
              width={width - 1}
              height={height - 1}
              x={col * width + 1}
              y={row * height + 1}
              className={gridSquareBase}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

// ── GradientBackground ────────────────────────────────────────────────────────

/**
 * Ambient three-blob gradient background.
 * Defaults to `position: fixed` (behind the whole viewport).
 * Set `fixed={false}` to use `position: absolute` (fills nearest relative parent).
 */
export function GradientBackground({ className, fixed = true }: GradientBackgroundProps) {
  return (
    <div className={cn(fixed ? gradientWrapFixed : gradientWrapAbsolute, className)}>
      <div className={gradientBlobA} />
      <div className={gradientBlobB} />
      <div className={gradientBlobC} />
    </div>
  );
}
