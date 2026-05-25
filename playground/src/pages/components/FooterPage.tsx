import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Copy, Check, Github, Twitter, Rss } from 'lucide-react';
import {
  Footer,
  FooterBrand,
  FooterLinks,
  FooterItem,
  FooterDivider,
  FooterBottom,
} from '../../../../src';

type Tab = 'preview' | 'code';

// ── Props data ─────────────────────────────────────────────────────────────────

const footerProps = [
  { name: 'className', type: 'string', defaultVal: '—', description: 'Merged on top of base styles via tailwind-merge.' },
  { name: '...props', type: 'React.ComponentPropsWithoutRef<"footer">', defaultVal: '—', description: 'All native footer attributes are forwarded.' },
];

const footerLinksProps = [
  { name: 'heading', type: 'string', defaultVal: '—', description: 'Optional label rendered above the link list.' },
  { name: 'className', type: 'string', defaultVal: '—', description: 'Merged on top of base styles.' },
  { name: '...props', type: 'React.ComponentPropsWithoutRef<"div">', defaultVal: '—', description: 'All native div attributes are forwarded.' },
];

const footerItemProps = [
  { name: 'isExternal', type: 'boolean', defaultVal: 'false', description: 'Adds target="_blank" rel="noreferrer" and appends an external-link icon.' },
  { name: 'className', type: 'string', defaultVal: '—', description: 'Merged on top of base styles.' },
  { name: '...props', type: 'React.ComponentPropsWithoutRef<"a">', defaultVal: '—', description: 'All native anchor attributes are forwarded.' },
];

// ── Code snippets ──────────────────────────────────────────────────────────────

const snippets: Record<string, string> = {
  'Multi-column': `import {
  Footer, FooterBrand, FooterLinks,
  FooterItem, FooterDivider, FooterBottom,
} from 'kayv-glass-ui';

<Footer>
  <div className="max-w-6xl mx-auto px-6 py-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
      <FooterBrand className="lg:col-span-2">
        <span className="font-bold text-slate-900 dark:text-white">kayv-glass-ui</span>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
          A glassmorphic React component library built with Tailwind CSS.
        </p>
      </FooterBrand>

      <FooterLinks heading="Product">
        <FooterItem href="#">Components</FooterItem>
        <FooterItem href="#">Theming</FooterItem>
        <FooterItem href="#">Changelog</FooterItem>
      </FooterLinks>

      <FooterLinks heading="Resources">
        <FooterItem href="#" isExternal>GitHub</FooterItem>
        <FooterItem href="#" isExternal>npm</FooterItem>
        <FooterItem href="#">Storybook</FooterItem>
      </FooterLinks>

      <FooterLinks heading="Legal">
        <FooterItem href="#">Privacy</FooterItem>
        <FooterItem href="#">Terms</FooterItem>
        <FooterItem href="#">License</FooterItem>
      </FooterLinks>
    </div>

    <FooterDivider className="my-8" />

    <FooterBottom>
      <span>© 2025 kayv-glass-ui. All rights reserved.</span>
      <span>Built with React & Tailwind CSS</span>
    </FooterBottom>
  </div>
</Footer>`,

  Minimal: `<Footer>
  <div className="max-w-6xl mx-auto px-6 py-4">
    <FooterBottom>
      <span className="font-semibold text-slate-700 dark:text-slate-300">
        kayv-glass-ui
      </span>
      <nav className="flex items-center gap-4">
        <FooterItem href="#">Docs</FooterItem>
        <FooterItem href="#">GitHub</FooterItem>
        <FooterItem href="#">npm</FooterItem>
      </nav>
      <span>© 2025 kayv</span>
    </FooterBottom>
  </div>
</Footer>`,

  Centered: `<Footer>
  <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col items-center gap-6">
    <FooterBrand className="items-center text-center">
      <span className="font-bold text-slate-900 dark:text-white">kayv-glass-ui</span>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Glassmorphic React components.
      </p>
    </FooterBrand>

    <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
      <FooterItem href="#">Components</FooterItem>
      <FooterItem href="#">Theming</FooterItem>
      <FooterItem href="#">Changelog</FooterItem>
      <FooterItem href="#" isExternal>GitHub</FooterItem>
      <FooterItem href="#" isExternal>npm</FooterItem>
    </nav>

    <FooterDivider className="w-full" />

    <span className="text-xs text-slate-400 dark:text-slate-500 text-center">
      © 2025 kayv-glass-ui · MIT License
    </span>
  </div>
</Footer>`,

  'With Social Icons': `<Footer>
  <div className="max-w-6xl mx-auto px-6 py-8">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
      <FooterBrand>
        <span className="font-bold text-slate-900 dark:text-white">kayv-glass-ui</span>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Open-source glassmorphic UI.
        </p>
      </FooterBrand>

      <div className="flex items-center gap-3">
        <FooterItem href="#" isExternal aria-label="GitHub" className="p-2 rounded-lg hover:bg-slate-100/60 dark:hover:bg-white/5">
          {/* GitHub SVG icon */}
        </FooterItem>
        <FooterItem href="#" isExternal aria-label="Twitter" className="p-2 rounded-lg hover:bg-slate-100/60 dark:hover:bg-white/5">
          {/* Twitter SVG icon */}
        </FooterItem>
      </div>
    </div>

    <FooterDivider className="my-6" />

    <FooterBottom>
      <span>© 2025 kayv-glass-ui</span>
      <nav className="flex gap-4">
        <FooterItem href="#">Privacy</FooterItem>
        <FooterItem href="#">Terms</FooterItem>
      </nav>
    </FooterBottom>
  </div>
</Footer>`,
};

