import { Dashboard, DashboardBodyHeader } from '@fire-cms/components'
import { FireCmsLoginRequired } from '@fire-cms/layout'
import { FireCmsPermissionRequied } from '@fire-cms/permission'
import { BlogAddMain } from '../components/pages/add'
import { FetchBlogs } from '../effect'

export const BlogAdd = (): JSX.Element => (
  <Dashboard>
    <DashboardBodyHeader />

    <FireCmsLoginRequired>
      <FireCmsPermissionRequied>
        <FetchBlogs />

        <BlogAddMain />
      </FireCmsPermissionRequied>
    </FireCmsLoginRequired>
  </Dashboard>
)
