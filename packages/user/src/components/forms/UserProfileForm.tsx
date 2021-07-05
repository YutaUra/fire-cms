import { FormImage, FormInput } from '@fire-cms/components'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import type { VFC } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const UserProfileFormFieldSchema = z.object({
  name: z.string().nonempty().nullable(),
  photo: z
    .union([
      z.lazy(() =>
        z.instanceof(File).refine((file) => file.size < 1024 * 1024 * 10, {
          message: '10 MB以下にしてください',
        }),
      ),
      z.string(),
    ])
    .nullable(),
})

export type UserProfileFormField = z.infer<typeof UserProfileFormFieldSchema>

interface UserProfileFormProps {
  onSubmit: SubmitHandler<UserProfileFormField>
  defaultValues?: UserProfileFormField
}

export const UserProfileForm: VFC<UserProfileFormProps> = ({
  onSubmit,
  defaultValues,
}): JSX.Element => {
  const { handleSubmit, control } = useForm<UserProfileFormField>({
    defaultValues,
    resolver: zodResolver(UserProfileFormFieldSchema),
  })

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          公開プロフィール
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          ログインしていない人にも公開させる情報なので、機密情報などは記載しないでください
        </p>
      </div>

      <FormImage
        control={control}
        imgClassName="h-20 w-20 object-cover rounded-full"
        label="プロフィール画像"
        name="photo"
      />

      <FormInput control={control} label="名前" name="name" />

      <div className="pt-5">
        <div className="flex justify-end space-x-3">
          <button
            className="inline-flex justify-center py-2 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md border border-transparent focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
            type="submit"
          >
            Save
          </button>
        </div>
      </div>

      <DevTool control={control} placement="bottom-right" />
    </form>
  )
}
