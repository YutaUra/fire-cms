import type { FireCmsPlugin } from '@fire-cms/plugin'
import type { ReactNode } from 'react'
import { FireCmsLayoutProvider } from './context'
import { SigninPage } from './pages/Signin'

interface FireCmsLayoutPluginOption {
  redirectTo: string
  basePath: string
}

export class FireCmsLayoutPlugin implements FireCmsPlugin {
  private readonly redirectTo: string

  private readonly basePath: string

  public constructor({ redirectTo, basePath }: FireCmsLayoutPluginOption) {
    this.redirectTo = redirectTo
    this.basePath = basePath
  }

  public root = ({ children }: { children: ReactNode }): JSX.Element => (
    <FireCmsLayoutProvider
      basePath={this.basePath}
      redirectTo={this.redirectTo}
    >
      {children}
    </FireCmsLayoutProvider>
  )

  public getPage: FireCmsPlugin['getPage'] = (slug) => {
    if (slug.join('/') === 'signin')
      return { Page: SigninPage, allowAnonymous: true, allowNonStaff: true }
    return undefined
  }
}
