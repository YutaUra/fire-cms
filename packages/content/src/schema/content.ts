import { firestoreTimestampSchema } from '@fire-cms/zod-firestore'
import * as z from 'zod'
import { FireCmsContentFieldSchema } from './content-fields'

export const FireCmsContentBaseContentSchema = z.object({
  fields: z
    .array(FireCmsContentFieldSchema)
    .nonempty()
    .refine(
      (fields) =>
        new Set(fields.map((field) => field.name)).size === fields.length,
      {
        message: '同じ項目名のフィールドがあります',
      },
    ),
  name: z.string().nonempty(),
  primaryFieldId: z.number(),
})
export type FireCmsContentBaseContentModel = z.infer<
  typeof FireCmsContentBaseContentSchema
>

export const FireCmsContentContentSchema =
  FireCmsContentBaseContentSchema.merge(
    z.object({
      createdAt: firestoreTimestampSchema,
      createdBy: z.string(),
      id: z.string(),
      updatedAt: firestoreTimestampSchema,
      updatedBy: z.string(),
    }),
  )
export type FireCmsContentContentModel = z.infer<
  typeof FireCmsContentContentSchema
>
