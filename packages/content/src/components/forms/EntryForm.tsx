import type { VFC } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import type { FireCmsContentBaseContentModel } from '../../schema'
import { EntryFormFields } from './EntryFormField'

export type EntryFormField = Record<string, unknown>

interface EntryFormProps {
  content: FireCmsContentBaseContentModel
  defaultValues?: EntryFormField
  onSubmit: SubmitHandler<EntryFormField>
  onDelete?: () => void
}

export const EntryForm: VFC<EntryFormProps> = ({
  onSubmit,
  defaultValues,
  content,
  onDelete,
}) => {
  const { handleSubmit, control } = useForm<EntryFormField>({
    defaultValues,
  })

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {content.fields.map((field) => (
        <EntryFormFields control={control} field={field} key={field.id} />
      ))}

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
