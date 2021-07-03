import clsx from 'clsx'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export type TableTrProps = ComponentPropsWithoutRef<'tr'>

export const TableTr = (props: TableTrProps): JSX.Element => <tr {...props} />

export type TableThProps = ComponentPropsWithoutRef<'th'>
export const TableTh = ({ className, ...props }: TableThProps): JSX.Element => (
  <th className={clsx([className, 'py-3 px-6'])} {...props} />
)

export type TableTheadProps = ComponentPropsWithoutRef<'thead'>
export const TableThead = ({
  className,
  ...props
}: TableTheadProps): JSX.Element => (
  <thead className={clsx([className, 'bg-gray-50'])} {...props} />
)

export type TableTbodyProps = ComponentPropsWithoutRef<'tbody'>
export const TableTbody = ({
  className,
  ...props
}: TableTbodyProps): JSX.Element => (
  <tbody
    className={clsx([className, 'bg-white divide-y divide-gray-200'])}
    {...props}
  />
)

export type TableTdProps = ComponentPropsWithoutRef<'td'>
export const TableTd = ({ className, ...props }: TableTdProps): JSX.Element => (
  <td
    className={clsx([className, 'py-4 px-6 text-sm whitespace-nowrap'])}
    {...props}
  />
)

export interface TableProps {
  children?: ReactNode
  className?: string
}
export const Table = ({ className, children }: TableProps): JSX.Element => (
  <div className={clsx([className, 'flex flex-col'])}>
    <div className="overflow-x-auto -my-2 sm:-mx-6 lg:-mx-8">
      <div className="inline-block py-2 sm:px-6 lg:px-8 min-w-full align-middle">
        <div className="overflow-hidden sm:rounded-lg border-b border-gray-200 shadow">
          <table className="min-w-full divide-y divide-gray-200">
            {children}
          </table>
        </div>
      </div>
    </div>
  </div>
)
