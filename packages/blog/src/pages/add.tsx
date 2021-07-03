import {
  Dashboard,
  DashboardBody,
  DashboardBodyHeader,
} from '@fire-cms/components'
import { FireCmsLoginRequired } from '@fire-cms/layout'
import { FireCmsPermissionRequied } from '@fire-cms/permission'
import { BlogAddMain } from '../components/pages/add'
import { FetchBlogs } from '../effect'

export const BlogAdd = (): JSX.Element => (
  <Dashboard>
    <DashboardBody>
      <DashboardBodyHeader />

      <FireCmsLoginRequired>
        <FireCmsPermissionRequied>
          <FetchBlogs />

          <BlogAddMain />
        </FireCmsPermissionRequied>
      </FireCmsLoginRequired>
    </DashboardBody>
  </Dashboard>
)
