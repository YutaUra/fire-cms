import {
  createReadonlyContext,
  createUseStateContext,
} from '@fire-cms/react-utils'
import type { ReactNode } from 'react'

const {
  Provider: FireCmsPermissionIsStaffProvider,
  useSetValue: useFireCmsPermissionSetIsStaffContext,
  useValue: useFireCmsPermissionIsStaff,
} = createUseStateContext(false)
const {
  Provider: FireCmsPermissionIsStaffIsReadyProvider,
  useSetValue: useFireCmsPermissionSetIsStaffIsReady,
  useValue: useFireCmsPermissionIsStaffIsReady,
} = createUseStateContext(false)
const {
  Provider: FireCmsPermissionForbiddenUrlProvider,
  useValue: useFireCmsPermissionForbiddenUrl,
} = createReadonlyContext<string>('403')

interface FireCmsPermissionProviderProps {
  children: ReactNode
  forbiddenUrl: string
}

export const FireCmsPermissionProvider = ({
  children,
  forbiddenUrl,
}: FireCmsPermissionProviderProps): JSX.Element => (
  <FireCmsPermissionIsStaffProvider>
    <FireCmsPermissionIsStaffIsReadyProvider>
      <FireCmsPermissionForbiddenUrlProvider value={forbiddenUrl}>
        {children}
      </FireCmsPermissionForbiddenUrlProvider>
    </FireCmsPermissionIsStaffIsReadyProvider>
  </FireCmsPermissionIsStaffProvider>
)

export {
  useFireCmsPermissionSetIsStaffContext,
  useFireCmsPermissionIsStaff,
  useFireCmsPermissionSetIsStaffIsReady,
  useFireCmsPermissionIsStaffIsReady,
  useFireCmsPermissionForbiddenUrl,
}
