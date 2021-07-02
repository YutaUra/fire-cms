import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useState } from 'react'

const FireCmsPermissionIsStaffContext = createContext<boolean>(false)
const FireCmsPermissionSetIsStaffContext = createContext<
  Dispatch<SetStateAction<boolean>>
>(() => null)
const FireCmsPermissionIsStaffIsReadyContext = createContext<boolean>(false)
const FireCmsPermissionSetIsStaffIsReadyContext = createContext<
  Dispatch<SetStateAction<boolean>>
>(() => null)
const FireCmsPermissionForbiddenUrlContext = createContext<string>('403')

interface FireCmsPErmissionIsStaffProviderProps {
  children: ReactNode
}

const FireCmsPermissionIsStaffProvider = ({
  children,
}: FireCmsPErmissionIsStaffProviderProps): JSX.Element => {
  const [isStaff, setIsStaff] = useState(false)
  return (
    <FireCmsPermissionIsStaffContext.Provider value={isStaff}>
      <FireCmsPermissionSetIsStaffContext.Provider value={setIsStaff}>
        {children}
      </FireCmsPermissionSetIsStaffContext.Provider>
    </FireCmsPermissionIsStaffContext.Provider>
  )
}

interface FireCmsPErmissionIsStaffIsReadyProviderProps {
  children: ReactNode
}

const FireCmsPermissionIsStaffIsReadyProvider = ({
  children,
}: FireCmsPErmissionIsStaffIsReadyProviderProps): JSX.Element => {
  const [isStaffIsReady, setIsStaffIsReady] = useState(false)
  return (
    <FireCmsPermissionIsStaffIsReadyContext.Provider value={isStaffIsReady}>
      <FireCmsPermissionSetIsStaffIsReadyContext.Provider
        value={setIsStaffIsReady}
      >
        {children}
      </FireCmsPermissionSetIsStaffIsReadyContext.Provider>
    </FireCmsPermissionIsStaffIsReadyContext.Provider>
  )
}

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
      <FireCmsPermissionForbiddenUrlContext.Provider value={forbiddenUrl}>
        {children}
      </FireCmsPermissionForbiddenUrlContext.Provider>
    </FireCmsPermissionIsStaffIsReadyProvider>
  </FireCmsPermissionIsStaffProvider>
)

export const useFireCmsPermissionIsStaff = (): boolean =>
  useContext(FireCmsPermissionIsStaffContext)
export const useFireCmsPermissionSetIsStaffContext = (): Dispatch<
  SetStateAction<boolean>
> => useContext(FireCmsPermissionSetIsStaffContext)
export const useFireCmsPermissionIsStaffIsReady = (): boolean =>
  useContext(FireCmsPermissionIsStaffIsReadyContext)
export const useFireCmsPermissionSetIsStaffIsReady = (): Dispatch<
  SetStateAction<boolean>
> => useContext(FireCmsPermissionSetIsStaffIsReadyContext)
export const useFireCmsPermissionForbiddenUrl = (): string =>
  useContext(FireCmsPermissionForbiddenUrlContext)
