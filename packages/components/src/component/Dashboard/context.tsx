import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useCallback, useContext, useState } from 'react'

const DashboardIsOpenContext = createContext<boolean>(false)
const DashboardSetIsOpenContext = createContext<
  Dispatch<SetStateAction<boolean>>
>(() => null)

type Provider = (props: { children?: ReactNode }) => JSX.Element

const DashboardIsOpenProvider: Provider = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <DashboardIsOpenContext.Provider value={isOpen}>
      <DashboardSetIsOpenContext.Provider value={setIsOpen}>
        {children}
      </DashboardSetIsOpenContext.Provider>
    </DashboardIsOpenContext.Provider>
  )
}

export const DashboardProvider: Provider = ({ children }) => (
  <DashboardIsOpenProvider>{children}</DashboardIsOpenProvider>
)

export const useDashboardIsOpenValue = (): boolean =>
  useContext(DashboardIsOpenContext)

export const useDashboardSetIsOpen = (): {
  onOpen: () => void
  onClose: () => void
  onToggle: () => void
} => {
  const setIsOpen = useContext(DashboardSetIsOpenContext)
  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])
  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])
  const onToggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [setIsOpen])

  return {
    onClose,
    onOpen,
    onToggle,
  }
}
