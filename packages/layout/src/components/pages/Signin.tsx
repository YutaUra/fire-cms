import { SocialSignin } from '../molecules/SocialSignin'
import { SigninEmail } from '../organizations/SigninEmail'

export const Signin = (): JSX.Element => (
  <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-screen bg-gray-50">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        alt="Workflow"
        className="mx-auto w-auto h-12"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
      />

      <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
        Sign in to your account
      </h2>

      {/* <p className="mt-2 text-sm text-center text-gray-600">
        Or{' '}
        <a
          className="font-medium text-indigo-600 hover:text-indigo-500"
          href="#"
        >
          start your 14-day free trial
        </a>
      </p> */}
    </div>

    <div className="sm:mx-auto mt-8 sm:w-full sm:max-w-md">
      <div className="py-8 px-4 sm:px-10 bg-white sm:rounded-lg shadow">
        <SigninEmail />

        <div className="mt-6">
          <div className="relative">
            <div className="flex absolute inset-0 items-center">
              {/* <div className="w-full border-t border-gray-300" /> */}
            </div>

            <div className="flex relative justify-center text-sm">
              {/* <span className="px-2 text-gray-500 bg-white">
                Or continue with
              </span> */}
            </div>
          </div>

          <SocialSignin />
        </div>
      </div>
    </div>
  </div>
)
