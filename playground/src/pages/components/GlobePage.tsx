import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Copy, Check, Move, RotateCcw, MapPin, Layers } from 'lucide-react';
import { Globe } from '../../../../src';
import type { GlobeMarker } from '../../../../src';

// ── City markers ──────────────────────────────────────────────────────────────

const CITIES: GlobeMarker[] = [
  { location: [37.7749, -122.4194], size: 0.05, label: 'San Francisco, US' },
  { location: [40.7128,  -74.0060], size: 0.06, label: 'New York, US' },
  { location: [51.5074,   -0.1278], size: 0.06, label: 'London, UK' },
  { location: [48.8566,    2.3522], size: 0.05, label: 'Paris, France' },
  { location: [52.5200,   13.4050], size: 0.04, label: 'Berlin, Germany' },
  { location: [35.6762,  139.6503], size: 0.06, label: 'Tokyo, Japan' },
  { location: [22.3193,  114.1694], size: 0.05, label: 'Hong Kong' },
  { location: [ 1.3521,  103.8198], size: 0.05, label: 'Singapore' },
  { location: [-33.8688, 151.2093], size: 0.05, label: 'Sydney, Australia' },
  { location: [25.2048,   55.2708], size: 0.04, label: 'Dubai, UAE' },
  { location: [-23.5505, -46.6333], size: 0.04, label: 'São Paulo, Brazil' },
  { location: [55.7558,   37.6173], size: 0.04, label: 'Moscow, Russia' },
  { location: [28.6139,   77.2090], size: 0.04, label: 'New Delhi, India' },
  { location: [19.0760,   72.8777], size: 0.03, label: 'Mumbai, India' },
  { location: [-1.2921,   36.8219], size: 0.03, label: 'Nairobi, Kenya' },
  { location: [31.2304,  121.4737], size: 0.05, label: 'Shanghai, China' },
  { location: [37.5665,  126.9780], size: 0.04, label: 'Seoul, South Korea' },
  { location: [-34.6037, -58.3816], size: 0.03, label: 'Buenos Aires, Argentina' },
];

type Tab = 'preview' | 'code';

// ── Props data ────────────────────────────────────────────────────────────────

const propsData = [
  { name: 'size',            type: 'number',        defaultVal: '500',                  desc: 'Width and height of the globe in pixels.' },
  { name: 'dark',            type: 'boolean',       defaultVal: 'true',                 desc: 'Dark (1) or light (0) land rendering mode.' },
  { name: 'baseColor',       type: '[r, g, b]',     defaultVal: '[0.08, 0.10, 0.18]',  desc: 'Globe sphere base color, each channel 0–1.' },
  { name: 'markerColor',     type: '[r, g, b]',     defaultVal: '[0.35, 0.65, 1.0]',   desc: 'Default color for all markers.' },
  { name: 'glowColor',       type: '[r, g, b]',     defaultVal: '[0.18, 0.28, 0.65]',  desc: 'Color used for shader halo and CSS bloom overlay.' },
  { name: 'diffuse',         type: 'number',        defaultVal: '1.4',                  desc: 'Phong diffuse lighting intensity (0.5–3).' },
  { name: 'mapSamples',      type: 'number',        defaultVal: '16000',                desc: 'Fibonacci lattice dot count — higher = more detail.' },
  { name: 'mapBrightness',   type: 'number',        defaultVal: '6',                    desc: 'Land dot luminosity.' },
  { name: 'markers',         type: 'GlobeMarker[]', defaultVal: '[]',                   desc: 'Array of { location: [lat, lon], size?, color?, label? } points. label enables the hover tooltip.' },
  { name: 'autoRotate',      type: 'boolean',       defaultVal: 'true',                 desc: 'Enable continuous auto-rotation.' },
  { name: 'autoRotateSpeed', type: 'number',        defaultVal: '0.004',                desc: 'Rotation increment per frame (radians).' },
  { name: 'phi',             type: 'number',        defaultVal: '0',                    desc: 'Initial horizontal rotation (0–2π).' },
  { name: 'theta',           type: 'number',        defaultVal: '0.3',                  desc: 'Initial vertical tilt (-π to π).' },
  { name: 'glow',            type: 'boolean',       defaultVal: 'true',                 desc: 'Show CSS box-shadow halo and radial bottom bloom.' },
  { name: 'className',       type: 'string',        defaultVal: '—',                    desc: 'Applied to the root wrapper div.' },
];

// ── Code snippets ─────────────────────────────────────────────────────────────

