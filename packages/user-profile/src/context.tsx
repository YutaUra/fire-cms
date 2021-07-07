import { createUseStateContext } from '@fire-cms/react-utils'
import type { FC } from 'react'
import { useCallback, useMemo } from 'react'
import type { FireCmsUserProfilePublicProfileModel } from './schema'

const {
  Provider: FireCmsUserProfileMyPublicProfileProvider,
  useSetValue: useFireCmsUserProfileSetMyPublicProfile,
  useValue: useFireCmsUserProfileMyPublicProfile,
} = createUseStateContext<FireCmsUserProfilePublicProfileModel | null>(null)
const {
  Provider: FireCmsUserProfileAllPublicProfileProvider,
  useSetValue: useFireCmsUserProfileSetAllPublicProfile,
  useValue: useFireCmsUserProfileAllPublicProfile,
} = createUseStateContext<Map<string, FireCmsUserProfilePublicProfileModel>>(
  new Map(),
)

export const FireCmsUserProfileCommonProvider: FC = ({ children }) => (
  <FireCmsUserProfileAllPublicProfileProvider>
    {children}
  </FireCmsUserProfileAllPublicProfileProvider>
)

export const FireCmsUserProfileCmsProvider: FC = ({ children }) => (
  <FireCmsUserProfileMyPublicProfileProvider>
    {children}
  </FireCmsUserProfileMyPublicProfileProvider>
)

export {
  useFireCmsUserProfileMyPublicProfile,
  useFireCmsUserProfileSetMyPublicProfile,
}

export const useFireCmsUserSetPublicProfile = (): {
  resetPublicProfile: (uid: string) => void
  setPublicProfile: (
    uid: string,
    profile: FireCmsUserProfilePublicProfileModel,
  ) => void
} => {
  const setAllPublicProfile = useFireCmsUserProfileSetAllPublicProfile()

  const setPublicProfile = useCallback(
    (uid: string, profile: FireCmsUserProfilePublicProfileModel) => {
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
): FireCmsUserProfilePublicProfileModel | undefined => {
  const allPublicProfile = useFireCmsUserProfileAllPublicProfile()
  const profile = useMemo(
    () => allPublicProfile.get(uid),
    [allPublicProfile, uid],
  )
  return profile
}
