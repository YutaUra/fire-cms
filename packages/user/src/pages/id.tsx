import { Dashboard, DashboardBodyHeader } from '@fire-cms/components'
import { FireCmsLoginRequired } from '@fire-cms/layout'
import { FireCmsPermissionRequied } from '@fire-cms/permission'
import type { VFC } from 'react'
import { UserIdMain } from '../components/pages/id'

export const UserId: VFC<{ userId: string }> = ({ userId }) => (
  <Dashboard>
    <DashboardBodyHeader />

    <FireCmsLoginRequired>
      <FireCmsPermissionRequied>
        <UserIdMain userId={userId} />
      </FireCmsPermissionRequied>
    </FireCmsLoginRequired>
  </Dashboard>
)
