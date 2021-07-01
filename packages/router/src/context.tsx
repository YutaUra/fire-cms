import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'

const FireCmsRouterPushContext = createContext<(url: string) => unknown>(
  () => null,
)
const FireCmsRouterReplaceContext = createContext<(url: string) => unknown>(
  () => null,
)

interface FireCmsRouterProviderProps {
  push: (url: string) => void
  replace: (url: string) => void
  children: ReactNode
}

export const FireCmsRouterProvider = ({
  children,
  push,
  replace,
}: FireCmsRouterProviderProps): JSX.Element => (
  <FireCmsRouterPushContext.Provider value={push}>
    <FireCmsRouterReplaceContext.Provider value={replace}>
      {children}
    </FireCmsRouterReplaceContext.Provider>
  </FireCmsRouterPushContext.Provider>
)

export const useFireCmsRouterPush = (): ((url: string) => unknown) =>
  useContext(FireCmsRouterPushContext)
export const useFireCmsRouterReplace = (): ((url: string) => unknown) =>
  useContext(FireCmsRouterReplaceContext)
