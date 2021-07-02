import type { AnchorHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'
import { createContext, useCallback, useContext } from 'react'
import join from 'url-join'

export type LinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & { href: string }
export type LinkComponentType = (proos: LinkProps) => JSX.Element | null

const FireCmsRouterPushContext = createContext<(url: string) => unknown>(
  () => null,
)
const FireCmsRouterReplaceContext = createContext<(url: string) => unknown>(
  () => null,
)
const FireCmsRouterQueryContext = createContext<Record<string, string>>({})
const FireCmsRouterBasePathContext = createContext<string>('/')
const FireCmsRouterLinkComponentContext = createContext<LinkComponentType>(
  () => null,
)

interface FireCmsRouterProviderProps {
  push: (url: string) => void
  replace: (url: string) => void
  query: Record<string, string>
  basePath: string
  LinkComponent: LinkComponentType
  children: ReactNode
}

export const FireCmsRouterProvider = ({
  basePath,
  children,
  push: rawPush,
  replace: rawReplace,
  LinkComponent,
  query,
}: FireCmsRouterProviderProps): JSX.Element => {
  const push = useCallback(
    (url: string) => {
      rawPush(join(basePath, url))
    },
    [basePath, rawPush],
  )

  const replace = useCallback(
    (url: string) => {
      rawReplace(join(basePath, url))
    },
    [basePath, rawReplace],
  )
  return (
    <FireCmsRouterPushContext.Provider value={push}>
      <FireCmsRouterReplaceContext.Provider value={replace}>
        <FireCmsRouterQueryContext.Provider value={query}>
          <FireCmsRouterBasePathContext.Provider value={basePath}>
            <FireCmsRouterLinkComponentContext.Provider value={LinkComponent}>
              {children}
            </FireCmsRouterLinkComponentContext.Provider>
          </FireCmsRouterBasePathContext.Provider>
        </FireCmsRouterQueryContext.Provider>
      </FireCmsRouterReplaceContext.Provider>
    </FireCmsRouterPushContext.Provider>
  )
}

export const useFireCmsRouterPush = (): ((url: string) => unknown) =>
  useContext(FireCmsRouterPushContext)
export const useFireCmsRouterReplace = (): ((url: string) => unknown) =>
  useContext(FireCmsRouterReplaceContext)
export const useFireCmsRouterQuery = (): Record<string, string> =>
  useContext(FireCmsRouterQueryContext)
export const useFireCmsRouterBasePath = (): string =>
  useContext(FireCmsRouterBasePathContext)

export const useFireCmsRouterLinkComponent = (): LinkComponentType =>
  useContext(FireCmsRouterLinkComponentContext)
