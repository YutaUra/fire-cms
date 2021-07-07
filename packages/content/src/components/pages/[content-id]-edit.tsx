import {
  Breadcrumbs,
  BreadcrumbsLink,
  DashboardBodyContent,
  DashboardBodyMain,
  DashboardBodyTitle,
} from '@fire-cms/components'
import { useFireCmsRouterPush } from '@fire-cms/router'
import { toast } from '@fire-cms/toast'
import type { VFC } from 'react'
import { useCallback, useMemo } from 'react'
import {
  useFireCmsContentContents,
  useFireCmsContentContentsIsInitialized,
} from '../../context'
import { useFireCmsContentContent } from '../../hooks'
import type { ContentFormField } from '../forms/ContentForm'
import { ContentForm } from '../forms/ContentForm'

interface ContentIdEditMainProps {
  contentId: string
}

export const ContentIdEditMain: VFC<ContentIdEditMainProps> = ({
  contentId,
}) => {
  const contents = useFireCmsContentContents()
  const isInitialized = useFireCmsContentContentsIsInitialized()
  const push = useFireCmsRouterPush()
  const { updateContent, deleteContent } = useFireCmsContentContent()

  const content = useMemo(
    () => contents.find((value) => value.id === contentId),
    [contentId, contents],
  )

  const handleSubmit = useCallback(
    async (data: ContentFormField) => {
      console.debug('SUBMIT', data)
      try {
        await updateContent(contentId, data)
        toast.success('コンテンツを更新しました')
      } catch {
        toast.error('コンテンツを更新できませんでした')
      }
    },
    [contentId, updateContent],
  )

  const handleDelete = useCallback(async () => {
    try {
      await deleteContent(contentId)
      toast.success('コンテンツを削除しました')
    } catch {
      toast.error('コンテンツを削除できませんでした')
    }
  }, [contentId, deleteContent])

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

          <BreadcrumbsLink href={`/contents/${contentId}/edit`}>
            編集
          </BreadcrumbsLink>
        </Breadcrumbs>
      </DashboardBodyTitle>

      <DashboardBodyContent>
        <p className="mb-4 text-red-600">
          項目を変更するとそのデータに依存していた部分が機能しなくなる可能性があります。
        </p>

        <ContentForm
          defaultValues={{
            fields: content.fields,
            name: content.name,
            primaryFieldId: content.primaryFieldId,
          }}
          onDelete={handleDelete}
          onSubmit={handleSubmit}
        />
      </DashboardBodyContent>
    </DashboardBodyMain>
  )
}
