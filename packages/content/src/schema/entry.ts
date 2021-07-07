import { firestoreTimestampSchema } from '@fire-cms/zod-firestore'
import * as z from 'zod'

export const FireCmsContentBaseEntrySchema = z.object({
  fields: z.record(z.any()),
})
export type FireCmsContentBaseEntryModel = z.infer<
  typeof FireCmsContentBaseEntrySchema
>

export const FireCmsContentEntrySchema = FireCmsContentBaseEntrySchema.merge(
  z.object({
    createdAt: firestoreTimestampSchema,
    createdBy: z.string(),
    id: z.string(),
    updatedAt: firestoreTimestampSchema,
    updatedBy: z.string(),
  }),
)
export type FireCmsContentEntryModel = z.infer<typeof FireCmsContentEntrySchema>
