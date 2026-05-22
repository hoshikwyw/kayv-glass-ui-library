# kayv-glass-ui

A production-grade React component library built with TypeScript and Tailwind CSS. The design language centres on iOS-inspired glass morphism — translucent surfaces, `backdrop-blur`, and razor-thin borders — while keeping the component API clean, fully typed, and framework-agnostic.

> **Status:** `v0.1.1` — 14 components shipped. Core infrastructure is stable.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Components](#components)
  - [Button](#button)
  - [Badge](#badge)
  - [Card](#card)
  - [Input](#input)
  - [Select](#select)
  - [Accordion](#accordion)
  - [Alert](#alert)
  - [Toast](#toast)
  - [Avatar](#avatar)
  - [Modal](#modal)
  - [Breadcrumb](#breadcrumb)
  - [Calendar](#calendar)
  - [FileInput](#fileinput)
  - [Tooltip](#tooltip)
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

- **Glass morphism design system** — `backdrop-blur`, translucent fills, and subtle borders that adapt to both light and dark backgrounds.
- **Fully typed** — Every prop, variant, and export has explicit TypeScript types. No `any` escape hatches.
- **Tree-shakeable** — `sideEffects: false` in the manifest. Bundlers only ship what you import.
- **Dual format** — Ships both ESM (`.mjs`) and CJS (`.js`) so it works in Vite, Next.js, Webpack, and plain Node pipelines.
- **React Server Components ready** — Every output file is prefixed with `"use client"`.
- **Safe class merging** — `clsx` + `tailwind-merge` in the `cn()` utility ensures incoming `className` overrides always win.
- **`ref`-forwarding throughout** — Every component uses `React.forwardRef`.
- **Portal-based overlays** — Modal, Select, and Tooltip use `ReactDOM.createPortal` to escape stacking contexts.

---

## Prerequisites

| Dependency   | Version                            |
| ------------ | ---------------------------------- |
| Node.js      | ≥ 18                               |
| React        | ≥ 18.0.0                           |
| Tailwind CSS | ≥ 3.4                              |
| TypeScript   | ≥ 5.0 _(optional but recommended)_ |

React and React DOM are **peer dependencies** — they are not bundled into the library output.

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

Add the library's component path to your `tailwind.config.js` so Tailwind doesn't purge library classes in production:

```js
// tailwind.config.js
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/kayv-glass-ui/dist/**/*.{js,mjs}', // add this
  ],
};
```

### 2 — Global CSS (optional but recommended)

The glass effect is most visible against a textured or coloured backdrop:

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
import { Button, Badge, Toast } from 'kayv-glass-ui';

export function SaveForm() {
  const [saving, setSaving] = useState(false);

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

---

## Components

### Button

Accessible `ref`-forwarding button with three variants, three sizes, and a stable loading state.

#### Props

| Prop        | Type                                     | Default     | Description                                         |
| ----------- | ---------------------------------------- | ----------- | --------------------------------------------------- |
| `variant`   | `'primary' \| 'secondary' \| 'ghost'`   | `'primary'` | Glass style.                                        |
| `size`      | `'sm' \| 'md' \| 'lg'`                  | `'md'`      | Controls height, padding, and font size.            |
| `isLoading` | `boolean`                                | `false`     | Overlays a centred spinner. Sets `aria-busy`.       |
| `disabled`  | `boolean`                                | `false`     | Reduces opacity and disables pointer events.        |
| `className` | `string`                                 | —           | Merged via `tailwind-merge`.                        |
| `ref`       | `React.Ref<HTMLButtonElement>`           | —           | Forwarded to the `<button>` element.                |
| `...props`  | `React.ComponentPropsWithoutRef<'button'>` | —         | Spread onto the button element.                     |

```tsx
<Button variant="primary" size="md">Save</Button>
<Button variant="secondary">Preview</Button>
<Button variant="ghost">Cancel</Button>
<Button isLoading variant="primary">Submit</Button>
```

---

### Badge

Inline label for status, categories, or metadata.

#### Props

| Prop        | Type                                                             | Default     | Description           |
| ----------- | ---------------------------------------------------------------- | ----------- | --------------------- |
| `variant`   | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Color intent.         |
| `size`      | `'sm' \| 'md'`                                                   | `'md'`      | Font and padding.     |
| `className` | `string`                                                         | —           | Merged via `tailwind-merge`. |

```tsx
<Badge variant="success">Active</Badge>
<Badge variant="danger" size="sm">Error</Badge>
```

---

### Card

A glass-surface container for grouping related content.

#### Props

| Prop        | Type                                             | Default     | Description                     |
| ----------- | ------------------------------------------------ | ----------- | ------------------------------- |
| `variant`   | `'default' \| 'elevated' \| 'bordered' \| 'ghost'` | `'default'` | Surface treatment.          |
| `padding`   | `'none' \| 'sm' \| 'md' \| 'lg'`                | `'md'`      | Inner spacing.                  |
| `className` | `string`                                         | —           | Merged via `tailwind-merge`.    |

```tsx
<Card variant="elevated" padding="lg">
  <h2>Title</h2>
  <p>Content goes here.</p>
</Card>
```

---

### Input

Text input with label, helper text, error state, leading/trailing icon slots, and size variants.

#### Props

| Prop          | Type                    | Default | Description                              |
| ------------- | ----------------------- | ------- | ---------------------------------------- |
| `label`       | `string`                | —       | Floating label above the field.          |
| `helperText`  | `string`                | —       | Hint text below the field.               |
| `error`       | `string`                | —       | Error message; triggers error styling.   |
| `size`        | `'sm' \| 'md' \| 'lg'` | `'md'`  | Controls height and font size.           |
| `leadingIcon` | `ReactNode`             | —       | Icon rendered inside the left edge.      |
| `trailingIcon`| `ReactNode`             | —       | Icon rendered inside the right edge.     |
| `className`   | `string`                | —       | Merged via `tailwind-merge`.             |
| `ref`         | `React.Ref<HTMLInputElement>` | — | Forwarded to the `<input>` element.  |
| `...props`    | `React.ComponentPropsWithoutRef<'input'>` | — | Spread onto the input.  |

```tsx
<Input label="Email" type="email" placeholder="you@example.com" />
<Input label="Username" error="Already taken" />
<Input leadingIcon={<Search className="h-4 w-4" />} placeholder="Search…" />
```

---

### Select

Portal-based custom select with keyboard navigation and multi-select support.

#### Props

| Prop          | Type                                 | Default    | Description                                    |
| ------------- | ------------------------------------ | ---------- | ---------------------------------------------- |
| `options`     | `SelectOption[]`                     | —          | `{ value, label, disabled? }` array.           |
| `value`       | `string \| string[]`                 | —          | Controlled value.                              |
| `defaultValue`| `string \| string[]`                 | —          | Uncontrolled initial value.                    |
| `onChange`    | `(value: string \| string[]) => void`| —          | Called on selection change.                    |
| `multiple`    | `boolean`                            | `false`    | Enables multi-select with chips.               |
| `placeholder` | `string`                             | `'Select…'`| Text shown when nothing is selected.           |
| `label`       | `string`                             | —          | Label above the trigger.                       |
| `error`       | `string`                             | —          | Error message; triggers error styling.         |
| `size`        | `'sm' \| 'md' \| 'lg'`              | `'md'`     | Controls trigger height and font size.         |
| `disabled`    | `boolean`                            | `false`    | Disables the select.                           |
| `className`   | `string`                             | —          | Merged via `tailwind-merge`.                   |

```tsx
<Select
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'gb', label: 'United Kingdom' },
  ]}
  onChange={(v) => setCountry(v as string)}
/>
```

---

### Accordion

Animated disclosure panels with single or multiple open behaviour.

#### Props — `<Accordion>`

| Prop          | Type                        | Default    | Description                                          |
| ------------- | --------------------------- | ---------- | ---------------------------------------------------- |
| `type`        | `'single' \| 'multiple'`   | `'single'` | Whether multiple panels can be open at once.         |
| `defaultValue`| `string \| string[]`        | —          | Panel(s) open on initial render.                     |
| `value`       | `string \| string[]`        | —          | Controlled open panel(s).                            |
| `onChange`    | `(v: string \| string[]) => void` | —    | Called when open panels change.                      |
| `className`   | `string`                    | —          | Merged via `tailwind-merge`.                         |

#### Props — `<AccordionItem>`

| Prop        | Type      | Default | Description                         |
| ----------- | --------- | ------- | ----------------------------------- |
| `value`     | `string`  | —       | Unique identifier for this panel.   |
| `title`     | `string`  | —       | Trigger label.                      |
| `disabled`  | `boolean` | `false` | Prevents opening.                   |
| `className` | `string`  | —       | Merged via `tailwind-merge`.        |

```tsx
<Accordion type="single" defaultValue="item-1">
  <AccordionItem value="item-1" title="What is glass morphism?">
    A design style using transparency, blur, and thin borders.
  </AccordionItem>
  <AccordionItem value="item-2" title="Is this accessible?">
    Yes — uses ARIA expanded/controls/region attributes.
  </AccordionItem>
</Accordion>
```

---

### Alert

Inline contextual message with optional dismiss action.

#### Props

| Prop          | Type                                               | Default   | Description                          |
| ------------- | -------------------------------------------------- | --------- | ------------------------------------ |
| `variant`     | `'info' \| 'success' \| 'warning' \| 'danger'`    | `'info'`  | Color intent.                        |
| `title`       | `string`                                           | —         | Bold heading above the body.         |
| `dismissible` | `boolean`                                          | `false`   | Adds an ✕ close button.              |
| `onDismiss`   | `() => void`                                       | —         | Called when close button is clicked. |
| `className`   | `string`                                           | —         | Merged via `tailwind-merge`.         |

```tsx
<Alert variant="success" title="Saved!" dismissible onDismiss={() => setShow(false)}>
  Your changes have been published.
</Alert>
```

---

### Toast

Animated notification that auto-dismisses. Render `<ToastContainer>` once at the app root; call `useToast()` to fire toasts from anywhere.

#### `useToast()` API

| Method  | Signature                                                                    | Description                         |
| ------- | ---------------------------------------------------------------------------- | ----------------------------------- |
| `toast` | `(message: string, options?: ToastOptions) => void`                          | Show a toast.                       |

#### `ToastOptions`

| Prop        | Type                                            | Default    | Description                        |
| ----------- | ----------------------------------------------- | ---------- | ---------------------------------- |
| `variant`   | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'`   | Color intent.                      |
| `duration`  | `number`                                        | `3000`     | Auto-dismiss delay in ms.          |
| `position`  | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` | Screen position. |

```tsx
// main.tsx
<ToastContainer />

// Anywhere in your app
const { toast } = useToast();
toast('File uploaded!', { variant: 'success', duration: 4000 });
```

---

### Avatar

User avatar with image, initials fallback, status indicator, and group stacking.

#### Props — `<Avatar>`

| Prop        | Type                                  | Default  | Description                                     |
| ----------- | ------------------------------------- | -------- | ----------------------------------------------- |
| `src`       | `string`                              | —        | Image URL.                                      |
| `alt`       | `string`                              | —        | Alt text / initials source.                     |
| `size`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Controls diameter.                              |
| `status`    | `'online' \| 'offline' \| 'away' \| 'busy'` | — | Renders a coloured dot badge.              |
| `className` | `string`                              | —        | Merged via `tailwind-merge`.                    |

#### Props — `<AvatarGroup>`

| Prop      | Type      | Default | Description                              |
| --------- | --------- | ------- | ---------------------------------------- |
| `max`     | `number`  | —       | Maximum avatars shown before "+N" label. |
| `size`    | same as Avatar `size` | `'md'` | Applied to all children.    |

```tsx
<Avatar src="/alice.jpg" alt="Alice" status="online" />

<AvatarGroup max={3}>
  <Avatar src="/alice.jpg" alt="Alice" />
  <Avatar src="/bob.jpg"   alt="Bob" />
  <Avatar src="/carol.jpg" alt="Carol" />
  <Avatar alt="Dave" />
</AvatarGroup>
```

---

### Modal

Portal-based dialog with animated backdrop, accessible focus trap, and slot-based layout.

#### Props

| Prop          | Type                                | Default | Description                                      |
| ------------- | ----------------------------------- | ------- | ------------------------------------------------ |
| `open`        | `boolean`                           | —       | Controls visibility.                             |
| `onClose`     | `() => void`                        | —       | Called on backdrop click or Escape.              |
| `size`        | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Max-width of the dialog panel.         |
| `closeOnOverlayClick` | `boolean`                   | `true`  | Click backdrop to dismiss.                       |
| `showCloseButton`     | `boolean`                   | `true`  | Renders an ✕ in the top-right corner.            |
| `className`   | `string`                            | —       | Merged via `tailwind-merge`.                     |

Sub-components: `<ModalHeader>`, `<ModalBody>`, `<ModalFooter>`.

```tsx
<Modal open={open} onClose={() => setOpen(false)} size="md">
  <ModalHeader>Confirm deletion</ModalHeader>
  <ModalBody>This action cannot be undone.</ModalBody>
  <ModalFooter>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="primary" onClick={handleDelete}>Delete</Button>
  </ModalFooter>
</Modal>
```

---

### Breadcrumb

Navigation trail showing the current page's position in the hierarchy.

#### Props — `<Breadcrumb>`

| Prop        | Type        | Default | Description                                   |
| ----------- | ----------- | ------- | --------------------------------------------- |
| `separator` | `ReactNode` | `'/'`   | Custom separator between items.               |
| `maxItems`  | `number`    | —       | Collapses middle items into `…` when exceeded.|
| `className` | `string`    | —       | Merged via `tailwind-merge`.                  |

#### Props — `<BreadcrumbItem>`

| Prop        | Type        | Default | Description                                          |
| ----------- | ----------- | ------- | ---------------------------------------------------- |
| `href`      | `string`    | —       | Makes the item a link. Omit for the current page.    |
| `icon`      | `ReactNode` | —       | Icon rendered before the label.                      |
| `isCurrent` | `boolean`   | `false` | Marks active item (adds `aria-current="page"`).      |

```tsx
<Breadcrumb separator={<ChevronRight className="h-3.5 w-3.5" />}>
  <BreadcrumbItem href="/" icon={<Home className="h-3.5 w-3.5" />}>Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem isCurrent>Sneakers</BreadcrumbItem>
</Breadcrumb>
```

---

### Calendar

Full-featured date picker with single, range, and multi-select modes. Supports public holidays, weekend highlighting, and event dots with tooltip previews.

#### Props

| Prop             | Type                    | Default | Description                                                    |
| ---------------- | ----------------------- | ------- | -------------------------------------------------------------- |
| `mode`           | `'single' \| 'range' \| 'multi'` | `'single'` | Selection mode.                                  |
| `value`          | `Date \| null`          | —       | Controlled value (single mode).                                |
| `defaultValue`   | `Date`                  | —       | Uncontrolled initial value (single mode).                      |
| `onChange`       | `(date: Date \| null) => void` | — | Called when the selected date changes (single/multi).     |
| `range`          | `DateRange`             | —       | Controlled range `{ start, end }`.                             |
| `defaultRange`   | `DateRange`             | —       | Uncontrolled initial range.                                    |
| `onRangeChange`  | `(range: DateRange) => void` | — | Called when range changes.                                |
| `minDate`        | `Date`                  | —       | Dates before this are disabled.                                |
| `maxDate`        | `Date`                  | —       | Dates after this are disabled.                                 |
| `disabledDates`  | `Date[]`                | —       | Array of individual dates to disable.                          |
| `holidays`       | `Holiday[]`             | —       | `{ date, label? }` — renders dates in rose/red.               |
| `highlightWeekends` | `boolean`            | `false` | Colours Saturday and Sunday rose/red.                          |
| `events`         | `CalendarEvent[]`       | —       | `{ date, label, color? }` — renders coloured dots on dates.    |
| `firstDayOfWeek` | `0 \| 1`               | `1`     | `0` = Sunday, `1` = Monday.                                    |
| `className`      | `string`                | —       | Merged via `tailwind-merge`.                                   |

#### Supporting types

```ts
export interface Holiday {
  date: Date;
  label?: string;   // shown in the tooltip on hover
}

export type CalendarEventColor = 'indigo' | 'emerald' | 'amber' | 'rose' | 'violet' | 'sky';

export interface CalendarEvent {
  date: Date;
  label: string;
  color?: CalendarEventColor;  // default: 'indigo'
}
```

#### Examples

```tsx
// Basic single date picker
<Calendar mode="single" onChange={(d) => setDate(d)} />

// Date range picker
<Calendar mode="range" onRangeChange={(r) => setRange(r)} />

// With public holidays and weekend highlighting
<Calendar
  holidays={[
    { date: new Date(2025, 0, 1), label: "New Year's Day" },
    { date: new Date(2025, 11, 25), label: 'Christmas Day' },
  ]}
  highlightWeekends
/>

// With events (coloured dots + hover tooltip)
<Calendar
  events={[
    { date: new Date(2025, 4, 15), label: 'Team standup', color: 'indigo' },
    { date: new Date(2025, 4, 20), label: 'Deadline', color: 'rose' },
  ]}
/>
```

---

### FileInput

File upload control with a glass dropzone or a compact button variant. Supports validation, multiple files, and size limits.

#### Props

| Prop            | Type                                  | Default       | Description                                             |
| --------------- | ------------------------------------- | ------------- | ------------------------------------------------------- |
| `variant`       | `'dropzone' \| 'button'`              | `'dropzone'`  | Visual presentation.                                    |
| `multiple`      | `boolean`                             | `false`       | Allow selecting multiple files.                         |
| `accept`        | `string`                              | —             | Accepted MIME types or extensions (e.g. `'image/*'`).  |
| `maxSize`       | `number`                              | —             | Max file size in bytes.                                 |
| `maxFiles`      | `number`                              | —             | Max number of files when `multiple` is true.            |
| `onFilesChange` | `(files: File[]) => void`             | —             | Called whenever the file selection changes.             |
| `onError`       | `(errors: FileValidationError[]) => void` | —         | Called when validation fails.                           |
| `size`          | `'sm' \| 'md' \| 'lg'`               | `'md'`        | Controls layout dimensions.                             |
| `disabled`      | `boolean`                             | `false`       | Disables all interaction.                               |
| `error`         | `string`                              | —             | External error message.                                 |
| `className`     | `string`                              | —             | Merged via `tailwind-merge`.                            |

```tsx
// Dropzone (drag-and-drop area)
<FileInput
  variant="dropzone"
  multiple
  accept="image/*"
  maxSize={5 * 1024 * 1024}
  onFilesChange={(files) => setFiles(files)}
/>

// Button variant ("Choose File / No file chosen")
<FileInput
  variant="button"
  accept=".pdf,.docx"
  onFilesChange={(files) => setDocument(files[0])}
/>
```

---

### Tooltip

Portal-based tooltip with hover and click triggers, four placements, configurable delay, and support for rich `ReactNode` content.

#### Props

| Prop        | Type                                     | Default   | Description                                               |
| ----------- | ---------------------------------------- | --------- | --------------------------------------------------------- |
| `content`   | `ReactNode`                              | —         | Tooltip body — plain text or JSX.                         |
| `children`  | `ReactNode`                              | —         | The element that triggers the tooltip.                    |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'`| `'top'`   | Which side the bubble appears on.                         |
| `trigger`   | `'hover' \| 'click'`                     | `'hover'` | Interaction model.                                        |
| `delay`     | `number`                                 | `0`       | Open delay in ms (hover only).                            |
| `disabled`  | `boolean`                                | `false`   | Prevents the tooltip from appearing.                      |
| `className` | `string`                                 | —         | Merged onto the tooltip bubble via `tailwind-merge`.      |

The tooltip renders via `ReactDOM.createPortal` to avoid stacking context issues. Position is calculated from `getBoundingClientRect()` at open time — no scroll offset adjustments needed.

```tsx
<Tooltip content="Copy to clipboard" placement="top">
  <button>Copy</button>
</Tooltip>

// Click trigger
<Tooltip content="Link copied!" trigger="click" placement="bottom">
  <Button variant="ghost">Share</Button>
</Tooltip>

// Rich content
<Tooltip
  content={
    <div className="flex flex-col gap-1">
      <span className="font-medium">Alice Chen</span>
      <span className="text-slate-400">Product Designer</span>
    </div>
  }
>
  <Avatar src="/alice.jpg" alt="Alice" />
</Tooltip>
```

---

## Utilities

### `cn(...inputs)`

Combines `clsx` and `tailwind-merge`. The last conflicting Tailwind class always wins.

```tsx
import { cn } from 'kayv-glass-ui';

const cls = cn(
  'rounded-xl bg-white/40 backdrop-blur-sm',
  isActive   && 'ring-2 ring-indigo-500',
  isDisabled && 'opacity-40 pointer-events-none'
);
```

---

## Theme System

`src/theme/index.ts` exports `ThemeConfig` and `defaultTheme` as placeholders for a future Tailwind preset/plugin that will let consumers configure border radius, blur intensity, and color palette from their own `tailwind.config.js`.

```ts
import type { ThemeConfig } from 'kayv-glass-ui';

// Not active yet — forward-compatible API
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
├── src/                              # Library source — published to npm
│   ├── index.ts                      # Public API barrel
│   ├── components/
│   │   ├── index.ts                  # Component barrel (exports all 14)
│   │   ├── Button/
│   │   ├── Badge/
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── Select/
│   │   ├── Accordion/
│   │   ├── Alert/
│   │   ├── Toast/
│   │   ├── Avatar/
│   │   ├── Modal/
│   │   ├── Breadcrumb/
│   │   ├── Calendar/
│   │   ├── FileInput/
│   │   └── Tooltip/
│   │       ├── Tooltip.types.ts      # Four-file pattern: types → styles → impl → index
│   │       ├── Tooltip.styles.ts
│   │       ├── Tooltip.tsx
│   │       └── index.ts
│   ├── utils/
│   │   └── cn.ts                     # clsx + tailwind-merge helper
│   └── theme/
│       └── index.ts                  # ThemeConfig stub
│
├── playground/                       # Vite documentation app — never published
│   ├── public/
│   │   ├── favicon.svg               # 32×32 K-mark icon
│   │   └── icon.svg                  # 100×100 full-detail app icon (PWA / OG)
│   └── src/
│       ├── assets/
│       │   └── logo.svg              # 224×52 horizontal wordmark lockup
│       ├── App.tsx                   # BrowserRouter + all 14 component routes
│       ├── components/
│       │   └── Layout.tsx            # Shell: header, sidebar nav, dark mode toggle
│       └── pages/
│           ├── Overview.tsx          # Dashboard landing with component grid
│           └── components/
│               ├── ButtonPage.tsx
│               ├── BadgePage.tsx
│               ├── CardPage.tsx
│               ├── InputPage.tsx
│               ├── SelectPage.tsx
│               ├── AccordionPage.tsx
│               ├── AlertPage.tsx
│               ├── ToastPage.tsx
│               ├── AvatarPage.tsx
│               ├── ModalPage.tsx
│               ├── BreadcrumbPage.tsx
│               ├── CalendarPage.tsx
│               ├── FileInputPage.tsx
│               └── TooltipPage.tsx
│
├── tsup.config.ts                    # ESM + CJS, dts, splitting, minify
├── tsconfig.json                     # Strict TS (exactOptionalPropertyTypes: true)
└── package.json
```

Every component follows the same **four-file pattern**: `Component.types.ts` → `Component.styles.ts` → `Component.tsx` → `index.ts`. The playground imports from `../../src` via a Vite path alias — no build step needed during development.

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
# Start the playground (http://localhost:5173)
npm run playground

# Type-check without emitting
npm run type-check

# Watch-mode library build (optional — only needed to test built output)
npm run dev
```

### Dark mode

The playground ships with a light/dark toggle persisted to `localStorage` under the key `theme`. All components use Tailwind's `dark:` prefix variant.

---

## Build Pipeline

```bash
npm run build
```

**tsup** processes `src/index.ts` and outputs:

| File              | Format    | Purpose                                    |
| ----------------- | --------- | ------------------------------------------ |
| `dist/index.mjs`  | ESM       | Vite, Next.js App Router, modern bundlers  |
| `dist/index.js`   | CJS       | Webpack 4, Jest, older toolchains          |
| `dist/index.d.ts` | CJS types | TypeScript consumers using `require()`     |
| `dist/index.d.mts`| ESM types | TypeScript consumers using `import`        |

Each output is prefixed with `"use client"` for RSC compatibility. Code splitting is enabled — importing only `Button` ships only the Button chunk.

---

## Adding a New Component

Follow the four-file pattern. Every component lives in its own folder under `src/components/`.

### 1 — Create the folder

```
src/components/Spinner/
├── Spinner.types.ts
├── Spinner.styles.ts
├── Spinner.tsx
└── index.ts
```

### 2 — Define types first

```ts
// Spinner.types.ts
import React from 'react';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps extends React.ComponentPropsWithoutRef<'span'> {
  size?: SpinnerSize;
}
```

Start with the public interface — if the props feel awkward to define, the API needs more thought.

### 3 — Extract class maps

```ts
// Spinner.styles.ts
import type { SpinnerSize } from './Spinner.types';

export const spinnerBase = 'inline-block rounded-full border-2 border-current border-t-transparent animate-spin';

export const sizeStyles: Record<SpinnerSize, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-5 w-5',
  lg: 'h-7 w-7',
};
```

Keep all class strings in the styles file — the component file should contain only logic.

### 4 — Build the component

```tsx
// Spinner.tsx
import React from 'react';
import { cn } from '../../utils/cn';
import { spinnerBase, sizeStyles } from './Spinner.styles';
import type { SpinnerProps } from './Spinner.types';

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <span
      ref={ref}
      role="status"
      aria-label="Loading"
      className={cn(spinnerBase, sizeStyles[size], className)}
      {...props}
    />
  )
);

Spinner.displayName = 'Spinner';
```

### 5 — Wire up the barrels

```ts
// src/components/Spinner/index.ts
export { Spinner } from './Spinner';
export type { SpinnerProps, SpinnerSize } from './Spinner.types';

// src/components/index.ts — add one line
export * from './Spinner';
```

`src/index.ts` re-exports everything from `src/components/index.ts` — no changes needed there.

### 6 — Add a playground page

Create `playground/src/pages/components/SpinnerPage.tsx` following the ButtonPage pattern (preview cards, code tabs, props table), then add the route to `playground/src/App.tsx` and the nav entry to `playground/src/components/Layout.tsx`.

---

## Roadmap

**v0.1 — Foundation** _(current)_

- [x] Build pipeline (tsup, ESM + CJS, dts, code splitting)
- [x] Strict TypeScript (`exactOptionalPropertyTypes: true`)
- [x] `cn()` utility (clsx + tailwind-merge)
- [x] Dark mode via `localStorage` + `dark:` Tailwind prefix
- [x] 14 components: Button, Badge, Card, Input, Select, Accordion, Alert, Toast, Avatar, Modal, Breadcrumb, Calendar, FileInput, Tooltip
- [x] Calendar: single / range / multi modes, minDate/maxDate, disabledDates
- [x] Calendar: public holidays (rose colour + tooltip label)
- [x] Calendar: optional weekend highlighting
- [x] Calendar: event dots with per-day colour and hover tooltips
- [x] FileInput: dropzone and button variants, multi-file, size/type validation
- [x] Tooltip: hover and click triggers, four placements, portal-based
- [x] Playground with routing, sidebar search, and full documentation pages for all 14 components
- [x] Brand assets: favicon, app icon, horizontal wordmark lockup

**v0.2 — DX & accessibility**

- [ ] Standalone `Spinner` component
- [ ] `Drawer` (slide-in panel, portal-based)
- [ ] Full WCAG 2.1 AA audit (focus management, ARIA, colour contrast)
- [ ] Keyboard navigation pass for Calendar and Select

**v0.3 — Theme system**

- [ ] Tailwind preset/plugin (`ThemeConfig` becomes active)
- [ ] CSS custom property tokens for radius, blur, and brand colour

**v1.0 — Stable release**

- [ ] Static documentation site (Storybook or custom)
- [ ] Automated visual regression tests
- [ ] Published to npm

---

## License

MIT © kayv
