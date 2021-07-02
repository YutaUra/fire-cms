import type { Context, Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useState } from 'react'

const createUseStateContext = <T,>(
  initial: T,
): [Context<T>, Context<Dispatch<SetStateAction<T>>>] => {
  const context = createContext<T>(initial)
  const setContext = createContext<Dispatch<SetStateAction<T>>>(() => null)
  return [context, setContext]
}

const createUseStateProvider =
  <T,>(
    ValueContext: Context<T>,
    SetValueContext: Context<Dispatch<SetStateAction<T>>>,
    initial: T,
  ) =>
  ({ children }: { children: ReactNode }): JSX.Element => {
    const [value, setValue] = useState(initial)
    return (
      <ValueContext.Provider value={value}>
        <SetValueContext.Provider value={setValue}>
          {children}
        </SetValueContext.Provider>
      </ValueContext.Provider>
    )
  }

export const createUseState = <T,>(
  initial: T,
): {
  Provider: ({ children }: { children: ReactNode }) => JSX.Element
  setValueContext: Context<Dispatch<SetStateAction<T>>>
  useSetValue: () => Dispatch<SetStateAction<T>>
  useValue: () => T
  valueContext: Context<T>
} => {
  const [valueContext, setValueContext] = createUseStateContext(initial)
  const Provider = createUseStateProvider(
    valueContext,
    setValueContext,
    initial,
  )
  const useValue = (): T => useContext(valueContext)
  const useSetValue = (): Dispatch<SetStateAction<T>> =>
    useContext(setValueContext)

  return {
    Provider,
    setValueContext,
    useSetValue,
    useValue,
    valueContext,
  }
}
