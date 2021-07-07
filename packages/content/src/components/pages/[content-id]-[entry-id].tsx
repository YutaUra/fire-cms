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
  useFireCmsContentEntries,
  useFireCmsContentEntriesIsInitialized,
} from '../../context'
import { useFireCmsContentEntry } from '../../hooks/entry'
import type { EntryFormField } from '../forms/EntryForm'
import { EntryForm } from '../forms/EntryForm'

interface ContentIdEntryIdMainProps {
  contentId: string
  entryId: string
}

export const ContentIdEntryIdMain: VFC<ContentIdEntryIdMainProps> = ({
  contentId,
  entryId,
}) => {
  const contents = useFireCmsContentContents()
  const contentIsInitialized = useFireCmsContentContentsIsInitialized()
  const entries = useFireCmsContentEntries(contentId)
  const entryIsInitialized = useFireCmsContentEntriesIsInitialized(contentId)
  const push = useFireCmsRouterPush()

  const content = useMemo(
    () => contents.find((value) => value.id === contentId),
    [contentId, contents],
  )
  const entry = useMemo(
    () => entries?.find((value) => value.id === entryId),
    [entries, entryId],
  )

  const primaryField = useMemo(
    () =>
      content?.fields.find((field) => field.id === content.primaryFieldId) ??
      content?.fields[0],
    [content?.fields, content?.primaryFieldId],
  )

  const { updateEntry, deleteEntry } = useFireCmsContentEntry(contentId)

  const handleSubmit = useCallback(
    async (data: EntryFormField) => {
      try {
        await updateEntry(entryId, {
          fields: data,
        })
        toast.success('エントリーを更新しました')
      } catch {
        toast.error('エントリーを更新できませんでした')
      }
    },
    [entryId, updateEntry],
  )

  const handleDelete = useCallback(async () => {
    try {
      await deleteEntry(entryId)
      toast.success('エントリーを削除しました')
    } catch {
      toast.error('エントリーを削除できませんでした')
    }
  }, [deleteEntry, entryId])

  if (
    !contentIsInitialized ||
    !entryIsInitialized ||
    !content ||
    !primaryField ||
    typeof entry === 'undefined'
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

            <BreadcrumbsLink href={`/contents/${contentId}/${entryId}`}>
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

          <BreadcrumbsLink href={`/contents/${contentId}/${entryId}`}>
            {entry.fields[primaryField.id]}
          </BreadcrumbsLink>
        </Breadcrumbs>
      </DashboardBodyTitle>

      <DashboardBodyContent>
        <EntryForm
          content={content}
          defaultValues={entry.fields}
          onDelete={handleDelete}
          onSubmit={handleSubmit}
        />
      </DashboardBodyContent>
    </DashboardBodyMain>
  )
}
