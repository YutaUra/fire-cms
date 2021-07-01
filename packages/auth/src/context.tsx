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

interface FireCmsAuthProviderProps {
  children: ReactNode
}

export const FireCmsAuthProvider = ({
  children,
}: FireCmsAuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<FireCmsAuthUser>(null)

  return (
    <FireCmsAuthUserContext.Provider value={user}>
      <FireCmsAuthSetUserContext.Provider value={setUser}>
        {children}
      </FireCmsAuthSetUserContext.Provider>
    </FireCmsAuthUserContext.Provider>
  )
}

export const useFireCmsAuthUser = (): FireCmsAuthUser =>
  useContext(FireCmsAuthUserContext)

export const useSetFireCmsAuthUser = (): Dispatch<
  SetStateAction<FireCmsAuthUser>
> => useContext(FireCmsAuthSetUserContext)

export const useFirebaseAuth = (): Auth => {
  const app = useFirebaseApp()
  return getAuth(app)
}

export const FirebaseCmsAuthEffect = (): null => {
  const auth = useFirebaseAuth()
  const setUser = useSetFireCmsAuthUser()

  useEffect(() => auth.onAuthStateChanged(setUser), [auth, setUser])

  return null
}
