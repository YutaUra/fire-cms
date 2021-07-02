import { useFirebaseApp } from '@fire-cms/firebase-config'
import { createUseState } from '@fire-cms/react-utils'
import type { Auth, User } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import type { ReactNode } from 'react'
import { useEffect } from 'react'

type FireCmsAuthUser = User | null

const {
  Provider: FireCmsAuthUserProvider,
  useSetValue: useFireCmsSetAuthUser,
  useValue: useFireCmsAuthUser,
} = createUseState<FireCmsAuthUser>(null)
const {
  Provider: FireCmsAuthIsReadyProvider,
  useSetValue: useFireCmsSetIsReady,
  useValue: useFireCmsAuthIsReady,
} = createUseState<boolean>(false)

interface FireCmsAuthProviderProps {
  children: ReactNode
}

export const FireCmsAuthProvider = ({
  children,
}: FireCmsAuthProviderProps): JSX.Element => (
  <FireCmsAuthUserProvider>
    <FireCmsAuthIsReadyProvider>{children}</FireCmsAuthIsReadyProvider>
  </FireCmsAuthUserProvider>
)

export { useFireCmsSetAuthUser, useFireCmsAuthUser, useFireCmsAuthIsReady }

export const useFirebaseAuth = (): Auth => {
  const app = useFirebaseApp()
  return getAuth(app)
}

export const FirebaseCmsAuthEffect = (): null => {
  const auth = useFirebaseAuth()
  const setUser = useFireCmsSetAuthUser()
  const setIsReady = useFireCmsSetIsReady()

  useEffect(
    () =>
      auth.onAuthStateChanged((user) => {
        setUser(user)
        setIsReady(true)
      }),
    [auth, setUser, setIsReady],
  )

  return null
}
