import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Copy, Check } from 'lucide-react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from '../../../../src';
import type { ModalSize } from '../../../../src';

type Tab = 'preview' | 'code';

// ── Props API ──────────────────────────────────────────────────────────────────

const propsData = [
  { name: 'open',             type: 'boolean',                  defaultVal: '—',       description: 'Controls visibility. Required.' },
  { name: 'onClose',          type: '() => void',               defaultVal: '—',       description: 'Called on backdrop click, ESC, or the close button. Required.' },
  { name: 'size',             type: "'sm' | 'md' | 'lg' | 'xl'", defaultVal: "'md'",  description: 'Max-width of the dialog panel.' },
  { name: 'closeOnBackdrop',  type: 'boolean',                  defaultVal: 'true',    description: 'Whether clicking the backdrop calls onClose.' },
  { name: 'closeOnEsc',       type: 'boolean',                  defaultVal: 'true',    description: 'Whether pressing Escape calls onClose.' },
  { name: 'children',         type: 'ReactNode',                defaultVal: '—',       description: 'Compose with ModalHeader, ModalBody, and ModalFooter.' },
  { name: 'className',        type: 'string',                   defaultVal: '—',       description: 'Merged onto the dialog panel element.' },
];

const subPropsData = [
  { name: 'ModalHeader',  type: 'onClose?: () => void',  defaultVal: "ctx's onClose", description: 'Renders the title in an <h2> and an optional close button. Inherits onClose from Modal context.' },
  { name: 'ModalBody',    type: 'ReactNode',              defaultVal: '—',             description: 'Scrollable content area with consistent padding.' },
  { name: 'ModalFooter',  type: 'ReactNode',              defaultVal: '—',             description: 'Action row pinned to the bottom with a top divider.' },
];

// ── Snippets ───────────────────────────────────────────────────────────────────

const snippets: Record<string, string> = {
  Basic: `import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'kayv-glass-ui';

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>Open modal</Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalHeader>Welcome back</ModalHeader>
        <ModalBody>
          <p>Press Esc, click the backdrop, or the × button to close.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="primary" size="sm" onClick={() => setOpen(false)}>Got it</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}`,

  Sizes: `{/* sm · md (default) · lg · xl */}
<Modal open={open} onClose={onClose} size="sm">…</Modal>
<Modal open={open} onClose={onClose} size="md">…</Modal>
<Modal open={open} onClose={onClose} size="lg">…</Modal>
<Modal open={open} onClose={onClose} size="xl">…</Modal>`,

  Confirmation: `function DeleteModal({ open, onClose, onConfirm }) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <ModalHeader>Delete item?</ModalHeader>
      <ModalBody>
        <p>This action cannot be undone.</p>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
        <Button
          variant="secondary" size="sm" onClick={onConfirm}
          className="border-rose-200 text-rose-600 hover:bg-rose-50
                     dark:border-rose-500/30 dark:text-rose-400">
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
}`,

  'Backdrop / ESC options': `{/* Disable backdrop click — user must use the button */}
<Modal open={open} onClose={onClose} closeOnBackdrop={false}>…</Modal>

{/* Disable ESC key */}
<Modal open={open} onClose={onClose} closeOnEsc={false}>…</Modal>`,

  'With Form': `<Modal open={open} onClose={() => setOpen(false)} size="md">
  <ModalHeader>Edit profile</ModalHeader>
  <ModalBody>
    <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
      <div className="grid grid-cols-2 gap-3">
        <Input label="First name" defaultValue="Alice" />
        <Input label="Last name"  defaultValue="Kim"   />
      </div>
      <Input label="Email" type="email" defaultValue="alice@example.com" />
    </form>
  </ModalBody>
  <ModalFooter>
    <Button variant="ghost"   size="sm" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="primary" size="sm" onClick={() => setOpen(false)}>Save changes</Button>
  </ModalFooter>
</Modal>`,
};

// ── Sub-components ─────────────────────────────────────────────────────────────

function PreviewCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/60 dark:border-white/10
      bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm shadow-slate-100/50 dark:shadow-black/10">
      <div className="px-5 py-3.5 border-b border-slate-100/50 dark:border-white/5 bg-white/30 dark:bg-slate-700/20">
        <span className="text-xs font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500">{label}</span>
      </div>
      <div className="px-6 py-6 flex flex-wrap items-center gap-3">{children}</div>
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

// ── Demos ──────────────────────────────────────────────────────────────────────

function BasicDemo() {
  const [open, setOpen] = useState(false);
  return <>
    <Button variant="primary" onClick={() => setOpen(true)}>Open modal</Button>
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalHeader>Welcome back</ModalHeader>
      <ModalBody><p>Press Esc, click the backdrop, or the × button to close.</p></ModalBody>
      <ModalFooter>
        <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
        <Button variant="primary" size="sm" onClick={() => setOpen(false)}>Got it</Button>
      </ModalFooter>
    </Modal>
  </>;
}

function ConfirmDemo() {
  const [open, setOpen] = useState(false);
  return <>
    <Button variant="secondary" onClick={() => setOpen(true)}
      className="border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10">
      Delete item
    </Button>
    <Modal open={open} onClose={() => setOpen(false)} size="sm">
      <ModalHeader>Delete item?</ModalHeader>
      <ModalBody><p>This action <span className="font-semibold text-slate-800 dark:text-slate-200">cannot be undone</span>. The item and all associated data will be permanently removed.</p></ModalBody>
      <ModalFooter>
        <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
        <Button variant="secondary" size="sm" onClick={() => setOpen(false)}
          className="border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10">
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  </>;
}

