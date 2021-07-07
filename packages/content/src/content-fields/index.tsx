import { FormInput, FormTextarea, FormToggle } from '@fire-cms/components'
import type { ReactNode, VFC } from 'react'
import type { FieldValues, Path, UseControllerProps } from 'react-hook-form'
import {
  FireCmsContentFieldSelectForm,
  FireCmsContentFieldSelectOptionForm,
} from '../components/content-field/Select'
import type {
  FireCmsContentBaseContentModel,
  FireCmsContentFieldModel,
  FireCmsContentFieldTypeModel,
} from '../schema'

export type FireCmsContentFieldForm<
  T extends FireCmsContentFieldTypeModel = FireCmsContentFieldTypeModel,
> = <V extends FieldValues = FieldValues>(
  props: UseControllerProps<V, Path<V>> & {
    className?: string
    fieldWrapperClassName?: string
    label: ReactNode
    labelClassName?: string
    field: FireCmsContentFieldModel & { type: T }
  },
) => JSX.Element

export type FireCmsContentFieldOptionForm = VFC<
  UseControllerProps<FireCmsContentBaseContentModel, `fields.${number}`>
>

export const fireCmsContentFieldsMeta: Record<
  FireCmsContentFieldTypeModel,
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Form: FireCmsContentFieldForm<any>
    FormOption?: FireCmsContentFieldOptionForm
  }
> = {
  boolean: { Form: FormToggle },
  'long-text': { Form: FormTextarea },
  select: {
    Form: FireCmsContentFieldSelectForm,
    FormOption: FireCmsContentFieldSelectOptionForm,
  },
  text: { Form: FormInput },
}
