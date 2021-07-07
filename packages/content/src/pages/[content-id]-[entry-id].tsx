import { Dashboard, DashboardBodyHeader } from '@fire-cms/components'
import { FireCmsLoginRequired } from '@fire-cms/layout'
import { FireCmsPermissionRequied } from '@fire-cms/permission'
import type { VFC } from 'react'
import { ContentIdEntryIdMain } from '../components/pages/[content-id]-[entry-id]'
import {
  FireCmsContentFetchContentsEffect,
  FireCmsContentFetchEntriesEffect,
} from '../effect'

interface ContentIdEntryIdProps {
  contentId: string
  entryId: string
}

export const ContentIdEntryId: VFC<ContentIdEntryIdProps> = ({
  contentId,
  entryId,
}) => (
  <Dashboard>
    <DashboardBodyHeader />

    <FireCmsLoginRequired>
      <FireCmsPermissionRequied>
        <FireCmsContentFetchContentsEffect />

        <FireCmsContentFetchEntriesEffect contentId={contentId} />

        <ContentIdEntryIdMain contentId={contentId} entryId={entryId} />
      </FireCmsPermissionRequied>
    </FireCmsLoginRequired>
  </Dashboard>
)
