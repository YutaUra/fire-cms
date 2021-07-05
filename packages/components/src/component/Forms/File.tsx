import clsx from 'clsx'
import type {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react'
import { useCallback } from 'react'
import type {
  FieldPath,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form'
import { useController } from 'react-hook-form'
import { FormCommonField } from './Common'

export type FormFileProps<
  T extends FieldValues,
  V extends FieldPath<T>,
> = UseControllerProps<T, V> & {
  className?: string
  inputProps?: Omit<ComponentPropsWithoutRef<'input'>, 'onChange' | 'value'>
  fieldWrapperClassName?: string
  label: ReactNode
  labelClass?: string
} & {
  defaultValue?: null
}

export const FormFile = <T extends FieldValues, V extends FieldPath<T>>({
  name,
  control,
  className,
  defaultValue,
  rules,
  inputProps: { className: inputClassName, ...inputProps } = {},
  shouldUnregister,
  label,
  labelClass,
  fieldWrapperClassName,
}: FormFileProps<T, V>): JSX.Element => {
  const {
    field: { onChange },
    fieldState: { error },
  } = useController({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  })

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      onChange(event.target.files)
    },
    [onChange],
  )

  return (
    <FormCommonField
      className={className}
      error={error}
      fieldWrapperClassName={fieldWrapperClassName}
      htmlFor={name}
      label={label}
      labelClass={labelClass}
    >
      <input
        {...inputProps}
        className={clsx([
          inputClassName,
          'block flex-1 w-full min-w-0 sm:text-sm rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
        ])}
        onChange={handleChange}
        type="file"
      />
    </FormCommonField>
  )
}
