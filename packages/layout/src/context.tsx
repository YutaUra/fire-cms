import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'

const FireCmsLayoutRedirectToContext = createContext<string>('/')

interface FireCmsLayoutProviderProps {
  children: ReactNode
  redirectTo: string
}

export const FireCmsLayoutProvider = ({
  children,
  redirectTo,
}: FireCmsLayoutProviderProps): JSX.Element => (
  <FireCmsLayoutRedirectToContext.Provider value={redirectTo}>
    {children}
  </FireCmsLayoutRedirectToContext.Provider>
)

export const useFireCmsLayoutRedirectTo = (): string =>
  useContext(FireCmsLayoutRedirectToContext)
