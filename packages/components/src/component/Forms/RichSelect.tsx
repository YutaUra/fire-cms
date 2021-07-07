import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import type { ReactNode, VFC } from 'react'
import { Fragment, useCallback, useMemo } from 'react'
import type { FieldValues, UseControllerProps } from 'react-hook-form'
import { useController, useWatch } from 'react-hook-form'
import { FormCommonField } from './Common'

export interface FormRichSelectOption {
  value: unknown
  label: string
  description?: string
}

export type FormRichSelectProps<T extends FieldValues> =
  UseControllerProps<T> & {
    className?: string
    fieldWrapperClassName?: string
    label: ReactNode
    labelClass?: string
    options: FormRichSelectOption[]
  }

const defaultOption: FormRichSelectOption = {
  description: '',
  label: '',
  value: undefined,
}

export const FormRichSelect = <T extends FieldValues>({
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
}: FormRichSelectProps<T>): JSX.Element => {
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

  const selected = useMemo<FormRichSelectOption>(() => {
    if (value) {
      return options.find((option) => option.value === value) ?? defaultOption
    }
    return options[0] ?? defaultOption
  }, [options, value])

  const listBoxClassName = useCallback(
    ({ active }: { active: boolean }) =>
      clsx(
        active ? 'text-white bg-indigo-500' : 'text-gray-900',
        'relative p-4 text-sm cursor-default select-none',
      ),
    [],
  )

  const ListBoxOptionChild = useCallback<
    VFC<{ isSlected: boolean; active: boolean; option: FormRichSelectOption }>
  >(
    ({ isSlected, active, option }) => (
      <div className="flex flex-col">
        <div className="flex justify-between">
          <p className={isSlected ? 'font-semibold' : 'font-normal'}>
            {option.label}
          </p>

          {isSlected ? (
            <span className={active ? 'text-white' : 'text-indigo-500'}>
              <CheckIcon aria-hidden="true" className="w-5 h-5" />
            </span>
          ) : null}
        </div>

        {option.description && (
          <p
            className={clsx(
              active ? 'text-indigo-200' : 'text-gray-500',
              'mt-2',
            )}
          >
            {option.description}
          </p>
        )}
      </div>
    ),
    [],
  )

  const handleChange = useCallback(
    (option: FormRichSelectOption) => {
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
      <Listbox onChange={handleChange} value={selected}>
        {({ open }): JSX.Element => (
          <>
            <Listbox.Label className="sr-only">{label}</Listbox.Label>

            <div className="relative">
              <div className="inline-flex rounded-md divide-x divide-indigo-600 shadow-sm">
                <div className="inline-flex relative z-0 rounded-md divide-x divide-indigo-600 shadow-sm">
                  <div className="inline-flex relative items-center py-2 pr-4 pl-3 text-white bg-indigo-500 rounded-l-md border border-transparent shadow-sm">
                    <p className="ml-2.5 text-sm font-medium">
                      {selected.label}
                    </p>
                  </div>

                  <Listbox.Button className="inline-flex relative focus:z-10 items-center p-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-r-md rounded-l-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-none">
                    <span className="sr-only">{label}</span>

                    <ChevronDownIcon
                      aria-hidden="true"
                      className="w-5 h-5 text-white"
                    />
                  </Listbox.Button>
                </div>
              </div>

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                show={open}
              >
                <Listbox.Options
                  className="overflow-hidden absolute right-0 z-10 mt-2 w-72 bg-white rounded-md divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 shadow-lg origin-top-right focus:outline-none"
                  static
                >
                  {options.map((option) => (
                    <Listbox.Option
                      className={listBoxClassName}
                      key={option.label}
                      value={option}
                    >
                      {(props: {
                        selected: boolean
                        active: boolean
                      }): JSX.Element => (
                        <ListBoxOptionChild
                          active={props.active}
                          isSlected={props.selected}
                          option={option}
                        />
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
