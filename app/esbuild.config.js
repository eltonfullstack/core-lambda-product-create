const esbuild = require('esbuild');
const tsconfigPaths = require('esbuild-plugin-tsconfig-paths');

esbuild.build({
  entryPoints: ['index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  outfile: 'dist/index.js',
  sourcemap: true,
  minify: false,
  plugins: [tsconfigPaths()],
}).catch(() => process.exit(1));