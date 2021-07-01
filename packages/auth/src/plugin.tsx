import type { FireCmsPlugin } from '@fire-cms/plugin'
import type { ReactNode } from 'react'
import { FirebaseCmsAuthEffect, FireCmsAuthProvider } from './context'

export class FireCmsAuthPlugin implements FireCmsPlugin {
  public root = ({ children }: { children: ReactNode }): JSX.Element => (
    <FireCmsAuthProvider>
      <FirebaseCmsAuthEffect />

      {children}
    </FireCmsAuthProvider>
  )
}
