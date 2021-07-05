import type { FireCmsPlugin } from '@fire-cms/plugin'
import {
  FireCmsUserProfileCmsProvider,
  FireCmsUserProfileCommonProvider,
} from './context'
import { FireCmsUserProfileFetchMyPublicProfile } from './effect'

export class FireCmsUserProfilePlugin implements FireCmsPlugin {
  public commonRoot: FireCmsPlugin['commonRoot'] = ({ children }) => (
    <FireCmsUserProfileCommonProvider>
      {children}
    </FireCmsUserProfileCommonProvider>
  )

  public cmsRoot: FireCmsPlugin['cmsRoot'] = ({ children }) => (
    <FireCmsUserProfileCmsProvider>
      <FireCmsUserProfileFetchMyPublicProfile />

      {children}
    </FireCmsUserProfileCmsProvider>
  )
}
