import { useFireCmsAuthUser } from '@fire-cms/auth'
import { useFireCmsFirestore } from '@fire-cms/firebase-firestore'
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
import { CONTENTS_COLLECTION } from '../const'
import { useFireCmsContentSetContents } from '../context'
import type {
  FireCmsContentBaseContentModel,
  FireCmsContentContentModel,
} from '../schema'
import { FireCmsContentContentSchema } from '../schema'

const isNotNull = <T>(value: T): value is Exclude<T, null> => value !== null

interface FireCmsContentContent {
  fetchContents: () => Promise<FireCmsContentContentModel[]>
  addContent: (
    data: Omit<FireCmsContentBaseContentModel, 'id'>,
  ) => Promise<FireCmsContentContentModel>
  updateContent: (
    id: string,
    data: FireCmsContentBaseContentModel,
  ) => Promise<void>
  deleteContent: (contentId: string) => Promise<void>
}

export const useFireCmsContentContent = (): FireCmsContentContent => {
  const db = useFireCmsFirestore()
  const user = useFireCmsAuthUser()
  const setContents = useFireCmsContentSetContents()

  const fetchContent = useCallback(async (ref: DocumentReference) => {
    const ss = await getDoc(ref)
    const parse = FireCmsContentContentSchema.safeParse({
      id: ss.id,
      ...ss.data(),
    })
    if (parse.success) return parse.data
    toast.error('コンテンツのスキーマが不正です')
    throw Error('Content is invalid')
  }, [])

  const fetchContents = useCallback(async () => {
    const { docs } = await getDocs(collection(db, CONTENTS_COLLECTION))
    const contents = docs
      .map((docS) => {
        const parse = FireCmsContentContentSchema.safeParse({
          id: docS.id,
          ...docS.data(),
        })
        if (parse.success) return parse.data
        toast.error('コンテンツのスキーマが不正なものが存在します。')
        return null
      })
      .filter(isNotNull)
    return contents
  }, [db])

  const addContent = useCallback(
    async (data: Omit<FireCmsContentBaseContentModel, 'id'>) => {
      const ref = await addDoc(collection(db, CONTENTS_COLLECTION), {
        ...data,
        createdAt: serverTimestamp(),
        createdBy: user?.uid ?? null,
        updatedAt: serverTimestamp(),
        updatedBy: user?.uid ?? null,
      })
      const content = await fetchContent(ref)
      setContents((prev) => [...prev, content])
      return content
    },
    [db, fetchContent, setContents, user?.uid],
  )

  const updateContent = useCallback(
    async (id: string, data: FireCmsContentBaseContentModel) => {
      if (!user) return
      const ref = doc(db, CONTENTS_COLLECTION, id)
      await updateDoc(ref, {
        ...data,
        updatedAt: serverTimestamp(),
        updatedBy: user.uid,
      })
      const content = await fetchContent(ref)
      setContents((prev) => {
        const idx = prev.findIndex((value) => value.id === id)
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        return [...prev.slice(0, idx), content, ...prev.slice(idx + 1)]
      })
    },
    [db, fetchContent, setContents, user],
  )

  const deleteContent = useCallback(
    async (contentId: string) => {
      if (!user) return
      const ref = doc(db, CONTENTS_COLLECTION, contentId)
      await deleteDoc(ref)
      setContents((prev) => prev.filter((value) => value.id !== contentId))
    },
    [db, setContents, user],
  )

  return {
    addContent,
    deleteContent,
    fetchContents,
    updateContent,
  }
}
