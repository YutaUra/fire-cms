import { useFirebaseApp } from '@fire-cms/firebase-config'
import type { FirebaseFirestore } from 'firebase/firestore'
import { initializeFirestore } from 'firebase/firestore'

export const useFireCmsFirestore = (): FirebaseFirestore => {
  const app = useFirebaseApp()
  const firestore = initializeFirestore(app, {})
  return firestore
}
