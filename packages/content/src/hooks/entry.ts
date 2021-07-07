import { useFireCmsAuthUser } from '@fire-cms/auth'
import { useFireCmsFirestore } from '@fire-cms/firebase-firestore'
import type { UseArray } from '@fire-cms/react-utils'
import { useArray } from '@fire-cms/react-utils'
import { toast } from '@fire-cms/toast'
import type { DocumentReference } from 'firebase/firestore'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { useCallback } from 'react'
import { CONTENTS_COLLECTION, CONTENT_ENTRIES_COLLECTION } from '../const'
import { useFireCmsContentSetEntries as useFireCmsContentSetEntriesRaw } from '../context'
import type {
  FireCmsContentBaseEntryModel,
  FireCmsContentEntryModel,
} from '../schema'
import { FireCmsContentEntrySchema } from '../schema'

const isNotNull = <T>(value: T): value is Exclude<T, null> => value !== null

export const useFireCmsContentSetEntries = (
  contentId: string,
): UseArray<FireCmsContentEntryModel> => {
  const setMapEntry = useFireCmsContentSetEntriesRaw(contentId)
  return useArray(setMapEntry)
}

interface UseFireCmsContentEntryClient {
  fetchEntries: () => Promise<void>
}

export const useFireCmsContentEntryClient = (
  contentId: string,
): UseFireCmsContentEntryClient => {
  const db = useFireCmsFirestore()

  const { set } = useFireCmsContentSetEntries(contentId)

  const fetchEntries = useCallback(async () => {
    const { docs } = await getDocs(
      collection(
        db,
        CONTENTS_COLLECTION,
        contentId,
        CONTENT_ENTRIES_COLLECTION,
      ),
    )
    const entries = docs
      .map((docS) => {
        const parse = FireCmsContentEntrySchema.safeParse({
          id: docS.id,
          ...docS.data(),
        })
        if (parse.success) return parse.data
        toast.error('エントリーのスキーマが不正なものが存在します。')
        return null
      })
      .filter(isNotNull)
    set(entries)
  }, [contentId, db, set])

  return {
    fetchEntries,
  }
}

type UseFireCmsContentEntry = UseFireCmsContentEntryClient & {
  addEntry: (
    entry: FireCmsContentBaseEntryModel,
  ) => Promise<FireCmsContentEntryModel>
  deleteEntry: (id: string) => Promise<void>
  updateEntry: (
    id: string,
    entry: FireCmsContentBaseEntryModel,
  ) => Promise<void>
}

export const useFireCmsContentEntry = (
  contentId: string,
): UseFireCmsContentEntry => {
  const db = useFireCmsFirestore()
  const user = useFireCmsAuthUser()
  const client = useFireCmsContentEntryClient(contentId)

  const { appendElm, updateElm, deleteElm } =
    useFireCmsContentSetEntries(contentId)

  const fetchEntry = useCallback(async (docRef: DocumentReference) => {
    const entry = await getDoc(docRef)
    const parse = FireCmsContentEntrySchema.safeParse({
      id: entry.id,
      ...entry.data(),
    })
    if (parse.success) return parse.data
    toast.error('Entryの形式が不正です')
    throw parse.error
  }, [])

  const addEntry = useCallback(
    async (entry: FireCmsContentBaseEntryModel) => {
      if (!user) throw Error('You should Logged in')
      const data = {
        ...entry,
        createdAt: serverTimestamp(),
        createdBy: user.uid,
        updatedAt: serverTimestamp(),
        updatedBy: user.uid,
      }
      const ref = await addDoc(
        collection(
          db,
          CONTENTS_COLLECTION,
          contentId,
          CONTENT_ENTRIES_COLLECTION,
        ),
        data,
      )
      const value = await fetchEntry(ref)
      appendElm(value)
      return value
    },
    [appendElm, contentId, db, fetchEntry, user],
  )

  const updateEntry = useCallback(
    async (id: string, entry: FireCmsContentBaseEntryModel) => {
      if (!user) throw Error('You should logged in')
      const ref = doc(
        db,
        CONTENTS_COLLECTION,
        contentId,
        CONTENT_ENTRIES_COLLECTION,
        id,
      )
      await updateDoc(ref, {
        fields: entry.fields,
        updatedAt: serverTimestamp(),
        updatedBy: user.uid,
      })
      const value = await fetchEntry(ref)
      updateElm(value, (prev) =>
        prev.findIndex((value1) => value1.id === value.id),
      )
    },
    [contentId, db, fetchEntry, updateElm, user],
  )

  const deleteEntry = useCallback(
    async (id: string) => {
      await deleteDoc(
        doc(db, CONTENTS_COLLECTION, contentId, CONTENT_ENTRIES_COLLECTION, id),
      )
      deleteElm((prev) => prev.findIndex((value) => value.id === id))
    },
    [contentId, db, deleteElm],
  )

  return {
    ...client,
    addEntry,
    deleteEntry,
    updateEntry,
  }
}
