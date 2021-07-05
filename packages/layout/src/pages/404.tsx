import {
  Dashboard,
  DashboardBodyContent,
  DashboardBodyHeader,
  DashboardBodyMain,
  DashboardBodyTitle,
} from '@fire-cms/components'
import { FireCmsLoginRequired } from '../effect'

export const NotFound = (): JSX.Element => (
  <Dashboard>
    <DashboardBodyHeader />

    <DashboardBodyMain>
      <FireCmsLoginRequired>
        <DashboardBodyTitle>404 Not Found</DashboardBodyTitle>

        <DashboardBodyContent>
          該当のページが見つかりませんでした
        </DashboardBodyContent>
      </FireCmsLoginRequired>
    </DashboardBodyMain>
  </Dashboard>
)
