'use client';

import { forwardRef, useImperativeHandle } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '../../utils/cn';
import { confettiButtonBase } from './Confetti.styles';
import type {
  ConfettiButtonProps,
  ConfettiOptions,
  ConfettiPreset,
  ConfettiRef,
} from './Confetti.types';

// ── Preset fire functions (also exported for programmatic use) ─────────────────

const KV_COLORS = ['#4f46e5', '#7c3aed', '#6366f1', '#06b6d4', '#a855f7', '#ec4899', '#f59e0b'];

/** Standard burst from the lower-center of the screen. */
export function confettiBasic(options?: ConfettiOptions): void {
  confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.6 },
    colors: KV_COLORS,
    ...options,
  });
}

/** Two simultaneous bursts shot in from both left and right edges. */
export function confettiSideCannons(options?: ConfettiOptions): void {
  const base: ConfettiOptions = {
    particleCount: 80,
    startVelocity: 45,
    spread: 55,
    ticks: 200,
    colors: KV_COLORS,
    ...options,
  };
  confetti({ ...base, angle: 60,  origin: { x: 0,   y: 0.65 } });
  confetti({ ...base, angle: 120, origin: { x: 1,   y: 0.65 } });
}

/** Continuous fireworks display that runs for ~3 seconds. */
export function confettiFireworks(options?: ConfettiOptions): void {
  const end = Date.now() + 3000;
  const colors = ['#4f46e5', '#a855f7', '#06b6d4', '#f59e0b', '#ec4899'];

  const frame = () => {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
      ...options,
    });
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
      ...options,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

/** Slow golden star burst that floats upward from the center. */
export function confettiStars(options?: ConfettiOptions): void {
  const base: ConfettiOptions = {
    spread: 360,
    ticks: 80,
    gravity: 0,
    decay: 0.94,
    startVelocity: 28,
    colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8'],
    shapes: ['star'],
    origin: { x: 0.5, y: 0.5 },
    ...options,
  };
  confetti({ ...base, particleCount: 50, scalar: 1.2 });
  confetti({ ...base, particleCount: 25, scalar: 0.75 });
}

/** Emoji / text particle burst. */
export function confettiEmoji(emoji = '🎉', options?: ConfettiOptions): void {
  const scalar = 2;
  const shape = confetti.shapeFromText({ text: emoji, scalar });
  confetti({
    particleCount: 40,
    spread: 160,
    origin: { y: 0.6 },
    scalar,
    shapes: [shape],
    ...options,
  });
}

// ── Preset dispatcher ─────────────────────────────────────────────────────────

function firePreset(preset: ConfettiPreset, options?: ConfettiOptions): void {
  switch (preset) {
    case 'basic':        return confettiBasic(options);
    case 'side-cannons': return confettiSideCannons(options);
    case 'fireworks':    return confettiFireworks(options);
    case 'stars':        return confettiStars(options);
  }
}

// ── Confetti (ref-based, renders nothing) ─────────────────────────────────────

export const Confetti = forwardRef<ConfettiRef, object>((_, ref) => {
  useImperativeHandle(ref, () => ({
    fire: (options?: ConfettiOptions) => confettiBasic(options),
  }));
  return null;
});
Confetti.displayName = 'Confetti';

// ── ConfettiButton ────────────────────────────────────────────────────────────

export function ConfettiButton({
  options,
  preset = 'basic',
  onConfetti,
  children,
  onClick,
  className,
  ...props
}: ConfettiButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    firePreset(preset, options);
    onConfetti?.();
    onClick?.(e);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(confettiButtonBase, className)}
      {...props}
    >
      {children}
    </button>
  );
}
ConfettiButton.displayName = 'ConfettiButton';
