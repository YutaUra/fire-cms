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
import { useFireCmsContentContents } from '../../context'
import type { FireCmsContentContentModel } from '../../schema'

const ContentItem: VFC<{ content: FireCmsContentContentModel }> = ({
  content,
}) => {
  const Link = useFireCmsRouterLinkComponent()
  const [createdBy] = useFireCmsUserProfilePublicProfile(content.createdBy)
  const [updatedBy] = useFireCmsUserProfilePublicProfile(content.updatedBy)

  return (
    <TableTr>
      <TableTd className="font-medium">
        <Link
          className="text-indigo-600 hover:text-indigo-900"
          href={`/contents/${content.id}`}
        >
          {content.name}
        </Link>
      </TableTd>

      <TableTd className="flex flex-wrap text-sm text-gray-500">
        {content.fields.map((field) => (
          <span
            className="inline-block py-1 px-2 mt-1 ml-1 font-mono rounded-full border border-gray-400"
            key={field.id}
          >
            {field.name}
          </span>
        ))}
      </TableTd>

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
}

export const ContentList: VFC<BlogListProps> = ({ className }): JSX.Element => {
  const contents = useFireCmsContentContents()

  const sortedContents = useMemo(
    () => sortby(contents, (content) => -content.createdAt.seconds),
    [contents],
  )

  return (
    <div className={clsx([className])}>
      <Table>
        <TableThead>
          <TableTr>
            <TableTh className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              名前
            </TableTh>

            <TableTh className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              項目
            </TableTh>

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
          {sortedContents.map((content) => (
            <ContentItem content={content} key={content.id} />
          ))}
        </TableTbody>
      </Table>

      {sortedContents.length === 0 && (
        <div className="flex justify-center items-center h-32">
          コンテンツはありません。新たに作成しましょう。
        </div>
      )}
    </div>
  )
}
