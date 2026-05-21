# kayv-glass-ui

A production-grade React component library built with TypeScript and Tailwind CSS. The design language centres on iOS-inspired glass morphism — translucent surfaces, `backdrop-blur`, and razor-thin borders — while keeping the component API clean, fully typed, and framework-agnostic.

> **Status:** Early development — `v0.1.0`. The core infrastructure (build pipeline, theme stubs, utility layer) is stable. Components are being added incrementally. See the [Roadmap](#roadmap) for what is coming next.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Components](#components)
  - [Button](#button)
- [Utilities](#utilities)
- [Theme System](#theme-system)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Build Pipeline](#build-pipeline)
- [Adding a New Component](#adding-a-new-component)
- [Roadmap](#roadmap)
- [License](#license)

---

## Features

- **Glass morphism design system** — `backdrop-blur`, translucent fills, and subtle borders that work on both light and dark backgrounds.
- **Fully typed** — Every prop, variant, and export has explicit TypeScript types. No `any` escape hatches.
- **Tree-shakeable** — `sideEffects: false` in the manifest. Bundlers only ship what you import.
- **Dual format** — Ships both ESM (`.mjs`) and CJS (`.js`) so it works in Vite, Next.js, Webpack, and plain Node pipelines.
- **React Server Components ready** — Every output file is prefixed with `"use client"` so the library works in RSC-aware frameworks without manual directives.
- **Safe class merging** — `clsx` + `tailwind-merge` in the `cn()` utility ensures incoming `className` overrides always win without generating conflicting Tailwind classes.
- **`ref`-forwarding throughout** — Every component uses `React.forwardRef`, so refs work as expected for consumers who need to control focus or measure DOM nodes.

---

## Prerequisites

| Dependency | Version |
|---|---|
| Node.js | ≥ 18 |
| React | ≥ 18.0.0 |
| Tailwind CSS | ≥ 3.4 |
| TypeScript | ≥ 5.0 _(optional but recommended)_ |

React and React DOM are **peer dependencies** — they are not bundled into the library output. Your application is expected to supply them.

---

## Installation

```bash
# npm
npm install kayv-glass-ui

# pnpm
pnpm add kayv-glass-ui

# yarn
yarn add kayv-glass-ui
```

---

## Setup

### 1 — Tailwind CSS content paths

The library ships pre-compiled class strings from `src/components/**`. To prevent Tailwind's content scanner from purging those classes in your production build, add the library's component path to your `tailwind.config.js`:

```js
// tailwind.config.js
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/kayv-glass-ui/dist/**/*.{js,mjs}', // add this
  ],
};
```

> **Why?** Tailwind scans your source files at build time to generate only the classes that are used. Without this path, any Tailwind class applied by a library component will be stripped from the final CSS bundle in production.

### 2 — Global CSS (optional but recommended)

The glass effect relies on having a textured or coloured backdrop behind the components. A flat white or grey background will make the `backdrop-blur` effect invisible. Pair the library with a gradient or mesh background:

```css
/* globals.css */
body {
  background: linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 50%, #f5f0ff 100%);
  min-height: 100vh;
}
```

---

## Usage

```tsx
import { Button } from 'kayv-glass-ui';

export function SaveForm() {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await save();
    setSaving(false);
  };

  return (
    <div className="flex items-center gap-3">
      <Button variant="ghost" onClick={() => reset()}>
        Cancel
      </Button>
      <Button variant="primary" isLoading={saving} onClick={handleSave}>
        Save changes
      </Button>
    </div>
  );
}
```

You can also import the `cn` utility if you want to compose Tailwind classes elsewhere in your project with the same conflict-resolution behaviour:

```tsx
import { cn } from 'kayv-glass-ui';

const card = cn('rounded-2xl bg-white/40 border border-white/60', isActive && 'ring-2 ring-indigo-500');
```

---

## Components

### Button

A fully accessible, `ref`-forwarding button with a glass morphism aesthetic. Supports three semantic variants, three sizes, a stable loading state, and passes all native HTML button attributes to the underlying element.

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Controls the glass style. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls height, padding, and font size. |
| `isLoading` | `boolean` | `false` | Overlays a centred spinner. Button dimensions do not change when toggled — content is hidden via `opacity-0`, not removed. Sets `aria-busy` automatically. |
| `disabled` | `boolean` | `false` | Forwarded as the native `disabled` attribute. Reduces opacity to 40% and disables pointer events. |
| `className` | `string` | — | Merged on top of the base and variant classes via `tailwind-merge`. Your classes always win in any conflict. |
| `ref` | `React.Ref<HTMLButtonElement>` | — | Forwarded to the underlying `<button>` element. |
| `...props` | `React.ComponentPropsWithoutRef<'button'>` | — | All remaining props are spread directly onto the button element. |

#### Variants

```tsx
// Frosted white glass — default for primary actions
<Button variant="primary">Save</Button>

// Sapphire tint — for secondary or confirmatory actions
<Button variant="secondary">Preview</Button>

// Fully transparent until hovered — for low-emphasis actions
<Button variant="ghost">Cancel</Button>
```

#### Sizes

```tsx
<Button size="sm">Small</Button>   {/* h-8  px-3  text-xs  */}
<Button size="md">Medium</Button>  {/* h-10 px-4  text-sm  */}
<Button size="lg">Large</Button>   {/* h-12 px-6  text-base */}
```

#### Loading state

The spinner overlays the button content absolutely. The button width is preserved by keeping the children rendered but invisible — no layout shift when toggling.

```tsx
<Button isLoading variant="primary">
  Submit
</Button>
```

#### Overriding styles

`className` is merged with `tailwind-merge`, so you can override any part of the default styling without worrying about specificity or class ordering:

```tsx
// Round pill shape
<Button className="rounded-full px-6">Pill</Button>

// Gradient fill — bg-* override wins via tailwind-merge
<Button className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-0">
  Gradient
</Button>
```

---

## Utilities

### `cn(...inputs)`

Combines `clsx` and `tailwind-merge`. Use it whenever you need to conditionally compose Tailwind class strings and want the last conflicting class to win.

```tsx
import { cn } from 'kayv-glass-ui';

// Conditional classes — no risk of duplicating layout properties
const cls = cn(
  'rounded-xl bg-white/40 backdrop-blur-sm',
  isActive   && 'ring-2 ring-indigo-500',
  isDisabled && 'opacity-40 pointer-events-none'
);
```

---

## Theme System

`src/theme/index.ts` exports the `ThemeConfig` interface and a `defaultTheme` object. This is a placeholder for a future DaisyUI-style Tailwind preset/plugin that will allow consumers to configure the library's visual language (border radius, blur intensity, and light/dark variant) from their own `tailwind.config.js`.

```ts
import type { ThemeConfig } from 'kayv-glass-ui';

// This API is not active yet — exports exist for forward compatibility
const theme: ThemeConfig = {
  variant: 'glass',
  radius: 'lg',
  blur: 'md',
};
```

---

## Project Structure

```
kayv-glass-ui/
│
├── src/                          # Library source — this is what gets published
│   ├── index.ts                  # Public API barrel — re-exports everything
│   ├── components/
│   │   ├── index.ts              # Component barrel
│   │   └── Button/
│   │       ├── Button.types.ts   # ButtonProps, ButtonVariant, ButtonSize
│   │       ├── Button.styles.ts  # Class maps — base, variant, size, spinner
│   │       ├── Button.tsx        # React component (forwardRef)
│   │       └── index.ts          # Re-exports component + types
│   ├── utils/
│   │   └── cn.ts                 # clsx + tailwind-merge helper
│   └── theme/
│       └── index.ts              # ThemeConfig types + defaultTheme stub
│
├── playground/                   # Isolated Vite app — never published
│   ├── src/
│   │   ├── App.tsx               # BrowserRouter + route definitions
│   │   ├── components/
│   │   │   └── Layout.tsx        # Shell: glass header, sidebar, dark mode toggle
│   │   └── pages/
│   │       ├── Overview.tsx      # Dashboard landing page
│   │       ├── ComingSoon.tsx    # Placeholder for unbuilt component routes
│   │       └── components/
│   │           └── ButtonPage.tsx # Full Button documentation page
│   ├── tailwind.config.js        # Scans both playground/src and ../src/components
│   └── vite.config.ts            # Path alias: kayv-glass-ui → ../src/index.ts
│
├── tsup.config.ts                # Build: ESM + CJS, dts, splitting, minify
├── tsconfig.json                 # Strict TypeScript config (noEmit — tsup handles emit)
└── package.json
```

Every new component follows the same four-file pattern inside `src/components/`. The playground imports from source directly — no build step needed during development.

---

## Local Development

### First-time setup

```bash
# Install library dependencies (root)
npm install

# Install playground dependencies
npm install --prefix playground
```

### Daily workflow

```bash
# Start the playground (runs Vite on http://localhost:5173)
npm run playground

# In a second terminal — watch-mode build of the library (optional)
# Useful if you are testing the built output rather than the source alias
npm run dev

# Type-check the library source without emitting files
npm run type-check
```

The playground imports from `../../src` via a Vite path alias, so changes to library source files are reflected immediately in the browser without running a build.

### Dark mode

The playground ships with a light/dark toggle in the header. The preference is persisted in `localStorage` under the key `theme`. The toggle applies a `dark` class to `<html>` and all components use Tailwind's `dark:` variant prefix.

---

## Build Pipeline

```bash
npm run build
```

**tsup** processes `src/index.ts` and outputs:

| File | Format | Purpose |
|---|---|---|
| `dist/index.mjs` | ESM | Vite, Next.js App Router, modern bundlers |
| `dist/index.js` | CJS | Webpack 4, Jest, older toolchains |
| `dist/index.d.ts` | CJS types | TypeScript consumers using `require()` |
| `dist/index.d.mts` | ESM types | TypeScript consumers using `import` |

Each output file is prefixed with `"use client"` so the library is compatible with React Server Components without requiring consumers to add their own directives.

Code splitting is enabled — if a future consumer imports only `Button`, only the Button chunk is included in their bundle.

To verify the build output before publishing:

```bash
npm run build
ls -lh dist/
```

---

## Adding a New Component

Follow the four-file pattern that `Button` establishes. Every component lives in its own folder under `src/components/`.

### 1 — Create the component folder

```
src/components/Badge/
├── Badge.types.ts
├── Badge.styles.ts
├── Badge.tsx
└── index.ts
```

### 2 — Define types first (`Badge.types.ts`)

```ts
import React from 'react';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger';

export interface BadgeProps extends React.ComponentPropsWithoutRef<'span'> {
  variant?: BadgeVariant;
}
```

Start with the public interface before writing any implementation. If the props feel awkward to define, the API design needs more thought.

### 3 — Extract class maps (`Badge.styles.ts`)

```ts
import type { BadgeVariant } from './Badge.types';

export const badgeBase = 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium';

export const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-slate-100/60 text-slate-600 border border-slate-200/60',
  success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
  warning: 'bg-amber-50 text-amber-700 border border-amber-200/60',
  danger:  'bg-rose-50 text-rose-700 border border-rose-200/60',
};
```

Keep style strings in their own file. The component file should not contain class string literals — only logic.

### 4 — Build the component (`Badge.tsx`)

```tsx
import React from 'react';
import { cn } from '../../utils/cn';
import { badgeBase, variantStyles } from './Badge.styles';
import type { BadgeProps } from './Badge.types';

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeBase, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </span>
  )
);

Badge.displayName = 'Badge';
```

### 5 — Wire up the barrels

```ts
// src/components/Badge/index.ts
export { Badge } from './Badge';
export type { BadgeProps, BadgeVariant } from './Badge.types';

// src/components/index.ts — add one line
export * from './Badge';
```

`src/index.ts` already re-exports everything from `src/components/index.ts`, so no changes are needed there.

### 6 — Add a documentation page to the playground

Create `playground/src/pages/components/BadgePage.tsx` and add the route to `playground/src/App.tsx`:

```tsx
<Route path="components/badge" element={<BadgePage />} />
```

Update the `navigation` array in `Layout.tsx` to remove the `soon: true` flag from the Badge entry so it becomes a live link.

---

## Roadmap

**v0.1 — Foundation** _(current)_
- [x] Build pipeline (tsup, ESM + CJS, dts)
- [x] Strict TypeScript configuration
- [x] `cn()` utility (clsx + tailwind-merge)
- [x] Theme system stubs
- [x] Button component (variants, sizes, loading, forwardRef)
- [x] Playground with routing, dark mode, and documentation pages

**v0.2 — Core set**
- [ ] Badge
- [ ] Card
- [ ] Input
- [ ] Select

**v0.3 — Feedback layer**
- [ ] Alert
- [ ] Toast / Sonner integration
- [ ] Spinner (standalone)

**v0.4 — Layout & disclosure**
- [ ] Accordion
- [ ] Modal / Dialog
- [ ] Drawer

**v1.0 — Stable release**
- [ ] Tailwind preset/plugin (ThemeConfig becomes active)
- [ ] Full WCAG 2.1 AA audit
- [ ] Storybook or equivalent static documentation site
- [ ] Automated visual regression tests

---

## License

MIT © kayv
