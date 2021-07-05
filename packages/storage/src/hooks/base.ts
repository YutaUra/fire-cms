import { useFireCmsAuthUser } from '@fire-cms/auth'
import { useFirebaseApp } from '@fire-cms/firebase-config'
import type {
  StorageReference,
  StorageService,
  UploadMetadata,
  UploadResult,
  UploadTask,
} from 'firebase/storage'
import {
  getStorage,
  uploadBytes,
  uploadBytesResumable,
  uploadString,
} from 'firebase/storage'
import { useCallback, useMemo } from 'react'

export const useFireCmsStorage = (): StorageService => {
  const app = useFirebaseApp()
  const storage = getStorage(app)
  return storage
}

export const useFireCmsStorageUpload = (): {
  uploadBytes: (
    storageReference: StorageReference,
    data: ArrayBuffer | Blob | Uint8Array,
    metadata?: UploadMetadata,
  ) => Promise<UploadResult>
  uploadBytesResumable: (
    storageReference: StorageReference,
    data: ArrayBuffer | Blob | Uint8Array,
    metadata?: UploadMetadata,
  ) => UploadTask
  uploadString: (
    storageReference: StorageReference,
    value: string,
    format?: string | undefined,
    metadata?: UploadMetadata,
  ) => Promise<UploadResult>
} => {
  const user = useFireCmsAuthUser()

  const customMetadata = useMemo<Record<string, string>>(() => {
    if (user?.uid) {
      return {
        uploadedBy: user.uid,
      }
    }
    return {} as Record<string, string>
  }, [user?.uid])

  const fireCmsStorageUploadString = useCallback(
    async (
      storageReference: StorageReference,
      value: string,
      format?: string,
      metadata: UploadMetadata = {},
      // eslint-disable-next-line max-params
    ) =>
      uploadString(storageReference, value, format, {
        ...metadata,
        customMetadata: {
          ...metadata.customMetadata,
          ...customMetadata,
        },
      }),
    [customMetadata],
  )

  const fireCmsStorageUploadBytes = useCallback(
    async (
      storageReference: StorageReference,
      data: ArrayBuffer | Blob | Uint8Array,
      metadata: UploadMetadata = {},
    ) =>
      uploadBytes(storageReference, data, {
        ...metadata,
        customMetadata: {
          ...metadata.customMetadata,
          ...customMetadata,
        },
      }),
    [customMetadata],
  )

  const fireCmsStorageUploadBytesResumable = useCallback(
    (
      storageReference: StorageReference,
      data: ArrayBuffer | Blob | Uint8Array,
      metadata: UploadMetadata = {},
    ) =>
      uploadBytesResumable(storageReference, data, {
        ...metadata,
        customMetadata: {
          ...metadata.customMetadata,
          ...customMetadata,
        },
      }),
    [customMetadata],
  )

  return {
    uploadBytes: fireCmsStorageUploadBytes,
    uploadBytesResumable: fireCmsStorageUploadBytesResumable,
    uploadString: fireCmsStorageUploadString,
  }
}
