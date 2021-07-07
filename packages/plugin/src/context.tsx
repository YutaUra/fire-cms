import { createReadonlyContext } from '@fire-cms/react-utils'
import type { ReactNode } from 'react'
import type { FireCmsPlugin } from './interface'

const { Provider: FireCmsPluginPluginsProvider, useValue: useFireCmsPlugin } =
  createReadonlyContext<FireCmsPlugin[]>([])

interface FireCmsPluginProviderProps {
  plugins: FireCmsPlugin[]
  children: ReactNode
}

export const FireCmsPluginProvider = ({
  children,
  plugins,
}: FireCmsPluginProviderProps): JSX.Element => (
  <FireCmsPluginPluginsProvider value={plugins}>
    {children}
  </FireCmsPluginPluginsProvider>
)

export { useFireCmsPlugin }
