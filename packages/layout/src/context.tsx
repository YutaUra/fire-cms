import { createReadonly } from '@fire-cms/react-utils'
import type { ReactNode } from 'react'

const {
  Provider: FireCmsLayoutRedirectToProvider,
  useValue: useFireCmsLayoutRedirectTo,
} = createReadonly<string>('/')

interface FireCmsLayoutProviderProps {
  children: ReactNode
  redirectTo: string
}

export const FireCmsLayoutProvider = ({
  children,
  redirectTo,
}: FireCmsLayoutProviderProps): JSX.Element => (
  <FireCmsLayoutRedirectToProvider value={redirectTo}>
    {children}
  </FireCmsLayoutRedirectToProvider>
)

export { useFireCmsLayoutRedirectTo }
