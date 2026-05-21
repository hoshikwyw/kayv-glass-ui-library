import type { ReactNode } from 'react';
import { Button } from '../../src';

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="mb-12">
    <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
      {title}
    </h2>
    <div className="flex flex-wrap items-center gap-3">{children}</div>
  </section>
);

function App() {
  return (
    <div className="min-h-screen bg-gray-50 px-10 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          kayv-glass-ui
        </h1>
        <p className="text-gray-400 mt-1 text-sm">Component Library Playground</p>
      </header>

      <Section title="Variants">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
      </Section>

      <Section title="Sizes">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </Section>

      <Section title="Sizes × Variants">
        {(['sm', 'md', 'lg'] as const).map((size) =>
          (['primary', 'secondary', 'ghost'] as const).map((variant) => (
            <Button key={`${size}-${variant}`} size={size} variant={variant}>
              {variant} {size}
            </Button>
          ))
        )}
      </Section>

      <Section title="Loading State">
        <Button isLoading variant="primary" size="sm" />
        <Button isLoading variant="primary" />
        <Button isLoading variant="secondary" />
        <Button isLoading variant="ghost" />
      </Section>

      <Section title="Disabled State">
        <Button disabled variant="primary">Disabled Primary</Button>
        <Button disabled variant="secondary">Disabled Secondary</Button>
        <Button disabled variant="ghost">Disabled Ghost</Button>
      </Section>

      <Section title="Custom className (override)">
        <Button className="rounded-full bg-violet-600 hover:bg-violet-700 focus-visible:ring-violet-500">
          Custom Violet
        </Button>
        <Button variant="ghost" className="text-rose-500 hover:bg-rose-50 hover:text-rose-600">
          Danger Ghost
        </Button>
      </Section>
    </div>
  );
}

export default App;
