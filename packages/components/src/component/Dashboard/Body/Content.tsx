import clsx from 'clsx'
import type { ReactNode } from 'react'

interface DashboardBodyContentProps {
  children?: ReactNode
  className?: string
}

export const DashboardBodyContent = ({
  children,
  className,
}: DashboardBodyContentProps): JSX.Element => (
  <div className={clsx([className, 'mx-auto max-w-7xl px-4 sm:px-6 md:px-8'])}>
    <div className="py-4">
      {children ?? (
        <div className="h-96 rounded-lg border-4 border-gray-200 border-dashed" />
      )}
    </div>
  </div>
)
