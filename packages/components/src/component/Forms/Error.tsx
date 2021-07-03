import type { FieldError } from 'react-hook-form'

export interface ErrorProps {
  error: FieldError | undefined
}

export const Error = ({ error }: ErrorProps): JSX.Element | null => {
  if (!error) return null
  return (
    <span className="block py-1 text-red-500" role="alert">
      {error.message}
    </span>
  )
}
