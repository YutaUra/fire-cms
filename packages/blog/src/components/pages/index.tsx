import {
  Breadcrumbs,
  BreadcrumbsLink,
  DashboardBodyContent,
  DashboardBodyMain,
  DashboardBodyTitle,
} from '@fire-cms/components'
import { useFireCmsRouterLinkComponent } from '@fire-cms/router'
import { BlogList } from '../organizations/BlogList'

export const BlogIndexMain = (): JSX.Element => {
  const Link = useFireCmsRouterLinkComponent()
  return (
    <DashboardBodyMain>
      <DashboardBodyTitle>
        <Breadcrumbs>
          <BreadcrumbsLink href="/blogs">ブログ</BreadcrumbsLink>
        </Breadcrumbs>
      </DashboardBodyTitle>

      <DashboardBodyContent>
        <div className="mb-4">
          <Link
            className="py-2 px-4 ml-auto text-blue-500 hover:text-blue-300 rounded-md border border-gray-300"
            href="/blogs/add"
            role="button"
          >
            新しく追加
          </Link>
        </div>

        <BlogList />
      </DashboardBodyContent>
    </DashboardBodyMain>
  )
}