const snippets: Record<string, string> = {
  Basic: `import { Globe } from 'kayv-glass-ui';

<Globe size={480} dark autoRotate glow />`,

  'With Markers': `import { Globe } from 'kayv-glass-ui';
import type { GlobeMarker } from 'kayv-glass-ui';

const cities: GlobeMarker[] = [
  { location: [37.7749, -122.4194], size: 0.05, label: 'San Francisco, US' },
  { location: [51.5074,  -0.1278],  size: 0.06, label: 'London, UK' },
  { location: [35.6762, 139.6503],  size: 0.06, label: 'Tokyo, Japan' },
];

// Hover any marker to see its label tooltip
<Globe
  size={480}
  markers={cities}
  dark
  autoRotate
  autoRotateSpeed={0.004}
  glowColor={[0.2, 0.35, 0.8]}
  markerColor={[0.4, 0.7, 1.0]}
/>`,

  'Light Variant': `<Globe
  size={360}
  dark={false}
  diffuse={2.2}
  mapBrightness={8}
  baseColor={[0.7, 0.75, 0.85]}
  markerColor={[0.2, 0.4, 0.9]}
  glowColor={[0.5, 0.6, 0.9]}
/>`,

  'Custom Colors': `{/* Purple / neon theme */}
<Globe
  size={360}
  dark
  baseColor={[0.06, 0.04, 0.15]}
  markerColor={[0.75, 0.4, 1.0]}
  glowColor={[0.4, 0.15, 0.75]}
  diffuse={1.3}
/>`,

  'Static (no auto-rotate)': `<Globe
  size={360}
  autoRotate={false}
  glow={false}
  dark
/>`,
};

// ── Shared helpers ────────────────────────────────────────────────────────────

function SectionCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden
      border border-white/60 dark:border-white/10
      bg-white/40 dark:bg-slate-800/40
      backdrop-blur-sm shadow-sm shadow-slate-100/50 dark:shadow-black/10">
      <div className="px-5 py-3.5 border-b border-slate-100/50 dark:border-white/5
        bg-white/30 dark:bg-slate-700/20">
        <span className="text-xs font-semibold tracking-wider uppercase
          text-slate-400 dark:text-slate-500">
          {label}
        </span>
      </div>
      <div className="px-6 py-8">{children}</div>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-700/40 bg-slate-900/95 backdrop-blur-sm shadow-sm">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-700/50">
        <span className="text-xs text-slate-500 font-mono">tsx</span>
        <button
          onClick={() => navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          })}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="px-5 py-4 text-sm font-mono leading-relaxed text-slate-300 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <code className="text-indigo-600 dark:text-indigo-300 text-xs font-mono
      bg-indigo-50 dark:bg-indigo-500/10
      px-1.5 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-500/20">
      {children}
    </code>
  );
}

