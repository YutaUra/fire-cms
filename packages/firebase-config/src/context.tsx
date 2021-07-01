import type { FirebaseApp, FirebaseOptions } from 'firebase/app'
import { getApps, initializeApp } from 'firebase/app'
import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'

const FirebaseConfigContext = createContext<FirebaseOptions>({})

export interface FirebaseConfigProviderProps {
  children?: ReactNode
  option: FirebaseOptions
}

export const FirebaseConfigProvider = ({
  option,
  children,
}: FirebaseConfigProviderProps): JSX.Element => (
  <FirebaseConfigContext.Provider value={option}>
    {children}
  </FirebaseConfigContext.Provider>
)

export const useFirebaseConfig = (): FirebaseOptions =>
  useContext(FirebaseConfigContext)

export const useFirebaseApp = (): FirebaseApp => {
  const config = useFirebaseConfig()
  const [app] = getApps()
  if (app) {
    return app
  }
  return initializeApp(config)
}
