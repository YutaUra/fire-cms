import {
  Dashboard,
  DashboardBody,
  DashboardBodyHeader,
} from '@fire-cms/components'
import { FireCmsLoginRequired } from '@fire-cms/layout'
import { FireCmsPermissionRequied } from '@fire-cms/permission'
import { BlogIndexMain } from '../components/pages/index'
import { FetchBlogs } from '../effect'

export const BlogIndex = (): JSX.Element => (
  <Dashboard>
    <DashboardBody>
      <DashboardBodyHeader />

      <FireCmsLoginRequired>
        <FireCmsPermissionRequied>
          <FetchBlogs />

          <BlogIndexMain />
        </FireCmsPermissionRequied>
      </FireCmsLoginRequired>
    </DashboardBody>
  </Dashboard>
)
