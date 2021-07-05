import {
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from '@fire-cms/components'
import { useFireCmsRouterLinkComponent } from '@fire-cms/router'
import { useFireCmsUserPublicProfile } from '@fire-cms/user'
import clsx from 'clsx'
import { format } from 'date-fns'
import sortby from 'lodash.sortby'
import type { VFC } from 'react'
import { useMemo } from 'react'
import { useFireCmsBlogBlogs } from '../../context'
import type { FireCmsBlogBlogModel } from '../../schema'

const BlogItem: VFC<{ blog: FireCmsBlogBlogModel }> = ({ blog }) => {
  const Link = useFireCmsRouterLinkComponent()
  const [createdBy] = useFireCmsUserPublicProfile(blog.createdBy)
  const [updatedBy] = useFireCmsUserPublicProfile(blog.updatedBy)

  return (
    <TableTr key={blog.id}>
      <TableTd className="font-medium">
        <Link
          className="text-indigo-600 hover:text-indigo-900"
          href={`/blogs/${blog.id}`}
        >
          {blog.title}
        </Link>
      </TableTd>

      <TableTd className="font-medium text-gray-900">
        {blog.body.slice(0, 30)}
      </TableTd>

      <TableTd className="text-sm text-gray-500">
        {blog.isPublic ? '公開中' : '非公開'}
      </TableTd>

      <TableTd className="text-sm text-gray-500">
        {format(blog.createdAt.toDate(), 'yyyy-MM-dd')}
      </TableTd>

      <TableTd className="text-sm text-gray-500">
        <Link
          className="text-indigo-600 hover:text-indigo-900"
          href={`/users/${blog.createdBy}`}
        >
          {createdBy?.name ?? 'unknown'}
        </Link>
      </TableTd>

      <TableTd className="text-sm text-gray-500">
        <Link
          className="text-indigo-600 hover:text-indigo-900"
          href={`/users/${blog.updatedBy}`}
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

export const BlogList = ({ className }: BlogListProps): JSX.Element => {
  const blogs = useFireCmsBlogBlogs()

  const sortedBlogs = useMemo(
    () => sortby(blogs, (blog) => -blog.createdAt.seconds),
    [blogs],
  )

  return (
    <div className={clsx([className])}>
      <Table>
        <TableThead>
          <TableTr>
            <TableTh className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              タイトル
            </TableTh>

            <TableTh className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              内容
            </TableTh>

            <TableTh className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              公開設定
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
          {sortedBlogs.map((blog) => (
            <BlogItem blog={blog} key={blog.id} />
          ))}
        </TableTbody>
      </Table>
    </div>
  )
}
