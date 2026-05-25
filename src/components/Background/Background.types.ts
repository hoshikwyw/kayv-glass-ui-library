import type React from 'react';

export interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  /** Cell width/height (spacing between dot centres). */
  width?: number;
  height?: number;
  /** Pattern offset. */
  x?: number;
  y?: number;
  /** Dot position within each cell. */
  cx?: number;
  cy?: number;
  /** Dot radius. */
  cr?: number;
}

export interface GridPatternProps extends React.SVGProps<SVGSVGElement> {
  /** Grid cell dimensions. */
  width?: number;
  height?: number;
  /** Pattern offset — set to -1 to align lines with the container edge. */
  x?: number;
  y?: number;
  /** Highlighted squares as [column, row] grid coordinates. */
  squares?: Array<[col: number, row: number]>;
  /** strokeDasharray applied to the grid lines — set to "4 4" for dashed lines. */
  lineStrokeDasharray?: number | string;
}

export interface GradientBackgroundProps {
  className?: string;
  /** true = fixed (full viewport behind everything), false = absolute (fills nearest relative parent) */
  fixed?: boolean;
}
