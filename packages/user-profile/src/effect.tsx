import { useFireCmsAuthUser } from '@fire-cms/auth'
import { useEffect } from 'react'
import { useFireCmsUserProfileSetMyPublicProfile } from './context'
import { useFireCmsUserProfile } from './hooks'

export const FireCmsUserProfileFetchMyPublicProfile = (): null => {
  const user = useFireCmsAuthUser()
  const setUserProfile = useFireCmsUserProfileSetMyPublicProfile()

  const { fetchPublicProfile, setMyPublicUserProfile } = useFireCmsUserProfile()

  useEffect(() => {
    if (!user) return
    void (async (): Promise<void> => {
      try {
        const profile = await fetchPublicProfile(user.uid)
        setUserProfile(profile)
      } catch {
        const profile = await setMyPublicUserProfile(
          user.uid,
          { id: user.uid, name: null, photo: null },
          true,
        )
        setUserProfile(profile)
      }
    })()
  }, [fetchPublicProfile, setMyPublicUserProfile, setUserProfile, user])
  return null
}
