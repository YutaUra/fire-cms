import { useFireCmsFirestore } from '@fire-cms/firebase-firestore'
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'
import { PUBLIC_USER_COLLECTION } from './const'
import {
  useFireCmsUserSetPublicProfile,
  useRawFireCmsUserPublicProfile,
} from './context'
import type {
  FireCmsUserBasePublicProfileModel,
  FireCmsUserPublicProfileModel,
} from './schema'
import { FireCmsUserPublicProfileSchema } from './schema'

interface FireCmsClient {
  fetchPublicProfile: (uid: string) => Promise<FireCmsUserPublicProfileModel>
}

export const useFireCmsClient = (): FireCmsClient => {
  const db = useFireCmsFirestore()

  const fetchPublicProfile = useCallback(
    async (uid: string) => {
      const ref = doc(db, PUBLIC_USER_COLLECTION, uid)
      const snapshot = await getDoc(ref)
      if (!snapshot.exists()) {
        throw Error('USER NOT FOUND')
      }
      const parse = FireCmsUserPublicProfileSchema.safeParse({
        id: snapshot.id,
        ...snapshot.data(),
      })
      if (parse.success) return parse.data
      throw Error('USER SCHEMA NOT MATCH')
    },
    [db],
  )

  return {
    fetchPublicProfile,
  }
}

type FireCmsUser = FireCmsClient & {
  setMyPublicUserProfile: (
    uid: string,
    profile: FireCmsUserBasePublicProfileModel,
    create?: boolean,
  ) => Promise<FireCmsUserPublicProfileModel>
}

export const useFireCmsUser = (): FireCmsUser => {
  const client = useFireCmsClient()
  const { fetchPublicProfile } = client
  const db = useFireCmsFirestore()

  const setMyPublicUserProfile = useCallback(
    async (
      uid: string,
      profile: FireCmsUserBasePublicProfileModel,
      create = false,
    ) => {
      const ref = doc(db, PUBLIC_USER_COLLECTION, uid)
      if (create) {
        await setDoc(ref, {
          createdAt: serverTimestamp(),
          createdBy: uid,
          id: profile.id,
          name: profile.name === '' ? null : profile.name,
          photo: profile.photo === '' ? null : profile.photo,
          updatedAt: serverTimestamp(),
          updatedBy: uid,
        })
      } else {
        await updateDoc(ref, {
          id: profile.id,
          name: profile.name === '' ? null : profile.name,
          photo: profile.photo === '' ? null : profile.photo,
          updatedAt: serverTimestamp(),
          updatedBy: uid,
        })
      }
      return fetchPublicProfile(uid)
    },
    [db, fetchPublicProfile],
  )

  return {
    ...client,
    setMyPublicUserProfile,
  }
}

export const useFireCmsUserPublicProfile = (
  uid: string,
): [FireCmsUserPublicProfileModel | undefined, boolean] => {
  const profile = useRawFireCmsUserPublicProfile(uid)
  const [isLoading, setIsLoading] = useState(true)
  const { fetchPublicProfile } = useFireCmsClient()
  const { setPublicProfile } = useFireCmsUserSetPublicProfile()

  useEffect(() => {
    if (profile) {
      setIsLoading(false)
      return
    }
    fetchPublicProfile(uid)
      .then((newProfile) => {
        setPublicProfile(uid, newProfile)
      })
      .catch(() => null)
      .finally(() => {
        setIsLoading(false)
      })
  }, [fetchPublicProfile, profile, setPublicProfile, uid])
  return [profile, isLoading]
}
