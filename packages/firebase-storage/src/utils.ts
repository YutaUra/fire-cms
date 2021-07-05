import { useFirebaseApp } from '@fire-cms/firebase-config'
import type { StorageReference } from 'firebase/storage'
import { listAll, ref } from 'firebase/storage'
import { join } from 'path'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FIRECMS_STORAGE } from './const'
import { useFireCmsStorage, useFireCmsStorageUpload } from './hooks'

export const useCreateStorageRef = (): ((path: string) => StorageReference) => {
  const storage = useFireCmsStorage()
  const createStorageRef = useCallback(
    (path: string) => ref(storage, join(FIRECMS_STORAGE, path)),
    [storage],
  )
  return createStorageRef
}

export const useStorageRef = (url: string): StorageReference => {
  const createStorageRef = useCreateStorageRef()
  const storageRef = useMemo(
    () => createStorageRef(url),
    [createStorageRef, url],
  )
  return storageRef
}

export const useStorageFiles = (
  path: string,
): {
  items: StorageReference[]
  prefixes: StorageReference[]
  reload: () => Promise<void>
  isLoading: boolean
} => {
  const storageRef = useStorageRef(path)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<{
    items: StorageReference[]
    prefixes: StorageReference[]
  }>({ items: [], prefixes: [] })

  const reload = useCallback(async () => {
    setIsLoading(true)
    try {
      const { items, prefixes } = await listAll(storageRef)
      setData({
        items: items.filter((item) => item.name !== '.keep'),
        prefixes,
      })
    } finally {
      setIsLoading(false)
    }
  }, [storageRef])

  useEffect(() => {
    void reload()
  }, [reload])

  return { ...data, isLoading, reload }
}

export const useCreateFolder = (): ((
  path: string,
  name: string,
) => Promise<void>) => {
  const createStorageRef = useCreateStorageRef()

  const { uploadString } = useFireCmsStorageUpload()

  const createFolder = useCallback(
    async (path: string, folderName: string) => {
      const storageRef = createStorageRef(join(path, folderName, '.keep'))
      await uploadString(storageRef, 'keep')
    },
    [createStorageRef, uploadString],
  )

  return createFolder
}

export const useCreateFileDownloadUrl = (): ((path: string) => string) => {
  const app = useFirebaseApp()

  const createFileDownloadUrl = useCallback(
    (path: string) => {
      const path1 = path.startsWith('/') ? path.slice(1) : path
      const path2 = path1.startsWith(FIRECMS_STORAGE)
        ? path1
        : `${FIRECMS_STORAGE}/${path1}`
      return `https://firebasestorage.googleapis.com/v0/b/${
        app.options.storageBucket
      }/o/${encodeURIComponent(path2)}?alt=media`
    },
    [app.options.storageBucket],
  )

  return createFileDownloadUrl
}

export const useFileDownloadUrl = (path: string): string => {
  const createFileDownloadUrl = useCreateFileDownloadUrl()
  const url = useMemo(
    () => createFileDownloadUrl(path),
    [createFileDownloadUrl, path],
  )
  return url
}
