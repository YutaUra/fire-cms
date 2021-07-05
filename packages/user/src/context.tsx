import { createUseState } from '@fire-cms/react-utils'
import type { FC } from 'react'
import { useCallback, useMemo } from 'react'
import type { FireCmsUserPublicProfileModel } from './schema'

const {
  Provider: FireCmsUserMyPublicProfileProvider,
  useSetValue: useFireCmsUserSetMyPublicProfile,
  useValue: useFireCmsUserMyPublicProfile,
} = createUseState<FireCmsUserPublicProfileModel | null>(null)
const {
  Provider: FireCmsUserAllPublicProfileProvider,
  useSetValue: useFireCmsUserSetAllPublicProfile,
  useValue: useFireCmsUserAllPublicProfile,
} = createUseState<Map<string, FireCmsUserPublicProfileModel>>(new Map())

export const FireCmsUserCommonProvider: FC = ({ children }) => (
  <FireCmsUserAllPublicProfileProvider>
    {children}
  </FireCmsUserAllPublicProfileProvider>
)

export const FireCmsUserCmsProvider: FC = ({ children }) => (
  <FireCmsUserMyPublicProfileProvider>
    {children}
  </FireCmsUserMyPublicProfileProvider>
)

export { useFireCmsUserMyPublicProfile, useFireCmsUserSetMyPublicProfile }

export const useFireCmsUserSetPublicProfile = (): {
  resetPublicProfile: (uid: string) => void
  setPublicProfile: (
    uid: string,
    profile: FireCmsUserPublicProfileModel,
  ) => void
} => {
  const setAllPublicProfile = useFireCmsUserSetAllPublicProfile()

  const setPublicProfile = useCallback(
    (uid: string, profile: FireCmsUserPublicProfileModel) => {
      setAllPublicProfile(
        (prev) => new Map([...prev.entries(), [uid, profile]]),
      )
    },
    [setAllPublicProfile],
  )
  const resetPublicProfile = useCallback(
    (uid: string) => {
      setAllPublicProfile(
        (prev) => new Map([...prev.entries()].filter(([key]) => key !== uid)),
      )
    },
    [setAllPublicProfile],
  )

  return {
    resetPublicProfile,
    setPublicProfile,
  }
}

export const useRawFireCmsUserPublicProfile = (
  uid: string,
): FireCmsUserPublicProfileModel | undefined => {
  const allPublicProfile = useFireCmsUserAllPublicProfile()
  const profile = useMemo(
    () => allPublicProfile.get(uid),
    [allPublicProfile, uid],
  )
  return profile
}
