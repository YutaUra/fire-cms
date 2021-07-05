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
  FireCmsUserProfileBasePublicProfileModel,
  FireCmsUserProfilePublicProfileModel,
} from './schema'
import { FireCmsUserProfilePublicProfileSchema } from './schema'

interface FireCmsUserProfileClient {
  fetchPublicProfile: (
    uid: string,
  ) => Promise<FireCmsUserProfilePublicProfileModel>
}

export const useFireCmsUserProfileClient = (): FireCmsUserProfileClient => {
  const db = useFireCmsFirestore()

  const fetchPublicProfile = useCallback(
    async (uid: string) => {
      const ref = doc(db, PUBLIC_USER_COLLECTION, uid)
      const snapshot = await getDoc(ref)
      if (!snapshot.exists()) {
        throw Error('USER NOT FOUND')
      }
      const parse = FireCmsUserProfilePublicProfileSchema.safeParse({
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

type FireCmsUserProfile = FireCmsUserProfileClient & {
  setMyPublicUserProfile: (
    uid: string,
    profile: FireCmsUserProfileBasePublicProfileModel,
    create?: boolean,
  ) => Promise<FireCmsUserProfilePublicProfileModel>
}

export const useFireCmsUserProfile = (): FireCmsUserProfile => {
  const client = useFireCmsUserProfileClient()
  const { fetchPublicProfile } = client
  const db = useFireCmsFirestore()

  const setMyPublicUserProfile = useCallback(
    async (
      uid: string,
      profile: FireCmsUserProfileBasePublicProfileModel,
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

export const useFireCmsUserProfilePublicProfile = (
  uid: string,
): [FireCmsUserProfilePublicProfileModel | undefined, boolean] => {
  const profile = useRawFireCmsUserPublicProfile(uid)
  const [isLoading, setIsLoading] = useState(true)
  const { fetchPublicProfile } = useFireCmsUserProfileClient()
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
