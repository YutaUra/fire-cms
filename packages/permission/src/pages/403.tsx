import {
  Dashboard,
  DashboardBody,
  DashboardBodyContent,
  DashboardBodyHeader,
  DashboardBodyMain,
  DashboardBodyTitle,
} from '@fire-cms/components'
import { FireCmsLoginRequired } from '@fire-cms/layout'

export const Forbidden = (): JSX.Element => (
  <Dashboard>
    <DashboardBody>
      <DashboardBodyHeader />

      <DashboardBodyMain>
        <FireCmsLoginRequired>
          <DashboardBodyTitle>403 Forbidden</DashboardBodyTitle>

          <DashboardBodyContent>
            該当のページにアクセスする権限がありません
          </DashboardBodyContent>
        </FireCmsLoginRequired>
      </DashboardBodyMain>
    </DashboardBody>
  </Dashboard>
)
