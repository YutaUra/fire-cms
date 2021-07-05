import {
  Dashboard,
  DashboardBodyContent,
  DashboardBodyHeader,
  DashboardBodyMain,
  DashboardBodyTitle,
} from '@fire-cms/components'
import { FireCmsLoginRequired } from '../effect'

export const Index = (): JSX.Element => (
  <Dashboard>
    <DashboardBodyHeader />

    <DashboardBodyMain>
      <FireCmsLoginRequired>
        <DashboardBodyTitle>Dashboard</DashboardBodyTitle>

        <DashboardBodyContent />
      </FireCmsLoginRequired>
    </DashboardBodyMain>
  </Dashboard>
)
