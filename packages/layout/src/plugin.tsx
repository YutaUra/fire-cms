import type { FireCmsPlugin } from '@fire-cms/plugin'
import type { ReactNode } from 'react'
import { FireCmsLayoutProvider } from './context'
import { SigninPage } from './pages/Signin'

interface FireCmsLayoutPluginOption {
  redirectTo: string
}

export class FireCmsLayoutPlugin implements FireCmsPlugin {
  public pages = {
    signin: SigninPage,
  }

  private readonly redirectTo: string

  public constructor({ redirectTo }: FireCmsLayoutPluginOption) {
    this.redirectTo = redirectTo
  }

  public root = ({ children }: { children: ReactNode }): JSX.Element => (
    <FireCmsLayoutProvider redirectTo={this.redirectTo}>
      {children}
    </FireCmsLayoutProvider>
  )
}
