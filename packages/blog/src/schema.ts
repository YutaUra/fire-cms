import { firestoreTimestampSchema } from '@fire-cms/zod-firestore'
import * as z from 'zod'

export const FireCmsBlogBaseBlogSchema = z.object({
  body: z.string().nonempty(),
  id: z.string(),
  isPublic: z.boolean(),
  title: z.string().nonempty(),
})
export type FireCmsBlogBaseBlogModel = z.infer<typeof FireCmsBlogBaseBlogSchema>

export const FireCmsBlogBlogSchema = FireCmsBlogBaseBlogSchema.merge(
  z.object({
    createdAt: firestoreTimestampSchema,
    createdBy: z.string(),
    updatedAt: firestoreTimestampSchema,
    updatedBy: z.string(),
  }),
)
export type FireCmsBlogBlogModel = z.infer<typeof FireCmsBlogBlogSchema>
