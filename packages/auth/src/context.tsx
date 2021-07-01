import { useFirebaseApp } from '@fire-cms/firebase-config'
import type { Auth, User } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

type FireCmsAuthUser = User | null

const FireCmsAuthUserContext = createContext<FireCmsAuthUser>(null)
const FireCmsAuthSetUserContext = createContext<
  Dispatch<SetStateAction<FireCmsAuthUser>>
>(() => null)
const FireCmsAuthIsReadyContext = createContext<boolean>(false)
const FireCmsAuthSetIsReadyContext = createContext<
  Dispatch<SetStateAction<boolean>>
>(() => null)

interface FireCmsAuthUserProviderProps {
  children: ReactNode
}

export const FireCmsAuthUserProvider = ({
  children,
}: FireCmsAuthUserProviderProps): JSX.Element => {
  const [user, setUser] = useState<FireCmsAuthUser>(null)

  return (
    <FireCmsAuthUserContext.Provider value={user}>
      <FireCmsAuthSetUserContext.Provider value={setUser}>
        {children}
      </FireCmsAuthSetUserContext.Provider>
    </FireCmsAuthUserContext.Provider>
  )
}
interface FireCmsAuthIsReadyProviderProps {
  children: ReactNode
}

export const FireCmsAuthIsReadyProvider = ({
  children,
}: FireCmsAuthIsReadyProviderProps): JSX.Element => {
  const [isReady, setIsReady] = useState<boolean>(false)

  return (
    <FireCmsAuthIsReadyContext.Provider value={isReady}>
      <FireCmsAuthSetIsReadyContext.Provider value={setIsReady}>
        {children}
      </FireCmsAuthSetIsReadyContext.Provider>
    </FireCmsAuthIsReadyContext.Provider>
  )
}

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

export const useFireCmsAuthUser = (): FireCmsAuthUser =>
  useContext(FireCmsAuthUserContext)

export const useSetFireCmsAuthUser = (): Dispatch<
  SetStateAction<FireCmsAuthUser>
> => useContext(FireCmsAuthSetUserContext)
export const useFireCmsAuthIsReady = (): boolean =>
  useContext(FireCmsAuthIsReadyContext)

export const useFirebaseAuth = (): Auth => {
  const app = useFirebaseApp()
  return getAuth(app)
}

export const FirebaseCmsAuthEffect = (): null => {
  const auth = useFirebaseAuth()
  const setUser = useSetFireCmsAuthUser()
  const setIsReady = useContext(FireCmsAuthSetIsReadyContext)

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
