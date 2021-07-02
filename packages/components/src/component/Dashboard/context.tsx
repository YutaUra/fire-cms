import { createDisclosure, createUseState } from '@fire-cms/react-utils'
import type { ReactNode } from 'react'

const {
  Provider: DashboardIsOpenProvider,
  useSetValue: _useDashboardSetIsOpen,
  useValue: useDashboardIsOpenValue,
} = createUseState<boolean>(false)

type Provider = (props: { children?: ReactNode }) => JSX.Element

export const DashboardProvider: Provider = ({ children }) => (
  <DashboardIsOpenProvider>{children}</DashboardIsOpenProvider>
)

export { useDashboardIsOpenValue }

export const useDashboardSetIsOpen = createDisclosure(_useDashboardSetIsOpen)
