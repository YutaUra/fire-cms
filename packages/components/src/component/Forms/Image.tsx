import clsx from 'clsx'
import type {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  MouseEventHandler,
  ReactNode,
} from 'react'
import { useCallback, useMemo, useRef } from 'react'
import type {
  FieldPath,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form'
import { useController, useWatch } from 'react-hook-form'
import { FormCommonField } from './Common'

export type FormImageProps<
  T extends FieldValues,
  V extends FieldPath<T>,
> = UseControllerProps<T, V> & {
  className?: string
  inputProps?: Omit<
    ComponentPropsWithoutRef<'input'>,
    'className' | 'onChange' | 'value'
  >
  imgClassName?: string
  fieldWrapperClassName?: string
  label: ReactNode
  labelClass?: string
} & {
  defaultValue?: File | null
}

export const FormImage = <T extends FieldValues, V extends FieldPath<T>>({
  name,
  control,
  className,
  defaultValue,
  rules,
  inputProps = {},
  imgClassName,
  shouldUnregister,
  label,
  labelClass,
  fieldWrapperClassName,
}: FormImageProps<T, V>): JSX.Element => {
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

  const inputRef = useRef<HTMLInputElement>(null)
  const image = useWatch({ control, defaultValue, name })

  const imageUrl = useMemo(() => {
    if (image === null || typeof image === 'undefined') return null
    if (typeof image === 'string') return image
    if (image instanceof File) {
      return URL.createObjectURL(image)
    }
    throw Error(`image got invalid value, ${image}`)
  }, [image])

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const file = event.target.files?.item(0) ?? null
      onChange(file)
    },
    [onChange],
  )

  const handleClickButton = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      event.preventDefault()
      inputRef.current?.click()
    },
    [],
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
      <input
        accept="image/*"
        {...inputProps}
        hidden
        multiple={false}
        onChange={handleChange}
        ref={inputRef}
        type="file"
      />

      <button
        className={clsx([
          'block w-full',
          imageUrl && 'p-2 border border-gray-200 rounded-md',
          !imageUrl && 'p-4 border border-dashed border-gray-500 rounded-md',
        ])}
        onClick={handleClickButton}
        type="button"
      >
        {imageUrl && (
          <img
            alt="プレビュー"
            className={clsx([imgClassName, 'mx-auto mb-2 rounded-md'])}
            src={imageUrl}
          />
        )}

        <p>クリックしてください</p>
      </button>
    </FormCommonField>
  )
}
