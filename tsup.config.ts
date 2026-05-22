import { defineConfig } from 'tsup';
import { readFileSync, writeFileSync } from 'node:fs';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  minify: true,
  treeshake: true,
  outDir: 'dist',
  external: ['react', 'react-dom'],
  async onSuccess() {
    // Prepend "use client" after bundling so RSC-aware frameworks (Next.js App Router)
    // treat all exports as client-boundary components. Must be done post-build because
    // esbuild strips module directives from non-entry-point files during bundling.
    for (const file of ['dist/index.js', 'dist/index.cjs']) {
      const content = readFileSync(file, 'utf-8');
      writeFileSync(file, `"use client";\n${content}`);
    }
  },
});
