import { FieldValue, Timestamp } from '@firebase/firestore'
import * as z from 'zod'

export const firestoreTimestampSchema = z.lazy(() =>
  z.custom<Timestamp>((data) => data instanceof Timestamp),
)
export const firestoreFieldValueSchema = z.lazy(() =>
  z.custom<FieldValue>((data) => data instanceof FieldValue),
)
