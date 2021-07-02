import clsx from 'clsx'
import type { ReactNode } from 'react'

interface DashboardBodyTitleProps {
  children?: ReactNode
  className?: string
}

export const DashboardBodyTitle = ({
  children,
  className,
}: DashboardBodyTitleProps): JSX.Element => (
  <div className={clsx([className, 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'])}>
    <h1 className="text-2xl font-semibold text-gray-900">{children}</h1>
  </div>
)