// ── Sub-components ─────────────────────────────────────────────────────────────

function DemoFrame({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden
      border border-white/60 dark:border-white/10
      bg-white/40 dark:bg-slate-800/40
      backdrop-blur-sm shadow-sm shadow-slate-100/50 dark:shadow-black/10">
      <div className="h-16 flex items-center justify-center
        border-b border-dashed border-slate-200/80 dark:border-white/8
        text-xs text-slate-300 dark:text-slate-700 select-none tracking-wide">
        page content
      </div>
      {children}
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
      <div className="overflow-x-auto rounded-2xl border border-white/60 dark:border-white/10
        bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100/60 dark:border-white/5
              bg-slate-50/60 dark:bg-slate-700/30">
              {['Prop', 'Type', 'Default', 'Description'].map(h => (
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
    </div>
  );
}

// ── Brand logo used inside demos ───────────────────────────────────────────────

function DemoLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-kv-500 to-kv-700 flex items-center justify-center">
        <span className="text-white text-[10px] font-bold">K</span>
      </div>
      <span className="font-bold text-sm text-slate-900 dark:text-white tracking-tight">
        kayv<span className="font-normal text-slate-400 dark:text-slate-500">-glass-ui</span>
      </span>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function FooterPage() {
  const [tab, setTab] = useState<Tab>('preview');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs mb-6
        text-slate-400 dark:text-slate-600">
        <Link
          to="/overview"
          className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
        >
          Components
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-700 dark:text-slate-300">Footer</span>
      </nav>

      {/* Title + description */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2
          text-slate-900 dark:text-white">
          Footer
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
          A compound footer component with glassmorphic styling. Built from{' '}
          <Chip>Footer</Chip>, <Chip>FooterBrand</Chip>, <Chip>FooterLinks</Chip>,{' '}
          <Chip>FooterItem</Chip>, <Chip>FooterDivider</Chip>, and{' '}
          <Chip>FooterBottom</Chip> — compose any layout you need.
          All sub-components are fully ref-forwarding and accept native HTML attributes.
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
        <div className="flex flex-col gap-6 mb-12">

          {/* Multi-column */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider
              text-slate-400 dark:text-slate-600 mb-2">
              Multi-column
            </p>
            <DemoFrame>
              <Footer>
                <div className="max-w-6xl mx-auto px-6 py-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                    <FooterBrand className="lg:col-span-2">
                      <DemoLogo />
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
                        A glassmorphic React component library built with Tailwind CSS.
                        Open-source and MIT licensed.
                      </p>
                    </FooterBrand>

                    <FooterLinks heading="Product">
                      <FooterItem href="#">Components</FooterItem>
                      <FooterItem href="#">Theming</FooterItem>
                      <FooterItem href="#">Changelog</FooterItem>
                      <FooterItem href="#">Roadmap</FooterItem>
                    </FooterLinks>

                    <FooterLinks heading="Resources">
                      <FooterItem href="#" isExternal>GitHub</FooterItem>
                      <FooterItem href="#" isExternal>npm</FooterItem>
                      <FooterItem href="#">Storybook</FooterItem>
                      <FooterItem href="#">Figma kit</FooterItem>
                    </FooterLinks>

                    <FooterLinks heading="Legal">
                      <FooterItem href="#">Privacy</FooterItem>
                      <FooterItem href="#">Terms</FooterItem>
                      <FooterItem href="#">License</FooterItem>
                    </FooterLinks>
                  </div>

                  <FooterDivider className="my-8" />

                  <FooterBottom>
                    <span>© 2025 kayv-glass-ui. All rights reserved.</span>
                    <span>Built with React &amp; Tailwind CSS</span>
                  </FooterBottom>
                </div>
              </Footer>
            </DemoFrame>
          </div>

          {/* Minimal */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider
              text-slate-400 dark:text-slate-600 mb-2">
              Minimal
            </p>
            <DemoFrame>
              <Footer>
                <div className="max-w-6xl mx-auto px-6 py-4">
                  <FooterBottom>
                    <DemoLogo />
                    <nav className="flex flex-wrap items-center gap-4">
                      <FooterItem href="#">Docs</FooterItem>
                      <FooterItem href="#">Theming</FooterItem>
                      <FooterItem href="#" isExternal>GitHub</FooterItem>
                      <FooterItem href="#" isExternal>npm</FooterItem>
                    </nav>
                    <span>© 2025 kayv</span>
                  </FooterBottom>
                </div>
              </Footer>
            </DemoFrame>
          </div>

          {/* Centered */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider
              text-slate-400 dark:text-slate-600 mb-2">
              Centered
            </p>
            <DemoFrame>
              <Footer>
                <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col items-center gap-6">
                  <FooterBrand className="items-center text-center">
                    <DemoLogo />
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Glassmorphic React components for modern interfaces.
                    </p>
                  </FooterBrand>

                  <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                    <FooterItem href="#">Components</FooterItem>
                    <FooterItem href="#">Theming</FooterItem>
                    <FooterItem href="#">Changelog</FooterItem>
                    <FooterItem href="#" isExternal>GitHub</FooterItem>
                    <FooterItem href="#" isExternal>npm</FooterItem>
                  </nav>

                  <FooterDivider className="w-full" />

                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    © 2025 kayv-glass-ui · MIT License
                  </span>
                </div>
              </Footer>
            </DemoFrame>
          </div>

          {/* With social icons */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider
              text-slate-400 dark:text-slate-600 mb-2">
              With social icons
            </p>
            <DemoFrame>
              <Footer>
                <div className="max-w-6xl mx-auto px-6 py-8">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-8">
                    <FooterBrand className="max-w-xs">
                      <DemoLogo />
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        Open-source glassmorphic UI for React.
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <FooterItem
                          href="#"
                          isExternal
                          aria-label="GitHub"
                          className="p-2 rounded-lg
                            hover:bg-slate-100/70 dark:hover:bg-white/5
                            text-slate-400 dark:text-slate-500
                            hover:text-slate-700 dark:hover:text-slate-300"
                        >
                          <Github className="h-4 w-4" />
                        </FooterItem>
                        <FooterItem
                          href="#"
                          isExternal
                          aria-label="Twitter"
                          className="p-2 rounded-lg
                            hover:bg-slate-100/70 dark:hover:bg-white/5
                            text-slate-400 dark:text-slate-500
                            hover:text-slate-700 dark:hover:text-slate-300"
                        >
                          <Twitter className="h-4 w-4" />
                        </FooterItem>
                        <FooterItem
                          href="#"
                          isExternal
                          aria-label="RSS"
                          className="p-2 rounded-lg
                            hover:bg-slate-100/70 dark:hover:bg-white/5
                            text-slate-400 dark:text-slate-500
                            hover:text-slate-700 dark:hover:text-slate-300"
                        >
                          <Rss className="h-4 w-4" />
                        </FooterItem>
                      </div>
                    </FooterBrand>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                      <FooterLinks heading="Product">
                        <FooterItem href="#">Components</FooterItem>
                        <FooterItem href="#">Theming</FooterItem>
                        <FooterItem href="#">Changelog</FooterItem>
                      </FooterLinks>
                      <FooterLinks heading="Resources">
                        <FooterItem href="#" isExternal>GitHub</FooterItem>
                        <FooterItem href="#" isExternal>npm</FooterItem>
                        <FooterItem href="#">Storybook</FooterItem>
                      </FooterLinks>
                      <FooterLinks heading="Legal">
                        <FooterItem href="#">Privacy</FooterItem>
                        <FooterItem href="#">Terms</FooterItem>
                        <FooterItem href="#">License</FooterItem>
                      </FooterLinks>
                    </div>
                  </div>

                  <FooterDivider className="my-7" />

                  <FooterBottom>
                    <span>© 2025 kayv-glass-ui. All rights reserved.</span>
                    <div className="flex items-center gap-4">
                      <FooterItem href="#">Privacy</FooterItem>
                      <FooterItem href="#">Terms</FooterItem>
                    </div>
                  </FooterBottom>
                </div>
              </Footer>
            </DemoFrame>
          </div>

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
        <h2 className="text-xs font-semibold tracking-wider uppercase
          text-slate-400 dark:text-slate-500 -mb-4">
          Props API
        </h2>

        <PropsTable title="Footer · FooterBrand · FooterDivider · FooterBottom" data={footerProps} />
        <PropsTable title="FooterLinks" data={footerLinksProps} />
        <PropsTable title="FooterItem" data={footerItemProps} />
      </div>

    </div>
  );
}
