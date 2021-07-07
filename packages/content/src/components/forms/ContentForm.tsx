import { FormInput } from '@fire-cms/components'
import { zodResolver } from '@hookform/resolvers/zod'
import type { VFC } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import type * as z from 'zod'
import { FireCmsContentBaseContentSchema } from '../../schema'
import { ContentFieldsField } from './ContentFieldsField'
import { ContentPrimaryField } from './ContentPrimaryField'

const ContentFormFieldSchema = FireCmsContentBaseContentSchema

export type ContentFormField = z.infer<typeof ContentFormFieldSchema>

interface ContentFormProps {
  onSubmit: SubmitHandler<ContentFormField>
  onDelete?: () => void
  defaultValues?: ContentFormField
}

export const ContentForm: VFC<ContentFormProps> = ({
  defaultValues,
  onSubmit,
  onDelete,
}) => {
  const { handleSubmit, control } = useForm({
    defaultValues,
    resolver: zodResolver(ContentFormFieldSchema),
  })

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <FormInput control={control} label="名前" name="name" />

      <ContentFieldsField control={control} />

      <ContentPrimaryField control={control} />

      <div className="pt-5">
        <div className="flex justify-end space-x-3">
          {onDelete && (
            <button
              className="py-2 px-4 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md border border-red-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
              onClick={onDelete}
              type="button"
            >
              Delete
            </button>
          )}

          <button
            className="inline-flex justify-center py-2 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md border border-transparent focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  )
}
