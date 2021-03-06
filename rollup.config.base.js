import image from '@rollup/plugin-image'
import typescript from '@rollup/plugin-typescript'
import path from 'path'
import builtins from 'rollup-plugin-node-builtins'

const input = 'src/index.ts'

export default (option) => {
  const { pkg, external: additionalExternal = [] } = option || {}
  const external = [
    ...additionalExternal,
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ]

  return [
    // // browser-friendly UMD build
    // {
    //   input,
    //   output: {
    //     name: 'sample-lib',
    //     file: pkg.browser,
    //     format: 'umd',
    //     sourcemap: true,
    //   },
    //   plugins: [
    //     typescript({ declaration: false }),
    //     resolve(), // so Rollup can find `ms`
    //     commonjs(), // so Rollup can convert `ms` to an ES module
    //   ],
    // },

    // CommonJS (for Node)
    {
      input,
      external,
      output: { format: 'cjs', sourcemap: true, dir: path.dirname(pkg.main) },
      plugins: [
        builtins(),
        image(),
        typescript({ declaration: false, jsx: 'react-jsx' }),
      ],
    },

    // ES module (for bundlers) build.
    {
      input,
      external,
      output: { format: 'es', sourcemap: true, dir: path.dirname(pkg.module) },
      plugins: [
        builtins(),
        image(),
        typescript({ declaration: false, jsx: 'react-jsx' }),
      ],
    },
  ]
}
