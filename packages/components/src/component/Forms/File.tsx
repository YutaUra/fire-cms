import clsx from 'clsx'
import type {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react'
import { useCallback, useEffect } from 'react'
import type {
  FieldPath,
  FieldValues,
  SetValueConfig,
  UseControllerProps,
} from 'react-hook-form'
import { useController } from 'react-hook-form'
import { CommonField } from './Common'

export type FormFileProps<
  T extends FieldValues,
  V extends FieldPath<T>,
> = UseControllerProps<T, V> & {
  defaultValue?: null
} & {
  setValue: (name: V, value: FileList | null, options?: SetValueConfig) => void
  className?: string
  inputProps?: Omit<ComponentPropsWithoutRef<'input'>, 'onChange' | 'value'>
  fieldWrapperClassName?: string
  label: ReactNode
  labelClass?: string
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
  setValue,
}: FormFileProps<T, V>): JSX.Element => {
  const {
    field: { value, ...field },
    fieldState: { error },
    formState: { isSubmitSuccessful },
  } = useController({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  })

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setValue(name, event.target.files)
    },
    [name, setValue],
  )

  useEffect(() => {
    setValue(name, null)
  }, [setValue, name, isSubmitSuccessful])

  return (
    <CommonField
      className={className}
      error={error}
      fieldWrapperClassName={fieldWrapperClassName}
      htmlFor={name}
      label={label}
      labelClass={labelClass}
    >
      <input
        hidden
        {...field}
        // `value`の中身がundefinedとなる場合があり、あとから文字列が挿入される場合にReactがWarningを出す
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        value={value ?? ''}
      />

      <input
        {...inputProps}
        className={clsx([
          inputClassName,
          'block flex-1 w-full min-w-0 sm:text-sm rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
        ])}
        onChange={handleChange}
        type="file"
      />
    </CommonField>
  )
}
