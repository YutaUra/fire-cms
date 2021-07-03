import clsx from 'clsx'
import type { ReactNode } from 'react'
import type { FieldError } from 'react-hook-form'
import { Error } from './Error'
import { Label } from './Label'

interface CommonFieldProps {
  children: ReactNode
  className?: string
  labelClass?: string
  error: FieldError | undefined
  htmlFor: string
  label: ReactNode
  noShadow?: true
}

export const CommonField = ({
  children,
  className,
  labelClass,
  error,
  label,
  htmlFor,
  noShadow,
}: CommonFieldProps): JSX.Element => (
  <div className={className}>
    <Label className={labelClass} htmlFor={htmlFor}>
      {label}
    </Label>

    <div className={clsx([!noShadow && 'shadow-sm', 'mt-1'])}>{children}</div>

    <Error error={error} />
  </div>
)