function FormDemo() {
  const [open, setOpen] = useState(false);
  return <>
    <Button variant="secondary" onClick={() => setOpen(true)}>Edit profile</Button>
    <Modal open={open} onClose={() => setOpen(false)} size="md">
      <ModalHeader>Edit profile</ModalHeader>
      <ModalBody>
        <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="First name" defaultValue="Alice" placeholder="First name" />
            <Input label="Last name" defaultValue="Kim" placeholder="Last name" />
          </div>
          <Input label="Email" type="email" defaultValue="alice@example.com" placeholder="Email" />
          <Input label="Bio" placeholder="Tell us about yourself…" />
        </form>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
        <Button variant="primary" size="sm" onClick={() => setOpen(false)}>Save changes</Button>
      </ModalFooter>
    </Modal>
  </>;
}

function ScrollDemo() {
  const [open, setOpen] = useState(false);
  return <>
    <Button variant="secondary" onClick={() => setOpen(true)}>Long content</Button>
    <Modal open={open} onClose={() => setOpen(false)} size="md">
      <ModalHeader>Terms of service</ModalHeader>
      <ModalBody>
        <div className="flex flex-col gap-4">
          {Array.from({ length: 8 }, (_, i) => (
            <p key={i}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          ))}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Decline</Button>
        <Button variant="primary" size="sm" onClick={() => setOpen(false)}>Accept</Button>
      </ModalFooter>
    </Modal>
  </>;
}

function SizesDemo() {
  const [openSize, setOpenSize] = useState<ModalSize | null>(null);
  const sizes: ModalSize[] = ['sm', 'md', 'lg', 'xl'];
  return <>
    {sizes.map(size => (
      <Button key={size} variant="secondary" size="sm" onClick={() => setOpenSize(size)}>{size}</Button>
    ))}
    {sizes.map(size => (
      <Modal key={size} open={openSize === size} onClose={() => setOpenSize(null)} size={size}>
        <ModalHeader>Modal — {size}</ModalHeader>
        <ModalBody><p>This is the <span className="font-semibold text-slate-800 dark:text-slate-200">{size}</span> size modal.</p></ModalBody>
        <ModalFooter><Button variant="primary" size="sm" onClick={() => setOpenSize(null)}>Close</Button></ModalFooter>
      </Modal>
    ))}
  </>;
}

function NoBackdropDemo() {
  const [open, setOpen] = useState(false);
  return <>
    <Button variant="secondary" onClick={() => setOpen(true)}>No backdrop close</Button>
    <Modal open={open} onClose={() => setOpen(false)} closeOnBackdrop={false} size="sm">
      <ModalHeader>Requires action</ModalHeader>
      <ModalBody><p>Clicking the backdrop won't dismiss this. Use the button below.</p></ModalBody>
      <ModalFooter><Button variant="primary" size="sm" onClick={() => setOpen(false)}>Dismiss</Button></ModalFooter>
    </Modal>
  </>;
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ModalPage() {
  const [tab, setTab] = useState<Tab>('preview');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-10">

      <nav className="flex items-center gap-1.5 text-xs mb-6 text-slate-400 dark:text-slate-600">
        <Link to="/overview" className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors">Components</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-700 dark:text-slate-300">Modal</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">Modal</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
          Dialog overlay rendered via <Chip>ReactDOM.createPortal</Chip> — bypasses any stacking context
          on the page. Includes smooth enter/exit animation, body scroll lock, <Chip>focus trap</Chip>,
          ESC and backdrop-click handling. Compose content with <Chip>ModalHeader</Chip>,{' '}
          <Chip>ModalBody</Chip>, and <Chip>ModalFooter</Chip>. The header wires <Chip>aria-labelledby</Chip>{' '}
          to the dialog automatically via context.
        </p>
      </div>

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

      {tab === 'preview' && (
        <div className="flex flex-col gap-4 mb-12">
          <PreviewCard label="Basic"><BasicDemo /></PreviewCard>
          <PreviewCard label="Confirmation (destructive)"><ConfirmDemo /></PreviewCard>
          <PreviewCard label="With Form"><FormDemo /></PreviewCard>
          <PreviewCard label="Scrollable Body"><ScrollDemo /></PreviewCard>
          <PreviewCard label="Sizes"><SizesDemo /></PreviewCard>
          <PreviewCard label="Backdrop Close Disabled"><NoBackdropDemo /></PreviewCard>
        </div>
      )}

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

      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xs font-semibold tracking-wider uppercase mb-3 text-slate-400 dark:text-slate-500">Modal Props</h2>
          <div className="overflow-x-auto rounded-2xl border border-white/60 dark:border-white/10
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
                {propsData.map(p => (
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
        </div>
        <div>
          <h2 className="text-xs font-semibold tracking-wider uppercase mb-3 text-slate-400 dark:text-slate-500">Sub-components</h2>
          <div className="overflow-x-auto rounded-2xl border border-white/60 dark:border-white/10
            bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100/60 dark:border-white/5 bg-slate-50/60 dark:bg-slate-700/30">
                  {['Component', 'Key Props', 'Description'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/60 dark:divide-white/5">
                {subPropsData.map(p => (
                  <tr key={p.name} className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3.5 whitespace-nowrap"><code className="text-indigo-600 dark:text-indigo-400 text-xs font-mono">{p.name}</code></td>
                    <td className="px-5 py-3.5"><code className="text-blue-600 dark:text-amber-300/80 text-xs font-mono">{p.type}</code></td>
                    <td className="px-5 py-3.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