/** Dark stage — consistent background for all globe demos */
function GlobeStage({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden flex items-center justify-center ${className}`}
      style={{
        background:
          'radial-gradient(ellipse at 50% 0%, rgba(22,32,80,0.9) 0%, rgba(7,9,20,0.96) 65%)',
      }}
    >
      {children}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function GlobePage() {
  const [tab, setTab] = useState<Tab>('preview');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs mb-6 text-slate-400 dark:text-slate-600">
        <Link to="/overview" className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors">
          Components
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-700 dark:text-slate-300">Globe</span>
      </nav>

      {/* Title + description */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">
          Globe
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
          An interactive 3D globe powered by <Chip>cobe</Chip> — a 5 KB WebGL fragment shader.
          Continents are drawn via a Spherical Fibonacci Lattice.
          Supports <Chip>drag-to-rotate</Chip> with velocity inertia,{' '}
          <Chip>autoRotate</Chip>, and configurable <Chip>markers</Chip>.
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex items-center gap-1 p-1 rounded-xl w-fit mb-6
        bg-slate-100/60 dark:bg-slate-800/60
        border border-slate-200/40 dark:border-white/5 backdrop-blur-sm">
        {(['preview', 'code'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
              tab === t
                ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm shadow-slate-200/50 dark:shadow-black/30'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── PREVIEW ─────────────────────────────────────────────────────────── */}
      {tab === 'preview' && (
        <div className="flex flex-col gap-4 mb-12">

          {/* Main showcase */}
          <SectionCard label="Default">
            <GlobeStage className="py-10">
              <Globe
                size={400}
                markers={CITIES}
                dark
                autoRotate
                autoRotateSpeed={0.004}
                glowColor={[0.2, 0.35, 0.8]}
                markerColor={[0.4, 0.7, 1.0]}
              />
            </GlobeStage>

            {/* Feature row */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Move,      label: 'Drag to rotate' },
                { icon: RotateCcw, label: 'Auto-spin' },
                { icon: MapPin,    label: 'Lat / lon markers' },
                { icon: Layers,    label: '5 KB WebGL shader' },
              ].map(({ icon: Icon, label }) => (
                <div key={label}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl
                    bg-slate-50/80 dark:bg-slate-700/30
                    border border-slate-200/40 dark:border-white/5
                    text-xs text-slate-600 dark:text-slate-400 font-medium">
                  <Icon className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400 shrink-0" />
                  {label}
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Variants */}
          <SectionCard label="Variants">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              {/* Dark (default) */}
              <div className="flex flex-col gap-3 items-center">
                <GlobeStage className="w-full py-8">
                  <Globe
                    size={200}
                    dark
                    markers={CITIES.slice(0, 8)}
                    glowColor={[0.18, 0.28, 0.65]}
                    markerColor={[0.4, 0.7, 1.0]}
                  />
                </GlobeStage>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  Dark <span className="text-slate-400 dark:text-slate-600">(default)</span>
                </p>
              </div>

              {/* Light */}
              <div className="flex flex-col gap-3 items-center">
                <GlobeStage className="w-full py-8">
                  <Globe
                    size={200}
                    dark={false}
                    diffuse={2.2}
                    mapBrightness={8}
                    baseColor={[0.7, 0.75, 0.85]}
                    markerColor={[0.2, 0.4, 0.9]}
                    glowColor={[0.5, 0.6, 0.9]}
                    markers={CITIES.slice(0, 8)}
                  />
                </GlobeStage>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  Light <span className="text-slate-400 dark:text-slate-600">dark={'{false}'}</span>
                </p>
              </div>

              {/* Purple */}
              <div className="flex flex-col gap-3 items-center">
                <GlobeStage className="w-full py-8">
                  <Globe
                    size={200}
                    dark
                    baseColor={[0.06, 0.04, 0.15]}
                    markerColor={[0.75, 0.4, 1.0]}
                    glowColor={[0.4, 0.15, 0.75]}
                    diffuse={1.3}
                    markers={CITIES.slice(0, 8)}
                  />
                </GlobeStage>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  Purple <span className="text-slate-400 dark:text-slate-600">custom colors</span>
                </p>
              </div>
            </div>
          </SectionCard>

          {/* City markers */}
          <SectionCard label="City Markers — 18 locations">
            <div className="flex flex-col sm:flex-row gap-8 items-center">
              <GlobeStage className="shrink-0 p-8">
                <Globe
                  size={300}
                  markers={CITIES}
                  dark
                  glowColor={[0.2, 0.35, 0.8]}
                  markerColor={[0.4, 0.7, 1.0]}
                  phi={1.2}
                  theta={0.4}
                />
              </GlobeStage>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                {[
                  'San Francisco', 'New York', 'London', 'Paris',
                  'Berlin', 'Tokyo', 'Hong Kong', 'Singapore',
                  'Sydney', 'Dubai', 'São Paulo', 'Moscow',
                  'New Delhi', 'Mumbai', 'Nairobi', 'Shanghai',
                  'Seoul', 'Buenos Aires',
                ].map(city => (
                  <li key={city} className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          </SectionCard>

          {/* No glow + static */}
          <SectionCard label="No glow · Static (drag only)">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <GlobeStage className="shrink-0 p-8">
                <Globe
                  size={240}
                  markers={CITIES.slice(0, 6)}
                  autoRotate={false}
                  glow={false}
                  dark
                />
              </GlobeStage>
              <div className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
                Set <Chip>autoRotate={'{false}'}</Chip> and <Chip>glow={'{false}'}</Chip> for a
                minimal globe that the user can still drag to explore.
              </div>
            </div>
          </SectionCard>

        </div>
      )}

      {/* ── CODE ────────────────────────────────────────────────────────────── */}
      {tab === 'code' && (
        <div className="flex flex-col gap-6 mb-12">
          {Object.entries(snippets).map(([label, code]) => (
            <div key={label}>
              <p className="text-xs font-semibold uppercase tracking-wider
                text-slate-400 dark:text-slate-600 mb-2">
                {label}
              </p>
              <CodeBlock code={code} />
            </div>
          ))}
        </div>
      )}

      {/* ── PROPS TABLE ──────────────────────────────────────────────────────── */}
      <div>
        <h2 className="text-xs font-semibold tracking-wider uppercase mb-3
          text-slate-400 dark:text-slate-500">
          Props
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-white/60 dark:border-white/10
          bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100/60 dark:border-white/5 bg-slate-50/60 dark:bg-slate-700/30">
                {['Prop', 'Type', 'Default', 'Description'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] font-semibold
                    uppercase tracking-widest text-slate-400 dark:text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/60 dark:divide-white/5">
              {propsData.map(p => (
                <tr key={p.name} className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <code className="text-indigo-600 dark:text-indigo-400 text-xs font-mono">{p.name}</code>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <code className="text-blue-600 dark:text-amber-300/80 text-xs font-mono">{p.type}</code>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <code className="text-slate-500 dark:text-slate-400 text-xs font-mono">{p.defaultVal}</code>
                  </td>
                  <td className="px-5 py-3.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {p.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
