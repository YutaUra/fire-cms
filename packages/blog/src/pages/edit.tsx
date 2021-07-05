import { Dashboard, DashboardBodyHeader } from '@fire-cms/components'
import { FireCmsLoginRequired } from '@fire-cms/layout'
import { FireCmsPermissionRequied } from '@fire-cms/permission'
import { BlogEditMain } from '../components/pages/edit'
import { FetchBlogs } from '../effect'

interface BlogEditProps {
  blogId: string
}

export const BlogEdit = ({ blogId }: BlogEditProps): JSX.Element => (
  <Dashboard>
    <DashboardBodyHeader />

    <FireCmsLoginRequired>
      <FireCmsPermissionRequied>
        <FetchBlogs />

        <BlogEditMain blogId={blogId} />
      </FireCmsPermissionRequied>
    </FireCmsLoginRequired>
  </Dashboard>
)
