import { useFireCmsAuthUser } from '@fire-cms/auth'
import {
  Breadcrumbs,
  BreadcrumbsLink,
  DashboardBodyContent,
  DashboardBodyMain,
  DashboardBodyTitle,
} from '@fire-cms/components'
import { useFireCmsFirestore } from '@fire-cms/firebase-firestore'
import { useFireCmsRouterPush } from '@fire-cms/router'
import { toast } from '@fire-cms/toast'
import { deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { useCallback, useMemo } from 'react'
import { BLOGS_COLLECTION } from '../../const'
import {
  useFireCmsBlogBlogs,
  useFireCmsBlogIsInitialized,
  useFireCmsBlogSetBlogs,
} from '../../context'
import type { BlogFormField } from '../forms/BlogForm'
import { BlogForm } from '../forms/BlogForm'

interface BlogEditMainProps {
  blogId: string
}

export const BlogEditMain = ({
  blogId,
}: BlogEditMainProps): JSX.Element | null => {
  const blogs = useFireCmsBlogBlogs()
  const push = useFireCmsRouterPush()
  const blog = useMemo(
    () => blogs.find((obj) => obj.id === blogId),
    [blogId, blogs],
  )
  const db = useFireCmsFirestore()
  const user = useFireCmsAuthUser()
  const { updateBlog, deleteBlog } = useFireCmsBlogSetBlogs()
  const isInitialized = useFireCmsBlogIsInitialized()

  const handleSubmit = useCallback(
    async (data: BlogFormField) => {
      if (!blog || !user) return
      try {
        await updateDoc(doc(db, BLOGS_COLLECTION, blog.id), {
          ...data,
          updatedAt: serverTimestamp(),
          updatedBy: user.uid,
        })
        updateBlog({ ...blog, ...data })
        toast.success('更新に成功しました。')
      } catch {
        toast.error('更新できませんでした。')
      }
    },
    [blog, db, updateBlog, user],
  )

  const handleCancel = useCallback(() => {
    push('/blogs')
  }, [push])

  const handleDelete = useCallback(async () => {
    if (!blog) return
    try {
      await deleteDoc(doc(db, BLOGS_COLLECTION, blog.id))
      deleteBlog(blog.id)
      toast.success('削除に成功しました')
      push('/blogs')
    } catch {
      toast.error('削除できませんでした。')
    }
  }, [blog, db, deleteBlog, push])

  if (!isInitialized) {
    return null
  }

  if (!blog) {
    push('/blogs')
    return null
  }

  return (
    <DashboardBodyMain>
      <DashboardBodyTitle>
        <Breadcrumbs>
          <BreadcrumbsLink href="/blogs">ブログ</BreadcrumbsLink>

          <BreadcrumbsLink href={`/blogs/${blog.id}`}>
            {blog.title}
          </BreadcrumbsLink>
        </Breadcrumbs>
      </DashboardBodyTitle>

      <DashboardBodyContent>
        <BlogForm
          defaultValues={{
            body: blog.body,
            isPublic: blog.isPublic,
            title: blog.title,
          }}
          onCancel={handleCancel}
          onDelete={handleDelete}
          onSubmit={handleSubmit}
        />
      </DashboardBodyContent>
    </DashboardBodyMain>
  )
}
