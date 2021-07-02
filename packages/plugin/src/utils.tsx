import { FireCmsPluginProvider } from './context'
import type { FireCmsPlugin } from './interface'

const isNotUndefined = <T,>(value: T): value is Exclude<T, undefined> =>
  typeof value !== 'undefined'

export interface PluginRootProps {
  plugins: FireCmsPlugin[]
  children: JSX.Element
}

export const PluginRoot = ({
  children,
  plugins,
}: PluginRootProps): JSX.Element => (
  <FireCmsPluginProvider plugins={plugins}>
    {plugins
      .map((plugin) => plugin.root)
      .filter(isNotUndefined)
      .reduceRight<JSX.Element>(
        (prev, Root) => (
          <Root>{prev}</Root>
        ),
        children,
      )}
  </FireCmsPluginProvider>
)
