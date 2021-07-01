import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'

const FireCmsRouterPushContext = createContext<(url: string) => unknown>(
  () => null,
)
const FireCmsRouterReplaceContext = createContext<(url: string) => unknown>(
  () => null,
)
const FireCmsRouterQueryContext = createContext<Record<string, string>>({})

interface FireCmsRouterProviderProps {
  push: (url: string) => void
  replace: (url: string) => void
  query: Record<string, string>
  children: ReactNode
}

export const FireCmsRouterProvider = ({
  children,
  push,
  replace,
  query,
}: FireCmsRouterProviderProps): JSX.Element => (
  <FireCmsRouterPushContext.Provider value={push}>
    <FireCmsRouterReplaceContext.Provider value={replace}>
      <FireCmsRouterQueryContext.Provider value={query}>
        {children}
      </FireCmsRouterQueryContext.Provider>
    </FireCmsRouterReplaceContext.Provider>
  </FireCmsRouterPushContext.Provider>
)

export const useFireCmsRouterPush = (): ((url: string) => unknown) =>
  useContext(FireCmsRouterPushContext)
export const useFireCmsRouterReplace = (): ((url: string) => unknown) =>
  useContext(FireCmsRouterReplaceContext)
export const useFireCmsRouterQuery = (): Record<string, string> =>
  useContext(FireCmsRouterQueryContext)
