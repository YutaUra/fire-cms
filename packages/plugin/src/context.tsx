import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'
import type { FireCmsPlugin } from './interface'

const FireCmsPluginContext = createContext<Readonly<FireCmsPlugin[]>>([])

interface FireCmsPluginProviderProps {
  plugins: FireCmsPlugin[]
  children: ReactNode
}

export const FireCmsPluginProvider = ({
  children,
  plugins,
}: FireCmsPluginProviderProps): JSX.Element => (
  <FireCmsPluginContext.Provider value={plugins}>
    {children}
  </FireCmsPluginContext.Provider>
)

export const useFireCmsPlugin = (): Readonly<FireCmsPlugin[]> =>
  useContext(FireCmsPluginContext)
