import {
  Breadcrumbs,
  BreadcrumbsLink,
  DashboardBodyContent,
  DashboardBodyMain,
  DashboardBodyTitle,
} from '@fire-cms/components'
import { useFireCmsRouterPush } from '@fire-cms/router'
import type { VFC } from 'react'
import { useCallback, useMemo } from 'react'
import {
  useFireCmsContentContents,
  useFireCmsContentContentsIsInitialized,
} from '../../context'
import { useFireCmsContentEntry } from '../../hooks/entry'
import type { EntryFormField } from '../forms/EntryForm'
import { EntryForm } from '../forms/EntryForm'

interface ContentIdAddMainProps {
  contentId: string
}

export const ContentIdAddMain: VFC<ContentIdAddMainProps> = ({ contentId }) => {
  const contents = useFireCmsContentContents()
  const isInitialized = useFireCmsContentContentsIsInitialized()
  const push = useFireCmsRouterPush()

  const { addEntry } = useFireCmsContentEntry(contentId)

  const content = useMemo(
    () => contents.find((value) => value.id === contentId),
    [contentId, contents],
  )

  const handleSubmit = useCallback(
    async (data: EntryFormField) => {
      const res = await addEntry({ fields: data })
      push(`/contents/${contentId}/${res.id}`)
    },
    [addEntry, contentId, push],
  )

  if (!isInitialized || !content) {
    if (isInitialized) {
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

            <BreadcrumbsLink href={`/contents/${contentId}/add`}>
              作成
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

          <BreadcrumbsLink href={`/contents/${contentId}/add`}>
            作成
          </BreadcrumbsLink>
        </Breadcrumbs>
      </DashboardBodyTitle>

      <DashboardBodyContent>
        <EntryForm content={content} onSubmit={handleSubmit} />
      </DashboardBodyContent>
    </DashboardBodyMain>
  )
}
