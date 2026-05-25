'use client';

import { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import { cn } from '../../utils/cn';
import { canvasBase } from './Globe.styles';
import type { GlobeProps } from './Globe.types';

// ── Projection helpers ────────────────────────────────────────────────────────
// Mirrors cobe's internal U() and O() functions so we can map markers to 2D.

function latLonToXYZ([lat, lon]: [number, number]): [number, number, number] {
  const latR = (lat * Math.PI) / 180;
  const lonR = (lon * Math.PI) / 180 - Math.PI;
  const cosLat = Math.cos(latR);
  return [-cosLat * Math.cos(lonR), Math.sin(latR), cosLat * Math.sin(lonR)];
}

function projectToScreen(
  xyz: [number, number, number],
  phi: number,
  theta: number,
): { x: number; y: number; depth: number } {
  const [px, py, pz] = xyz;
  const cosP = Math.cos(phi),  sinP = Math.sin(phi);
  const cosT = Math.cos(theta), sinT = Math.sin(theta);
  // cobe's rotation matrix applied to the point
  const sx = cosP * px + sinP * pz;
  const sy = sinP * sinT * px + cosT * py - cosP * sinT * pz;
  const depth = -sinP * cosT * px + sinT * py + cosP * cosT * pz;
  // Normalize to [0, 1] (square canvas — aspect = 1)
  return { x: (sx + 1) / 2, y: (-sy + 1) / 2, depth };
}

// ── Component ─────────────────────────────────────────────────────────────────

interface TooltipState { label: string; x: number; y: number }

export function Globe({
  size = 500,
  dark = true,
  baseColor = [0.08, 0.10, 0.18],
  markerColor = [0.35, 0.65, 1.0],
  glowColor = [0.18, 0.28, 0.65],
  diffuse = 1.4,
  mapSamples = 16000,
  mapBrightness = 6,
  markers = [],
  autoRotate = true,
  autoRotateSpeed = 0.004,
  phi: initialPhi = 0,
  theta: initialTheta = 0.3,
  glow = true,
  className,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef   = useRef(initialPhi);
  const thetaRef = useRef(initialTheta);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    let phi = initialPhi;
    let velocity = 0;
    let isDragging = false;
    let lastX = 0;
    let width = canvas.offsetWidth || size;
    let rafId = 0;

    // Pre-compute XYZ for labeled markers — avoids per-frame work
    const labeledMarkers = markers
      .filter(m => m.label)
      .map(m => ({ xyz: latLonToXYZ(m.location), label: m.label! }));

    const onResize = () => { width = canvas.offsetWidth || size; };
    window.addEventListener('resize', onResize);

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: width * dpr,
      height: width * dpr,
      phi: initialPhi,
      theta: initialTheta,
      dark: dark ? 1 : 0,
      diffuse,
      mapSamples,
      mapBrightness,
      baseColor,
      markerColor,
      glowColor,
      markers: markers.map(m => ({
        location: m.location,
        size: m.size ?? 0.04,
        ...(m.color && { color: m.color }),
      })),
    });

    const loop = () => {
      if (!isDragging) {
        velocity *= 0.92;
        phi += velocity;
        if (autoRotate) phi += autoRotateSpeed;
      }
      phiRef.current = phi;
      globe.update({ phi, width: width * dpr, height: width * dpr });
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    // ── Pointer events ────────────────────────────────────────────────────────

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastX = e.clientX;
      velocity = 0;
      canvas.setPointerCapture(e.pointerId);
      setTooltip(null);
    };
    const onPointerUp = () => { isDragging = false; };

    const HOVER_THRESHOLD = 0.055; // fraction of canvas size

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const dx = e.clientX - lastX;
        phi += dx / 300;
        velocity = dx / 300;
        lastX = e.clientX;
        return;
      }

      if (labeledMarkers.length === 0) return;

      const rect = canvas.getBoundingClientRect();
      const cx = (e.clientX - rect.left)  / rect.width;
      const cy = (e.clientY - rect.top) / rect.height;

      let best: TooltipState | null = null;
      let bestDist = HOVER_THRESHOLD;

      for (const m of labeledMarkers) {
        const proj = projectToScreen(m.xyz, phiRef.current, thetaRef.current);
        if (proj.depth <= 0.05) continue; // behind globe
        const dist = Math.sqrt((cx - proj.x) ** 2 + (cy - proj.y) ** 2);
        if (dist < bestDist) {
          bestDist = dist;
          best = { label: m.label, x: proj.x, y: proj.y };
        }
      }
      setTooltip(best);
    };

    const onPointerLeave = () => setTooltip(null);

    canvas.addEventListener('pointerdown',  onPointerDown);
    canvas.addEventListener('pointerup',    onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
    canvas.addEventListener('pointermove',  onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);

    return () => {
      cancelAnimationFrame(rafId);
      globe.destroy();
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('pointerdown',  onPointerDown);
      canvas.removeEventListener('pointerup',    onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('pointermove',  onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [gr, gg, gb] = glowColor.map(c => Math.round(c * 255));

  return (
    <div
      className={cn('relative shrink-0', className)}
      style={{ width: size, height: size }}
    >
      {/* Outer box-shadow halo */}
      {glow && (
        <div
          aria-hidden
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ boxShadow: `0 0 80px 20px rgba(${gr}, ${gg}, ${gb}, 0.22)` }}
        />
      )}

      {/* Canvas clipped to circle */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <canvas ref={canvasRef} className={canvasBase} />
      </div>

      {/* Bottom bloom */}
      {glow && (
        <div
          aria-hidden
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 130%, rgba(${gr}, ${gg}, ${gb}, 0.38) 0%, transparent 55%)`,
          }}
        />
      )}

      {/* Marker tooltip */}
      {tooltip && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            left: `${tooltip.x * 100}%`,
            top:  `${tooltip.y * 100}%`,
            transform: 'translate(-50%, calc(-100% - 10px))',
          }}
        >
          {/* Bubble */}
          <div className="
            relative px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap
            bg-slate-900/90 backdrop-blur-md
            border border-white/15
            text-white
            shadow-lg shadow-black/40
          ">
            {tooltip.label}

            {/* Downward caret */}
            <span
              aria-hidden
              className="absolute left-1/2 -translate-x-1/2 top-full block w-0 h-0"
              style={{
                borderLeft:  '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop:   '5px solid rgba(15,23,42,0.9)',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
Globe.displayName = 'Globe';
