const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['./src/modules/product/infra/lambda/createProduct.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  outdir: 'dist', // cria pasta dist
  sourcemap: true,
  minify: false,
}).then(() => {
  console.log('Build completed!');
}).catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});