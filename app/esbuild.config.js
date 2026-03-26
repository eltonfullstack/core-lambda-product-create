const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  outfile: 'dist/index.js',
  sourcemap: true,
  minify: false,
}).catch(() => process.exit(1));