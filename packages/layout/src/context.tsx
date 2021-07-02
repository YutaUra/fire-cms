import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'

const FireCmsLayoutRedirectToContext = createContext<string>('/')
const FireCmsLayoutBasePathContext = createContext<string>('/')

interface FireCmsLayoutProviderProps {
  children: ReactNode
  redirectTo: string
  basePath: string
}

export const FireCmsLayoutProvider = ({
  children,
  redirectTo,
  basePath,
}: FireCmsLayoutProviderProps): JSX.Element => (
  <FireCmsLayoutRedirectToContext.Provider value={redirectTo}>
    <FireCmsLayoutBasePathContext.Provider value={basePath}>
      {children}
    </FireCmsLayoutBasePathContext.Provider>
  </FireCmsLayoutRedirectToContext.Provider>
)

export const useFireCmsLayoutRedirectTo = (): string =>
  useContext(FireCmsLayoutRedirectToContext)

export const useFireCmsLayoutBasePath = (): string =>
  useContext(FireCmsLayoutBasePathContext)
