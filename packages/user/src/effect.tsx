import { useFireCmsAuthUser } from '@fire-cms/auth'
import { useEffect } from 'react'
import { useFireCmsUserSetMyPublicProfile } from './context'
import { useFireCmsUser } from './hooks'

export const FireCmsUserFetchMyPublicProfile = (): null => {
  const user = useFireCmsAuthUser()
  const setUserProfile = useFireCmsUserSetMyPublicProfile()

  const { fetchPublicProfile, setMyPublicUserProfile } = useFireCmsUser()

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
