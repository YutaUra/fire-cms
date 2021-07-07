import {
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from '@fire-cms/components'
import { useFireCmsRouterLinkComponent } from '@fire-cms/router'
import { useFireCmsUserProfilePublicProfile } from '@fire-cms/user-profile'
import clsx from 'clsx'
import { format } from 'date-fns'
import sortby from 'lodash.sortby'
import type { VFC } from 'react'
import { useMemo } from 'react'
import type {
  FireCmsContentContentModel,
  FireCmsContentEntryModel,
  FireCmsContentFieldModel,
} from '../../schema'

const EntryItem: VFC<{
  content: FireCmsContentContentModel
  entry: FireCmsContentEntryModel
}> = ({ content, entry }) => {
  const Link = useFireCmsRouterLinkComponent()
  const [createdBy] = useFireCmsUserProfilePublicProfile(content.createdBy)
  const [updatedBy] = useFireCmsUserProfilePublicProfile(content.updatedBy)

  const primaryField = useMemo<FireCmsContentFieldModel>(
    () =>
      content.fields.find((field) => field.id === content.primaryFieldId) ??
      content.fields[0],
    [content.fields, content.primaryFieldId],
  )
  const nonPrimaryFields = useMemo(
    () => content.fields.filter((field) => field.id !== primaryField.id),
    [content.fields, primaryField.id],
  )

  return (
    <TableTr>
      <TableTd className="font-medium">
        <Link
          className="text-indigo-600 hover:text-indigo-900"
          href={`/contents/${content.id}/${entry.id}`}
        >
          {`${entry.fields[primaryField.id]}`}
        </Link>
      </TableTd>

      {nonPrimaryFields.map((field) => (
        <TableTd className="text-sm text-gray-500" key={field.id}>
          <p className="overflow-hidden w-32 max-w-min overflow-ellipsis">
            {`${entry.fields[field.id]}`}
          </p>
        </TableTd>
      ))}

      <TableTd className="text-sm text-gray-500">
        {format(content.createdAt.toDate(), 'yyyy-MM-dd')}
      </TableTd>

      <TableTd className="text-sm text-gray-500">
        <Link
          className="text-indigo-600 hover:text-indigo-900"
          href={`/users/${content.createdBy}`}
        >
          {createdBy?.name ?? 'unknown'}
        </Link>
      </TableTd>

      <TableTd className="text-sm text-gray-500">
        <Link
          className="text-indigo-600 hover:text-indigo-900"
          href={`/users/${content.updatedBy}`}
        >
          {updatedBy?.name ?? 'unknown'}
        </Link>
      </TableTd>
    </TableTr>
  )
}

interface BlogListProps {
  className?: string
  content: FireCmsContentContentModel
  entries: FireCmsContentEntryModel[]
}

export const EntryList: VFC<BlogListProps> = ({
  className,
  content,
  entries,
}): JSX.Element => {
  const sortedEntries = useMemo(
    () => sortby(entries, (entry) => -entry.createdAt.seconds),
    [entries],
  )

  const primaryField = useMemo<FireCmsContentFieldModel>(
    () =>
      content.fields.find((field) => field.id === content.primaryFieldId) ??
      content.fields[0],
    [content.fields, content.primaryFieldId],
  )
  const nonPrimaryFields = useMemo(
    () => content.fields.filter((field) => field.id !== primaryField.id),
    [content.fields, primaryField.id],
  )

  return (
    <div className={clsx([className])}>
      <Table>
        <TableThead>
          <TableTr>
            <TableTh className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              {primaryField.name}
            </TableTh>

            {nonPrimaryFields.map((field) => (
              <TableTh
                className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                key={field.id}
              >
                {field.name}
              </TableTh>
            ))}

            <TableTh className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              作成日
            </TableTh>

            <TableTh className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              作成者
            </TableTh>

            <TableTh className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              更新者
            </TableTh>
          </TableTr>
        </TableThead>

        <TableTbody>
          {sortedEntries.map((entry) => (
            <EntryItem content={content} entry={entry} key={entry.id} />
          ))}
        </TableTbody>
      </Table>

      {sortedEntries.length === 0 && (
        <div className="flex justify-center items-center h-32">
          エントリーはありません。新たに作成しましょう。
        </div>
      )}
    </div>
  )
}
