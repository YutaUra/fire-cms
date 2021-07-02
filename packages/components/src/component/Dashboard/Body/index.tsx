import clsx from 'clsx'
import type { ReactNode } from 'react'
export { DashboardBodyContent } from './Content'
export { DashboardBodyHeader } from './Header'
export { DashboardBodyMain } from './Main'
export { DashboardBodyTitle } from './Title'

interface DashboardBodyProps {
  className?: string
  children?: ReactNode
}

/**
 *
 * ```tsx
 * const Sample = () => (
 *   <DashboardBody>
 *     <DashboardBodyHeader />
 *
 *     <DashboardBodyMain>
 *       <DashboardBodyTitle>Dashboard > Sample</DashboardBodyTitle>
 *
 *       <DashboardBodyContent>
 *         This is Content
 *       </DashboardBodyContent>
 *     </DashboardBodyMain>
 *   </DashboardBody>
 * )
 * ```
 */
export const DashboardBody = ({
  className,
  children,
}: DashboardBodyProps): JSX.Element => (
  <div
    className={clsx([className, 'w-0 flex-1 overflow-hidden flex flex-col'])}
  >
    {children}
  </div>
)
