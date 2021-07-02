import clsx from 'clsx'
import type { ReactNode } from 'react'
import { DashboardProvider } from './context'
import {
  DashboardNavigationDesktop,
  DashboardNavigationMobile,
} from './Navigation'
export * from './Body'

export interface DashboardProps {
  className?: string
  children?: ReactNode
}

/**
 *
 * ```tsx
 * const Sample = () => (
 *   <Dashboard>
 *     <DashboardBody>
 *       <DashboardBodyHeader />
 *
 *       <DashboardBodyMain>
 *         <DashboardBodyTitle>Dashboard > Sample</DashboardBodyTitle>
 *
 *         <DashboardBodyContent>
 *           This is Content
 *         </DashboardBodyContent>
 *       </DashboardBodyMain>
 *     </DashboardBody>
 *   </Dashboard>
 * )
 * ```
 */
export const Dashboard = ({
  className,
  children,
}: DashboardProps): JSX.Element => (
  <DashboardProvider>
    <div
      className={clsx([className, 'flex overflow-hidden h-screen bg-gray-100'])}
    >
      <DashboardNavigationMobile />

      <DashboardNavigationDesktop className="hidden md:flex md:flex-shrink-0" />

      {children}
    </div>
  </DashboardProvider>
)
