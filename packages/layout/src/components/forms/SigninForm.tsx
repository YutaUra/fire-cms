import { useForm } from 'react-hook-form'
import { FormField } from '../atoms/FormField'

export interface SigninFormField {
  email: string
  password: string
  rememberMe: boolean
}

interface SigninFormProps {
  onSubmit: (data: SigninFormField) => void
}

export const SigninForm = ({ onSubmit }: SigninFormProps): JSX.Element => {
  const { register, handleSubmit } = useForm<SigninFormField>()

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Email address" name="email">
        <input
          autoComplete="email"
          className="block py-2 px-3 w-full sm:text-sm placeholder-gray-400 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm appearance-none focus:outline-none"
          type="email"
          {...register('email', { required: true })}
        />
      </FormField>

      <FormField label="Password" name="password">
        <input
          autoComplete="current-password"
          className="block py-2 px-3 w-full sm:text-sm placeholder-gray-400 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm appearance-none focus:outline-none"
          type="password"
          {...register('password', { required: true })}
        />
      </FormField>

      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <input
            className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
            type="checkbox"
            {...register('rememberMe')}
          />

          <label
            className="block ml-2 text-sm text-gray-900"
            htmlFor="rememberMe"
          >
            Remember me
          </label>
        </div>

        <div className="text-sm">
          {/* <a
            className="font-medium text-indigo-600 hover:text-indigo-500"
            href="#"
          >
            Forgot your password?
          </a> */}
        </div>
      </div>

      <div>
        <button
          className="flex justify-center py-2 px-4 w-full text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md border border-transparent focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
          type="submit"
        >
          Sign in
        </button>
      </div>
    </form>
  )
}
