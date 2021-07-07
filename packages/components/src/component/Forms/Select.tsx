/* This example requires Tailwind CSS v2.0+ */
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import type { ReactNode, VFC } from 'react'
import { Fragment, useCallback, useMemo } from 'react'
import type { FieldValues, UseControllerProps } from 'react-hook-form'
import { useController, useWatch } from 'react-hook-form'
import { FormCommonField } from './Common'

export interface FormSelectOption {
  value: unknown
  label: string
}

export type FormSelectProps<T extends FieldValues> = UseControllerProps<T> & {
  className?: string
  fieldWrapperClassName?: string
  label: ReactNode
  labelClass?: string
  options: FormSelectOption[]
}

const defaultOption: FormSelectOption = {
  label: '',
  value: undefined,
}

export const FormSelect = <T extends FieldValues>({
  name,
  control,
  className,
  defaultValue,
  rules,
  shouldUnregister,
  label,
  labelClass,
  fieldWrapperClassName,
  options,
}: FormSelectProps<T>): JSX.Element => {
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

  const value = useWatch({ control, name })

  const selectedOption = useMemo<FormSelectOption>(() => {
    if (value) {
      return options.find((option) => option.value === value) ?? defaultOption
    }
    return options[0] ?? defaultOption
  }, [options, value])

  const listBoxClassName = useCallback(
    ({ active }: { active: boolean }) =>
      clsx(
        active ? 'text-white bg-indigo-600' : 'text-gray-900',
        'relative py-2 pr-9 pl-3 cursor-default select-none',
      ),
    [],
  )

  const ListBoxOptionChild = useCallback<
    VFC<{ selected: boolean; active: boolean; option: FormSelectOption }>
  >(
    ({ selected, active, option }) => (
      <>
        <span
          className={clsx(
            selected ? 'font-semibold' : 'font-normal',
            'block truncate',
          )}
        >
          {option.label}
        </span>

        {selected ? (
          <span
            className={clsx(
              active ? 'text-white' : 'text-indigo-600',
              'flex absolute inset-y-0 right-0 items-center pr-4',
            )}
          >
            <CheckIcon aria-hidden="true" className="w-5 h-5" />
          </span>
        ) : null}
      </>
    ),
    [],
  )

  const handleChange = useCallback(
    (option: FormSelectOption) => {
      onChange(option.value)
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
      noShadow
    >
      <Listbox onChange={handleChange} value={selectedOption}>
        {({ open }): JSX.Element => (
          <>
            <Listbox.Label className="sr-only">{label}</Listbox.Label>

            <div className="relative mt-1">
              <Listbox.Button className="relative py-2 pr-10 pl-3 w-full sm:text-sm text-left bg-white rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm cursor-default focus:outline-none">
                <span className="block truncate">{selectedOption.label}</span>

                <span className="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-400"
                  />
                </span>
              </Listbox.Button>

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                show={open}
              >
                <Listbox.Options
                  className="overflow-auto absolute z-10 py-1 mt-1 w-full max-h-60 text-base sm:text-sm bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-lg focus:outline-none"
                  static
                >
                  {options.map((option) => (
                    <Listbox.Option
                      className={listBoxClassName}
                      key={option.label}
                      value={option}
                    >
                      {(props): JSX.Element => (
                        <ListBoxOptionChild {...props} option={option} />
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </FormCommonField>
  )
}
