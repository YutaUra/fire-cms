import { useFirebaseApp } from '@fire-cms/firebase-config'
import type { FirebaseFirestore } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'

export const useFireCmsFirestore = (): FirebaseFirestore => {
  const app = useFirebaseApp()
  const firestore = getFirestore(app)
  return firestore
}
