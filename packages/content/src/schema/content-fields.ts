import * as z from 'zod'

export const fireCmsContentFields = [
  { description: '１行以内の文字列', label: '文字', type: 'text' },
  { description: '複数行の文字列', label: '文字列', type: 'long-text' },
  { description: 'True or False', label: '真偽値', type: 'boolean' },
  {
    description: '事前定義した値から要素を選択する',
    label: '選択式',
    type: 'select',
  },
] as const

type FireCmsContentFields = typeof fireCmsContentFields

type InferObject<T> = {
  [K in keyof T]: T[K] extends z.ZodType<unknown> ? z.infer<T[K]> : never
}

type ToFieldSchema<T> = {
  -readonly [K in keyof T]: T[K] extends { type: string }
    ? {
        id: z.ZodNumber
        name: z.ZodString
        option: z.ZodNullable<z.ZodAny>
        type: z.ZodLiteral<T[K]['type']>
      } extends infer V
      ? V extends z.ZodRawShape
        ? z.ZodObject<V, 'strip', z.ZodTypeAny, InferObject<V>, InferObject<V>>
        : never
      : never
    : never
}

type FieldSchema = ToFieldSchema<FireCmsContentFields>
export const FireCmsContentFieldSchema = z.union(
  fireCmsContentFields.map((field) =>
    z.object({
      id: z.number(),
      name: z.string().nonempty(),
      option: z.any().nullable(),
      type: z.literal(field.type),
    }),
  ) as FieldSchema,
)

export type FireCmsContentFieldModel = z.infer<z.ZodUnion<FieldSchema>>
export type FireCmsContentFieldTypeModel = FireCmsContentFieldModel['type']
