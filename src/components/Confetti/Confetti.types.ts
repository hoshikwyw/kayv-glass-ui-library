import type React from 'react';
import type { Options as CanvasConfettiOptions } from 'canvas-confetti';

/** Underlying canvas-confetti options — all fields optional. */
export type ConfettiOptions = CanvasConfettiOptions;

/** Preset burst patterns. */
export type ConfettiPreset = 'basic' | 'side-cannons' | 'fireworks' | 'stars';

/** Ref handle returned by the Confetti component. */
export interface ConfettiRef {
  /** Fire a confetti burst. Pass options to override defaults. */
  fire: (options?: ConfettiOptions) => void;
}

export interface ConfettiProps {
  /** Ref for imperative control. */
  ref?: React.Ref<ConfettiRef>;
}

export interface ConfettiButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  /** Confetti options passed to the burst on click. */
  options?: ConfettiOptions;
  /** Preset burst pattern. Overridden by options. Default: 'basic'. */
  preset?: ConfettiPreset;
  /** Called after confetti fires. */
  onConfetti?: () => void;
}
