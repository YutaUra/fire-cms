import {
  Breadcrumbs,
  BreadcrumbsLink,
  DashboardBodyContent,
  DashboardBodyMain,
  DashboardBodyTitle,
} from '@fire-cms/components'
import {
  useFireCmsRouterLinkComponent,
  useFireCmsRouterPush,
} from '@fire-cms/router'
import type { VFC } from 'react'
import { useMemo } from 'react'
import {
  useFireCmsContentContents,
  useFireCmsContentContentsIsInitialized,
  useFireCmsContentEntries,
  useFireCmsContentEntriesIsInitialized,
} from '../../context'
import { EntryList } from '../organizations/EntryList'

interface ContentIdMainProps {
  contentId: string
}

export const ContentIdMain: VFC<ContentIdMainProps> = ({ contentId }) => {
  const contents = useFireCmsContentContents()
  const contentIsInitialized = useFireCmsContentContentsIsInitialized()
  const entries = useFireCmsContentEntries(contentId)
  const entryIsInitialized = useFireCmsContentEntriesIsInitialized(contentId)

  const content = useMemo(
    () => contents.find((value) => value.id === contentId),
    [contentId, contents],
  )
  const Link = useFireCmsRouterLinkComponent()
  const push = useFireCmsRouterPush()

  if (
    !contentIsInitialized ||
    !entryIsInitialized ||
    !content ||
    typeof entries === 'undefined'
  ) {
    if (contentIsInitialized && entryIsInitialized) {
      push(`/contents`)
    }
    return (
      <DashboardBodyMain>
        <DashboardBodyTitle>
          <Breadcrumbs>
            <BreadcrumbsLink href="/contents">コンテンツ</BreadcrumbsLink>

            <BreadcrumbsLink href={`/contents/${contentId}`}>
              読み込み中
            </BreadcrumbsLink>
          </Breadcrumbs>
        </DashboardBodyTitle>

        <DashboardBodyContent>読み込み中...</DashboardBodyContent>
      </DashboardBodyMain>
    )
  }

  return (
    <DashboardBodyMain>
      <DashboardBodyTitle>
        <Breadcrumbs>
          <BreadcrumbsLink href="/contents">コンテンツ</BreadcrumbsLink>

          <BreadcrumbsLink href={`/contents/${contentId}`}>
            {content.name}
          </BreadcrumbsLink>
        </Breadcrumbs>
      </DashboardBodyTitle>

      <DashboardBodyContent>
        <div className="mb-4 space-x-4">
          <Link
            className="py-2 px-4 ml-auto text-blue-500 hover:text-blue-300 rounded-md border border-gray-300"
            href={`/contents/${contentId}/edit`}
            role="button"
          >
            編集
          </Link>

          <Link
            className="py-2 px-4 ml-auto text-blue-500 hover:text-blue-300 rounded-md border border-gray-300"
            href={`/contents/${contentId}/add`}
            role="button"
          >
            エントリーを作成
          </Link>
        </div>

        <EntryList content={content} entries={entries} />
      </DashboardBodyContent>
    </DashboardBodyMain>
  )
}
