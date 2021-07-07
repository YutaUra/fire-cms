import { Dashboard, DashboardBodyHeader } from '@fire-cms/components'
import { FireCmsLoginRequired } from '@fire-cms/layout'
import { FireCmsPermissionRequied } from '@fire-cms/permission'
import { ContentAddMain } from '../components/pages/add'

export const ContentAdd = (): JSX.Element => (
  <Dashboard>
    <DashboardBodyHeader />

    <FireCmsLoginRequired>
      <FireCmsPermissionRequied>
        <ContentAddMain />
      </FireCmsPermissionRequied>
    </FireCmsLoginRequired>
  </Dashboard>
)
