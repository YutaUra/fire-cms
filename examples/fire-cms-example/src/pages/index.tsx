import { FireCmsBlogBlogModel, useFireCmsBlog } from '@fire-cms/blog'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'

const IndexEntry = () => {
  const { fetchPublicBlogs } = useFireCmsBlog()
  const [blogs, setBlogs] = useState<FireCmsBlogBlogModel[]>([])

  useEffect(() => {
    fetchPublicBlogs().then(setBlogs)
  }, [fetchPublicBlogs, setBlogs])

  useEffect(() => {
    console.log(blogs)
  }, [blogs])

  return (
    <div>
      <h1>普通のページです</h1>
      <NextLink href="/admin">
        <a>管理ページ</a>
      </NextLink>
    </div>
  )
}
export default IndexEntry
