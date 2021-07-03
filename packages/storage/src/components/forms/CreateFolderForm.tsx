import { FormInput } from '@fire-cms/components'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useCallback } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const CreateFolderFormSchema = z.object({
  name: z.string().nonempty(),
})

export type CreateFolderFormField = z.infer<typeof CreateFolderFormSchema>

interface CreateFolderFormProps {
  className?: string
  onSubmit: (data: CreateFolderFormField) => Promise<unknown>
  onClose: () => void
}

export const CreateFolderForm = ({
  className,
  onSubmit,
  onClose,
}: CreateFolderFormProps): JSX.Element => {
  const { handleSubmit, reset, control } = useForm<CreateFolderFormField>({
    resolver: zodResolver(CreateFolderFormSchema),
  })

  const onSubmitWrapper = useCallback<SubmitHandler<CreateFolderFormField>>(
    async (data) => {
      await onSubmit(data)
      reset()
    },
    [onSubmit, reset],
  )

  const handleClose = useCallback(() => {
    onClose()
    reset()
  }, [onClose, reset])

  return (
    <form
      className={clsx([className, 'space-y-6'])}
      onSubmit={handleSubmit(onSubmitWrapper)}
    >
      <FormInput
        className="flex items-center space-x-4"
        control={control}
        fieldWrapperClassName="flex-1"
        inputProps={{ className: 'border border-gray-200 px-2' }}
        label="新しいフォルダーの名前"
        name="name"
      />

      <div className="flex space-x-2">
        <button
          className="inline-flex flex-1 justify-center py-2 px-4 w-full text-base sm:text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md border border-transparent focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
          type="submit"
        >
          Create
        </button>

        <button
          className="inline-flex flex-1 justify-center py-2 px-4 w-full text-base sm:text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-md border border-gray-400 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
          onClick={handleClose}
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
