import {
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from '@fire-cms/components'
import { useFireCmsRouterLinkComponent } from '@fire-cms/router'
import clsx from 'clsx'
import { format } from 'date-fns'
import sortby from 'lodash.sortby'
import { useMemo } from 'react'
import { useFireCmsBlogBlogs } from '../../context'

interface BlogListProps {
  className?: string
}

export const BlogList = ({ className }: BlogListProps): JSX.Element => {
  const blogs = useFireCmsBlogBlogs()
  const Link = useFireCmsRouterLinkComponent()

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
          </TableTr>
        </TableThead>

        <TableTbody>
          {sortedBlogs.map((blog) => (
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
            </TableTr>
          ))}
        </TableTbody>
      </Table>
    </div>
  )
}
