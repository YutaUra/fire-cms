import {
  Breadcrumbs,
  BreadcrumbsLink,
  DashboardBodyContent,
  DashboardBodyMain,
  DashboardBodyTitle,
} from '@fire-cms/components'
import { useFireCmsRouterPush } from '@fire-cms/router'
import { toast } from '@fire-cms/toast'
import { useCallback } from 'react'
import { useFireCmsContentContent } from '../../hooks'
import type { ContentFormField } from '../forms/ContentForm'
import { ContentForm } from '../forms/ContentForm'

export const ContentAddMain = (): JSX.Element => {
  const { addContent } = useFireCmsContentContent()
  const push = useFireCmsRouterPush()

  const handleSubmit = useCallback(
    async (data: ContentFormField) => {
      try {
        const res = await addContent(data)
        push(`/contents/${res.id}`)
        toast.success('コンテンツを作成しました')
      } catch {
        toast.error('コンテンツを作成できませんでした')
      }
    },
    [addContent, push],
  )

  return (
    <DashboardBodyMain>
      <DashboardBodyTitle>
        <Breadcrumbs>
          <BreadcrumbsLink href="/contents">コンテンツ</BreadcrumbsLink>

          <BreadcrumbsLink href="/contents/add">作成</BreadcrumbsLink>
        </Breadcrumbs>
      </DashboardBodyTitle>

      <DashboardBodyContent>
        <ContentForm onSubmit={handleSubmit} />
      </DashboardBodyContent>
    </DashboardBodyMain>
  )
}
