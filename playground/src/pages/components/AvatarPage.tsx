import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Copy, Check } from 'lucide-react';
import { Avatar, AvatarGroup } from '../../../../src';
import type { AvatarSize, AvatarStatus, AvatarVariant } from '../../../../src';

type Tab = 'preview' | 'code';

// ── Props API ──────────────────────────────────────────────────────────────────

const propsData = [
  { name: 'src',       type: 'string',                                  defaultVal: 'undefined',   description: 'Image URL. Falls back to initials or icon if absent or if loading fails.' },
  { name: 'alt',       type: 'string',                                  defaultVal: "''",           description: 'Alt text forwarded to the <img> element.' },
  { name: 'fallback',  type: 'string',                                  defaultVal: 'undefined',   description: 'Initials source — first 2 chars, uppercased. Falls back to a user icon.' },
  { name: 'size',      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",      defaultVal: "'md'",        description: 'Controls avatar dimensions.' },
  { name: 'variant',   type: "'circle' | 'rounded'",                   defaultVal: "'circle'",    description: 'Full circle or rounded square.' },
  { name: 'status',    type: "'online' | 'offline' | 'busy' | 'away'", defaultVal: 'undefined',   description: 'Status dot shown at the bottom-right corner.' },
  { name: 'className', type: 'string',                                  defaultVal: '—',           description: 'Merged onto the root <span> via tailwind-merge.' },
];

const groupPropsData = [
  { name: 'max',       type: 'number',                             defaultVal: 'undefined', description: 'Max visible avatars. Excess shown as a +N badge.' },
  { name: 'size',      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", defaultVal: "'md'",      description: 'Passed to all child Avatars via context.' },
  { name: 'children',  type: 'ReactNode',                         defaultVal: '—',         description: 'Avatar components to stack.' },
  { name: 'className', type: 'string',                            defaultVal: '—',         description: 'Merged onto the flex container.' },
];

// ── Snippets ───────────────────────────────────────────────────────────────────

const snippets: Record<string, string> = {
  Basic: `import { Avatar } from 'kayv-glass-ui';

{/* Image with fallback */}
<Avatar src="https://i.pravatar.cc/150?img=47" alt="Alice Kim" fallback="Alice Kim" />

{/* Initials fallback */}
<Avatar fallback="Alice Kim" />
<Avatar fallback="AK" />

{/* Icon fallback — no src or fallback */}
<Avatar />`,

  Sizes: `{/* xs · sm · md (default) · lg · xl */}
<Avatar size="xs" src="..." fallback="AK" />
<Avatar size="sm" src="..." fallback="AK" />
<Avatar size="md" src="..." fallback="AK" />
<Avatar size="lg" src="..." fallback="AK" />
<Avatar size="xl" src="..." fallback="AK" />`,

  Variant: `{/* circle (default) */}
<Avatar variant="circle" src="..." fallback="AK" />

{/* rounded square */}
<Avatar variant="rounded" src="..." fallback="AK" />`,

  Status: `{/* Status dot sits outside the image clip — always fully visible */}
<Avatar src="..." fallback="AK" status="online" />
<Avatar src="..." fallback="AK" status="offline" />
<Avatar src="..." fallback="AK" status="busy" />
<Avatar src="..." fallback="AK" status="away" />`,

  AvatarGroup: `import { Avatar, AvatarGroup } from 'kayv-glass-ui';

{/* Stack with overflow indicator */}
<AvatarGroup size="md" max={4}>
  <Avatar src="..." fallback="Alice Kim" />
  <Avatar src="..." fallback="Ben Carter" />
  <Avatar src="..." fallback="Cara Liu" />
  <Avatar src="..." fallback="Dan Park" />
  <Avatar src="..." fallback="Eve Moss" />
</AvatarGroup>`,
};

// ── Sub-components ─────────────────────────────────────────────────────────────

function PreviewCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/60 dark:border-white/10
      bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm shadow-slate-100/50 dark:shadow-black/10">
      <div className="px-5 py-3.5 border-b border-slate-100/50 dark:border-white/5 bg-white/30 dark:bg-slate-700/20">
        <span className="text-xs font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500">{label}</span>
      </div>
      <div className="px-6 py-6">{children}</div>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); });
  };
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-700/40 bg-slate-900/95 backdrop-blur-sm shadow-sm">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-700/50">
        <span className="text-xs text-slate-500 font-mono">tsx</span>
        <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors">
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="px-5 py-4 text-sm font-mono leading-relaxed text-slate-300 overflow-x-auto"><code>{code}</code></pre>
    </div>
  );
}

