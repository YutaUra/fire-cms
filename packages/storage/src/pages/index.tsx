import { Dashboard, DashboardBodyHeader } from '@fire-cms/components'
import { FireCmsLoginRequired } from '@fire-cms/layout'
import { FireCmsPermissionRequied } from '@fire-cms/permission'
import { StorageIndexMain } from '../components/pages/index'

interface StorageIndexProps {
  path: string
}

export const StorageIndex = ({ path }: StorageIndexProps): JSX.Element => (
  <Dashboard>
    <DashboardBodyHeader />

    <FireCmsLoginRequired>
      <FireCmsPermissionRequied>
        <StorageIndexMain path={path} />
      </FireCmsPermissionRequied>
    </FireCmsLoginRequired>
  </Dashboard>
)
