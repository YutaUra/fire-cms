import { createReadonly } from '@fire-cms/react-utils'
import type { FirebaseApp, FirebaseOptions } from 'firebase/app'
import { getApps, initializeApp } from 'firebase/app'
import type { ReactNode } from 'react'

const {
  Provider: FirebaseConfigFirebaseOptionsProvider,
  useValue: useFirebaseConfig,
} = createReadonly<FirebaseOptions>({})

export interface FirebaseConfigProviderProps {
  children?: ReactNode
  option: FirebaseOptions
}

export const FirebaseConfigProvider = ({
  option,
  children,
}: FirebaseConfigProviderProps): JSX.Element => (
  <FirebaseConfigFirebaseOptionsProvider value={option}>
    {children}
  </FirebaseConfigFirebaseOptionsProvider>
)

export { useFirebaseConfig }

export const useFirebaseApp = (): FirebaseApp => {
  const config = useFirebaseConfig()
  const [app] = getApps()
  if (app) {
    return app
  }
  return initializeApp(config)
}
