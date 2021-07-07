import { Dashboard, DashboardBodyHeader } from '@fire-cms/components'
import { FireCmsLoginRequired } from '@fire-cms/layout'
import { FireCmsPermissionRequied } from '@fire-cms/permission'
import type { VFC } from 'react'
import { ContentIdAddMain } from '../components/pages/[content-id]-add'
import {
  FireCmsContentFetchContentsEffect,
  FireCmsContentFetchEntriesEffect,
} from '../effect'

interface ContentIdAddProps {
  contentId: string
}

export const ContentIdAdd: VFC<ContentIdAddProps> = ({ contentId }) => (
  <Dashboard>
    <DashboardBodyHeader />

    <FireCmsLoginRequired>
      <FireCmsPermissionRequied>
        <FireCmsContentFetchContentsEffect />

        <FireCmsContentFetchEntriesEffect contentId={contentId} />

        <ContentIdAddMain contentId={contentId} />
      </FireCmsPermissionRequied>
    </FireCmsLoginRequired>
  </Dashboard>
)
