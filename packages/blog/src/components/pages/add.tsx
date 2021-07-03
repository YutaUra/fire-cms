import { useFireCmsAuthUser } from '@fire-cms/auth'
import {
  Breadcrumbs,
  BreadcrumbsLink,
  DashboardBodyContent,
  DashboardBodyMain,
  DashboardBodyTitle,
} from '@fire-cms/components'
import { useFireCmsFirestore } from '@fire-cms/firebase-firestore'
import { toast } from '@fire-cms/toast'
import { FirebaseError } from '@firebase/util'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useCallback } from 'react'
import { BLOGS_COLLECTION } from '../../const'
import type { BlogFormField } from '../forms/BlogForm'
import { BlogForm } from '../forms/BlogForm'

export const BlogAddMain = (): JSX.Element => {
  const db = useFireCmsFirestore()
  const user = useFireCmsAuthUser()

  const handleSubmit = useCallback(
    async (data: BlogFormField) => {
      if (!user) return
      const blogsRef = collection(db, BLOGS_COLLECTION)
      try {
        await addDoc(blogsRef, {
          ...data,
          createdAt: serverTimestamp(),
          createdBy: user.uid,
          updatedAt: serverTimestamp(),
          updatedBy: user.uid,
        })
        toast.success('ブログを作成しました')
      } catch (err: unknown) {
        console.error(err)
        if (err instanceof FirebaseError) {
          switch (err.code) {
            case 'permission-denied':
              toast.error('ブログを作成する権限がなく、作成できせんでした')
              break
            default:
              toast.error('ブログを作成できせんでした')
          }
        } else {
          toast.error('ブログを作成できせんでした')
        }
      }
    },
    [db, user],
  )
  return (
    <DashboardBodyMain>
      <DashboardBodyTitle>
        <Breadcrumbs>
          <BreadcrumbsLink href="/blogs">ブログ</BreadcrumbsLink>

          <BreadcrumbsLink href="/blogs/add">作成</BreadcrumbsLink>
        </Breadcrumbs>
      </DashboardBodyTitle>

      <DashboardBodyContent>
        <BlogForm onSubmit={handleSubmit} />
      </DashboardBodyContent>
    </DashboardBodyMain>
  )
}
