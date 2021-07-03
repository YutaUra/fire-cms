import { useFirebaseApp } from '@fire-cms/firebase-config'
import type { StorageReference, StorageService } from 'firebase/storage'
import { getStorage, listAll, ref, uploadString } from 'firebase/storage'
import { join } from 'path'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FIRECMS_STORAGE } from '../const'

export const useFireCmsStorage = (): StorageService => {
  const app = useFirebaseApp()
  const storage = getStorage(app)
  return storage
}

export const useStorageRef = (url: string): StorageReference => {
  const storage = useFireCmsStorage()
  const storageRef = useMemo(
    () => ref(storage, join(FIRECMS_STORAGE, url)),
    [storage, url],
  )
  return storageRef
}

export const useCreateStorageRef = (): ((path: string) => StorageReference) => {
  const storage = useFireCmsStorage()
  const createStorageRef = useCallback(
    (path: string) => ref(storage, join(FIRECMS_STORAGE, path)),
    [storage],
  )
  return createStorageRef
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

  const createFolder = useCallback(
    async (path: string, folderName: string) => {
      const storageRef = createStorageRef(join(path, folderName, '.keep'))
      await uploadString(storageRef, 'keep')
    },
    [createStorageRef],
  )

  return createFolder
}

export const useFileDownloadUrl = (path: string): string => {
  const app = useFirebaseApp()

  const fixedPath = useMemo(() => {
    const path1 = path.startsWith('/') ? path.slice(1) : path
    const path2 = path1.startsWith(FIRECMS_STORAGE)
      ? path1
      : `${FIRECMS_STORAGE}/${path1}`
    return path2
  }, [path])

  const url = useMemo(
    () =>
      `https://firebasestorage.googleapis.com/v0/b/${
        app.options.storageBucket
      }/o/${encodeURIComponent(fixedPath)}?alt=media`,
    [app.options.storageBucket, fixedPath],
  )
  return url
}
