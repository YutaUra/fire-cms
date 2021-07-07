import { createReadonlyContext } from '@fire-cms/react-utils'
import type { ReactNode } from 'react'

const {
  Provider: FireCmsLayoutRedirectToProvider,
  useValue: useFireCmsLayoutRedirectTo,
} = createReadonlyContext<string>('/')
const {
  Provider: FireCmsLayoutNotFoundComponent,
  useValue: useFireCmsLayoutNotFoundComponent,
} = createReadonlyContext<() => JSX.Element | null>(() => null)

interface FireCmsLayoutProviderProps {
  children: ReactNode
  redirectTo: string
  NotFound: () => JSX.Element | null
}

export const FireCmsLayoutProvider = ({
  children,
  redirectTo,
  NotFound,
}: FireCmsLayoutProviderProps): JSX.Element => (
  <FireCmsLayoutRedirectToProvider value={redirectTo}>
    <FireCmsLayoutNotFoundComponent value={NotFound}>
      {children}
    </FireCmsLayoutNotFoundComponent>
  </FireCmsLayoutRedirectToProvider>
)

export { useFireCmsLayoutRedirectTo, useFireCmsLayoutNotFoundComponent }
