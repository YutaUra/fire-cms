import type { FireCmsPlugin } from '@fire-cms/plugin'
import type { ReactNode } from 'react'
import { FireCmsRouterProvider } from './context'

interface FireCmsRouterPluginOption {
  getRouter: () => {
    push: (url: string) => unknown
    replace: (url: string) => unknown
  }
}

export class FireCmsRouterPlugin implements FireCmsPlugin {
  private readonly getRouter: FireCmsRouterPluginOption['getRouter']

  public constructor({ getRouter }: FireCmsRouterPluginOption) {
    this.getRouter = getRouter
  }

  public root = ({ children }: { children: ReactNode }): JSX.Element => {
    const { push, replace } = this.getRouter()
    return (
      <FireCmsRouterProvider push={push} replace={replace}>
        {children}
      </FireCmsRouterProvider>
    )
  }
}
