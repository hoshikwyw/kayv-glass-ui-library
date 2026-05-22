import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Copy, Check } from 'lucide-react';
import { FileInput } from '../../../../src';
import type { FileValidationError } from '../../../../src';

type Tab = 'preview' | 'code';

// ── Props API ──────────────────────────────────────────────────────────────────

const propsData = [
  {
    name: 'label',
    type: 'string',
    defaultVal: '—',
    description: 'Visible label rendered above the dropzone and linked via htmlFor.',
  },
  {
    name: 'hint',
    type: 'string',
    defaultVal: '—',
    description: 'Helper text shown below the dropzone when there is no error.',
  },
  {
    name: 'error',
    type: 'string',
    defaultVal: '—',
    description: 'Error message shown below the dropzone; overrides hint and applies error styling.',
  },
  {
    name: 'accept',
    type: 'string',
    defaultVal: '—',
    description: "MIME types or extensions to accept, e.g. \"image/*\" or \".pdf,.docx\". Files that don't match are rejected via onError.",
  },
  {
    name: 'multiple',
    type: 'boolean',
    defaultVal: 'false',
    description: 'Allow selecting or dropping more than one file at a time.',
  },
  {
    name: 'maxSize',
    type: 'number',
    defaultVal: '—',
    description: 'Maximum file size in bytes. Files exceeding this limit are rejected via onError.',
  },
  {
    name: 'maxFiles',
    type: 'number',
    defaultVal: '—',
    description: 'Maximum total files when multiple=true. Additional files beyond the limit are rejected.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    defaultVal: "'md'",
    description: 'Controls the height of the dropzone area.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultVal: 'false',
    description: 'Prevents all interaction and dims the component.',
  },
  {
    name: 'value',
    type: 'File[]',
    defaultVal: 'uncontrolled',
    description: 'Controlled file list. Omit to use uncontrolled internal state.',
  },
  {
    name: 'defaultValue',
    type: 'File[]',
    defaultVal: '[]',
    description: 'Initial file list for uncontrolled mode.',
  },
  {
    name: 'onChange',
    type: '(files: File[]) => void',
    defaultVal: '—',
    description: 'Called with the full updated file list after every add or remove.',
  },
  {
    name: 'onError',
    type: '(errors: FileValidationError[]) => void',
    defaultVal: '—',
    description: 'Called with rejected files and their reasons (type mismatch, size exceeded, count exceeded).',
  },
];

const errorPropsData = [
  {
    name: 'file',
    type: 'File',
    defaultVal: '—',
    description: 'The File object that failed validation.',
  },
  {
    name: 'reason',
    type: 'string',
    defaultVal: '—',
    description: 'Human-readable rejection reason.',
  },
];

// ── Code snippets ──────────────────────────────────────────────────────────────

const snippets: Record<string, string> = {
  Basic: `import { FileInput } from 'kayv-glass-ui';

<FileInput label="Upload file" hint="Any file type accepted" />`,

  'Multiple Files': `<FileInput
  label="Upload files"
  multiple
  hint="Select or drag multiple files"
/>`,

  'Accept Filter': `{/* Images only */}
<FileInput
  label="Upload image"
  accept="image/*"
  hint="PNG, JPG, GIF, WebP, etc."
/>

{/* Documents only */}
<FileInput
  label="Upload document"
  accept=".pdf,.doc,.docx"
  hint="PDF, DOC, or DOCX"
/>`,

  'Size Limit': `import { FileInput } from 'kayv-glass-ui';
import type { FileValidationError } from 'kayv-glass-ui';

function SizeLimitExample() {
  const [errors, setErrors] = useState<FileValidationError[]>([]);

  return (
    <>
      <FileInput
        label="Upload document"
        accept=".pdf"
        maxSize={5 * 1024 * 1024}   // 5 MB
        hint="PDF only — max 5 MB"
        onError={setErrors}
      />
      {errors.map((e, i) => (
        <p key={i} className="text-xs text-rose-600">
          {e.file.name}: {e.reason}
        </p>
      ))}
    </>
  );
}`,

  'Max Files': `<FileInput
  label="Upload images"
  accept="image/*"
  multiple
  maxFiles={3}
  hint="Up to 3 images"
/>`,

  Sizes: `<FileInput size="sm" label="Small" />
<FileInput size="md" label="Medium" />
<FileInput size="lg" label="Large" />`,

  'Error State': `<FileInput
  label="Resume"
  accept=".pdf"
  error="Please upload a valid PDF file."
/>`,

  Controlled: `import { useState } from 'react';
import { FileInput } from 'kayv-glass-ui';

function ControlledFileInput() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileInput
      label="Controlled upload"
      multiple
      value={files}
      onChange={setFiles}
    />
  );
}`,
};

// ── Demo components ────────────────────────────────────────────────────────────

