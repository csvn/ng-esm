let typescript = require('rollup-plugin-typescript');

module.exports = {
  entry: 'example/main.ts',
  dest: 'example/dist/main.js',
  format: 'iife',
  sourceMap: true,
  plugins: [
    typescript()
  ]
};
