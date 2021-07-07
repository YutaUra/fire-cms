import { useFireCmsFirestore } from '@fire-cms/firebase-firestore'
import { useFireCmsPermissionIsStaff } from '@fire-cms/permission'
import { toast } from '@fire-cms/toast'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect } from 'react'
import { BLOGS_COLLECTION } from './const'
import {
  useFireCmsBlogIsInitialized,
  useFireCmsBlogSetBlogs,
  useFireCmsBlogSetIsInitialized,
  useFireCmsBlogSetIsLoading,
} from './context'
import { FireCmsBlogBlogSchema } from './schema'

export const FetchBlogs = (): null => {
  const isStaff = useFireCmsPermissionIsStaff()
  const { replaceAllBlogs } = useFireCmsBlogSetBlogs()
  const setIsLoading = useFireCmsBlogSetIsLoading()
  const setIsInitialized = useFireCmsBlogSetIsInitialized()
  const isInitialized = useFireCmsBlogIsInitialized()
  const db = useFireCmsFirestore()

  useEffect(() => {
    if (!isStaff || isInitialized) return
    const main = async (): Promise<void> => {
      setIsLoading(true)
      try {
        const { docs } = await getDocs(collection(db, BLOGS_COLLECTION))
        const blogs = docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((data) => {
            const parse = FireCmsBlogBlogSchema.safeParse(data)
            if (parse.success) return true
            toast('Blogの中にスキーマに適さないものがあります。', {
              type: 'error',
            })
            return false
          })
          .map((data) => FireCmsBlogBlogSchema.parse(data))
        replaceAllBlogs(blogs)
      } finally {
        setIsInitialized(true)
        setIsLoading(false)
      }
    }
    void main()
  }, [
    db,
    isInitialized,
    isStaff,
    replaceAllBlogs,
    setIsInitialized,
    setIsLoading,
  ])
  return null
}
