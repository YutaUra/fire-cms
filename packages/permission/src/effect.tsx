import { useFireCmsAuthUser } from '@fire-cms/auth'
import { useFireCmsFirestore } from '@fire-cms/firebase-firestore'
import { useFireCmsRouterPush } from '@fire-cms/router'
import { doc, getDoc } from 'firebase/firestore'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import {
  PERMISSIONS_COLLECTION,
  PERMISSION_STAFF,
  PERMISSION_USERS_COLLECTION,
} from './const'
import {
  useFireCmsPermissionIsStaff,
  useFireCmsPermissionIsStaffIsReady,
  useFireCmsPermissionSetIsStaffContext,
  useFireCmsPermissionSetIsStaffIsReady,
} from './context'

export const FetchFireCmsIsStaffEffect = (): null => {
  const user = useFireCmsAuthUser()
  const db = useFireCmsFirestore()
  const setIsStaff = useFireCmsPermissionSetIsStaffContext()
  const setIsStaffReady = useFireCmsPermissionSetIsStaffIsReady()

  useEffect(() => {
    if (user) {
      void getDoc(
        doc(
          db,
          PERMISSIONS_COLLECTION,
          PERMISSION_STAFF,
          PERMISSION_USERS_COLLECTION,
          user.uid,
        ),
      ).then((snapshot) => {
        setIsStaff(snapshot.exists())
        setIsStaffReady(true)
      })
    } else {
      setIsStaff(false)
    }
  }, [user, setIsStaff, db, setIsStaffReady])

  return null
}

interface FireCmsStaffRequiredProps {
  children: ReactNode
  notStaffUrl: string
}

export const FireCmsStaffRequired = ({
  children,
  notStaffUrl,
}: FireCmsStaffRequiredProps): JSX.Element | null => {
  const isReady = useFireCmsPermissionIsStaffIsReady()
  const isStaff = useFireCmsPermissionIsStaff()
  const push = useFireCmsRouterPush()

  if (!isReady) return null
  if (!isStaff) {
    push(notStaffUrl)
    return null
  }

  return <> {children}</>
}