function Chip({ children }: { children: string }) {
  return (
    <code className="text-indigo-600 dark:text-indigo-300 text-xs font-mono
      bg-indigo-50 dark:bg-indigo-500/10 px-1.5 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-500/20">
      {children}
    </code>
  );
}

function PropsTable({ data }: { data: typeof propsData }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/60 dark:border-white/10
      bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100/60 dark:border-white/5 bg-slate-50/60 dark:bg-slate-700/30">
            {['Prop', 'Type', 'Default', 'Description'].map(h => (
              <th key={h} className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100/60 dark:divide-white/5">
          {data.map(p => (
            <tr key={p.name} className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
              <td className="px-5 py-3.5 whitespace-nowrap"><code className="text-indigo-600 dark:text-indigo-400 text-xs font-mono">{p.name}</code></td>
              <td className="px-5 py-3.5"><code className="text-blue-600 dark:text-amber-300/80 text-xs font-mono">{p.type}</code></td>
              <td className="px-5 py-3.5 whitespace-nowrap"><code className="text-slate-500 dark:text-slate-400 text-xs font-mono">{p.defaultVal}</code></td>
              <td className="px-5 py-3.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Demo data ──────────────────────────────────────────────────────────────────

const SIZES: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const VARIANTS: AvatarVariant[] = ['circle', 'rounded'];
const STATUSES: AvatarStatus[] = ['online', 'offline', 'busy', 'away'];
const SAMPLE = [
  { fallback: 'Alice Kim',   src: 'https://i.pravatar.cc/150?img=47' },
  { fallback: 'Ben Carter',  src: 'https://i.pravatar.cc/150?img=12' },
  { fallback: 'Cara Liu',    src: 'https://i.pravatar.cc/150?img=5'  },
  { fallback: 'Dan Park',    src: 'https://i.pravatar.cc/150?img=33' },
  { fallback: 'Eve Moss',    src: 'https://i.pravatar.cc/150?img=9'  },
  { fallback: 'Frank Wu',    src: 'https://i.pravatar.cc/150?img=17' },
];

// ── Page ───────────────────────────────────────────────────────────────────────

export default function AvatarPage() {
  const [tab, setTab] = useState<Tab>('preview');

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs mb-6 text-slate-400 dark:text-slate-600">
        <Link to="/overview" className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors">Components</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-700 dark:text-slate-300">Avatar</span>
      </nav>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">Avatar</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
          User representation built with <Chip>React.forwardRef</Chip>. Renders an image with an{' '}
          <Chip>onError</Chip> fallback chain: image → <Chip>fallback</Chip> initials → user icon.
          The status dot sits outside the image clip so its border is never cut off.
          Stack multiple avatars with <Chip>AvatarGroup</Chip> — size is passed via context so
          child props stay clean.
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex items-center gap-1 p-1 rounded-xl w-fit mb-6
        bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/40 dark:border-white/5 backdrop-blur-sm">
        {(['preview', 'code'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
              tab === t
                ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm shadow-slate-200/50 dark:shadow-black/30'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}>{t}</button>
        ))}
      </div>

      {/* ── PREVIEW ── */}
      {tab === 'preview' && (
        <div className="flex flex-col gap-4 mb-12">

          <PreviewCard label="Image & Fallback">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                {SAMPLE.slice(0, 4).map(({ fallback, src }) => (
                  <Avatar key={fallback} src={src} alt={fallback} fallback={fallback} size="md" />
                ))}
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <Avatar fallback="Alice Kim" size="md" />
                <Avatar fallback="AK" size="md" />
                <Avatar fallback="B" size="md" />
                <Avatar size="md" />
              </div>
            </div>
          </PreviewCard>

          <PreviewCard label="Sizes">
            <div className="flex items-end gap-5 flex-wrap">
              {SIZES.map(size => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <Avatar src={SAMPLE[0].src} alt={SAMPLE[0].fallback} fallback={SAMPLE[0].fallback} size={size} />
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">{size}</span>
                </div>
              ))}
            </div>
          </PreviewCard>

          <PreviewCard label="Variant">
            <div className="flex flex-col gap-5">
              {VARIANTS.map(variant => (
                <div key={variant} className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs text-slate-400 dark:text-slate-500 w-16 shrink-0">{variant}</span>
                  {SIZES.map(size => (
                    <Avatar key={size} src={SAMPLE[0].src} alt={SAMPLE[0].fallback} fallback={SAMPLE[0].fallback} size={size} variant={variant} />
                  ))}
                </div>
              ))}
            </div>
          </PreviewCard>

          <PreviewCard label="Status">
            <div className="flex flex-col gap-5">
              {(['circle', 'rounded'] as AvatarVariant[]).map(variant => (
                <div key={variant} className="flex items-center gap-5 flex-wrap">
                  <span className="text-xs text-slate-400 dark:text-slate-500 w-16 shrink-0">{variant}</span>
                  {STATUSES.map(status => (
                    <div key={status} className="flex flex-col items-center gap-2">
                      <Avatar src={SAMPLE[0].src} alt="Alice" fallback="AK" size="md" variant={variant} status={status} />
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">{status}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </PreviewCard>

          <PreviewCard label="AvatarGroup">
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">Default</p>
                <AvatarGroup size="md">
                  {SAMPLE.map(({ fallback, src }) => <Avatar key={fallback} src={src} alt={fallback} fallback={fallback} />)}
                </AvatarGroup>
              </div>
              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">max=4 overflow</p>
                <AvatarGroup size="md" max={4}>
                  {SAMPLE.map(({ fallback, src }) => <Avatar key={fallback} src={src} alt={fallback} fallback={fallback} />)}
                </AvatarGroup>
              </div>
              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">Sizes</p>
                <div className="flex flex-col gap-4">
                  {(['xs', 'sm', 'md', 'lg'] as AvatarSize[]).map(size => (
                    <div key={size} className="flex items-center gap-4">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 w-6">{size}</span>
                      <AvatarGroup size={size} max={4}>
                        {SAMPLE.map(({ fallback, src }) => <Avatar key={fallback} src={src} alt={fallback} fallback={fallback} />)}
                      </AvatarGroup>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </PreviewCard>

          <PreviewCard label="Real-world — Comment Thread">
            <div className="flex items-center gap-3">
              <AvatarGroup size="sm" max={3}>
                {SAMPLE.map(({ fallback, src }) => <Avatar key={fallback} src={src} alt={fallback} fallback={fallback} />)}
              </AvatarGroup>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                <span className="font-medium text-slate-700 dark:text-slate-300">Alice, Ben</span>
                {' '}and 4 others commented
              </span>
            </div>
          </PreviewCard>
        </div>
      )}

      {/* ── CODE ── */}
      {tab === 'code' && (
        <div className="flex flex-col gap-6 mb-12">
          {Object.entries(snippets).map(([label, code]) => (
            <div key={label}>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-600 mb-2">{label}</p>
              <CodeBlock code={code} />
            </div>
          ))}
        </div>
      )}

      {/* ── PROPS ── */}
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xs font-semibold tracking-wider uppercase mb-3 text-slate-400 dark:text-slate-500">Avatar Props</h2>
          <PropsTable data={propsData} />
        </div>
        <div>
          <h2 className="text-xs font-semibold tracking-wider uppercase mb-3 text-slate-400 dark:text-slate-500">AvatarGroup Props</h2>
          <PropsTable data={groupPropsData} />
        </div>
      </div>
    </div>
  );
}
