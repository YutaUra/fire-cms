import { useEffect } from 'react'
import {
  useFireCmsContentContentsIsInitialized,
  useFireCmsContentEntriesIsInitialized,
  useFireCmsContentSetContents,
  useFireCmsContentSetContentsIsInitialized,
  useFireCmsContentSetContentsIsLoading,
  useFireCmsContentSetEntriesIsInitialized,
  useFireCmsContentSetEntriesIsLoading,
} from './context'
import { useFireCmsContentContent } from './hooks'
import { useFireCmsContentEntryClient } from './hooks/entry'

export const FireCmsContentFetchContentsEffect = (): null => {
  const setContents = useFireCmsContentSetContents()
  const setIsLoading = useFireCmsContentSetContentsIsLoading()
  const isInitialized = useFireCmsContentContentsIsInitialized()
  const setIsInitialized = useFireCmsContentSetContentsIsInitialized()

  const { fetchContents } = useFireCmsContentContent()

  useEffect(() => {
    if (isInitialized) return
    setIsLoading(true)
    fetchContents()
      .then((contents) => {
        setContents(contents)
      })
      .finally(() => {
        setIsLoading(false)
        setIsInitialized(true)
      })
  }, [
    fetchContents,
    isInitialized,
    setContents,
    setIsInitialized,
    setIsLoading,
  ])

  return null
}

export const FireCmsContentFetchEntriesEffect = ({
  contentId,
}: {
  contentId: string
}): null => {
  const isInitialized = useFireCmsContentEntriesIsInitialized(contentId)
  const setIsInitialized = useFireCmsContentSetEntriesIsInitialized(contentId)
  const setIsLoading = useFireCmsContentSetEntriesIsLoading(contentId)

  const { fetchEntries } = useFireCmsContentEntryClient(contentId)

  useEffect(() => {
    if (isInitialized) return
    setIsLoading(true)
    fetchEntries().finally(() => {
      setIsLoading(false)
      setIsInitialized(true)
    })
  }, [fetchEntries, isInitialized, setIsInitialized, setIsLoading])

  return null
}
