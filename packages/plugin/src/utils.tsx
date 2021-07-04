import type { FC } from 'react'
import { FireCmsPluginProvider, useFireCmsPlugin } from './context'
import type { FireCmsPlugin } from './interface'

const isNotUndefined = <T,>(value: T): value is Exclude<T, undefined> =>
  typeof value !== 'undefined'

type PluginRootType = 'client' | 'cms' | 'common'

const getRoot = (type: PluginRootType): `${PluginRootType}Root` => `${type}Root`

export interface FireCmsPluginRootProps {
  type: PluginRootType
}

export const FireCmsPluginRoot: FC<FireCmsPluginRootProps> = ({
  type,
  children,
}) => {
  const plugins = useFireCmsPlugin()

  return plugins
    .map((plugin) => plugin[getRoot(type)])
    .filter(isNotUndefined)
    .reduceRight<JSX.Element>(
      (prev, Root) => <Root>{prev}</Root>,
      <> {children}</>,
    )
}

export interface FireCmsCommonPluginRootProps {
  plugins: FireCmsPlugin[]
}

export const FireCmsCommonPluginRoot: FC<FireCmsCommonPluginRootProps> = ({
  plugins,
  children,
}) => (
  <FireCmsPluginProvider plugins={plugins}>
    <FireCmsPluginRoot type="common">{children}</FireCmsPluginRoot>
  </FireCmsPluginProvider>
)
