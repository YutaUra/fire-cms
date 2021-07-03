import type { FireCmsPlugin } from '@fire-cms/plugin'
import type { ReactNode } from 'react'
import { FireCmsLayoutProvider } from './context'
import { NotFound } from './pages/404'
import { Index } from './pages/index'
import { SigninPage } from './pages/Signin'

interface FireCmsLayoutPluginOption {
  redirectTo: string
}

export class FireCmsLayoutPlugin implements FireCmsPlugin {
  private readonly redirectTo: string

  public constructor({ redirectTo }: FireCmsLayoutPluginOption) {
    this.redirectTo = redirectTo
  }

  public root = ({ children }: { children: ReactNode }): JSX.Element => (
    <FireCmsLayoutProvider NotFound={NotFound} redirectTo={this.redirectTo}>
      {children}
    </FireCmsLayoutProvider>
  )

  public getPage: FireCmsPlugin['getPage'] = (slug) => {
    if (slug.length === 0) {
      return { Page: Index }
    }
    if (slug.join('/') === 'signin') return { Page: SigninPage }
    return undefined
  }
}
