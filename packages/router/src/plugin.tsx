import type { FireCmsPlugin } from '@fire-cms/plugin'
import type { ReactNode } from 'react'
import { FireCmsRouterProvider } from './context'

interface FireCmsRouterPluginOption {
  useRouter: () => {
    push: (url: string) => unknown
    replace: (url: string) => unknown
    query: Record<string, string>
  }
}

export class FireCmsRouterPlugin implements FireCmsPlugin {
  private readonly useRouter: FireCmsRouterPluginOption['useRouter']

  public constructor({ useRouter }: FireCmsRouterPluginOption) {
    this.useRouter = useRouter
  }

  public root = ({ children }: { children: ReactNode }): JSX.Element => {
    const { push, replace, query } = this.useRouter()
    return (
      <FireCmsRouterProvider push={push} query={query} replace={replace}>
        {children}
      </FireCmsRouterProvider>
    )
  }
}
