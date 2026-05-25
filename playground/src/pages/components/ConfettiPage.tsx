import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Copy, Check, PartyPopper, Zap, Crosshair, Star, Smile } from 'lucide-react';
import {
  Confetti,
  ConfettiButton,
  confettiBasic,
  confettiSideCannons,
  confettiFireworks,
  confettiStars,
  confettiEmoji,
} from '../../../../src';
import type { ConfettiRef } from '../../../../src';

type PageTab = 'preview' | 'code';

// ── Props data ─────────────────────────────────────────────────────────────────

const buttonProps = [
  { name: 'preset',      type: "'basic' | 'side-cannons' | 'fireworks' | 'stars'", defaultVal: "'basic'", description: 'Built-in burst pattern.' },
  { name: 'options',     type: 'ConfettiOptions',  defaultVal: '—',     description: 'canvas-confetti options object. Merged over preset defaults.' },
  { name: 'onConfetti',  type: '() => void',       defaultVal: '—',     description: 'Called after confetti fires.' },
  { name: '...props',    type: 'React.ComponentPropsWithoutRef<"button">', defaultVal: '—', description: 'All native button attributes forwarded.' },
];

const refProps = [
  { name: 'fire', type: '(options?: ConfettiOptions) => void', defaultVal: '—', description: 'Imperatively fire a confetti burst. Call from any event handler.' },
];

const fnProps = [
  { name: 'confettiBasic(options?)',       type: 'void', defaultVal: '—', description: 'Standard burst from the lower-center of the screen.' },
  { name: 'confettiSideCannons(options?)', type: 'void', defaultVal: '—', description: 'Simultaneous bursts from left and right edges.' },
  { name: 'confettiFireworks(options?)',   type: 'void', defaultVal: '—', description: 'Continuous alternating side bursts for ~3 seconds.' },
  { name: 'confettiStars(options?)',       type: 'void', defaultVal: '—', description: 'Golden stars floating upward from the center.' },
  { name: 'confettiEmoji(emoji?, options?)', type: 'void', defaultVal: '—', description: 'Emoji/text particles burst. Default emoji: 🎉.' },
];

// ── Code snippets ──────────────────────────────────────────────────────────────

const snippets: Record<string, string> = {
  'ConfettiButton': `import { ConfettiButton } from 'kayv-glass-ui';

// Basic burst on click
<ConfettiButton>🎉 Celebrate!</ConfettiButton>

// Choose a preset
<ConfettiButton preset="side-cannons">Launch cannons</ConfettiButton>
<ConfettiButton preset="fireworks">Fireworks show</ConfettiButton>
<ConfettiButton preset="stars">⭐ Stars</ConfettiButton>

// Override canvas-confetti options
<ConfettiButton
  options={{ particleCount: 200, spread: 100, colors: ['#ff0000','#00ff00'] }}
>
  Custom burst
</ConfettiButton>`,

  'Ref-based (imperative)': `import { useRef } from 'react';
import { Confetti } from 'kayv-glass-ui';
import type { ConfettiRef } from 'kayv-glass-ui';

function MyComponent() {
  const confettiRef = useRef<ConfettiRef>(null);

  return (
    <>
      <Confetti ref={confettiRef} />
      <button onClick={() => confettiRef.current?.fire()}>
        Fire from ref
      </button>
      <button
        onClick={() =>
          confettiRef.current?.fire({ particleCount: 200, spread: 100 })
        }
      >
        Custom fire
      </button>
    </>
  );
}`,

  'Programmatic functions': `import {
  confettiBasic,
  confettiSideCannons,
  confettiFireworks,
  confettiStars,
  confettiEmoji,
} from 'kayv-glass-ui';

// Call from any event, async callback, form submit, etc.
async function handleFormSuccess() {
  await submitForm(data);
  confettiFireworks(); // 🎆 celebrate!
}

// With custom options
confettiBasic({ particleCount: 200, spread: 100 });

// Emoji burst
confettiEmoji('🚀');
confettiEmoji('❤️', { particleCount: 60 });`,
};

// ── Page helpers ───────────────────────────────────────────────────────────────

function SectionCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden
      border border-white/60 dark:border-white/10
      bg-white/40 dark:bg-slate-800/40
      backdrop-blur-sm shadow-sm shadow-slate-100/50 dark:shadow-black/10">
      <div className="px-5 py-3.5
        border-b border-slate-100/50 dark:border-white/5
        bg-white/30 dark:bg-slate-700/20">
        <span className="text-xs font-semibold tracking-wider uppercase
          text-slate-400 dark:text-slate-500">
          {label}
        </span>
      </div>
      <div className="p-5 sm:p-6">
        {children}
      </div>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <div className="rounded-2xl overflow-hidden
      border border-slate-700/40 bg-slate-900/95 backdrop-blur-sm shadow-sm">
      <div className="flex items-center justify-between px-4 py-2.5
        border-b border-slate-700/50">
        <span className="text-xs text-slate-500 font-mono">tsx</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs
            text-slate-500 hover:text-slate-300 transition-colors"
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