function SizeLimitDemo() {
  const [errors, setErrors] = useState<FileValidationError[]>([]);
  return (
    <div>
      <FileInput
        label="Upload document"
        accept=".pdf,.doc,.docx"
        maxSize={5 * 1024 * 1024}
        hint="PDF, DOC, DOCX — max 5 MB"
        onError={errs => setErrors(errs)}
      />
      {errors.length > 0 && (
        <ul className="mt-3 flex flex-col gap-1">
          {errors.map((e, i) => (
            <li key={i} className="text-xs text-rose-600 dark:text-rose-400">
              {e.file.name}: {e.reason}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function PreviewCard({ label, children }: { label: string; children: ReactNode }) {
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
      <div className="px-6 py-8">
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
          {copied
            ? <Check className="h-3.5 w-3.5 text-emerald-400" />
            : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="px-5 py-4 text-sm font-mono leading-relaxed
        text-slate-300 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Chip({ children }: { children: string }) {
  return (
    <code className="text-indigo-600 dark:text-indigo-300 text-xs font-mono
      bg-indigo-50 dark:bg-indigo-500/10
      px-1.5 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-500/20">
      {children}
    </code>
  );
}

function PropsTable({ data }: { data: typeof propsData }) {
  return (
    <div className="rounded-2xl overflow-hidden
      border border-white/60 dark:border-white/10
      bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100/60 dark:border-white/5
            bg-slate-50/60 dark:bg-slate-700/30">
            {['Prop', 'Type', 'Default', 'Description'].map(h => (
              <th
                key={h}
                className="text-left px-5 py-3 text-[10px] font-semibold
                  uppercase tracking-widest text-slate-400 dark:text-slate-500"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100/60 dark:divide-white/5">
          {data.map(p => (
            <tr
              key={p.name}
              className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors"
            >
              <td className="px-5 py-3.5 whitespace-nowrap">
                <code className="text-indigo-600 dark:text-indigo-400 text-xs font-mono">
                  {p.name}
                </code>
              </td>
              <td className="px-5 py-3.5">
                <code className="text-blue-600 dark:text-amber-300/80 text-xs font-mono">
                  {p.type}
                </code>
              </td>
              <td className="px-5 py-3.5 whitespace-nowrap">
                <code className="text-slate-500 dark:text-slate-400 text-xs font-mono">
                  {p.defaultVal}
                </code>
              </td>
              <td className="px-5 py-3.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {p.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function FileInputPage() {
  const [tab, setTab] = useState<Tab>('preview');

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">

      {/* Breadcrumb nav */}
      <nav className="flex items-center gap-1.5 text-xs mb-6
        text-slate-400 dark:text-slate-600">
        <Link
          to="/overview"
          className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
        >
          Components
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-700 dark:text-slate-300">File Input</span>
      </nav>

      {/* Title + description */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2
          text-slate-900 dark:text-white">
          File Input
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
          Drag-and-drop file upload built with a glass dropzone. Accepts single or{' '}
          <Chip>multiple</Chip> files with optional <Chip>accept</Chip> type filtering,{' '}
          <Chip>maxSize</Chip> per-file limits, and <Chip>maxFiles</Chip> count limits.
          Rejected files are surfaced through <Chip>onError</Chip> with a typed{' '}
          <Chip>FileValidationError</Chip> object. Supports both controlled and
          uncontrolled modes.
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex items-center gap-1 p-1 rounded-xl w-fit mb-6
        bg-slate-100/60 dark:bg-slate-800/60
        border border-slate-200/40 dark:border-white/5
        backdrop-blur-sm">
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

      {/* ── PREVIEW TAB ─────────────────────────────────── */}
      {tab === 'preview' && (
        <div className="flex flex-col gap-4 mb-12">
          <PreviewCard label="Basic">
            <FileInput label="Upload file" hint="Any file type accepted" />
          </PreviewCard>

          <PreviewCard label="Multiple Files">
            <FileInput label="Upload files" multiple hint="Select or drag multiple files" />
          </PreviewCard>

          <PreviewCard label="Accept Filter — Images Only">
            <FileInput label="Upload image" accept="image/*" hint="PNG, JPG, GIF, WebP, etc." />
          </PreviewCard>

          <PreviewCard label="Size Limit — 5 MB max">
            <SizeLimitDemo />
          </PreviewCard>

          <PreviewCard label="Max Files — up to 3">
            <FileInput
              label="Upload images"
              accept="image/*"
              multiple
              maxFiles={3}
              hint="Up to 3 images"
            />
          </PreviewCard>

          <PreviewCard label="Sizes">
            <div className="flex flex-col gap-6">
              {(['sm', 'md', 'lg'] as const).map(size => (
                <div key={size}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider
                    text-slate-400 dark:text-slate-500 mb-2">
                    {size}
                  </p>
                  <FileInput size={size} accept="image/*" />
                </div>
              ))}
            </div>
          </PreviewCard>

          <PreviewCard label="Error State">
            <FileInput
              label="Resume"
              accept=".pdf"
              error="Please upload a valid PDF file."
            />
          </PreviewCard>

          <PreviewCard label="Disabled">
            <FileInput label="Upload" disabled hint="File upload is currently disabled." />
          </PreviewCard>
        </div>
      )}

      {/* ── CODE TAB ────────────────────────────────────── */}
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

      {/* ── PROPS TABLES ─────────────────────────────────── */}
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-xs font-semibold tracking-wider uppercase mb-3
            text-slate-400 dark:text-slate-500">
            Props API — FileInput
          </h2>
          <PropsTable data={propsData} />
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-wider uppercase mb-3
            text-slate-400 dark:text-slate-500">
            FileValidationError
          </h2>
          <PropsTable data={errorPropsData} />
        </div>
      </div>
    </div>
  );
}
