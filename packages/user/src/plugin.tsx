import type { FireCmsPlugin } from '@fire-cms/plugin'
import { FireCmsUserCmsProvider, FireCmsUserCommonProvider } from './context'
import { FireCmsUserFetchMyPublicProfile } from './effect'
import { UserId } from './pages/id'
import { UserSettings } from './pages/settings'

export class FireCmsUserPlugin implements FireCmsPlugin {
  public getPage: FireCmsPlugin['getPage'] = (slug) => {
    const [first, ...others] = slug
    if (first !== 'users') return undefined

    if (others.length === 1 && others[0] === 'settings') {
      return {
        Page: UserSettings,
      }
    }
    if (others.length === 1) {
      return {
        Page: (): JSX.Element => <UserId userId={others[0] ?? ''} />,
      }
    }
    return undefined
  }

  public commonRoot: FireCmsPlugin['commonRoot'] = ({ children }) => (
    <FireCmsUserCommonProvider>{children}</FireCmsUserCommonProvider>
  )

  public cmsRoot: FireCmsPlugin['cmsRoot'] = ({ children }) => (
    <FireCmsUserCmsProvider>
      <FireCmsUserFetchMyPublicProfile />

      {children}
    </FireCmsUserCmsProvider>
  )
}
