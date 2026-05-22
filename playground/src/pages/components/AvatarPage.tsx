import { Avatar, AvatarGroup } from '../../../../src';
import type { AvatarSize, AvatarStatus, AvatarVariant } from '../../../../src';

// ── Helpers ───────────────────────────────────────────────────────────────────

function SectionCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/60 dark:border-white/10 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm shadow-slate-100/50 dark:shadow-black/10">
      <div className="px-5 py-3.5 border-b border-slate-200/50 dark:border-white/5">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="px-5 py-6">{children}</div>
    </div>
  );
}

function PropRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-6 flex-wrap">
      <span className="text-xs text-slate-400 dark:text-slate-500 w-20 shrink-0">
        {label}
      </span>
      <div className="flex items-center gap-3 flex-wrap">{children}</div>
    </div>
  );
}

// ── Demo Data ──────────────────────────────────────────────────────────────────

const SIZES: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const VARIANTS: AvatarVariant[] = ['circle', 'rounded'];
const STATUSES: AvatarStatus[] = ['online', 'offline', 'busy', 'away'];

const SAMPLE_AVATARS = [
  { fallback: 'Alice Kim', src: 'https://i.pravatar.cc/150?img=47' },
  { fallback: 'Ben Carter', src: 'https://i.pravatar.cc/150?img=12' },
  { fallback: 'Cara Liu', src: 'https://i.pravatar.cc/150?img=5' },
  { fallback: 'Dan Park', src: 'https://i.pravatar.cc/150?img=33' },
  { fallback: 'Eve Moss', src: 'https://i.pravatar.cc/150?img=9' },
  { fallback: 'Frank Wu', src: 'https://i.pravatar.cc/150?img=17' },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AvatarPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-10 flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
          Avatar
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          User representation with image, initials fallback, status indicator, and group stacking.
        </p>
      </div>

      {/* Image */}
      <SectionCard label="Image">
        <div className="flex items-center gap-4 flex-wrap">
          {SAMPLE_AVATARS.slice(0, 4).map(({ fallback, src }) => (
            <Avatar key={fallback} src={src} alt={fallback} fallback={fallback} size="md" />
          ))}
        </div>
      </SectionCard>

      {/* Fallback */}
      <SectionCard label="Fallback (initials)">
        <div className="flex items-center gap-4 flex-wrap">
          <Avatar fallback="Alice Kim" size="md" />
          <Avatar fallback="Ben Carter" size="md" />
          <Avatar fallback="CL" size="md" />
          <Avatar fallback="D" size="md" />
          <Avatar size="md" />
        </div>
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
          Showing initials (up to 2 chars), single char, and icon fallback when no fallback prop is provided.
        </p>
      </SectionCard>

      {/* Sizes */}
      <SectionCard label="Sizes">
        <PropRow label="">
          {SIZES.map(size => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Avatar
                fallback="AK"
                src="https://i.pravatar.cc/150?img=47"
                alt="Alice Kim"
                size={size}
              />
              <span className="text-[10px] text-slate-400 dark:text-slate-500">{size}</span>
            </div>
          ))}
        </PropRow>
      </SectionCard>

      {/* Variant */}
      <SectionCard label="Variant">
        {VARIANTS.map(variant => (
          <PropRow key={variant} label={variant}>
            {SIZES.map(size => (
              <Avatar
                key={size}
                fallback="AK"
                src="https://i.pravatar.cc/150?img=47"
                alt="Alice Kim"
                size={size}
                variant={variant}
              />
            ))}
          </PropRow>
        ))}
      </SectionCard>

      {/* Status */}
      <SectionCard label="Status">
        <div className="flex flex-col gap-4">
          <PropRow label="circle">
            {STATUSES.map(status => (
              <div key={status} className="flex flex-col items-center gap-2">
                <Avatar
                  fallback="AK"
                  src="https://i.pravatar.cc/150?img=47"
                  alt="Alice Kim"
                  size="md"
                  status={status}
                />
                <span className="text-[10px] text-slate-400 dark:text-slate-500">{status}</span>
              </div>
            ))}
          </PropRow>
          <PropRow label="rounded">
            {STATUSES.map(status => (
              <div key={status} className="flex flex-col items-center gap-2">
                <Avatar
                  fallback="AK"
                  src="https://i.pravatar.cc/150?img=47"
                  alt="Alice Kim"
                  size="md"
                  variant="rounded"
                  status={status}
                />
                <span className="text-[10px] text-slate-400 dark:text-slate-500">{status}</span>
              </div>
            ))}
          </PropRow>
        </div>
      </SectionCard>

      {/* AvatarGroup */}
      <SectionCard label="Group">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Default (no max)</p>
            <AvatarGroup size="md">
              {SAMPLE_AVATARS.map(({ fallback, src }) => (
                <Avatar key={fallback} src={src} alt={fallback} fallback={fallback} />
              ))}
            </AvatarGroup>
          </div>

          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">max=4 overflow indicator</p>
            <AvatarGroup size="md" max={4}>
              {SAMPLE_AVATARS.map(({ fallback, src }) => (
                <Avatar key={fallback} src={src} alt={fallback} fallback={fallback} />
              ))}
            </AvatarGroup>
          </div>

          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Sizes</p>
            <div className="flex flex-col gap-4">
              {(['xs', 'sm', 'md', 'lg'] as AvatarSize[]).map(size => (
                <div key={size} className="flex items-center gap-4">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 w-6">{size}</span>
                  <AvatarGroup size={size} max={4}>
                    {SAMPLE_AVATARS.map(({ fallback, src }) => (
                      <Avatar key={fallback} src={src} alt={fallback} fallback={fallback} />
                    ))}
                  </AvatarGroup>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* API */}
      <SectionCard label="API">
        <div className="flex flex-col gap-1 font-mono text-xs text-slate-600 dark:text-slate-400">
          {[
            ['src', 'string', 'Image URL'],
            ['alt', 'string', 'Alt text for the image'],
            ['fallback', 'string', 'Text for initials (first 2 chars used)'],
            ['size', "'xs' | 'sm' | 'md' | 'lg' | 'xl'", "'md'"],
            ['variant', "'circle' | 'rounded'", "'circle'"],
            ['status', "'online' | 'offline' | 'busy' | 'away'", '—'],
          ].map(([prop, type, def]) => (
            <div
              key={prop}
              className="grid grid-cols-[120px_1fr_80px] gap-4 py-1.5 border-b border-slate-100 dark:border-white/5 last:border-0"
            >
              <span className="text-indigo-600 dark:text-indigo-400">{prop}</span>
              <span className="text-slate-500 dark:text-slate-500 truncate">{type}</span>
              <span className="text-slate-400">{def}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
