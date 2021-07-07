import { Dashboard, DashboardBodyHeader } from '@fire-cms/components'
import { FireCmsLoginRequired } from '@fire-cms/layout'
import { FireCmsPermissionRequied } from '@fire-cms/permission'
import type { VFC } from 'react'
import { ContentIdMain } from '../components/pages/[content-id]'
import {
  FireCmsContentFetchContentsEffect,
  FireCmsContentFetchEntriesEffect,
} from '../effect'

interface ContentIdProps {
  contentId: string
}

export const ContentId: VFC<ContentIdProps> = ({ contentId }) => (
  <Dashboard>
    <DashboardBodyHeader />

    <FireCmsLoginRequired>
      <FireCmsPermissionRequied>
        <FireCmsContentFetchContentsEffect />

        <FireCmsContentFetchEntriesEffect contentId={contentId} />

        <ContentIdMain contentId={contentId} />
      </FireCmsPermissionRequied>
    </FireCmsLoginRequired>
  </Dashboard>
)
