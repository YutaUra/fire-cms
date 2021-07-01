import type { ReactNode } from 'react'

interface FormFieldProps {
  children: ReactNode
  name: string
  label: string
}

export const FormField = ({
  children,
  label,
  name,
}: FormFieldProps): JSX.Element => (
  <div>
    <label className="block text-sm font-medium text-gray-700" htmlFor={name}>
      {label}
    </label>

    <div className="mt-1">{children}</div>
  </div>
)
