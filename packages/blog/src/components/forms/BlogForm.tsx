import { FormInput, FormTextarea, FormToggle } from '@fire-cms/components'
import { zodResolver } from '@hookform/resolvers/zod'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import type * as z from 'zod'
import { FireCmsBlogBaseBlogSchema } from '../../schema'

const BlogFormSchema = FireCmsBlogBaseBlogSchema.omit({ id: true })

export type BlogFormField = z.infer<typeof BlogFormSchema>

interface BlogFormProps {
  defaultValues?: Partial<BlogFormField>
  onSubmit: SubmitHandler<BlogFormField>
  onCancel?: () => void
  onDelete?: () => void
}

export const BlogForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  onDelete,
}: BlogFormProps): JSX.Element => {
  const { handleSubmit, setValue, control } = useForm<BlogFormField>({
    defaultValues,
    resolver: zodResolver(BlogFormSchema),
  })

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-8">
        <FormInput
          control={control}
          defaultValue={defaultValues?.title}
          label="タイトル"
          name="title"
        />

        <FormTextarea
          TextareaProps={{ rows: 20 }}
          control={control}
          defaultValue={defaultValues?.body}
          label="ボディ"
          name="body"
        />

        <FormToggle
          control={control}
          defaultValue={defaultValues?.isPublic}
          label="公開設定"
          name="isPublic"
          setValue={setValue}
        />
      </div>

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

          {onCancel && (
            <button
              className="py-2 px-4 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
              onClick={onCancel}
              type="button"
            >
              Cancel
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
