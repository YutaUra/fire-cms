import { Dashboard, DashboardBodyHeader } from '@fire-cms/components'
import { FireCmsLoginRequired } from '@fire-cms/layout'
import { FireCmsPermissionRequied } from '@fire-cms/permission'
import type { VFC } from 'react'
import { ContentIdEditMain } from '../components/pages/[content-id]-edit'
import {
  FireCmsContentFetchContentsEffect,
  FireCmsContentFetchEntriesEffect,
} from '../effect'

interface ContentIdEditProps {
  contentId: string
}

export const ContentIdEdit: VFC<ContentIdEditProps> = ({ contentId }) => (
  <Dashboard>
    <DashboardBodyHeader />

    <FireCmsLoginRequired>
      <FireCmsPermissionRequied>
        <FireCmsContentFetchContentsEffect />

        <FireCmsContentFetchEntriesEffect contentId={contentId} />

        <ContentIdEditMain contentId={contentId} />
      </FireCmsPermissionRequied>
    </FireCmsLoginRequired>
  </Dashboard>
)
