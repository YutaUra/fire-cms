import { Dashboard, DashboardBodyHeader } from '@fire-cms/components'
import { FireCmsLoginRequired } from '@fire-cms/layout'
import { FireCmsPermissionRequied } from '@fire-cms/permission'
import { ContentIndexMain } from '../components/pages/index'
import { FireCmsContentFetchContentsEffect } from '../effect'

export const ContentIndex = (): JSX.Element => (
  <Dashboard>
    <DashboardBodyHeader />

    <FireCmsLoginRequired>
      <FireCmsPermissionRequied>
        <FireCmsContentFetchContentsEffect />

        <ContentIndexMain />
      </FireCmsPermissionRequied>
    </FireCmsLoginRequired>
  </Dashboard>
)
