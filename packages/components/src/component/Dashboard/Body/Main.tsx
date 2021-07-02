import type { ReactNode } from 'react'

interface DashboardBodyMainProps {
  children?: ReactNode
}

export const DashboardBodyMain = ({
  children,
}: DashboardBodyMainProps): JSX.Element => (
  <main className="overflow-y-auto relative z-0 flex-1 focus:outline-none">
    <div className="py-6">{children}</div>
  </main>
)
