import { FormFile } from '@fire-cms/components'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useCallback } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const CreateFileFormSchema = z.object({
  files: z.lazy(() => z.instanceof(FileList)).nullable(),
})

export type CreateFileFormField = z.infer<typeof CreateFileFormSchema>

interface CreateFileFormProps {
  className?: string
  onSubmit: (data: CreateFileFormField) => Promise<unknown>
  onClose: () => void
}

export const CreateFileForm = ({
  className,
  onSubmit,
  onClose,
}: CreateFileFormProps): JSX.Element => {
  const { handleSubmit, reset, setValue, control } =
    useForm<CreateFileFormField>({
      resolver: zodResolver(CreateFileFormSchema),
    })

  const onSubmitWrapper = useCallback<SubmitHandler<CreateFileFormField>>(
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
      <FormFile
        className="flex items-center space-x-4"
        control={control}
        inputProps={{ multiple: false }}
        label="ファイル"
        name="files"
        setValue={setValue}
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
