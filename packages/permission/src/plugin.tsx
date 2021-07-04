import type { FireCmsPlugin } from '@fire-cms/plugin'
import { FireCmsPermissionProvider } from './context'
import { FetchFireCmsIsStaffEffect } from './effect'
import { Forbidden } from './pages/403'

interface FireCmsPermissionPluginOption {
  forbiddenUrl?: string
}

export class FireCmsPermissionPlugin implements FireCmsPlugin {
  private readonly forbiddenUrl: string

  public constructor({ forbiddenUrl = '403' }: FireCmsPermissionPluginOption) {
    this.forbiddenUrl = forbiddenUrl
  }

  public getPage: FireCmsPlugin['getPage'] = (slug) => {
    if (slug.length === 1 && slug[0] === this.forbiddenUrl) {
      return {
        Page: Forbidden,
      }
    }
    return undefined
  }

  public cmsRoot: FireCmsPlugin['cmsRoot'] = ({ children }) => (
    <FireCmsPermissionProvider forbiddenUrl={this.forbiddenUrl}>
      <FetchFireCmsIsStaffEffect />

      {children}
    </FireCmsPermissionProvider>
  )
}
