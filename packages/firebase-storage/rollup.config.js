import config from '../../rollup.config.base'
import pkg from './package.json'

export default config({
  pkg,
  external: [],
})
