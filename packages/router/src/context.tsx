import { createReadonlyContext } from '@fire-cms/react-utils'
import type { AnchorHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'
import { useCallback } from 'react'
import join from 'url-join'

export type LinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & { href: string }
export type LinkComponentType = (proos: LinkProps) => JSX.Element | null

const { Provider: FireCmsRouterPushProvider, useValue: useFireCmsRouterPush } =
  createReadonlyContext<(url: string) => unknown>(() => null)
const {
  Provider: FireCmsRouterReplaceProvider,
  useValue: useFireCmsRouterReplace,
} = createReadonlyContext<(url: string) => unknown>(() => null)
const {
  Provider: FireCmsRouterQueryProvider,
  useValue: useFireCmsRouterQuery,
} = createReadonlyContext<Record<string, string>>({})
const {
  Provider: FireCmsRouterBasePathProvider,
  useValue: useFireCmsRouterBasePath,
} = createReadonlyContext<string>('/')
const {
  Provider: FireCmsRouterLinkComponentProvider,
  useValue: useFireCmsRouterLinkComponent,
} = createReadonlyContext<LinkComponentType>(() => null)

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

  const Link = useCallback<LinkComponentType>(
    ({ href, ...props }) => (
      <LinkComponent href={join(basePath, href)} {...props} />
    ),
    [LinkComponent, basePath],
  )

  return (
    <FireCmsRouterPushProvider value={push}>
      <FireCmsRouterReplaceProvider value={replace}>
        <FireCmsRouterQueryProvider value={query}>
          <FireCmsRouterBasePathProvider value={basePath}>
            <FireCmsRouterLinkComponentProvider value={Link}>
              {children}
            </FireCmsRouterLinkComponentProvider>
          </FireCmsRouterBasePathProvider>
        </FireCmsRouterQueryProvider>
      </FireCmsRouterReplaceProvider>
    </FireCmsRouterPushProvider>
  )
}

export {
  useFireCmsRouterPush,
  useFireCmsRouterReplace,
  useFireCmsRouterQuery,
  useFireCmsRouterBasePath,
  useFireCmsRouterLinkComponent,
}
