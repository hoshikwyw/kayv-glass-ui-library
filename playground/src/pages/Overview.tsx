import { Link } from 'react-router-dom';
import {
  Zap, Package, FileCode,
  MousePointerClick, Tag, Layers, TextCursor,
  AlignJustify, AlertCircle, Bell, ChevronsUpDown, UserCircle2, RectangleHorizontal, Navigation, Menu, CalendarDays, Upload, MessageSquare, PanelBottom,
  ArrowRight, CheckCircle2,
} from 'lucide-react';
import type { ElementType } from 'react';

// ── Data ──────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: Zap,
    label: 'Tree-shakeable',
    desc: 'Import only what you use — zero dead weight in your bundle.',
  },
  {
    icon: FileCode,
    label: 'Full TypeScript',
    desc: 'Every prop and export is precisely typed out of the box.',
  },
  {
    icon: Package,
    label: 'ESM + CJS',
    desc: 'Ships both module formats so it works everywhere.',
  },
];

const components: {
  label: string;
  path: string;
  desc: string;
  icon: ElementType;
  ready: boolean;
}[] = [
  {
    label: 'Button',
    path: '/components/button',
    desc: 'Glass button with variants, sizes, and stable loading state.',
    icon: MousePointerClick,
    ready: true,
  },
  {
    label: 'Badge',
    path: '/components/badge',
    desc: 'Inline status indicators with semantic color variants.',
    icon: Tag,
    ready: true,
  },
  {
    label: 'Card',
    path: '/components/card',
    desc: 'Frosted glass content container with flexible layout slots.',
    icon: Layers,
    ready: true,
  },
  {
    label: 'Input',
    path: '/components/input',
    desc: 'Text input with glass styling and validation states.',
    icon: TextCursor,
    ready: true,
  },
  {
    label: 'Accordion',
    path: '/components/accordion',
    desc: 'Animated disclosure panels for collapsible content.',
    icon: AlignJustify,
    ready: true,
  },
  {
    label: 'Alert',
    path: '/components/alert',
    desc: 'Contextual feedback messages with icon and dismiss support.',
    icon: AlertCircle,
    ready: true,
  },
  {
    label: 'Toast',
    path: '/components/toast',
    desc: 'Non-blocking notification stack with auto-dismiss.',
    icon: Bell,
    ready: true,
  },
  {
    label: 'Select',
    path: '/components/select',
    desc: 'Dropdown selection with glass overlay and search.',
    icon: ChevronsUpDown,
    ready: true,
  },
  {
    label: 'Avatar',
    path: '/components/avatar',
    desc: 'User representation with image, initials, status, and group stacking.',
    icon: UserCircle2,
    ready: true,
  },
  {
    label: 'Modal',
    path: '/components/modal',
    desc: 'Dialog overlay with focus trap, scroll lock, and smooth animations.',
    icon: RectangleHorizontal,
    ready: true,
  },
  {
    label: 'Navbar',
    path: '/components/navbar',
    desc: 'Compound navbar with brand, content slots, mobile menu toggle, and slide-down drawer.',
    icon: Menu,
    ready: true,
  },
  {
    label: 'Breadcrumb',
    path: '/components/breadcrumb',
    desc: 'Navigation trail with icons, truncation, and custom separators.',
    icon: Navigation,
    ready: true,
  },
  {
    label: 'Calendar',
    path: '/components/calendar',
    desc: 'Date and range picker with hover preview and date constraints.',
    icon: CalendarDays,
    ready: true,
  },
  {
    label: 'File Input',
    path: '/components/file-input',
    desc: 'Drag-and-drop file upload with type, size, and count validation.',
    icon: Upload,
    ready: true,
  },
  {
    label: 'Tooltip',
    path: '/components/tooltip',
    desc: 'Portal-based tooltip with glass styling, directional caret, and hover or click trigger.',
    icon: MessageSquare,
    ready: true,
  },
  {
    label: 'Footer',
    path: '/components/footer',
    desc: 'Compound glass footer with brand, link columns, divider, and bottom bar.',
    icon: PanelBottom,
    ready: true,
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Overview() {
  const readyCount = components.filter(c => c.ready).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12">

      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5
          rounded-full mb-6
          bg-indigo-50 dark:bg-indigo-500/10
          border border-indigo-200/60 dark:border-indigo-500/20
          text-indigo-600 dark:text-indigo-300">
          <Zap className="h-3 w-3" />
          Production-grade component library
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-3
          text-slate-900 dark:text-white">
          kayv-glass-ui
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-lg">
          A handcrafted React component library built on TypeScript and Tailwind CSS.
          Designed for glass-morphism aesthetics with a clean, typed API and zero runtime overhead.
        </p>
      </div>

      {/* Feature pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-12">
        {features.map(({ icon: Icon, label, desc }) => (
          <div
            key={label}
            className="rounded-2xl p-5 backdrop-blur-sm shadow-sm
              border border-white/60 dark:border-white/10
              bg-white/40 dark:bg-slate-800/40
              shadow-slate-100/50 dark:shadow-black/10"
          >
            <Icon className="h-4 w-4 text-indigo-500 mb-3" />
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{label}</p>
            <p className="text-xs leading-relaxed mt-1 text-slate-500">{desc}</p>
          </div>
        ))}
      </div>

      {/* Quick-start snippet */}
      <div className="mb-12">
        <h2 className="text-xs font-semibold tracking-wider uppercase mb-3
          text-slate-400 dark:text-slate-500">
          Quick start
        </h2>
        <div className="rounded-2xl overflow-hidden shadow-sm
          border border-slate-700/40 bg-slate-900/95 backdrop-blur-sm">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-700/50">
            <span className="text-xs text-slate-500 font-mono">Usage</span>
          </div>
          <pre className="px-5 py-4 text-sm font-mono leading-relaxed
            text-slate-300 overflow-x-auto">
            <code>{`import { Button } from 'kayv-glass-ui';

function MyApp() {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  );
}`}</code>
          </pre>
        </div>
      </div>

      {/* Component card grid */}
      <div>
        <h2 className="text-xs font-semibold tracking-wider uppercase mb-4
          text-slate-400 dark:text-slate-500">
          Components{' '}
          <span className="font-normal normal-case">
            ({readyCount}/{components.length} ready)
          </span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {components.map(c => {
            const Icon = c.icon;

            if (c.ready) {
              return (
                <Link
                  key={c.path}
                  to={c.path}
                  className="group relative flex flex-col rounded-2xl p-4 backdrop-blur-sm
                    transition-all duration-200
                    border border-white/60 dark:border-white/10
                    bg-white/40 dark:bg-slate-800/40
                    hover:bg-white/70 dark:hover:bg-slate-700/50
                    hover:-translate-y-0.5
                    hover:shadow-md hover:shadow-slate-200/60 dark:hover:shadow-black/30
                    shadow-sm shadow-slate-100/50 dark:shadow-black/10"
                >
                  {/* Ready badge */}
                  <CheckCircle2 className="absolute top-3.5 right-3.5 h-3.5 w-3.5
                    text-emerald-500 dark:text-emerald-400" />

                  {/* Icon */}
                  <div className="w-9 h-9 rounded-xl mb-3 flex items-center justify-center
                    bg-indigo-50 dark:bg-indigo-500/15
                    border border-indigo-100 dark:border-indigo-500/20">
                    <Icon className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                  </div>

                  <p className="text-sm font-semibold mb-1
                    text-slate-800 dark:text-slate-200
                    group-hover:text-slate-900 dark:group-hover:text-white
                    transition-colors">
                    {c.label}
                  </p>
                  <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-500 flex-1">
                    {c.desc}
                  </p>

                  <div className="mt-3 flex items-center gap-1 text-xs font-medium
                    text-indigo-600 dark:text-indigo-400
                    opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    View docs
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              );
            }

            return (
              <div
                key={c.path}
                className="relative flex flex-col rounded-2xl p-4 backdrop-blur-sm
                  border border-white/40 dark:border-white/5
                  bg-white/20 dark:bg-slate-800/20
                  shadow-sm shadow-slate-100/30 dark:shadow-black/5"
              >
                {/* Soon badge */}
                <span className="absolute top-3.5 right-3.5
                  text-[9px] font-bold uppercase tracking-widest
                  text-slate-400 dark:text-slate-600
                  bg-slate-100 dark:bg-slate-800
                  px-1.5 py-0.5 rounded-md">
                  Soon
                </span>

                {/* Icon */}
                <div className="w-9 h-9 rounded-xl mb-3 flex items-center justify-center
                  bg-slate-100/60 dark:bg-slate-700/30
                  border border-slate-200/40 dark:border-white/5">
                  <Icon className="h-4 w-4 text-slate-400 dark:text-slate-600" />
                </div>

                <p className="text-sm font-semibold mb-1
                  text-slate-400 dark:text-slate-600">
                  {c.label}
                </p>
                <p className="text-xs leading-relaxed text-slate-400 dark:text-slate-600 flex-1">
                  {c.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
