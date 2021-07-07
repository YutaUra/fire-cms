import { FormInput, FormRichSelect, FormTextarea } from '@fire-cms/components'
import { useCallback, useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import type {
  FireCmsContentFieldForm,
  FireCmsContentFieldOptionForm,
} from '../../content-fields'

export const FireCmsContentFieldSelectOptionForm: FireCmsContentFieldOptionForm =
  ({ name, control, shouldUnregister }) => {
    const { fields, remove, append } = useFieldArray({
      control,
      name: `${name}.option.options`,
      shouldUnregister,
    })

    const appendLast = useCallback(() => {
      append({
        description: '',
        id: Date.now(),
        label: '',
        value: '',
      })
    }, [append])

    const removeItem = useCallback(
      (idx: number) => (): void => {
        remove(idx)
      },
      [remove],
    )

    useEffect(() => {
      if (fields.length === 0) {
        append({
          description: '',
          id: Date.now(),
          label: '選択肢１',
          value: '値１',
        })
      }
    }, [append, fields.length])

    return (
      <div className="pl-4">
        {fields.map((field, idx) => (
          <div
            className="sm:flex items-end py-2 space-y-4 sm:space-y-0 sm:space-x-4"
            key={field.id}
          >
            <FormInput
              className="flex-1"
              control={control}
              label="値"
              name={`${name}.option.options.${idx}.value`}
            />

            <FormInput
              className="flex-1"
              control={control}
              label="ラベル"
              name={`${name}.option.options.${idx}.label`}
            />

            <FormTextarea
              className="flex-1"
              control={control}
              label="説明"
              name={`${name}.option.options.${idx}.description`}
            />

            <button
              className="inline-block p-1 h-full"
              onClick={removeItem(idx)}
              type="button"
            >
              <AiOutlineMinusCircle
                aria-hidden
                className="w-8 h-8 text-red-500"
              />

              <span className="sr-only">項目を消去</span>
            </button>
          </div>
        ))}

        <div className="flex justify-center py-2">
          <button onClick={appendLast} type="button">
            <AiOutlinePlusCircle aria-hidden className="w-8 h-8" />

            <span className="sr-only">Add Field</span>
          </button>
        </div>
      </div>
    )
  }

export const FireCmsContentFieldSelectForm: FireCmsContentFieldForm<'select'> =
  ({ field, ...props }) => (
    <FormRichSelect {...props} options={field.option.options} />
  )