function PropsTable({
  title,
  data,
}: {
  title: string;
  data: { name: string; type: string; defaultVal: string; description: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold tracking-wider uppercase mb-2
        text-slate-400 dark:text-slate-500">
        {title}
      </h3>
      <div className="overflow-x-auto rounded-2xl
        border border-white/60 dark:border-white/10
        bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-100/60 dark:border-white/5
              bg-slate-50/60 dark:bg-slate-700/30">
              {['Prop / Function', 'Type', 'Default', 'Description'].map(h => (
                <th key={h} className="text-left px-5 py-3 text-[10px] font-semibold
                  uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/60 dark:divide-white/5">
            {data.map(p => (
              <tr key={p.name} className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <code className="text-indigo-600 dark:text-indigo-400 text-xs font-mono">{p.name}</code>
                </td>
                <td className="px-5 py-3.5">
                  <code className="text-blue-600 dark:text-amber-300/80 text-xs font-mono">{p.type}</code>
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <code className="text-slate-500 dark:text-slate-400 text-xs font-mono">{p.defaultVal}</code>
                </td>
                <td className="px-5 py-3.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {p.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ConfettiPage() {
  const [pageTab, setPageTab] = useState<PageTab>('preview');
  const confettiRef = useRef<ConfettiRef>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs mb-6
        text-slate-400 dark:text-slate-600">
        <Link to="/overview" className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors">
          Components
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-700 dark:text-slate-300">Confetti</span>
      </nav>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">
          Confetti
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
          Particle celebration effects powered by{' '}
          <Chip>canvas-confetti</Chip>. Comes with a ready-to-use{' '}
          <Chip>ConfettiButton</Chip>, a ref-based <Chip>Confetti</Chip> component for imperative control,
          and standalone fire functions (<Chip>confettiBasic</Chip>, <Chip>confettiSideCannons</Chip>,{' '}
          <Chip>confettiFireworks</Chip>, <Chip>confettiStars</Chip>, <Chip>confettiEmoji</Chip>)
          you can call from any event handler.
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex items-center gap-1 p-1 rounded-xl w-fit mb-6
        bg-slate-100/60 dark:bg-slate-800/60
        border border-slate-200/40 dark:border-white/5 backdrop-blur-sm">
        {(['preview', 'code'] as const).map(t => (
          <button
            key={t}
            onClick={() => setPageTab(t)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
              pageTab === t
                ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm shadow-slate-200/50 dark:shadow-black/30'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── PREVIEW ─────────────────────────────────── */}
      {pageTab === 'preview' && (
        <div className="flex flex-col gap-5 mb-12">

          {/* Presets grid */}
          <SectionCard label="ConfettiButton — Presets">
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-5">
              Click any button to fire confetti. All use <Chip>ConfettiButton</Chip> with different <Chip>preset</Chip> values.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <ConfettiButton
                preset="basic"
                className="flex flex-col items-center gap-2 py-4 px-3 rounded-2xl
                  bg-kv-500 hover:bg-kv-600 text-white text-xs font-semibold
                  shadow-lg shadow-kv-500/30 transition-all active:scale-95"
              >
                <PartyPopper className="h-5 w-5" />
                Basic burst
              </ConfettiButton>

              <ConfettiButton
                preset="side-cannons"
                className="flex flex-col items-center gap-2 py-4 px-3 rounded-2xl
                  bg-violet-500 hover:bg-violet-600 text-white text-xs font-semibold
                  shadow-lg shadow-violet-500/30 transition-all active:scale-95"
              >
                <Crosshair className="h-5 w-5" />
                Side cannons
              </ConfettiButton>

              <ConfettiButton
                preset="fireworks"
                className="flex flex-col items-center gap-2 py-4 px-3 rounded-2xl
                  bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold
                  shadow-lg shadow-rose-500/30 transition-all active:scale-95"
              >
                <Zap className="h-5 w-5" />
                Fireworks
              </ConfettiButton>

              <ConfettiButton
                preset="stars"
                className="flex flex-col items-center gap-2 py-4 px-3 rounded-2xl
                  bg-amber-400 hover:bg-amber-500 text-white text-xs font-semibold
                  shadow-lg shadow-amber-400/30 transition-all active:scale-95"
              >
                <Star className="h-5 w-5" />
                Stars
              </ConfettiButton>
            </div>
          </SectionCard>

          {/* Emoji */}
          <SectionCard label="Emoji burst">
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-5">
              <Chip>confettiEmoji()</Chip> renders any emoji as confetti particles.
              Click to try different ones.
            </p>
            <div className="flex flex-wrap gap-3">
              {['🎉', '🚀', '❤️', '🌟', '🦄', '🍕'].map(emoji => (
                <button
                  key={emoji}
                  onClick={() => confettiEmoji(emoji)}
                  className="h-11 w-11 text-xl rounded-xl
                    bg-white/60 dark:bg-slate-800/60
                    border border-slate-200/60 dark:border-white/10
                    hover:bg-white dark:hover:bg-slate-700/70
                    hover:-translate-y-0.5 hover:shadow-md
                    transition-all duration-150 active:scale-95"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </SectionCard>

          {/* Programmatic / ref */}
          <SectionCard label="Ref-based — imperative control">
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-5">
              Mount <Chip>{'<Confetti ref={ref} />'}</Chip> anywhere, then call{' '}
              <Chip>ref.current?.fire()</Chip> from any handler — form submit, API callback, etc.
            </p>
            <Confetti ref={confettiRef} />
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => confettiRef.current?.fire()}
                className="px-4 py-2 rounded-xl text-sm font-medium
                  bg-white/60 dark:bg-slate-800/60
                  border border-slate-200/60 dark:border-white/10
                  text-slate-700 dark:text-slate-200
                  hover:bg-white dark:hover:bg-slate-700/70
                  transition-all active:scale-95"
              >
                ref.fire()
              </button>
              <button
                onClick={() => confettiRef.current?.fire({ particleCount: 200, spread: 100 })}
                className="px-4 py-2 rounded-xl text-sm font-medium
                  bg-white/60 dark:bg-slate-800/60
                  border border-slate-200/60 dark:border-white/10
                  text-slate-700 dark:text-slate-200
                  hover:bg-white dark:hover:bg-slate-700/70
                  transition-all active:scale-95"
              >
                ref.fire(&#123; count: 200 &#125;)
              </button>
            </div>
          </SectionCard>

          {/* Programmatic functions */}
          <SectionCard label="Standalone fire functions">
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-5">
              Import any fire function and call it directly — no component or ref needed.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'confettiBasic()',        fn: () => confettiBasic() },
                { label: 'confettiSideCannons()',  fn: () => confettiSideCannons() },
                { label: 'confettiFireworks()',    fn: () => confettiFireworks() },
                { label: 'confettiStars()',        fn: () => confettiStars() },
              ].map(({ label, fn }) => (
                <button
                  key={label}
                  onClick={fn}
                  className="px-3.5 py-2 rounded-xl text-xs font-mono font-medium
                    bg-slate-900/90 dark:bg-slate-800/80
                    border border-slate-700/60 dark:border-white/10
                    text-slate-300 dark:text-slate-300
                    hover:bg-slate-800 dark:hover:bg-slate-700/80
                    transition-all active:scale-95"
                >
                  {label}
                </button>
              ))}
            </div>
          </SectionCard>

          {/* Custom options */}
          <SectionCard label="Custom options">
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-5">
              Pass any <Chip>canvas-confetti</Chip> option to override defaults —{' '}
              <Chip>particleCount</Chip>, <Chip>spread</Chip>, <Chip>colors</Chip>, <Chip>shapes</Chip>, etc.
            </p>
            <div className="flex flex-wrap gap-3">
              <ConfettiButton
                options={{ particleCount: 200, spread: 100, origin: { y: 0.5 }, colors: ['#4f46e5', '#7c3aed', '#a855f7'] }}
              >
                Indigo rain
              </ConfettiButton>
              <ConfettiButton
                options={{ particleCount: 50, spread: 360, gravity: 0, decay: 0.94, startVelocity: 20, colors: ['#ff0099', '#ff6600'] }}
              >
                Slow bloom
              </ConfettiButton>
              <ConfettiButton
                options={{ particleCount: 300, startVelocity: 80, spread: 30, origin: { y: 1 } }}
              >
                Rocket launch
              </ConfettiButton>
            </div>
          </SectionCard>

          {/* Emoji section */}
          <SectionCard label="ConfettiButton with emoji preset">
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-5">
              Combine <Chip>ConfettiButton</Chip> with <Chip>onConfetti</Chip> for post-fire callbacks,
              or add it to existing form submit buttons.
            </p>
            <div className="flex flex-wrap gap-3">
              <ConfettiButton
                preset="basic"
                onConfetti={() => console.log('confetti fired!')}
              >
                <PartyPopper className="h-4 w-4" />
                Submit & Celebrate
              </ConfettiButton>
              <button
                onClick={() => confettiEmoji('🎊')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                  bg-white/60 dark:bg-slate-800/60
                  border border-slate-200/60 dark:border-white/10
                  text-slate-700 dark:text-slate-200
                  hover:bg-white dark:hover:bg-slate-700
                  shadow-sm transition-all active:scale-95"
              >
                <Smile className="h-4 w-4" />
                confettiEmoji('🎊')
              </button>
            </div>
          </SectionCard>

        </div>
      )}

      {/* ── CODE ─────────────────────────────────────── */}
      {pageTab === 'code' && (
        <div className="flex flex-col gap-4 mb-12">
          {Object.entries(snippets).map(([label, code]) => (
            <div key={label}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2
                text-slate-400 dark:text-slate-500">
                {label}
              </p>
              <CodeBlock code={code} />
            </div>
          ))}
        </div>
      )}

      {/* ── Props ────────────────────────────────────── */}
      <div className="flex flex-col gap-6">
        <PropsTable title="ConfettiButton props" data={buttonProps} />
        <PropsTable title="ConfettiRef (from <Confetti ref={...} />)" data={refProps} />
        <PropsTable title="Standalone fire functions" data={fnProps} />
      </div>

    </div>
  );
}
