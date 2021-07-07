import {
  Breadcrumbs,
  BreadcrumbsLink,
  DashboardBodyContent,
  DashboardBodyMain,
  DashboardBodyTitle,
} from '@fire-cms/components'
import { useFireCmsRouterLinkComponent } from '@fire-cms/router'
import { ContentList } from '../organizations/ContentList'

export const ContentIndexMain = (): JSX.Element => {
  const Link = useFireCmsRouterLinkComponent()
  return (
    <DashboardBodyMain>
      <DashboardBodyTitle>
        <Breadcrumbs>
          <BreadcrumbsLink href="/contents">コンテンツ</BreadcrumbsLink>
        </Breadcrumbs>
      </DashboardBodyTitle>

      <DashboardBodyContent>
        <div className="mb-4">
          <Link
            className="py-2 px-4 ml-auto text-blue-500 hover:text-blue-300 rounded-md border border-gray-300"
            href="/contents/add"
            role="button"
          >
            新しく追加
          </Link>
        </div>

        <ContentList />
      </DashboardBodyContent>
    </DashboardBodyMain>
  )
}
