import clsx from 'clsx'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import type { FieldValues, Path, UseControllerProps } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { CommonField } from './Common'

export type FormInputProps<T extends FieldValues> = UseControllerProps<
  T,
  Path<T>
> & {
  className?: string
  inputProps?: Omit<ComponentPropsWithoutRef<'input'>, 'onChange' | 'value'>
  label: ReactNode
  labelClass?: string
}

export const FormInput = <T extends FieldValues>({
  name,
  control,
  className,
  defaultValue,
  rules,
  inputProps: { className: inputClassName, ...inputProps } = {},
  shouldUnregister,
  label,
  labelClass,
}: FormInputProps<T>): JSX.Element => {
  const {
    field: { value, ...field },
    fieldState: { error },
  } = useController({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  })

  return (
    <CommonField
      className={className}
      error={error}
      htmlFor={name}
      label={label}
      labelClass={labelClass}
    >
      <input
        // `value`の中身がundefinedとなる場合があり、あとから文字列が挿入される場合にReactがWarningを出す
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        value={value ?? ''}
        {...field}
        {...inputProps}
        className={clsx([
          inputClassName,
          'block flex-1 w-full min-w-0 sm:text-sm rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
        ])}
      />
    </CommonField>
  )
}
