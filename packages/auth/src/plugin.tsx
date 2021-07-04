import type { FireCmsPlugin } from '@fire-cms/plugin'
import { FirebaseCmsAuthEffect, FireCmsAuthProvider } from './context'

export class FireCmsAuthPlugin implements FireCmsPlugin {
  public commonRoot: FireCmsPlugin['commonRoot'] = ({ children }) => (
    <FireCmsAuthProvider>
      <FirebaseCmsAuthEffect />

      {children}
    </FireCmsAuthProvider>
  )
}
