import {
  FormCommonField,
  FormInput,
  FormRichSelect,
} from '@fire-cms/components'
import type { VFC } from 'react'
import { useCallback, useEffect } from 'react'
import type { Control, FieldError } from 'react-hook-form'
import { useFieldArray, useFormState, useWatch } from 'react-hook-form'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { fireCmsContentFieldsMeta } from '../../content-fields'
import { fireCmsContentFields } from '../../schema'
import type { ContentFormField } from './ContentForm'

interface ContentFieldsItemProps {
  control: Control<ContentFormField>
  idx: number
  remove: (index?: number[] | number | undefined) => void
}

const ContentFieldsItem: VFC<ContentFieldsItemProps> = ({
  control,
  idx,
  remove,
}) => {
  const field = useWatch({
    control,
    name: `fields.${idx}`,
  })
  const FieldOption = useCallback(() => {
    const { FormOption } = fireCmsContentFieldsMeta[field.type]
    if (FormOption) {
      return <FormOption control={control} name={`fields.${idx}`} />
    }
    return null
  }, [control, field.type, idx])

  const removeItem = useCallback(() => {
    remove(idx)
  }, [idx, remove])

  return (
    <div>
      <div className="sm:flex items-end py-2 space-y-4 sm:space-y-0 sm:space-x-4">
        <FormInput
          className="flex-1"
          control={control}
          label="項目名"
          name={`fields.${idx}.name`}
        />

        <FormRichSelect
          className="inline-block"
          control={control}
          label="種類"
          name={`fields.${idx}.type`}
          options={fireCmsContentFields.map(({ description, label, type }) => ({
            description,
            label,
            value: type,
          }))}
        />

        <button
          className="inline-block p-1 h-full"
          onClick={removeItem}
          type="button"
        >
          <AiOutlineMinusCircle aria-hidden className="w-8 h-8 text-red-500" />

          <span className="sr-only">項目を消去</span>
        </button>
      </div>

      <FieldOption />
    </div>
  )
}

interface ContentFieldsFieldProps {
  control: Control<ContentFormField>
  className?: string
}

export const ContentFieldsField: VFC<ContentFieldsFieldProps> = ({
  control,
  className,
}) => {
  const { errors } = useFormState({ control, name: 'fields' }) as unknown as {
    errors: { fields: FieldError }
  }
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  })

  const appendLast = useCallback(() => {
    append({ id: Date.now(), name: '', type: 'text' })
  }, [append])

  useEffect(() => {
    if (fields.length === 0) {
      append({ id: Date.now(), name: 'タイトル', type: 'text' })
    }
  }, [append, fields.length])

  return (
    <FormCommonField
      className={className}
      error={errors.fields}
      htmlFor=""
      label="項目"
      noShadow
    >
      <div className="mb-3 divide-y divide-gray-600">
        {fields.map((field, idx) => (
          <ContentFieldsItem
            control={control}
            idx={idx}
            key={field.id}
            remove={remove}
          />
        ))}

        <div className="flex justify-center py-2">
          <button onClick={appendLast} type="button">
            <AiOutlinePlusCircle aria-hidden className="w-8 h-8" />

            <span className="sr-only">Add Field</span>
          </button>
        </div>
      </div>
    </FormCommonField>
  )
}
