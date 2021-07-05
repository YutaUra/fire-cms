import clsx from 'clsx'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import type { FieldValues, Path, UseControllerProps } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { FormCommonField } from './Common'

export type FormTextareaProps<T extends FieldValues> = UseControllerProps<
  T,
  Path<T>
> & {
  className?: string
  TextareaProps?: ComponentPropsWithoutRef<'textarea'>
  label: ReactNode
  labelClass?: string
}

export const FormTextarea = <T extends FieldValues>({
  name,
  control,
  className,
  defaultValue,
  rules,
  TextareaProps: { className: TextareaClassName, ...TextareaProps } = {},
  shouldUnregister,
  label,
  labelClass,
}: FormTextareaProps<T>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  })

  return (
    <FormCommonField
      className={className}
      error={error}
      htmlFor={name}
      label={label}
      labelClass={labelClass}
    >
      <textarea
        {...field}
        {...TextareaProps}
        className={clsx([
          TextareaClassName,
          'block flex-1 w-full min-w-0 sm:text-sm rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
        ])}
      />
    </FormCommonField>
  )
}
