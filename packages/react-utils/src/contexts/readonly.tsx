import type { Context, ReactNode } from 'react'
import { createContext, useContext } from 'react'

export const createReadonly = <T,>(
  initial: T,
): {
  Provider: ({
    value,
    children,
  }: {
    children?: ReactNode
    value: T
  }) => JSX.Element
  context: Context<T>
  useValue: () => T
} => {
  const context = createContext<T>(initial)
  const Provider = ({
    value,
    children,
  }: {
    children?: ReactNode
    value: T
  }): JSX.Element => (
    <context.Provider value={value}>{children}</context.Provider>
  )
  const useValue = (): T => useContext(context)

  return {
    Provider,
    context,
    useValue,
  }
}
