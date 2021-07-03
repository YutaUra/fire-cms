import {
  Dashboard,
  DashboardBody,
  DashboardBodyContent,
  DashboardBodyHeader,
  DashboardBodyMain,
  DashboardBodyTitle,
} from '@fire-cms/components'
import { FireCmsLoginRequired } from '../effect'

export const NotFound = (): JSX.Element => (
  <Dashboard>
    <DashboardBody>
      <DashboardBodyHeader />

      <DashboardBodyMain>
        <FireCmsLoginRequired>
          <DashboardBodyTitle>404 Not Found</DashboardBodyTitle>

          <DashboardBodyContent>
            該当のページが見つかりませんでした
          </DashboardBodyContent>
        </FireCmsLoginRequired>
      </DashboardBodyMain>
    </DashboardBody>
  </Dashboard>
)
