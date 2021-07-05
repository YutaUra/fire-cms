import { firestoreTimestampSchema } from '@fire-cms/zod-firestore'
import * as z from 'zod'

export const FireCmsUserProfileBasePublicProfileSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  photo: z.string().url().nullable(),
})
export type FireCmsUserProfileBasePublicProfileModel = z.infer<
  typeof FireCmsUserProfileBasePublicProfileSchema
>

export const FireCmsUserProfilePublicProfileSchema =
  FireCmsUserProfileBasePublicProfileSchema.merge(
    z.object({
      createdAt: firestoreTimestampSchema,
      createdBy: z.string(),
      updatedAt: firestoreTimestampSchema,
      updatedBy: z.string(),
    }),
  )
export type FireCmsUserProfilePublicProfileModel = z.infer<
  typeof FireCmsUserProfilePublicProfileSchema
>
