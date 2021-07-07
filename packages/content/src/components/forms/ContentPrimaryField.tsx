import { FormSelect } from '@fire-cms/components'
import type { VFC } from 'react'
import type { Control } from 'react-hook-form'
import { useWatch } from 'react-hook-form'
import type { ContentFormField } from './ContentForm'

interface ContentPrimaryFieldProps {
  control: Control<ContentFormField>
  className?: string
}

export const ContentPrimaryField: VFC<ContentPrimaryFieldProps> = ({
  control,
  className,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const fields = useWatch({ control, name: 'fields' }) ?? []

  return (
    <FormSelect
      className={className}
      control={control}
      label="プライマリ項目"
      name="primaryFieldId"
      options={fields.map((field) => ({
        label: field.name,
        value: field.id,
      }))}
    />
  )
}
