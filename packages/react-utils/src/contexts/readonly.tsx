import type { Context, FC } from 'react'
import { createContext, useContext } from 'react'

interface ReadonlyContext<T> {
  Provider: FC<{ value: T }>
  context: Context<T>
  useValue: () => T
}

export const createReadonlyContext = <T,>(initial: T): ReadonlyContext<T> => {
  const context = createContext<T>(initial)
  const Provider: FC<{ value: T }> = ({ value, children }) => (
    <context.Provider value={value}>{children}</context.Provider>
  )
  const useValue = (): T => useContext(context)

  return {
    Provider,
    context,
    useValue,
  }
}
