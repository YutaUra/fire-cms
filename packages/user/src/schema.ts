import { firestoreTimestampSchema } from '@fire-cms/zod-firestore'
import * as z from 'zod'

export const FireCmsUserBasePublicProfileSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  photo: z.string().url().nullable(),
})
export type FireCmsUserBasePublicProfileModel = z.infer<
  typeof FireCmsUserBasePublicProfileSchema
>

export const FireCmsUserPublicProfileSchema =
  FireCmsUserBasePublicProfileSchema.merge(
    z.object({
      createdAt: firestoreTimestampSchema,
      createdBy: z.string(),
      updatedAt: firestoreTimestampSchema,
      updatedBy: z.string(),
    }),
  )
export type FireCmsUserPublicProfileModel = z.infer<
  typeof FireCmsUserPublicProfileSchema
>
