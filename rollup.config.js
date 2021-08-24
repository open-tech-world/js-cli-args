import typescript from '@rollup/plugin-typescript';
import { clean } from '@open-tech-world/rollup-plugin-clean';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: './lib/index.esm.js',
      format: 'esm',
    },
  ],
  plugins: [clean('lib/*'), typescript({ tsconfig: './tsconfig.json' })],
  external: ['@open-tech-world/es-utils'],
};
