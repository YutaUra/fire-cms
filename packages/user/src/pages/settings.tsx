import {
  Breadcrumbs,
  BreadcrumbsLink,
  Dashboard,
  DashboardBodyHeader,
  DashboardBodyMain,
  DashboardBodyTitle,
} from '@fire-cms/components'
import { FireCmsLoginRequired } from '@fire-cms/layout'
import { FireCmsPermissionRequied } from '@fire-cms/permission'
import { UserSettingsMain } from '../components/pages/settings'

export const UserSettings = (): JSX.Element => (
  <Dashboard>
    <DashboardBodyHeader />

    <DashboardBodyMain>
      <DashboardBodyTitle>
        <Breadcrumbs>
          <BreadcrumbsLink href="/users">ユーザー</BreadcrumbsLink>

          <BreadcrumbsLink href="/users/settings">設定</BreadcrumbsLink>
        </Breadcrumbs>
      </DashboardBodyTitle>

      <FireCmsLoginRequired>
        <FireCmsPermissionRequied>
          <UserSettingsMain />
        </FireCmsPermissionRequied>
      </FireCmsLoginRequired>
    </DashboardBodyMain>
  </Dashboard>
)
