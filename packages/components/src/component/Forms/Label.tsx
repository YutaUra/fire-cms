import clsx from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

export type LabelProps = ComponentPropsWithoutRef<'label'>

export const Label = ({
  className,
  htmlFor,
  ...props
}: LabelProps): JSX.Element => (
  <label
    className={clsx([className, 'block text-sm font-medium text-gray-700'])}
    htmlFor={htmlFor}
    {...props}
  />
)
