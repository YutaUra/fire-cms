import type { FieldValues, Path, UseControllerProps } from 'react-hook-form'
import { fireCmsContentFieldsMeta } from '../../content-fields'
import type { FireCmsContentFieldModel } from '../../schema'

type EntryFormFieldProps<T extends FieldValues> = Omit<
  UseControllerProps<T, Path<T>>,
  'name'
> & {
  className?: string
  fieldWrapperClassName?: string
  labelClassName?: string
  field: FireCmsContentFieldModel
}

export const EntryFormFields = <T extends FieldValues>({
  field,
  ...props
}: EntryFormFieldProps<T>): JSX.Element => {
  const { Form } = fireCmsContentFieldsMeta[field.type]
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (Form) {
    return (
      <Form
        {...props}
        field={field}
        label={field.name}
        name={field.id.toString() as Path<T>}
      />
    )
  }
  throw Error(`意図しない field type. ${field.name} の type は ${field.type}`)
}
