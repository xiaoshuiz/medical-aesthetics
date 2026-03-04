import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      index: './src/main.tsx',
    },
  },
  html: {
    template: './index.html',
  },
  output: {
    distPath: {
      root: 'dist',
    },
  },
  tools: {
    postcss: (opts) => {
      opts.postcssOptions.plugins = opts.postcssOptions.plugins || [];
      return opts;
    },
  },
});
