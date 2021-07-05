import { Switch } from '@headlessui/react'
import clsx from 'clsx'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import type {
  FieldPath,
  FieldValues,
  SetValueConfig,
  UseControllerProps,
} from 'react-hook-form'
import { useController } from 'react-hook-form'
import { FormCommonField } from './Common'

export type FormToggleProps<
  T extends FieldValues,
  V extends FieldPath<T>,
> = UseControllerProps<T, V> & {
  defaultValue?: boolean
} & {
  setValue: (name: V, value: boolean, options?: SetValueConfig) => void
  className?: string
  buttonProps?: ComponentPropsWithoutRef<'button'>
  label: ReactNode
  labelClass?: string
}

export const FormToggle = <T extends FieldValues, V extends FieldPath<T>>({
  name,
  control,
  className,
  defaultValue,
  rules,
  buttonProps: { className: buttonClassName, ...buttonProps } = {},
  shouldUnregister,
  label,
  labelClass,
  setValue,
}: FormToggleProps<T, V>): JSX.Element => {
  const {
    field,
    fieldState: { error },
    formState: { isSubmitSuccessful },
  } = useController({
    control,
    defaultValue,
    name,
    rules: {
      ...rules,
    },
    shouldUnregister,
  })

  const [enabled, setEnabled] = useState<boolean>(defaultValue ?? false)

  useEffect(() => {
    setValue(name, enabled)
  }, [enabled, name, setValue, isSubmitSuccessful])

  return (
    <FormCommonField
      className={className}
      error={error}
      htmlFor={name}
      label={label}
      labelClass={labelClass}
      noShadow
    >
      <input hidden {...field} value={enabled.toString()} />

      <Switch
        {...buttonProps}
        checked={enabled}
        className={clsx(
          buttonClassName,
          enabled ? 'bg-indigo-600' : 'bg-gray-200',
          'inline-flex relative flex-shrink-0 w-11 h-6 rounded-full border-2 border-transparent focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 ease-in-out cursor-pointer focus:outline-none',
        )}
        onChange={setEnabled}
      >
        <span className="sr-only">Use setting</span>

        <span
          aria-hidden="true"
          className={clsx(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'inline-block w-5 h-5 bg-white rounded-full ring-0 shadow transition duration-200 ease-in-out transform pointer-events-none',
          )}
        />
      </Switch>
    </FormCommonField>
  )
}
