import clsx from 'clsx'
import type { ReactNode } from 'react'
import type { FieldError } from 'react-hook-form'
import { Error } from './Error'
import { Label } from './Label'

interface FormCommonFieldProps {
  children: ReactNode
  className?: string
  labelClass?: string
  error: FieldError | undefined
  htmlFor: string
  label: ReactNode
  noShadow?: true
  fieldWrapperClassName?: string
}

export const FormCommonField = ({
  children,
  className,
  labelClass,
  error,
  label,
  htmlFor,
  noShadow,
  fieldWrapperClassName,
}: FormCommonFieldProps): JSX.Element => (
  <div className={className}>
    <Label className={labelClass} htmlFor={htmlFor}>
      {label}
    </Label>

    <div
      className={clsx([
        !noShadow && 'shadow-sm',
        fieldWrapperClassName,
        'mt-1',
      ])}
    >
      {children}
    </div>

    <Error error={error} />
  </div>
)
