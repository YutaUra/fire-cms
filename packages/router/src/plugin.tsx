import type { FireCmsPlugin } from '@fire-cms/plugin'
import type { ReactNode } from 'react'
import type { LinkComponentType } from './context'
import { FireCmsRouterProvider } from './context'

interface FireCmsRouterPluginOption {
  useRouter: () => {
    push: (url: string) => unknown
    replace: (url: string) => unknown
    query: Record<string, string>
  }
  basePath: string
  LinkComponent: LinkComponentType
}

export class FireCmsRouterPlugin implements FireCmsPlugin {
  private readonly useRouter: FireCmsRouterPluginOption['useRouter']

  private readonly basePath: FireCmsRouterPluginOption['basePath']

  private readonly LinkComponent: FireCmsRouterPluginOption['LinkComponent']

  public constructor({
    useRouter,
    basePath,
    LinkComponent,
  }: FireCmsRouterPluginOption) {
    this.useRouter = useRouter
    this.basePath = basePath
    this.LinkComponent = LinkComponent
  }

  public root = ({ children }: { children: ReactNode }): JSX.Element => {
    const { push, replace, query } = this.useRouter()
    return (
      <FireCmsRouterProvider
        LinkComponent={this.LinkComponent}
        basePath={this.basePath}
        push={push}
        query={query}
        replace={replace}
      >
        {children}
      </FireCmsRouterProvider>
    )
  }
}
