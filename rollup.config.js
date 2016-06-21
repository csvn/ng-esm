let typescript = require('rollup-plugin-typescript');

module.exports = {
  entry: 'src/main.ts',
  sourceMap: true,
  plugins: [
    typescript()
  ],
  targets: [
    { dest: 'dist/main.es.js', format: 'es' },
    { dest: 'dist/main.cjs.js', format: 'cjs' }
  ]
};
