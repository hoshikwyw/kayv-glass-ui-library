# kayv-glass-ui

A production-grade React component library built with TypeScript and Tailwind CSS. The design language centres on iOS-inspired glass morphism — translucent surfaces, `backdrop-blur`, and razor-thin borders — while keeping the component API clean, fully typed, and framework-agnostic.

> **Status:** `v0.1.1` — 26 components shipped. Core infrastructure is stable.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Theme System](#theme-system)
- [Components](#components)
  - [Button](#button)
  - [Badge](#badge)
  - [Card](#card)
  - [Input](#input)
  - [Select](#select)
  - [Accordion](#accordion)
  - [Tabs](#tabs)
  - [Progress](#progress)
  - [Alert](#alert)
  - [Toast](#toast)
  - [Avatar](#avatar)
  - [Modal](#modal)
  - [Drawer](#drawer)
  - [Breadcrumb](#breadcrumb)
  - [Navbar](#navbar)
  - [Footer](#footer)
  - [MenuBar](#menubar)
  - [Calendar](#calendar)
  - [FileInput](#fileinput)
  - [Checkbox](#checkbox)
  - [Tooltip](#tooltip)
  - [Globe](#globe)
  - [Confetti](#confetti)
  - [Backgrounds](#backgrounds)
- [Utilities](#utilities)
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
- **`ref`-forwarding throughout** — Sub-components use `React.forwardRef`.
- **Portal-based overlays** — Modal, Drawer, Select, and Tooltip use `ReactDOM.createPortal` to escape stacking contexts.
- **Runtime theming** — `ThemeProvider` + `useTheme()` swap the entire colour palette at runtime via CSS custom properties — no page reload.

---

## Prerequisites

| Dependency   | Version                            |
| ------------ | ---------------------------------- |
| Node.js      | ≥ 18                               |
| React        | ≥ 18.0.0                           |
| Tailwind CSS | ≥ 3.0                              |
| TypeScript   | ≥ 5.0 _(optional but recommended)_ |

React and React DOM are **peer dependencies** — they are not bundled into the library output.

---

## Installation

```bash
# npm
npm install @kwyw/kayv-glass-ui

# pnpm
pnpm add @kwyw/kayv-glass-ui

# yarn
yarn add @kwyw/kayv-glass-ui

# bun
bun add @kwyw/kayv-glass-ui
```

> **Confetti only:** `canvas-confetti` is a direct dependency of the Confetti component. It is installed automatically. If you are not using Confetti you can safely ignore it.

---

## Setup

### 1 — Extend your Tailwind config

Add the library's dist path to `content` (so Tailwind doesn't purge internal classes) and register the `kv` colour palette:

```js
// tailwind.config.js
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@kwyw/kayv-glass-ui/dist/**/*.{js,mjs}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        kv: {
          '50':  'rgb(var(--kv-p-50)  / <alpha-value>)',
          '100': 'rgb(var(--kv-p-100) / <alpha-value>)',
          '200': 'rgb(var(--kv-p-200) / <alpha-value>)',
          '300': 'rgb(var(--kv-p-300) / <alpha-value>)',
          '400': 'rgb(var(--kv-p-400) / <alpha-value>)',
          '500': 'rgb(var(--kv-p-500) / <alpha-value>)',
          '600': 'rgb(var(--kv-p-600) / <alpha-value>)',
          '700': 'rgb(var(--kv-p-700) / <alpha-value>)',
        },
      },
    },
  },
};
```

### 2 — Wrap your app with `ThemeProvider`

```tsx
// main.tsx  (or app/layout.tsx in Next.js)
import { ThemeProvider } from '@kwyw/kayv-glass-ui';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
```

`ThemeProvider` injects the eight `--kv-p-*` CSS variables onto `:root` and exposes the `useTheme()` hook. It must wrap everything that uses library components.

### 3 — Dark mode (optional)

All components respond to Tailwind's `dark:` prefix. Toggle it by adding/removing the `dark` class on `<html>`:

```ts
document.documentElement.classList.toggle('dark');
```

---

## Usage

```tsx
import { Button, Badge, Card } from '@kwyw/kayv-glass-ui';

export default function MyPage() {
  return (
    <Card variant="elevated" padding="lg">
      <Badge variant="primary">New</Badge>
      <Button variant="primary" size="md">
        Get started
      </Button>
    </Card>
  );
}
```

---

## Theme System

`ThemeProvider` ships five built-in colour themes — **Indigo** (default), **Violet**, **Rose**, **Amber**, and **Teal** — and supports fully custom themes via CSS variables.

### `useTheme()`

```tsx
import { useTheme } from '@kwyw/kayv-glass-ui';

function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div>
      {themes.map(t => (
        <button
          key={t.name}
          onClick={() => setTheme(t.name)}
          style={{ background: t.primary }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
```

| Return value | Type                | Description                                              |
| ------------ | ------------------- | -------------------------------------------------------- |
| `theme`      | `string`            | Name of the active theme.                                |
| `setTheme`   | `(name: string) => void` | Swap the theme — rewrites all eight CSS variables.  |
| `themes`     | `ThemeDefinition[]` | All registered themes with name, label, primary, colors. |

### Custom themes

Override the CSS variables directly in your global stylesheet. Use RGB triplets (no commas) so Tailwind's opacity modifiers (`bg-kv-500/30`) work correctly:

```css
/* globals.css */
:root {
  --kv-p-50:  220 252 231;
  --kv-p-100: 187 247 208;
  --kv-p-200: 134 239 172;
  --kv-p-300: 74  222 128;
  --kv-p-400: 34  197 94;
  --kv-p-500: 22  163 74;
  --kv-p-600: 21  128 61;
  --kv-p-700: 20  83  45;
}
```

---

## Components

### Button

Accessible `ref`-forwarding button with three variants, three sizes, and a stable loading state.

| Prop        | Type                                       | Default     | Description                                   |
| ----------- | ------------------------------------------ | ----------- | --------------------------------------------- |
| `variant`   | `'primary' \| 'secondary' \| 'ghost'`      | `'primary'` | Glass style.                                  |
| `size`      | `'sm' \| 'md' \| 'lg'`                     | `'md'`      | Controls height, padding, and font size.      |
| `isLoading` | `boolean`                                  | `false`     | Overlays a centred spinner. Sets `aria-busy`. |
| `disabled`  | `boolean`                                  | `false`     | Reduces opacity and disables pointer events.  |
| `className` | `string`                                   | —           | Merged via `tailwind-merge`.                  |
| `ref`       | `React.Ref<HTMLButtonElement>`             | —           | Forwarded to the `<button>` element.          |
| `...props`  | `React.ComponentPropsWithoutRef<'button'>` | —           | Spread onto the button element.               |

```tsx
<Button variant="primary" size="md">Save</Button>
<Button variant="secondary">Preview</Button>
<Button variant="ghost">Cancel</Button>
<Button isLoading variant="primary">Submit</Button>
```

---

### Badge

Inline label for status, categories, or metadata.

| Prop        | Type                                                             | Default     | Description              |
| ----------- | ---------------------------------------------------------------- | ----------- | ------------------------ |
| `variant`   | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Color intent.            |
| `size`      | `'sm' \| 'md'`                                                   | `'md'`      | Font and padding.        |
| `className` | `string`                                                         | —           | Merged via `tailwind-merge`. |

```tsx
<Badge variant="success">Active</Badge>
<Badge variant="danger" size="sm">Error</Badge>
```

---

### Card

A glass-surface container for grouping related content.

| Prop        | Type                                                   | Default     | Description                  |
| ----------- | ------------------------------------------------------ | ----------- | ---------------------------- |
| `variant`   | `'default' \| 'elevated' \| 'bordered' \| 'ghost'`    | `'default'` | Surface treatment.           |
| `padding`   | `'none' \| 'sm' \| 'md' \| 'lg'`                      | `'md'`      | Inner spacing.               |
| `className` | `string`                                               | —           | Merged via `tailwind-merge`. |

```tsx
<Card variant="elevated" padding="lg">
  <h2>Title</h2>
  <p>Content goes here.</p>
</Card>
```

---

### Input

Text input with label, helper text, error state, leading/trailing icon slots, and size variants.

| Prop           | Type                                      | Default | Description                             |
| -------------- | ----------------------------------------- | ------- | --------------------------------------- |
| `label`        | `string`                                  | —       | Label above the field.                  |
| `helperText`   | `string`                                  | —       | Hint text below the field.              |
| `error`        | `string`                                  | —       | Error message; triggers error styling.  |
| `size`         | `'sm' \| 'md' \| 'lg'`                   | `'md'`  | Controls height and font size.          |
| `leftIcon`     | `ReactNode`                               | —       | Icon rendered inside the left edge.     |
| `rightIcon`    | `ReactNode`                               | —       | Icon rendered inside the right edge.    |
| `className`    | `string`                                  | —       | Merged via `tailwind-merge`.            |
| `ref`          | `React.Ref<HTMLInputElement>`             | —       | Forwarded to the `<input>` element.     |
| `...props`     | `React.ComponentPropsWithoutRef<'input'>` | —       | Spread onto the input.                  |

```tsx
<Input label="Email" type="email" placeholder="you@example.com" />
<Input label="Username" error="Already taken" />
<Input leftIcon={<Search className="h-4 w-4" />} placeholder="Search…" />
```

---

### Select

Portal-based custom select with keyboard navigation and multi-select support.

| Prop           | Type                                  | Default     | Description                                    |
| -------------- | ------------------------------------- | ----------- | ---------------------------------------------- |
| `options`      | `SelectOption[]`                      | —           | `{ value, label, disabled? }` array.           |
| `value`        | `string \| string[]`                  | —           | Controlled value.                              |
| `defaultValue` | `string \| string[]`                  | —           | Uncontrolled initial value.                    |
| `onChange`     | `(value: string \| string[]) => void` | —           | Called on selection change.                    |
| `multiple`     | `boolean`                             | `false`     | Enables multi-select with chips.               |
| `placeholder`  | `string`                              | `'Select…'` | Text shown when nothing is selected.           |
| `label`        | `string`                              | —           | Label above the trigger.                       |
| `error`        | `string`                              | —           | Error message; triggers error styling.         |
| `size`         | `'sm' \| 'md' \| 'lg'`               | `'md'`      | Controls trigger height and font size.         |
| `disabled`     | `boolean`                             | `false`     | Disables the select.                           |

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

**`<Accordion>` props**

| Prop           | Type                              | Default    | Description                                    |
| -------------- | --------------------------------- | ---------- | ---------------------------------------------- |
| `type`         | `'single' \| 'multiple'`          | `'single'` | Whether multiple panels can be open at once.   |
| `defaultValue` | `string \| string[]`              | —          | Panel(s) open on initial render.               |
| `value`        | `string \| string[]`              | —          | Controlled open panel(s).                      |
| `onChange`     | `(v: string \| string[]) => void` | —          | Called when open panels change.                |

**`<AccordionItem>` props**

| Prop       | Type      | Default | Description                        |
| ---------- | --------- | ------- | ---------------------------------- |
| `value`    | `string`  | —       | Unique identifier for this panel.  |
| `title`    | `string`  | —       | Trigger label.                     |
| `disabled` | `boolean` | `false` | Prevents opening.                  |

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

### Tabs

Compound tab component with pills, underline, and line variants. Fully keyboard-navigable.

**`<Tabs>` props**

| Prop           | Type                        | Default   | Description                           |
| -------------- | --------------------------- | --------- | ------------------------------------- |
| `defaultValue` | `string`                    | —         | Tab open on initial render.           |
| `value`        | `string`                    | —         | Controlled active tab.                |
| `onValueChange`| `(value: string) => void`   | —         | Called on tab change.                 |
| `variant`      | `'pills' \| 'underline' \| 'line'` | `'pills'` | Visual style.                |

**`<TabsTrigger>` props**

| Prop       | Type      | Default | Description                        |
| ---------- | --------- | ------- | ---------------------------------- |
| `value`    | `string`  | —       | Unique identifier for this tab.    |
| `disabled` | `boolean` | `false` | Prevents activation.               |
| `icon`     | `ReactNode` | —     | Icon rendered before the label.    |

```tsx
<Tabs defaultValue="overview" variant="pills">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="settings">Settings content</TabsContent>
</Tabs>
```

---

### Progress

Progress bar with label, value display, size variants, shimmer animation, and indeterminate state.

| Prop            | Type                              | Default     | Description                                          |
| --------------- | --------------------------------- | ----------- | ---------------------------------------------------- |
| `value`         | `number`                          | —           | Progress 0–100. Omit for indeterminate.              |
| `max`           | `number`                          | `100`       | Maximum value.                                       |
| `variant`       | `'default' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Color intent.            |
| `size`          | `'sm' \| 'md' \| 'lg'`           | `'md'`      | Track height.                                        |
| `label`         | `string`                          | —           | Label above the bar.                                 |
| `showValue`     | `boolean`                         | `false`     | Renders `value%` at the right.                       |
| `animated`      | `boolean`                         | `false`     | Adds a shimmer sweep animation.                      |

```tsx
<Progress value={72} label="Uploading…" showValue />
<Progress variant="success" value={100} label="Complete" />
<Progress animated label="Processing…" /> {/* indeterminate */}
```

---

### Alert

Inline contextual message with optional dismiss action.

| Prop          | Type                                             | Default  | Description                          |
| ------------- | ------------------------------------------------ | -------- | ------------------------------------ |
| `variant`     | `'info' \| 'success' \| 'warning' \| 'danger'`  | `'info'` | Color intent.                        |
| `title`       | `string`                                         | —        | Bold heading above the body.         |
| `dismissible` | `boolean`                                        | `false`  | Adds an ✕ close button.              |
| `onDismiss`   | `() => void`                                     | —        | Called when close button is clicked. |

```tsx
<Alert variant="success" title="Saved!" dismissible onDismiss={() => setShow(false)}>
  Your changes have been published.
</Alert>
```

---

### Toast

Animated notification that auto-dismisses. Render `<Toaster>` once at the app root; call `useToast()` to fire toasts from anywhere.

```tsx
// main.tsx — render once
<Toaster position="bottom-right" />

// Anywhere in your app
const { toast } = useToast();
toast('File uploaded!', { variant: 'success', duration: 4000 });
```

**`toast()` options**

| Prop       | Type                                                               | Default       | Description               |
| ---------- | ------------------------------------------------------------------ | ------------- | ------------------------- |
| `variant`  | `'info' \| 'success' \| 'warning' \| 'danger'`                    | `'info'`      | Color intent.             |
| `duration` | `number`                                                           | `3000`        | Auto-dismiss delay in ms. |

---

### Avatar

User avatar with image, initials fallback, status indicator, and group stacking.

**`<Avatar>` props**

| Prop        | Type                                           | Default | Description                             |
| ----------- | ---------------------------------------------- | ------- | --------------------------------------- |
| `src`       | `string`                                       | —       | Image URL.                              |
| `alt`       | `string`                                       | —       | Alt text / initials source.             |
| `size`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`        | `'md'`  | Controls diameter.                      |
| `status`    | `'online' \| 'offline' \| 'away' \| 'busy'`   | —       | Renders a coloured dot badge.           |

```tsx
<Avatar src="/alice.jpg" alt="Alice" status="online" />

<AvatarGroup max={3}>
  <Avatar src="/alice.jpg" alt="Alice" />
  <Avatar src="/bob.jpg"   alt="Bob" />
  <Avatar alt="Carol" />
</AvatarGroup>
```

---

### Modal

Portal-based dialog with animated backdrop, accessible focus trap, and slot-based layout.

| Prop                | Type                                        | Default | Description                          |
| ------------------- | ------------------------------------------- | ------- | ------------------------------------ |
| `open`              | `boolean`                                   | —       | Controls visibility.                 |
| `onClose`           | `() => void`                                | —       | Called on backdrop click or Escape.  |
| `size`              | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`   | `'md'`  | Max-width of the dialog panel.       |
| `closeOnOverlayClick` | `boolean`                                 | `true`  | Click backdrop to dismiss.           |
| `showCloseButton`   | `boolean`                                   | `true`  | Renders an ✕ in the top-right corner.|

Sub-components: `<ModalHeader>`, `<ModalBody>`, `<ModalFooter>`.

```tsx
<Modal open={open} onClose={() => setOpen(false)}>
  <ModalHeader>Confirm deletion</ModalHeader>
  <ModalBody>This action cannot be undone.</ModalBody>
  <ModalFooter>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="primary" onClick={handleDelete}>Delete</Button>
  </ModalFooter>
</Modal>
```

---

### Drawer

Portal-based slide-in panel that can emerge from any of the four screen edges.

| Prop                | Type                                    | Default  | Description                         |
| ------------------- | --------------------------------------- | -------- | ----------------------------------- |
| `open`              | `boolean`                               | —        | Controls visibility.                |
| `onClose`           | `() => void`                            | —        | Called on backdrop click or Escape. |
| `side`              | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` | Slide direction.                 |
| `size`              | `'sm' \| 'md' \| 'lg' \| 'xl'`         | `'md'`   | Panel width (or height for top/bottom). |
| `closeOnOverlayClick` | `boolean`                             | `true`   | Click backdrop to dismiss.          |
| `showCloseButton`   | `boolean`                               | `true`   | Renders an ✕ button.                |

Sub-components: `<DrawerHeader>`, `<DrawerBody>`, `<DrawerFooter>`.

```tsx
<Drawer open={open} onClose={() => setOpen(false)} side="right">
  <DrawerHeader>Filters</DrawerHeader>
  <DrawerBody>…filter controls…</DrawerBody>
  <DrawerFooter>
    <Button onClick={() => setOpen(false)}>Apply</Button>
  </DrawerFooter>
</Drawer>
```

---

### Breadcrumb

Navigation trail showing the current page's position in the hierarchy.

**`<Breadcrumb>` props**

| Prop        | Type        | Default | Description                                    |
| ----------- | ----------- | ------- | ---------------------------------------------- |
| `separator` | `ReactNode` | `'/'`   | Custom separator between items.                |
| `maxItems`  | `number`    | —       | Collapses middle items into `…` when exceeded. |

**`<BreadcrumbItem>` props**

| Prop        | Type        | Default | Description                                        |
| ----------- | ----------- | ------- | -------------------------------------------------- |
| `href`      | `string`    | —       | Makes the item a link. Omit for the current page.  |
| `icon`      | `ReactNode` | —       | Icon rendered before the label.                    |
| `isCurrent` | `boolean`   | `false` | Marks active item (`aria-current="page"`).         |

```tsx
<Breadcrumb separator={<ChevronRight className="h-3.5 w-3.5" />}>
  <BreadcrumbItem href="/" icon={<Home className="h-3.5 w-3.5" />}>Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem isCurrent>Sneakers</BreadcrumbItem>
</Breadcrumb>
```

---

### Navbar

Compound glass navbar with brand, content slots, mobile menu toggle, and an animated slide-down mobile drawer.

Sub-components: `<NavbarBrand>`, `<NavbarContent>`, `<NavbarItem>`, `<NavbarMenu>`, `<NavbarMenuItem>`.

**`<Navbar>` props**

| Prop        | Type                               | Default     | Description                         |
| ----------- | ---------------------------------- | ----------- | ----------------------------------- |
| `variant`   | `'default' \| 'bordered' \| 'floating'` | `'default'` | Glass surface treatment.    |
| `position`  | `'static' \| 'sticky' \| 'fixed'` | `'sticky'`  | CSS position strategy.              |
| `maxWidth`  | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'xl'` | Inner content width.    |

```tsx
<Navbar variant="floating" position="sticky">
  <NavbarBrand>
    <span className="font-bold">Acme</span>
  </NavbarBrand>
  <NavbarContent>
    <NavbarItem href="/about">About</NavbarItem>
    <NavbarItem href="/pricing">Pricing</NavbarItem>
  </NavbarContent>
</Navbar>
```

---

### Footer

Compound glass footer with brand slot, link columns, a divider, and a bottom bar.

Sub-components: `<FooterBrand>`, `<FooterLinks>`, `<FooterLink>`, `<FooterDivider>`, `<FooterBottom>`.

```tsx
<Footer>
  <FooterBrand>
    <span className="font-bold text-lg">Acme</span>
    <p className="text-sm text-slate-500">Building the future.</p>
  </FooterBrand>
  <FooterLinks title="Product">
    <FooterLink href="/features">Features</FooterLink>
    <FooterLink href="/pricing">Pricing</FooterLink>
  </FooterLinks>
  <FooterDivider />
  <FooterBottom>© 2025 Acme Inc.</FooterBottom>
</Footer>
```

---

### MenuBar

Full-app navigation layout: a glass sidebar on desktop (`lg+`) and a bottom navigation bar on mobile/tablet. One component tree, two layouts — controlled by the `display` prop and the active breakpoint.

**`<MenuBar>` props**

| Prop                 | Type                                      | Default        | Description                                                |
| -------------------- | ----------------------------------------- | -------------- | ---------------------------------------------------------- |
| `value`              | `string`                                  | —              | Controlled active item value.                              |
| `defaultValue`       | `string`                                  | `''`           | Uncontrolled initial active value.                         |
| `onValueChange`      | `(value: string) => void`                 | —              | Called on item selection.                                  |
| `display`            | `'responsive' \| 'sidebar' \| 'bottomnav'` | `'responsive'` | Override the automatic responsive layout.                  |
| `className`          | `string`                                  | —              | Applied to the sidebar `<aside>`.                          |
| `bottomNavClassName` | `string`                                  | —              | Applied to the bottom nav `<nav>`.                         |

**`<MenuBarItem>` props**

| Prop       | Type        | Default | Description                                        |
| ---------- | ----------- | ------- | -------------------------------------------------- |
| `value`    | `string`    | —       | Unique identifier, matched against `MenuBar.value`.|
| `icon`     | `ReactNode` | —       | Icon shown in both sidebar and bottom nav.         |
| `disabled` | `boolean`   | `false` | Prevents selection.                                |
| `bottomNav`| `boolean`   | `true`  | Set `false` to exclude from the bottom nav.        |

Sub-components: `<MenuBarBrand>`, `<MenuBarSection>`, `<MenuBarDivider>`.

```tsx
<div className="flex h-screen">
  <MenuBar defaultValue="home" onValueChange={setActive}>
    <MenuBarBrand>
      <span className="font-bold">Acme</span>
    </MenuBarBrand>
    <MenuBarSection label="Main">
      <MenuBarItem value="home"     icon={<Home className="h-4 w-4" />}>Home</MenuBarItem>
      <MenuBarItem value="search"   icon={<Search className="h-4 w-4" />}>Search</MenuBarItem>
      <MenuBarItem value="settings" icon={<Settings className="h-4 w-4" />} bottomNav={false}>
        Settings
      </MenuBarItem>
    </MenuBarSection>
  </MenuBar>

  <main className="flex-1 overflow-auto p-8">
    {/* page content */}
  </main>
</div>
```

---

### Calendar

Full-featured date picker with single, range, and multi-select modes. Supports public holidays, weekend highlighting, and event dots with tooltip previews.

| Prop                | Type                                          | Default    | Description                                             |
| ------------------- | --------------------------------------------- | ---------- | ------------------------------------------------------- |
| `mode`              | `'single' \| 'range' \| 'multi'`              | `'single'` | Selection mode.                                         |
| `value`             | `Date \| null`                                | —          | Controlled value (single mode).                         |
| `defaultValue`      | `Date`                                        | —          | Uncontrolled initial value (single mode).               |
| `onChange`          | `(date: Date \| null) => void`                | —          | Called when the selected date changes.                  |
| `range`             | `DateRange`                                   | —          | Controlled range `{ start, end }`.                      |
| `onRangeChange`     | `(range: DateRange) => void`                  | —          | Called when range changes.                              |
| `minDate`           | `Date`                                        | —          | Dates before this are disabled.                         |
| `maxDate`           | `Date`                                        | —          | Dates after this are disabled.                          |
| `disabledDates`     | `Date[]`                                      | —          | Array of individual dates to disable.                   |
| `holidays`          | `Holiday[]`                                   | —          | `{ date, label? }` — renders dates in rose.             |
| `highlightWeekends` | `boolean`                                     | `false`    | Colours Saturday and Sunday rose/red.                   |
| `events`            | `CalendarEvent[]`                             | —          | `{ date, label, color? }` — renders coloured dots.      |
| `firstDayOfWeek`    | `0 \| 1`                                      | `1`        | `0` = Sunday, `1` = Monday.                             |

```tsx
// Date range picker with holidays
<Calendar
  mode="range"
  onRangeChange={(r) => setRange(r)}
  holidays={[{ date: new Date(2025, 11, 25), label: 'Christmas' }]}
  highlightWeekends
/>
```

---

### FileInput

File upload control with a glass dropzone or a compact button variant. Supports validation, multiple files, and size limits.

| Prop            | Type                                       | Default      | Description                                      |
| --------------- | ------------------------------------------ | ------------ | ------------------------------------------------ |
| `variant`       | `'dropzone' \| 'button'`                   | `'dropzone'` | Visual presentation.                             |
| `multiple`      | `boolean`                                  | `false`      | Allow selecting multiple files.                  |
| `accept`        | `string`                                   | —            | Accepted MIME types or extensions (`'image/*'`). |
| `maxSize`       | `number`                                   | —            | Max file size in bytes.                          |
| `maxFiles`      | `number`                                   | —            | Max number of files when `multiple` is true.     |
| `onFilesChange` | `(files: File[]) => void`                  | —            | Called whenever the file selection changes.      |
| `onError`       | `(errors: FileValidationError[]) => void`  | —            | Called when validation fails.                    |
| `disabled`      | `boolean`                                  | `false`      | Disables all interaction.                        |

```tsx
<FileInput
  variant="dropzone"
  multiple
  accept="image/*"
  maxSize={5 * 1024 * 1024}
  onFilesChange={(files) => setFiles(files)}
/>
```

---

### Checkbox

Glass checkbox with indeterminate state, sizes, optional label, and description text.

| Prop            | Type                          | Default | Description                                             |
| --------------- | ----------------------------- | ------- | ------------------------------------------------------- |
| `checked`       | `boolean`                     | —       | Controlled checked state.                               |
| `defaultChecked`| `boolean`                     | `false` | Uncontrolled initial state.                             |
| `indeterminate` | `boolean`                     | `false` | Renders the `—` indeterminate state.                    |
| `onChange`      | `(checked: boolean) => void`  | —       | Called when state changes.                              |
| `label`         | `string`                      | —       | Label rendered to the right of the checkbox.            |
| `description`   | `string`                      | —       | Helper text below the label.                            |
| `size`          | `'sm' \| 'md' \| 'lg'`        | `'md'`  | Controls checkbox size.                                 |
| `disabled`      | `boolean`                     | `false` | Prevents interaction.                                   |

```tsx
<Checkbox label="Accept terms" description="You agree to our terms of service." />
<Checkbox indeterminate label="Select all" />
```

---

### Tooltip

Portal-based tooltip with hover and click triggers, four placements, configurable delay, and support for rich `ReactNode` content.

| Prop        | Type                                        | Default   | Description                                      |
| ----------- | ------------------------------------------- | --------- | ------------------------------------------------ |
| `content`   | `ReactNode`                                 | —         | Tooltip body — plain text or JSX.                |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'`   | `'top'`   | Which side the bubble appears on.                |
| `trigger`   | `'hover' \| 'click'`                        | `'hover'` | Interaction model.                               |
| `delay`     | `number`                                    | `0`       | Open delay in ms (hover only).                   |
| `disabled`  | `boolean`                                   | `false`   | Prevents the tooltip from appearing.             |

```tsx
<Tooltip content="Copy to clipboard" placement="top">
  <button>Copy</button>
</Tooltip>

<Tooltip content="Link copied!" trigger="click" placement="bottom">
  <Button variant="ghost">Share</Button>
</Tooltip>
```

---

### Globe

Interactive 3D WebGL globe with drag-to-rotate, momentum/inertia, and configurable city markers. Powered by [cobe](https://github.com/shuding/cobe).

| Prop        | Type              | Default     | Description                                          |
| ----------- | ----------------- | ----------- | ---------------------------------------------------- |
| `width`     | `number`          | `600`       | Canvas width in px.                                  |
| `height`    | `number`          | `600`       | Canvas height in px.                                 |
| `markers`   | `GlobeMarker[]`   | `[]`        | `{ location: [lat, lng], size: number }` array.      |
| `baseColor` | `[r, g, b]`       | `[0.3, 0.3, 1]` | Globe surface RGB (0–1 range).                   |
| `glowColor` | `[r, g, b]`       | `[0.3, 0.3, 1]` | Atmosphere glow RGB (0–1 range).                 |
| `className` | `string`          | —           | Merged via `tailwind-merge`.                         |

```tsx
<Globe
  markers={[
    { location: [40.7128, -74.006],  size: 0.05 }, // New York
    { location: [51.5074, -0.1278],  size: 0.05 }, // London
    { location: [35.6762, 139.6503], size: 0.05 }, // Tokyo
  ]}
/>
```

---

### Confetti

Celebration particle effects via [canvas-confetti](https://github.com/catdad/canvas-confetti). Three usage patterns: a ready-made `<ConfettiButton>`, a ref-based `<Confetti>` for programmatic control, and standalone fire functions for use anywhere.

#### `<ConfettiButton>`

| Prop         | Type                                                    | Default    | Description                                |
| ------------ | ------------------------------------------------------- | ---------- | ------------------------------------------ |
| `preset`     | `'basic' \| 'side-cannons' \| 'fireworks' \| 'stars'`  | `'basic'`  | Built-in animation preset.                 |
| `options`    | `ConfettiOptions`                                       | —          | Raw `canvas-confetti` options to merge in. |
| `onConfetti` | `() => void`                                            | —          | Callback fired after the burst.            |
| `...props`   | `React.ComponentPropsWithoutRef<'button'>`              | —          | Spread onto the underlying button.         |

#### Ref-based `<Confetti>`

```tsx
const ref = useRef<ConfettiRef>(null);

<Confetti ref={ref} />
<button onClick={() => ref.current?.fire()}>Fire!</button>
```

#### Standalone fire functions

```tsx
import {
  confettiBasic,
  confettiSideCannons,
  confettiFireworks,
  confettiStars,
  confettiEmoji,
} from '@kwyw/kayv-glass-ui';

// Use anywhere — no component needed
confettiFireworks();
confettiEmoji('🚀');
```

```tsx
// ConfettiButton — simplest usage
<ConfettiButton preset="fireworks">
  Launch fireworks!
</ConfettiButton>
```

---

### Backgrounds

Three background primitives for dot grids, line grids, and ambient gradient blobs. Each is a lightweight SVG or div that tiles to fill its container — pair with a CSS `mask-image` class to create radial or linear fade effects.

#### `DotPattern`

| Prop        | Type                      | Default | Description                                            |
| ----------- | ------------------------- | ------- | ------------------------------------------------------ |
| `width`     | `number`                  | `16`    | Horizontal cell size (spacing between dot centres).    |
| `height`    | `number`                  | `16`    | Vertical cell size.                                    |
| `x / y`     | `number`                  | `0`     | Pattern offset in px.                                  |
| `cx / cy`   | `number`                  | `1`     | Dot position within each cell.                         |
| `cr`        | `number`                  | `1`     | Dot radius in px.                                      |
| `className` | `string`                  | —       | Applied to the `<svg>`. Use for `mask-image`, `fill`, opacity, etc. |
| `...props`  | `SVGProps<SVGSVGElement>`  | —       | All native SVG attributes forwarded.                   |

```tsx
{/* Place inside a relative overflow-hidden container */}
<div className="relative h-64 overflow-hidden rounded-2xl bg-slate-950">
  <DotPattern
    width={20}
    height={20}
    cr={1.2}
    className="[mask-image:radial-gradient(350px_circle_at_center,white,transparent)]"
  />
  <div className="relative z-10 flex h-full items-center justify-center">
    Content
  </div>
</div>
```

#### `GridPattern`

| Prop                  | Type                      | Default | Description                                               |
| --------------------- | ------------------------- | ------- | --------------------------------------------------------- |
| `width`               | `number`                  | `40`    | Grid cell width in px.                                    |
| `height`              | `number`                  | `40`    | Grid cell height in px.                                   |
| `x / y`               | `number`                  | `-1`    | Pattern offset. −1 aligns lines flush with the container. |
| `squares`             | `[number, number][]`      | —       | `[col, row]` pairs of cells to highlight.                 |
| `lineStrokeDasharray` | `number \| string`        | `0`     | `strokeDasharray` for the lines — e.g. `"4 4"` for dashes. |
| `className`           | `string`                  | —       | Applied to the `<svg>`. Use for `mask-image`, `stroke`, opacity. |
| `...props`            | `SVGProps<SVGSVGElement>`  | —       | All native SVG attributes forwarded.                      |

```tsx
<div className="relative h-64 overflow-hidden rounded-2xl bg-slate-950">
  <GridPattern
    width={48}
    height={48}
    squares={[[1, 2], [3, 1], [5, 3], [2, 5]]}
    className="[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
  />
</div>
```

#### `GradientBackground`

| Prop        | Type      | Default | Description                                                              |
| ----------- | --------- | ------- | ------------------------------------------------------------------------ |
| `fixed`     | `boolean` | `true`  | `true` = `position: fixed` (full viewport). `false` = `position: absolute`. |
| `className` | `string`  | —       | Merged onto the wrapper div.                                             |

```tsx
{/* Render once in your root layout — sits behind everything */}
<GradientBackground />

{/* Or scope it to a section */}
<div className="relative overflow-hidden rounded-2xl">
  <GradientBackground fixed={false} />
  <div className="relative z-10">Content</div>
</div>
```

---

## Utilities

### `cn(...inputs)`

Combines `clsx` and `tailwind-merge`. The last conflicting Tailwind class always wins.

```tsx
import { cn } from '@kwyw/kayv-glass-ui';

const cls = cn(
  'rounded-xl bg-white/40 backdrop-blur-sm',
  isActive   && 'ring-2 ring-kv-500',
  isDisabled && 'opacity-40 pointer-events-none',
);
```

---

## Project Structure

```
kayv-glass-ui/
│
├── src/                          # Library source — published to npm
│   ├── index.ts                  # Public API barrel
│   ├── components/
│   │   ├── index.ts              # Component barrel (re-exports all 23)
│   │   ├── Button/
│   │   ├── Badge/
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── Select/
│   │   ├── Accordion/
│   │   ├── Tabs/
│   │   ├── Progress/
│   │   ├── Alert/
│   │   ├── Toast/
│   │   ├── Avatar/
│   │   ├── Modal/
│   │   ├── Drawer/
│   │   ├── Breadcrumb/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── MenuBar/
│   │   ├── Calendar/
│   │   ├── FileInput/
│   │   ├── Checkbox/
│   │   ├── Tooltip/
│   │   ├── Globe/
│   │   ├── Confetti/
│   │   └── Background/
│   │       ├── Background.types.ts  # Four-file pattern: types → styles → impl → index
│   │       ├── Background.styles.ts
│   │       ├── Background.tsx       # exports DotPattern, GridPattern, GradientBackground
│   │       └── index.ts
│   ├── utils/
│   │   └── cn.ts                  # clsx + tailwind-merge helper
│   └── theme/
│       └── index.ts               # ThemeProvider, useTheme, built-in themes
│
├── playground/                    # Vite documentation app — never published
│   └── src/
│       ├── App.tsx                # BrowserRouter + all component routes
│       ├── components/
│       │   └── Layout.tsx         # Shell: header, glass sidebar, dark mode toggle
│       └── pages/
│           ├── Overview.tsx       # Dashboard with component card grid
│           ├── DocsPage.tsx       # Getting started / installation guide
│           ├── ThemingPage.tsx    # Live theme picker + setup guide
│           └── components/        # One page per component (23 total)
│
├── tsup.config.ts                 # ESM + CJS, dts, splitting, minify
├── tsconfig.json                  # Strict TS (exactOptionalPropertyTypes: true)
└── package.json
```

Every component follows the same **four-file pattern**: `Component.types.ts` → `Component.styles.ts` → `Component.tsx` → `index.ts`. The playground imports from `../../src` via a Vite path alias — no build step needed during development.

---

## Local Development

### First-time setup

```bash
# Install library dependencies
npm install

# Install playground dependencies
npm install --prefix playground
```

### Daily workflow

```bash
# Start the playground dev server (http://localhost:5173)
npm run playground

# Type-check without emitting
npm run type-check

# Watch-mode library build (only needed to test built dist output)
npm run dev
```

The playground uses a Vite alias `'kayv-glass-ui' → '../src/index.ts'` — changes to library source are reflected in the playground immediately without a build step.

---

## Build Pipeline

```bash
npm run build
```

**tsup** processes `src/index.ts` and outputs:

| File               | Format    | Purpose                                   |
| ------------------ | --------- | ----------------------------------------- |
| `dist/index.js`    | ESM       | Vite, Next.js App Router, modern bundlers |
| `dist/index.cjs`   | CJS       | Webpack 4, Jest, older toolchains         |
| `dist/index.d.ts`  | CJS types | TypeScript consumers using `require()`    |
| `dist/index.d.cts` | ESM types | TypeScript consumers using `import`       |

Each output is prefixed with `"use client"` for RSC compatibility. Code splitting is enabled — importing only `Button` ships only the Button chunk.

```bash
# Full publish flow (type-check → build → publish)
npm publish
```

`prepublishOnly` runs `type-check` and `build` automatically before every publish.

---

## Adding a New Component

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
import type React from 'react';

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

export const spinnerBase =
  'inline-block rounded-full border-2 border-current border-t-transparent animate-spin';

export const spinnerSize: Record<SpinnerSize, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-5 w-5',
  lg: 'h-7 w-7',
};
```

Keep all class strings in the styles file — the component file contains only logic.

### 4 — Build the component

```tsx
// Spinner.tsx
'use client';
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { spinnerBase, spinnerSize } from './Spinner.styles';
import type { SpinnerProps } from './Spinner.types';

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <span
      ref={ref}
      role="status"
      aria-label="Loading"
      className={cn(spinnerBase, spinnerSize[size], className)}
      {...props}
    />
  ),
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
- [x] Runtime theme system — `ThemeProvider`, `useTheme()`, five built-in themes
- [x] Dark mode via `dark:` Tailwind prefix
- [x] 23 components: Button, Badge, Card, Input, Select, Accordion, Tabs, Progress, Alert, Toast, Avatar, Modal, Drawer, Breadcrumb, Navbar, Footer, MenuBar, Calendar, FileInput, Checkbox, Tooltip, Globe, Confetti
- [x] Calendar: single / range / multi modes, minDate/maxDate, disabledDates, holidays, events
- [x] MenuBar: glass sidebar (desktop) + bottom nav (mobile) — registration pattern
- [x] Globe: WebGL 3D globe with drag-to-rotate and inertia
- [x] Confetti: presets, emoji bursts, ref-based API, standalone fire functions
- [x] Backgrounds: `DotPattern`, `GridPattern`, `GradientBackground` — SVG tile patterns + ambient gradient blob
- [x] Playground: routing, sidebar search, dark mode, per-component docs pages
- [x] Documentation page (`/docs`) with install guide, setup steps, and component catalogue
- [x] TypeScript: fixed `TabsProps.onChange` conflict with native `FormEventHandler`, union-type narrowing in NavbarPage

**v0.2 — DX & accessibility**

- [ ] Full WCAG 2.1 AA audit (focus management, ARIA, colour contrast)
- [ ] Keyboard navigation pass for Calendar and Select
- [ ] `Spinner` standalone component
- [ ] Storybook integration

**v0.3 — Theme system**

- [ ] Tailwind preset/plugin (`ThemeConfig` becomes active)
- [ ] CSS custom property tokens for radius, blur, and spacing scale

**v1.0 — Stable release**

- [ ] Automated visual regression tests
- [ ] Published to npm registry

---

## License

MIT © kayv
