import { Switch } from '@headlessui/react'
import clsx from 'clsx'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import type {
  FieldPath,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form'
import { useController } from 'react-hook-form'
import { FormCommonField } from './Common'

export type FormToggleProps<
  T extends FieldValues,
  V extends FieldPath<T>,
> = UseControllerProps<T, V> & {
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
}: FormToggleProps<T, V>): JSX.Element => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    // @ts-expect-error defaultValue に入る値にbooleanを入れられない。ReactHookFormの更新に期待
    defaultValue: defaultValue ?? false,
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
      noShadow
    >
      <Switch
        {...buttonProps}
        checked={value}
        className={clsx(
          buttonClassName,
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          value ? 'bg-indigo-600' : 'bg-gray-200',
          'inline-flex relative flex-shrink-0 w-11 h-6 rounded-full border-2 border-transparent focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 ease-in-out cursor-pointer focus:outline-none',
        )}
        onChange={onChange}
      >
        <span className="sr-only">Use setting</span>

        <span
          aria-hidden="true"
          className={clsx(
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            value ? 'translate-x-5' : 'translate-x-0',
            'inline-block w-5 h-5 bg-white rounded-full ring-0 shadow transition duration-200 ease-in-out transform pointer-events-none',
          )}
        />
      </Switch>
    </FormCommonField>
  )
}
