import { useFireCmsFirestore } from '@fire-cms/firebase-firestore'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { useCallback } from 'react'
import { BLOGS_COLLECTION } from '../const'
import type { FireCmsBlogBlogModel } from '../schema'
import { FireCmsBlogBlogSchema } from '../schema'

export const useFireCmsBlog = (): {
  fetchPublicBlogs: () => Promise<FireCmsBlogBlogModel[]>
  fetchAllBlogs: () => Promise<FireCmsBlogBlogModel[]>
  fetchBlog: (blogId: string) => Promise<FireCmsBlogBlogModel>
} => {
  const db = useFireCmsFirestore()

  const fetchPublicBlogs = useCallback(async () => {
    const { docs } = await getDocs(
      query(collection(db, BLOGS_COLLECTION), where('isPublic', '==', true)),
    )
    const blogs = docs
      .map((docSs) => ({ id: docSs.id, ...docSs.data() }))
      .filter((data) => {
        const parse = FireCmsBlogBlogSchema.safeParse(data)
        if (parse.success) return true
        // eslint-disable-next-line no-warning-comments
        // TODO: Error Handle
        return false
      })
      .map((data) => FireCmsBlogBlogSchema.parse(data))
    return blogs
  }, [db])

  const fetchAllBlogs = useCallback(async () => {
    const { docs } = await getDocs(query(collection(db, BLOGS_COLLECTION)))
    const blogs = docs
      .map((docSs) => ({ id: docSs.id, ...docSs.data() }))
      .filter((data) => {
        const parse = FireCmsBlogBlogSchema.safeParse(data)
        if (parse.success) return true
        // eslint-disable-next-line no-warning-comments
        // TODO: Error Handle
        return false
      })
      .map((data) => FireCmsBlogBlogSchema.parse(data))
    return blogs
  }, [db])

  const fetchBlog = useCallback(
    async (blogId: string) => {
      const ss = await getDoc(doc(db, BLOGS_COLLECTION, blogId))
      const parse = FireCmsBlogBlogSchema.safeParse({ ...ss.data(), id: ss.id })
      if (parse.success) return parse.data
      throw Error('blog schema not match')
    },
    [db],
  )

  return {
    fetchAllBlogs,
    fetchBlog,
    fetchPublicBlogs,
  }
}
