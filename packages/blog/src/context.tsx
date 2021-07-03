import { createUseState } from '@fire-cms/react-utils'
import type { ReactNode } from 'react'
import { useCallback } from 'react'
import type { FireCmsBlogBlogModel } from './schema'

const {
  Provider: FireCmsBlogBlogsProvider,
  useSetValue: _useFireCmsBlogSetBlogs,
  useValue: useFireCmsBlogBlogs,
} = createUseState<FireCmsBlogBlogModel[]>([])
const {
  Provider: FireCmsBlogIsLoadingProvider,
  useSetValue: useFireCmsBlogSetIsLoading,
  useValue: useFireCmsBlogIsLoading,
} = createUseState<boolean>(false)
const {
  Provider: FireCmsBlogIsInitializedProvider,
  useSetValue: useFireCmsBlogSetIsInitialized,
  useValue: useFireCmsBlogIsInitialized,
} = createUseState<boolean>(false)

type Provider = (props: { children?: ReactNode }) => JSX.Element

export const FireCmsBlogProvider: Provider = ({ children }) => (
  <FireCmsBlogBlogsProvider>
    <FireCmsBlogIsLoadingProvider>
      <FireCmsBlogIsInitializedProvider>
        {children}
      </FireCmsBlogIsInitializedProvider>
    </FireCmsBlogIsLoadingProvider>
  </FireCmsBlogBlogsProvider>
)

export {
  useFireCmsBlogBlogs,
  useFireCmsBlogSetIsLoading,
  useFireCmsBlogIsLoading,
  useFireCmsBlogSetIsInitialized,
  useFireCmsBlogIsInitialized,
}

export const useFireCmsBlogSetBlogs = (): {
  addBlog: (blog: FireCmsBlogBlogModel) => void
  deleteAllBlogs: () => void
  deleteBlog: (blogId: string) => void
  replaceAllBlogs: (blogs: FireCmsBlogBlogModel[]) => void
  updateBlog: (newBlog: FireCmsBlogBlogModel) => void
} => {
  const setBlogs = _useFireCmsBlogSetBlogs()
  const replaceAllBlogs = useCallback(
    (blogs: FireCmsBlogBlogModel[]) => {
      setBlogs(blogs)
    },
    [setBlogs],
  )
  const deleteAllBlogs = useCallback(() => {
    setBlogs([])
  }, [setBlogs])

  const deleteBlog = useCallback(
    (blogId: string) => {
      setBlogs((blogs) => {
        const idx = blogs.findIndex((blog) => blog.id === blogId)
        if (idx > -1) {
          return [...blogs.slice(0, idx), ...blogs.slice(idx + 1)]
        }
        return blogs
      })
    },
    [setBlogs],
  )

  const addBlog = useCallback(
    (blog: FireCmsBlogBlogModel) => {
      setBlogs((blogs) => [...blogs, blog])
    },
    [setBlogs],
  )

  const updateBlog = useCallback(
    (newBlog: FireCmsBlogBlogModel) => {
      setBlogs((blogs) => {
        const idx = blogs.findIndex((blog) => blog.id === newBlog.id)
        if (idx > -1) {
          return [...blogs.slice(0, idx), newBlog, ...blogs.slice(idx + 1)]
        }
        return blogs
      })
    },
    [setBlogs],
  )

  return {
    addBlog,
    deleteAllBlogs,
    deleteBlog,
    replaceAllBlogs,
    updateBlog,
  }
}
