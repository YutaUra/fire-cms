import type { FireCmsPlugin } from '@fire-cms/plugin'
import type { ReactNode } from 'react'
import { FireCmsPermissionProvider } from './context'
import { FetchFireCmsIsStaffEffect } from './effect'

interface FireCmsPermissionPluginOption {
  forbiddenUrl?: string
}

export class FireCmsPermissionPlugin implements FireCmsPlugin {
  private readonly forbiddenUrl: string

  public constructor({ forbiddenUrl = '403' }: FireCmsPermissionPluginOption) {
    this.forbiddenUrl = forbiddenUrl
  }

  public root = ({ children }: { children: ReactNode }): JSX.Element => (
    <FireCmsPermissionProvider forbiddenUrl={this.forbiddenUrl}>
      <FetchFireCmsIsStaffEffect />

      {children}
    </FireCmsPermissionProvider>
  )
}
