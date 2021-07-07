import type { Context, Dispatch, FC, SetStateAction } from 'react'
import { createContext, useContext, useState } from 'react'

const createUseStateContextContext = <T,>(
  initial: T,
): [Context<T>, Context<Dispatch<SetStateAction<T>>>] => {
  const context = createContext<T>(initial)
  const setContext = createContext<Dispatch<SetStateAction<T>>>(() => null)
  return [context, setContext]
}

const createUseStateContextProvider =
  <T,>(
    ValueContext: Context<T>,
    SetValueContext: Context<Dispatch<SetStateAction<T>>>,
    initial: T,
  ): FC =>
  ({ children }): ReturnType<FC> => {
    const [value, setValue] = useState(initial)
    return (
      <ValueContext.Provider value={value}>
        <SetValueContext.Provider value={setValue}>
          {children}
        </SetValueContext.Provider>
      </ValueContext.Provider>
    )
  }

interface UseStateContext<T> {
  Provider: FC
  setValueContext: Context<Dispatch<SetStateAction<T>>>
  useSetValue: () => Dispatch<SetStateAction<T>>
  useValue: () => T
  valueContext: Context<T>
}

export const createUseStateContext = <T,>(initial: T): UseStateContext<T> => {
  const [valueContext, setValueContext] = createUseStateContextContext(initial)
  const Provider = createUseStateContextProvider(
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
