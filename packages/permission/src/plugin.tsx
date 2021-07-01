import type { FireCmsPlugin } from '@fire-cms/plugin'
import type { ReactNode } from 'react'
import { FireCmsPermissionProvider } from './context'
import { FetchFireCmsIsStaffEffect } from './effect'

export class FireCmsPermissionPlugin implements FireCmsPlugin {
  public root = ({ children }: { children: ReactNode }): JSX.Element => (
    <FireCmsPermissionProvider>
      <FetchFireCmsIsStaffEffect />

      {children}
    </FireCmsPermissionProvider>
  )
}
